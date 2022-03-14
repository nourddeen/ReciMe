// food app info!!

const express = require('express');
const app = express();
const session = require('express-session');
const User = require('./models/users');
const MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config()
const methodOverride = require('method-override')
const mongoose = require("mongoose");
const MONGO_URI = 'mongodb://localhost:27017/' + 'recipes';
const db = mongoose.connection;


const recipeController = require('./controllers/recipeController')
//const usersController = require('./controllers/usersController')
app.use(express.static("public"))
app.use(methodOverride('_method'))
app.use(require('./middleware/logger'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Connect to Mongo
mongoose.connect(MONGO_URI);

// Connection Error/Success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGO_URI));
db.on('disconnected', () => console.log('mongo disconnected'));


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