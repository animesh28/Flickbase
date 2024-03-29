const express = require('express')
const router = express.Router()
require('dotenv').config()

//model
const { Article } = require('../../models/article_model')

//middleware
const { isValidUser } = require('../../middlewares/auth')
const { grantAccess } = require('../../middlewares/grantAccess')
const { sortArgsHelper } = require('../../config/helpers')

router.route('/admin/add_article') //post
.post(isValidUser, grantAccess('createAny', 'article'), async(req,res) => {
    try{
        const article = new Article({
            ...req.body,
            score: parseInt(req.body.score)
        })

        const result = await article.save()

        res.status(200).send(result)
    } catch(error) {
        res.status(400).json({message: 'Error adding article', error: error})
    }
})


router.route('/admin/:id')
.get(isValidUser, grantAccess('readAny', 'article'), async(req,res) => {
    try{
        const _id = req.params.id
        const article = await Article.findById(_id)

        if(!article || article.length == 0) {
           return res.status(400).json({message: 'Error fetching article', error: error})
        }

        res.status(200).json(article)
    } catch(error) {
        res.status(400).json({message: 'Error fetching article', error: error})
    }
})
.patch(isValidUser, grantAccess('updateAny', 'article'), async(req,res) => {
    try {
        const _id = req.params.id
        const article = await Article.findOneAndUpdate(
            {_id},
            {
                "$set": req.body
            },
            { new: true }
        )

        if(!article || article.length == 0) {
            return res.status(400).json({message: 'Error fetching article', error: error})
        }

        res.status(200).json(article)
    } catch(error) {
        res.status(400).json({message: 'Error occurred while updating article', error: error})
    }
})
.delete(isValidUser, grantAccess('deleteAny', 'article'), async(req,res) => {
    try{
        const _id = req.params.id
        const article = await Article.findByIdAndRemove(_id)

        if(!article) return res.status(400).json({message: 'Error fetching article', error: error})

        res.status(200).json({id: article._id})

    } catch(error) {
        res.status(400).json({message: 'Error occurred while deleting article', error: error})
    }
})

router.route('/get_article/:id')
.get(async(req,res) => {
    try{
    const _id = req.params.id
    const article = await Article.find({_id, status: "public"})

    if(!article) return res.status(400).json({message: 'Error fetching article', error: error})

    res.status(200).json(article)
    } catch(error) {
        res.status(400).json({message: 'Error occurred while fetching article', error: error})
    }
})

router.route('/loadmore')
.post(async(req,res) => {
    try{
        let sortArgs = sortArgsHelper(req.body)

        const articles = await Article
        .find({status: 'public'})
        .sort([[sortArgs.sortBy, sortArgs.order]])
        .skip(sortArgs.skip)
        .limit(sortArgs.limit)

        if(!articles) return res.status(400).json({message: 'Error fetching article', error: error})

        res.status(200).json(articles)
    } catch(error) {
        res.status(400).json({message: 'Error occurred while fetching article', error: error})
    }
})

router.route('/admin/paginate')
.post(isValidUser, grantAccess('readAny', 'articles'), async(req,res) => {
    try{
        const limit = req.body.limit ? req.body.limit : 5

        let aggQuery = Article.aggregate([
            {$match: {status: 'public'}}/* ,
            {$match: {title: { $regex: /Article/}}}*/
        ])

        const options = {
            page: req.body.page,
            limit,
            sort: {_id: 'desc'}
        }

        const articles = await Article.aggregatePaginate(aggQuery, options)

        res.status(200).json(articles)
    } catch(error) {
        console.log(error);
        res.status(400).json({message: 'Error fetching article', error: error})
    }
})

module.exports = router