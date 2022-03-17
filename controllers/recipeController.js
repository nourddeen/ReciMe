const Recipe = require("../models/recipe");
const express = require('express');
const router = express.Router();
const cloudinary = require("cloudinary");
const multer = require("multer");
const upload = multer({ dest: "./uploads/" });

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });

// INDEX: GET
// /recipes
// Gives a page displaying all the recipes
router.get('/', async (req, res) => {
    const recipes = await Recipe.find();
    res.render('recipes/index.ejs', {
        recipes: recipes,
        username: res.locals.username
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
    const recipes = await Recipe.findById(req.params.id)
    res.render("recipes/show.ejs", {
        recipe: recipes
    })
})

// CREATE: POST
// /recipes
// Creates an actual recipe, then...?
router.post("/", upload.single("image"), (req, res) => {
    cloudinary.uploader.upload(req.file.path, (res) => {
    console.log("this is the img res\n", res.url);
    })
    .then((imgObj) => {
      console.log("this is the imgObj url", imgObj.url);
      Recipe.create({
        name: req.body.name,
        meat: req.body.meat,
        vegetables: req.body.vegetables,
        spices: req.body.spices,
        isVegan: req.body.isVegan,
        image: imgObj.url,
      })
      .then((createdRecipe) => {
        console.log("this is the created recipe\n", createdRecipe);
        res.redirect("/recipes");
      });
    })
    .catch(err => {
        console.log(err)
    })
});

// EDIT: GET
// /recipes/:id/edit
// SHOW THE FORM TO EDIT A RECIPE
router.get('/:id/edit', async (req, res) => {
    try {
        const recipes = await Recipe.findById(req.params.id)
        res.render('recipes/edit.ejs', {
            recipe: recipes
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