const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')
require('dotenv').config()

//user model - like obj propeties and its limitations or attributes 
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid e-mail address')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    firstname: {
        type: String,
        maxLength: 100,
        trim: true
    },
    lastname: {
        type: String,
        maxLength: 100,
        trim: true
    },
    age: {
        type: Number
    }
},{
    timestamps: true
})

//hashing password for db save
userSchema.pre('save', async function(next){
    let user = this
    if(user.isModified('password')){
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(user.password, salt)
        user.password = hash
    }
    next()
})

//token for successful login
userSchema.methods.generateToken = function(){
    let user = this
    const userObj = {_id: user._id.toHexString(), email: user.email}
    const token = jwt.sign(userObj, process.env.DB_SECRET, {expiresIn: '1d'})
    return token
}

//compare password from db
userSchema.methods.comparePassword = async function(clientPassword){
    let user = this
    let match = await bcrypt.compare(clientPassword, user.password)
    return match
}

//avoid redundancy
userSchema.statics.emailTaken = async function(email){
    const user = await this.findOne({email})
    return user
}

//finalize model
const User = mongoose.model('User', userSchema)

//export
module.exports = {User}