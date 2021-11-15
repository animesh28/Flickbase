const mongoose = require('mongoose')
const validator = require('validator')
require('dotenv').config()
const aggregatePaginate = require("mongoose-aggregate-paginate-v2")

const articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'You need a title'],
        maxLength: 100
    },
    content: {
        type: String,
        required: [true, 'You need some content']
    },
    excerpt: {
        type: String,
        required: [true, 'You need some excerpt'],
        maxLength: 500
    },
    score: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    actors: {
        type: [String],
        required: true,
        validate: {
            validator: function(array) {
                return array.length >= 2
            },
            message: "You need to add atleast 2 actors"
        }
    },
    status: {
        type: String,
        required: true,
        enum: ['draft','public'],
        default: 'draft',
        index: true
    }
},{
    timestamps: true
})

articleSchema.plugin(aggregatePaginate)

const Article = mongoose.model('Article', articleSchema)

module.exports = { Article }