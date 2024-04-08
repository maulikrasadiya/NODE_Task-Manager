const express = require("express");
const server = express();
const bodyparser = require("body-parser");
const path = require('path')
const cookieParser = require("cookie-parser");

server.set('view engine','ejs');
server.use(bodyparser.urlencoded({extended:true}));

const routes = require('./routes/routes');
const db = require('./database/database')


server.use(express.static(path.join(__dirname, '/public')));

server.use(cookieParser());
server.use('/',routes);

db
server.listen('8000' , (req,res) => {
    console.log("Server is Running on port 8000");
})  