var PORT = process.env.PORT || 5000;
var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');
var flash = require('connect-flash');

var config = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'crud_database'
});

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(session({
	secret: 'secret',
	cookie: { maxAge : 60000},
	resave: false,
	saveUninitialized: false
}));

app.use(flash());

app.set('view engine', 'ejs');

app.get('/', function(req,res) {
	res.render('movie', { message : req.flash('message')});
});

app.post('/movies', function(req,res) {
	var users = {
		"moviename" : req.body.moviename,
		"moviereview" : req.body.review
	}

	config.query('insert into movie SET ?',users, function(err,result,fields){
		if (err){
			res.send("<div align='center'><h2>Some error occured</h2><div><br><br><div align='center'><a href='/'>Try again</a><div>");
		}
		else{
			req.flash('message', 'Inserted successfully...!');
			res.redirect('/');
		}
	});

});

app.listen(PORT, function() {
	console.log("Server is running on port 5000");
});
