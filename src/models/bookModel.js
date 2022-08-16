const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    BookName: {
        type: String,
        unique : true,
        require: true
    },
    AuthorName: {
        type: String,
        unique : true,
        require: true
    },
    category: {
        type: String,
        enum: ["adventure", "fantasy", "horror", "historical"] //"falana" will give an error
    },
    year: Number,
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema) //books



