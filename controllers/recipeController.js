const Recipe = require("../models/recipe");
const express = require('express');
const router = express.Router();


// INDEX: GET
// /recipes
// Gives a page displaying all the recipes
router.get('/', async (req, res) => {
    const recipes = await Recipe.find();
    res.render('index.ejs', {
        recipes: recipes
    })
})

// NEW: GET
// /recipes/new
// Shows a form to create a new recipe
router.get('/new', (req, res) => {
    res.render('recipes/new.ejs')
});

// SHOW: GET
// /recipes/:id
// Shows a page displaying one recipe
router.get('/:id', async (req, res) => {
    const recipes = await Recipe.findById(req.params.id).populate('user')
    res.render("recipes/show.ejs", {
        recipes: recipes
    })
})

// CREATE: POST
// /recipes
// Creates an actual recipe, then...?
router.post('/', async (req, res) => {
    // req.body.user = req.session.userId
    const newRecipe = await Recipe.create(req.body);
    try {
        console.log(req.body)
        console.log(newRecipe)
        res.redirect('/')
    } catch (err) {
        res.sendStatus(500)
    }
})

// EDIT: GET
// /recipes/:id/edit
// SHOW THE FORM TO EDIT A RECIPE
router.get('/:id/edit', async (req, res) => {
    try {
        const recipes = await Recipe.findById(req.params.id)
        res.render('recipes/edit.ejs', {
            recipes: recipes
        })
    } catch (err) {
        res.sendStatus(500)
    }
})

// UPDATE: PUT
// /recipes/:id
// UPDATE THE RECIPE WITH THE SPECIFIC ID
router.put('/:id', async (req, res) => {
    try {
        await Recipe.findByIdAndUpdate(req.params.id, req.body)
        res.redirect(`/recipes/${req.params.id}`)
    } catch (err) {
        res.sendStatus(500)
    }
})
// DELETE: DELETE
// /recipes/:id
// DELETE THE RECIPE WITH THE SPECIFIC ID
router.delete('/:id', async (req, res) => {
    try {
        await Recipe.findByIdAndDelete(req.params.id)
        res.redirect('/recipes')
    } catch (err) {
        res.sendStatus(500)
    }
})

module.exports = router;