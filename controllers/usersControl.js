//start line
const express = require('express');
const app = express();
const users = require('./models/users.js');

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//index route
app.get(`/recime`, (req, res) => {
    res.send("routes online");
    res.render(`index.ejs`, {
        users: users
    });
});

//new route
app.get('/recime/new', (req, res) => {
    res.render('new.ejs');
});

//show route
app.get(`/recime/:index`, (req, res) => {
    res.render(`show.ejs`, {
        users: users[req.params.index]
    });
});

//create route
app.post('/recime', (req, res) => {
    users.push(req.body);
    res.redirect('/recime');
});

//edit route
app.get('/recime/:id/edit', (req, res) => {
    res.render('edit.ejs', {
        users: users[req.params.id],
        index: req.params.id
    });
});

//update route
app.put('/recime/:id', (req, res) => {
    users[req.params.id] = req.body
    res.redirect(`/recime/${req.params.id}`)
});

//delete route
app.delete('/recime/:id', async (req, res) => {
    users.splice(req.params.id, 1)
    res.redirect('/recime')
});
//end line