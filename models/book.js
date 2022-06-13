const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    name: String,
    genre: String,
    authorId: String
})

const Book = mongoose.model('Book',bookSchema)
module.exports = Book