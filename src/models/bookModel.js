const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        require: true
    },
    price: {
        Indianprice: String,
        europianprice: String
    },
    year: {
        type: Number,
        default: 2021
    },
    tags: [],
    authorName: String,
    totalpages: Number,
    stockAvailable : Boolean
}, { timestamps: true });

module.exports = mongoose.model('Bookc', bookSchema) //bookcs



