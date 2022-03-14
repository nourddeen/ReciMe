//start line
const express = require('express');
const exp = express();
const users = require('../models/users');

exp.use(express.json())
exp.use(express.urlencoded({extended: true}))

//test route
// exp.get(`/`, (req, res) => {
//     res.send(`routes are online!`)
// });

//index route
exp.get(`/users`, (req, res) => {
    res.render(`./users/index.ejs`, {
        users: users
    });
});

//new route
exp.get('/users/new', (req, res) => {
    res.render('./users/new.ejs');
});

//show route
exp.get(`/users/:id`, (req, res) => {
    res.render(`./users/show.ejs`, {
        users: users[req.params.id]
    });
});

//create route
exp.post('/users', (req, res) => {
    users.push(req.body);
    res.redirect('/users');
});

//edit route
exp.get('/users/:id/edit', (req, res) => {
    res.render('edit.ejs', {
        users: users[req.params.id],
        index: req.params.id
    });
});

//update route
exp.put('/recipe/:id', (req, res) => {
    users[req.params.id] = req.body
    res.redirect(`//${req.params.id}`)
});

//delete route
exp.delete('/users/:id', async (req, res) => {
    users.splice(req.params.id, 1)
    res.redirect('/users')
});
//end line