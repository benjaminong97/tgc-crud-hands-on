const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');
const database = require('./data');

const app = express();

app.set('view engine', 'hbs');

wax.on(hbs.handlebars);
wax.setLayoutPath('views/layouts');

//enable forms
app.use(express.urlencoded({extended:false}))

app.get('/', function(req,res){
    res.render('all-books', {'books': database.getAll()})
})

app.get('/create', function(req,res){
    res.render('create-book')
})

app.post('/create', function(req,res){
    console.log(req.body)
    let title = req.body.title
    let isbn = req.body.isbn
    let insertedId = database.addBook(title, isbn);
    res.redirect('/')
})

app.listen(3000, function(){
    console.log("Server has started");
})