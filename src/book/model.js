import {Schema, model } from 'mongoose';

const bookSchema = new Schema({
    title: {
        type:String,
        required: true
    },
    author: String,

});

const Book = model("Book", bookSchema);

export default Book;