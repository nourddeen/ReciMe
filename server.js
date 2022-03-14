// food app info!!

require('dotenv').config()
console.log(process.env.MONGO_URI)
const express = require('express');
const mongoose = require("mongoose");
const methodOverride = require('method-override')
const session = require('express-session');
const User = require('./models/users');
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();


const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'mySessions'
});

require('./db-units/connect')

const recipeController = require('./controllers/recipeController')
//const usersController = require('./controllers/usersController')
app.use(express.static("public"))
app.use(methodOverride('_method'))
app.use(require('./middleware/logger'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
}))

// Connect to Mongo



// routes are on recipeController.js
//index route
//new route 
//create route
//show route
//edit route
//Update route
//delete route


app.use('/recipes', recipeController)
//app.use('/users', usersController)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('app is running')
})