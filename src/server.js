const express = require('express');
const cors = require('cors');
const colors = require('colors');
const http = require('http');
const userRouter = require("./routes/v1/userRoute")
const hostname = '127.0.0.1';
const port = 5000;
const app = express();


//middleware 
app.use(cors());
app.use(express.json({ limit: "500mb" }));
app.use(express.static("static"))

const server = http.createServer(async (req, res) => {
    console.log('usersData:', usersData);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
    res.status(200).json({ success: true, message: "Successfully run the node-mongoo-advanced server.", data: [{ name: "example name", email: "exampleemail@gmail.com", },], })
});

app.all("*", (req, res) => {
    res.status(404).send("No route found.")
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`.bgBlue);
});