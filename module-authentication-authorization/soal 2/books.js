const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const port = 4000;

const books = [
    {
      "author": "Robert Martin",
      "country": "USA",
      "language": "English",
      "pages": 209,
      "title": "Clean Code",
      "year": 2008
    },
    {
      "author": "Dave Thomas & Andy Hunt",
      "country": "USA",
      "language": "English",
      "pages": 784,
      "title": "The Pragmatic Programmer",
      "year": 1999
    },
    {
      "author": "Kathy Sierra, Bert Bates",
      "country": "USA",
      "language": "English",
      "pages": 928,
      "title": "Head First Java",
      "year": 2003
    },
    ];

app.use(bodyParser.json())
const accessTokenSecret = 'youraccesstokensecret';

const authenticateJWT = (req, res, next) => {
    //menangkap request client dengan auhtorizationnya (tokern)
    const authHeader = req.headers.authorization;
    //mengecek ada tidaknya token
    if (authHeader) {
        //mengambil token saja
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

app.get("/books", authenticateJWT, (req,res) => {
    res.json(books)
})

app.post ("/books", authenticateJWT, (req,res) => {
    const {role} = req.user;

    if (role == "admin") {
        const book = req.body;
        books.push(book)

        res.send("sukses menambahkan buku")
    } else {
        res.sendStatus(403)
    }
})

app.listen(port, () => {
    console.log("server is listening on port", port)
})