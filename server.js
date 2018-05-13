const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const arenas = require('./arenas.js');
const characters = require('./characters.js');
require('dotenv').config();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        // YOUR-AUTH0-DOMAIN name e.g prosper.auth0.com
        jwksUri: `https://${process.env.AUTHO_DOMAIN}/.well-known/jwks.json`
    }),
    // This is the identifier we set when we created the API
    audience: '',
    issuer: `${process.env.AUTHO_DOMAIN}`,
    algorithms: ['RS256']
});


// Require all models
const db = require("./models");

//set mongoDB for local or heroku
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/strategyGame";



// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


app.get("api/user", /*authCheck,*/ function(req,res){
	db.User.findOne({_id: req.user_id})
	.then(user => res.json(user))
	.catch(err => res.json(err));
});

app.post("api/user", /*authCheck,*/ function(req,res){
  	let user = req.body;
	db.User.create({_id: user.id, name: user.name})
	.then(user => res.json(user))
	.catch(err => res.json(err));
});

app.get("api/arenas", /*authCheck,*/ function(req,res){
	db.Arena.find({})
	.then(arenas => res.json(arenas))
	.catch(err => res.json(err));
});

app.get("api/characters/:faction", /*authCheck,*/ function(req,res){
	db.Character.find({faction: req.params.faction})
	.then(units => res.json(units))
	.catch(err => res.json(err));
});

app.post("api/save", /*authCheck,*/ function(req,res){
	db.Save.create(req.body)
	.then(save => {
		return db.User.findOneAndUpdate({_id: req.id},{$push: {saves: save._id}})
	})
	.then(user => res.json(user))
	.catch(err => res.json(err));
});

app.delete("api/save/:id", /*authCheck,*/ function(req,res){
	db.Save.remove({_id: req.params.id})
	.then(() => res.send("success"))
	.catch(err => res.json(err));
});

app.get("/api/load/:id", /*authCheck,*/ function(req,res){
	db.User.findOne({_id: req.params.id})
	.populate("saves")
	.then(user => res.json(user))
	.catch(err => res.json(err));
});

mongoose.connect(MONGODB_URI).then(
() => {
	db.Arena.remove({},err=>console.log(err));
	db.Character.remove({},err=>console.log(err));
	db.Arena.insertMany(arenas).catch(err=> console.log(err));
	db.Character.insertMany(characters).catch(err=>console.log(err));
	app.listen(PORT, function() {
	
  	console.log(`🌎 ==> Server now on port ${PORT}!`);
	});
	}
).catch(err => console.log(err));

