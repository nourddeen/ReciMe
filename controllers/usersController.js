const User = require("../models/users")
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const isLoggedIn = require('../middleware/isLoggedIn')
// INDEX: GET
// /users
// Gives a page displaying all the users
router.get('/login', (req, res)=>{
    res.render('login.ejs')
})
router.post("/login", async (req, res)=>{
    try{
        // Grab the user from the database with the username from the form
        const possibleUser = await User.findOne({username: req.body.username})
        console.log(possibleUser)
        if(possibleUser){
            // There is a user with this username!
            console.log(possibleUser.password)
            console.log(req.body.password)
            // Compare the password from the form with the database password
            if(bcrypt.compareSync(req.body.password, possibleUser.password)){
                // It's a match! Successful login!
                req.session.isLoggedIn = true;
                req.session.userId = possibleUser._id;
                res.redirect("/recipes")
            }else{
                res.redirect("/users/login")
            }
        }else{
            // Let them try again?
            res.redirect("/users/login")
        }
    }catch(err){
        console.log(err);
        res.send(500)
    }
})
router.get('/logout', (req, res)=>{
    req.session.destroy(()=>{
        res.redirect("/recipes")
    })
})
router.get('/', isLoggedIn,  async (req, res)=>{
    const users = await User.find();
    res.render('users/index.ejs', {
        users: users
    })
})
// NEW: GET
// /users/new
// Shows a form to create a new user
router.get('/new', (req, res)=>{
    res.render('users/new.ejs')
})

// SHOW: GET
// /users/:id
// Shows a page displaying one user
router.get('/:id', async (req, res)=>{
    const user = await User.findById(req.params.id)
    res.render("users/show.ejs", {
        user: user
    })
})

// CREATE: POST
// /users
// Creates an actual user, then...?
router.post('/', async (req, res)=>{
    // req.body.password needs to be HASHED
    console.log(req.body)
    const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    req.body.password = hashedPassword
    const newUser = await User.create(req.body);
    res.redirect('/users')
})

// EDIT: GET
// /users/:id/edit
// SHOW THE FORM TO EDIT A USER
router.get('/:id/edit', async (req, res)=>{
    try{
        if(req.session.userId === req.params.id){
            const user = await User.findById(req.params.id)
            res.render('users/edit.ejs', {
                user: user
            })
        }else{
            throw new Error("You're NOT THAT USER!")
        }
    }catch(err){
        res.sendStatus(500)
    }
})

// UPDATE: PUT
// /users/:id
// UPDATE THE USER WITH THE SPECIFIC ID
router.put('/:id', async (req, res)=>{
   try{
        await User.findByIdAndUpdate(req.params.id, req.body)
        res.redirect(`/users/${req.params.id}`)
   }catch(err){
        res.sendStatus(500)
   }
})
// DELETE: DELETE
// /users/:id
// DELETE THE USER WITH THE SPECIFIC ID
router.delete('/:id', async (req, res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.redirect('/users')
    }catch(err){
        res.sendStatus(500)
    }
})

module.exports = router;