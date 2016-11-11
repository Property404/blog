const express = require("express");
const mysql = require("mysql");
/* Set up DB stuff */
var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "hunter2"
});
connection.connect();
connection.query("CREATE DATABASE IF NOT EXISTS Blog;");
connection.connect(

/* Set up app */
var app = express();
//Set embedded JS view engine 
app.set("view engine", "ejs");
app.set("views", "./views");
// Static Pages
app.use("/static", express.static("./public"));

// Dynamic Pages 
app.get("/", function(req, res) {
	res.render("index", {});
});

// Serve 
app.listen(8080, function() {
	console.log("Blog server running...");
});
