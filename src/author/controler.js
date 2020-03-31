import Author from "./model.js";

const authorControler = {
    //перший спосіб на колбеках
    get1: (req, res) => {
        Author.find((err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            else {
                res.send(result);
            }
        });
    },
    //другий спосіб на промісах
    get2: (req, res) => {
        Author.find().then(
            result => res.send(result)
        ).catch(
            err => {
                console.log(err);
                res.status(500).send(err);
            }
        )
    },
    //третій спосіб на асинхронних функціях
    get3: async (req, res) => {
        try {
            let authorsList = await Author.find();
            res.send(authorsList);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    },

    //ініціалізація авторів 
    init: async (req, res) => {
        let n = await Author.find().count();
        console.log(n);
        if (n == 0) {
            let author1 = new Author({
                Name: "King",
                Country: "USA",
                Age: 61
            });
            await author1.save();
            let author2 = new Author({
                Name: "Shevchenko",
                Country: "Uukraine",
                Age: 33
            });
            await author2.save();
        }
        res.send("intialised");
    }

    //тут треба методи patch, post, delete
};

export default authorControler;