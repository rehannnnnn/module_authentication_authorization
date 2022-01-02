const express = require("express");
const app = express();
const port = 3000;

const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const { cookie } = require("express/lib/response");
const { path } = require("express/lib/application");

app.use(
  sessions({
    secret: "fsecreeeeeeeeeeeeeet",
    resave: false,
    saveUninitialized: true,
    cookie: { expires: 60000 },
  })
);

const myusername = "user1";
const mypassword = "mypassword";

var session;

app.use(express.static("view"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  session = req.session;
  if (session.userid) {
    res.send(
      "Welcome to this page <a href='/logout'> click here to logout</a>"
    );
  } else {
    res.sendFile('view/index.html' , { root : __dirname});
  }
});

app.post("/user", (req, res) => {
  if (req.body.username == myusername && req.body.password == mypassword) {
    session = req.session;
    session.userid = req.body.username;
    console.log(req.session);
    res.send(`Hello, welcome back! <a href=\'/logout'>click to logout</a>`);
  } else {
    res.send("Invalid username or password");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.get("/ping", (req, res) => {
  res.send({ message: "server is ready" });
});
app.listen(port, () => {
  console.log("server is listening on port", port);
});