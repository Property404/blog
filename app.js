const express = require("express");
const mysql = require("mysql");
/* Set up DB stuff */
var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "hunter2",
	database: "Blog"
});
connection.connect();
connection.query("CREATE TABLE IF NOT EXISTS Article (\
id int NOT NULL AUTO_INCREMENT,\
timestamp timestamp NOT NULL,\
title varchar(128),\
body varchar(4096),\
PRIMARY KEY(id));");

//bah abah bah
/* Set up app */
var app = express();
//~Set embedded JS view engine 
app.set("view engine", "ejs");
app.set("views", "./views");
// Static Pages
app.use("/static", express.static("./public"));

// Dynamic Pages 
app.get("/", function(req, res) {
	/* Get articles */
	connection.query("SELECT title, body FROM Article;", function(err, results){
		console.log(err);
		console.log(results);
		/* Render */
		res.render("index", {"articles": results});
	});
});

// Serve 
app.listen(8080, function() {
	console.log("Blog server running...");
});
