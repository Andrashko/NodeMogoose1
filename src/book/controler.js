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
        const newBook = new Book(request.body);
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
    },
    //функція оновлення
    async patch(req, res) {
        try {
            const book = await Book.findByIdAndUpdate(req.params.id, req.body,  {new: true});
            if (!book)
                res.status(404).send("Not found");
            await book.save();
            res.send(book);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    
}


export default bookControler;