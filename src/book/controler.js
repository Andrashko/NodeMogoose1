import Book from "./model"
import mongoose from "mongoose"
import Author from "../author/model";


const bookControler = {
    //отримати всі
    get: function (request, response) {
        Book.find().populate("author")
        .then(books=>{
                response.send(books);
        })
        .catch(
            error=>{
                response.status(500).send(error);
            }
        );
    }, //get
    //отримати одну з вказаним ІД
    get_id: function (request, response) {
        Book.findById(request.params.id)
        .then(book=>{
            if (book)
                response.send(book);
            else
                response.status(404).send("Не знайдено");  
        })
        .catch(
            error=>{
                response.status(500).send(error);
            }
        );
    }, //getById
    //додати нову
    post: function (request, response) {  
        console.log("book")    
        const newBook = new Book(request.body.book);
        newBook.save()
        .then(book=>{
            response.send(book);    
        }).catch(
            error=>{
                response.status(500).send(error);
            }
        )
    },//post
    //вилучити із вказаним ІД
    delete_id: function (request, response) {
        Book.findByIdAndDelete(request.params.id).
        then(book=>{
            if (book)
                response.send(book);
            else
                response.status(404).send("Не знайдено");    
        }).catch(
            error=>{
                response.status(500).send(error);
            }
        )
    },//deleteById
    init: async (req,res) =>{
        console.log("init");
        let shevchenko = await Author.findOne({Name:"Shevchenko"});
        console.log(shevchenko);
        let b1 = new Book({
            title: "Kobzar",
            author: shevchenko._id
        });
        await b1.save();
        res.send(b1);
    }
}
//валідатор чи є в книги назва  і автор
function isValid(book) {
    return book && book.title && book.author;
}

export default bookControler;