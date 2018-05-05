const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
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


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


app.get("api/user", authCheck, function(req,res){
	db.User.findOne({_id: req.user_id})
	.then(user => res.json(user))
	.catch(err => res.json(err));
});

app.post("api/user", authCheck, function(req,res){
  let user = req.body;
	db.User.create({_id: user.id, name: user.name})
	.then(user => res.json(user))
	.catch(err => res.json(err));
});

app.get("api/arenas/", authCheck, function(req,res){
	db.Arena.find({})
	.then(arenas => res.json(arenas))
	.catch(err => res.json(err));
});

app.get("api/characters/:faction", authCheck, function(req,res){
	db.Unit.find({faction: req.params.faction})
	.then(units => res.json(units))
	.catch(err => res.json(err));
});

app.post("api/save", authCheck, function(req,res){
	db.Save.create(req.body)
	.then(save => {
		return db.User.findOneAndUpdate({_id: req.id},{$push: {saves: save._id}})
	})
	.then(user => res.json(user))
	.catch(err => res.json(err));
});

app.delete("api/save", authCheck, function(req,res){
	db.Save.remove({_id: req.saveId})
	.then(() => res.send("success"))
	.catch(err => res.json(err));
});

app.get("/api/load", authCheck, function(req,res){
	db.User.findOne({_id: req.id})
	.populate("saves")
	.then(user => res.json(user))
	.catch(err => res.json(err));
});

app.get("*",  function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
