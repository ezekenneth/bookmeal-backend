const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const databaseconnection = require('./config/databasebconnect');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const routeauth = require('./routes/routeauth');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const cookiePaser = require('cookie-parser')
databaseconnection();


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : false}));
app.use(cookiePaser());

app.use('/api/user', routeauth);


app.use(notFound);
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log("app listening to port " + PORT)
});