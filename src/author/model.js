import mongoose from "mongoose"

const authorSchema = new mongoose.Schema({
    Name:{
        type: String,
        required:true
    },
    Country: String,
    Age:{
        type:Number,
        min:0,
        max:150
    }
});

const Author = mongoose.model("Author", authorSchema);

export default Author;