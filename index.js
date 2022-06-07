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
    let title = req.body.title
    let isbn = req.body.isbn
    let insertedId = database.addBook(title, isbn);
    res.redirect('/')
})

//rendering update page
app.get('/update/:book_id', function(req,res){
    let bookData = database.getBook(req.params.book_id)
    let title = bookData.title
    let isbn= bookData.isbn
    let payload = {
        'title' : title,
        'isbn' : isbn
    }
    res.render('update-book', payload)
})

//updating database with data from user input form
app.post('/update/:book_id', function(req,res){
    let updateData = req.body
    let title = updateData.title
    let isbn = updateData.isbn
    let bookId = req.params.book_id
    payload = {
        'title' : title,
        'isbn' : isbn,
    }
    database.updateBook(bookId, title, isbn)
    res.redirect('/')
})

// sample of bookData {"id":123074,"title":"Lord of the Flies","isbn":"82tu47t9ureioute"}

//delete
app.get('/delete/:book_id', function(req,res){
    let bookId = req.params.book_id;
    let bookData = database.getBook(bookId)
    let title = bookData.title
    let isbn = bookData.isbn
    payload = {
        'title' : title,
        'isbn' : isbn
    }
    res.render('delete-book', payload)
})

app.post('/delete/:book_id', function(req,res){
    let bookId = req.params.book_id;
    database.deleteBook(bookId);
    res.redirect('/')
})

app.listen(3000, function(){
    console.log("Server has started");
})