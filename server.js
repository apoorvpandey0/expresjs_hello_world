console.log("Hello from server.js!");

const express = require("express");

const app = express();


// Initializing static files and folders
// Like HTML,CSS etc
app.use(express.static('public'))

// By default express does not allows us to access form data
// we need to enable this middleware to access the data in our fns
app.use(express.urlencoded({ extended: true }));

// Like Django templating engine we have ejs here
// Setting templating engine for app
app.set("view engine", "ejs");


/* 
Registering our middleware logger
Registering this later(After '/' GET) will not work so register here!
This will add the logger middleware to each and every endpoint that we create in this app
*/
app.use(logger)

/*
If we want to use a middle ware with a specific endpoint then use it like this
We can pass as many middlewares as we wish like this ,m2,m3 ...
app.get("/", logger, (req, res) => {
    res.render("index", {
        text: "Welcome to my website"
    });
})

*/

app.get("/", (req, res) => {
    console.log("iNSIDE GET REQUEST");

    // Send error codes with msg for html display
    // res.sendStatus(500).send("Hello World! This is an error");

    // Send error codes with JSON msg for html display
    // res.sendStatus(500).json({ 'error': 'Hello World! This is an error' });

    // res.send("Hello from server.js!");

    // will have has no effect since one send is already done
    // res.send("Hello from server.js! 2");

    res.render("index", { 'text': 'World' });
})


// Registering router
const userRouter = require('./routes/users')
app.use('/users', userRouter)

// This function is a middleware and will run before every request processed
function logger(req, res, next) {
    // This will simply print the request path in the console.
    console.log(`${req.method} ${req.path}`);
    next();
}

app.listen(3000)