const express = require('express');
const app = express();
const mongoose = require('mongoose');
const databaseconnection = require('./config/databasebconnect');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const routeauth = require('./routes/routeauth');
databaseconnection()



app.get('/api', (req , res) =>{
   res.send('hello my people')
 });

 app.use("./api/User" , routeauth);

app.listen(PORT, ()=>{
    console.log("app listening to port " + PORT)
});