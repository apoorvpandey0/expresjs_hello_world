console.log("Hello from server.js!");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    console.log("iNSIDE GET REQUEST");

    // Send error codes with msg for html display
    // res.sendStatus(500).send("Hello World! This is an error");

    // Send error codes with JSON msg for html display
    res.sendStatus(500).json({ 'error': 'Hello World! This is an error' });

    res.send("Hello from server.js!");

    // will have has no effect since one send is already done
    // res.send("Hello from server.js! 2");
})


app.listen(3000)