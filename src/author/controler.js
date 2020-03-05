import Author from "./model.js";

const authorControler = {
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
    get3: async (req, res) => {
        try {
            let authorsList = await Author.find();
            res.send(authorsList);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    },
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
};

export default authorControler;