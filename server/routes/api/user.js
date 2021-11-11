const express = require('express')
const router = express.Router()
require('dotenv').config()

const { User } = require('../../models/user_model')
const { isValidUser } = require('../../middlewares/auth')
const { grantAccess } = require('../../middlewares/grantAccess')

router.route('/register')
.post(async (req,res)=>{

    try{
        //check if email taken
        if(await User.emailTaken(req.body.email)){
           return res.status(400).json({message: 'Sorry email already taken'}) 
        }

        //generate user instance
        const user = new User({
            email: req.body.email,
            password: req.body.password
        })

        //save user to db
        const doc = await user.save()

        //generate token
        const token = user.generateToken()

        //send email

        //response
        res.cookie('x-access-token', token)
        .status(200).send(getUserProps(doc))
    } catch(error) {
        res.status(400).json({message: 'Error', error: error})
    }
})

router.route('/login')
.post(async (req,res)=>{
    try{
        //check email
        let user = await User.findOne({email: req.body.email})
        if(!user) return res.status(400).json({message: 'e-mail not registered'})

        //check password
        const passwordMatch = await user.comparePassword(req.body.password)
        if(!passwordMatch) return res.status(400).json({message: 'Wrong Password'}) 

        //generate token
        const token = user.generateToken()

        //response
        res.cookie('x-access-token', token)
        .status(200).send(getUserProps(user))

    } catch(error){
        res.status(400).json({message: 'Error', error: error})
    }
})

router.route('/profile')
.get(isValidUser, grantAccess('readOwn', 'profile'), async (req,res)=>{
    try{
        const permission = res.locals.permission
        const user = await User.findOne(req.user._id)
        if(!user) return res.status(400).json({message: 'User not found'})

        res.status(200).json(permission.filter(user._doc))
    } catch(error){
        res.status(400).json({message: 'Error', error: error})
    }
})
.patch(isValidUser, grantAccess('updateOwn', 'profile'), async (req,res)=>{
    try{
        const user = await User.findOneAndUpdate(
            {_id: req.user._id},
            {
                "$set": {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    age: req.body.age
                }
            },
            { new: true }
        )

        if(!user) return res.status(400).json({message: 'User not found'})

        res.status(200).json(getUserProps(user))
    } catch(error) {
        res.status(400).json({message: 'Problem occured while updating profile', error: error})
    }
})

router.route('/isauth')
.get(isValidUser, async(req,res) => {
    res.status(200).send(getUserProps(req.user))
})

router.route('/update_email')
.patch(isValidUser, grantAccess('updateOwn', 'profile'), async (req,res)=>{

    try {

    if(await User.emailTaken(req.body.newemail)) {
        return res.status(400).json({message: "E-mail alerady taken"})
    }

    const user = await User.findOneAndUpdate(
        { _id: req.user._id, email: req.body.email },
        {
            "$set": {
                email: req.body.newemail
            }
        },
        { new: true }
    )

    if(!user) return res.status(400).json({message: 'User not found'})

    const token = user.generateToken()

    res.cookie('x-access-token', token)
    .status(200).send({email: user.email})
    } catch(error) {
        res.status(400).json({message: 'Problem occured while updating profile', error: error})
    }
})

const getUserProps = (user) => {
    return {
        _id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        age: user.age,
        role: user.role
    }
}

module.exports = router