// food app info!!

require('dotenv').config()
const express = require('express');
const mongoose = require("mongoose");
const User = require('./models/users');
const methodOverride = require('method-override')
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();


const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'mySessions'
});

require('./db-units/connect')

const recipeController = require('./controllers/recipeController')
const usersController = require('./controllers/usersController')
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

app.use(async (req, res, next)=>{
    // This will send info from session to templates
    res.locals.isLoggedIn = req.session.isLoggedIn
    if(req.session.isLoggedIn){
        const currentUser = await User.findById(req.session.userId)
        res.locals.username = currentUser.username
        res.locals.userId = req.session.userId.toString()
    }
    next()
})

app.get('/' , (req,res)=>{
    res.render('home.ejs')
})

app.use('/recipes', recipeController)
app.use('/users', usersController)




const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('app is running')
})


