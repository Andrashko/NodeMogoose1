import mongoose from 'mongoose';
import Author from "../author/model.js";

const bookSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    author: [{
        type: mongoose.Types.ObjectId,
        model: Author,
        ref:"Author"
    }]


});

const Book = mongoose.model("Book", bookSchema);

export default Book;