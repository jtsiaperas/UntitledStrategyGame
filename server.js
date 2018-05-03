const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
require('dotenv').config();

// Configure Passport to use Auth0
const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/callback'
  },
  (accessToken, refreshToken, extraParams, profile, done) => {
    return done(null, profile);
  }
);

passport.use(strategy);

// This can be used to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// ...
app.use(passport.initialize());
app.use(passport.session());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get(
  '/login',
  passport.authenticate('auth0', {
    clientID: env.AUTH0_CLIENT_ID,
    domain: env.AUTH0_DOMAIN,
    redirectUri: env.AUTH0_CALLBACK_URL,
    audience: 'https://' + env.AUTH0_DOMAIN + '/userinfo',
    responseType: 'code',
    scope: 'openid'
  }),
  function(req, res) {
    res.redirect('/');
  }
);

// Perform session logout and redirect to homepage
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Perform the final stage of authentication and redirect to '/user'
app.get(
  '/callback',
  passport.authenticate('auth0', {
    failureRedirect: '/'
  }),
  function(req, res) {
    res.redirect(req.session.returnTo || 'api/user');
  }
);

// Send every request to the React app
// Define any API routes before this runs

app.get("api/user",ensureloggedin, function(req,res){
	db.User.findOne({_id: req.user})
	.then(user => res.json(user))
	.catch(err => res.json(err));
});

app.post("api/user",ensureloggedin, function(req,res){
	db.User.create({req.body})
	.then(user => res.json(user))
	.catch(err => res.json(err));
});

app.get("api/maps/",ensureloggedin, function(req,res){
	db.Map.find({})
	.then(maps => res.json(maps))
	.catch(err => res.json(err));
});

app.get("api/characters/:faction",ensureloggedin, function(req,res){
	db.Unit.find({faction: req.params.faction})
	.then(units => res.json(units))
	.catch(err => res.json(err));
});

app.post("api/save",ensureloggedin, function(req,res){
	db.Save.create({req.body})
	.then(save => {
		return db.User.findOneAndUpdate({_id: req.id},{$push: {saves: save._id}})
	})
	.then(user => res.json(user))
	.catch(err => res.json(err));
});

app.delete("api/save",ensureloggedin, function(req,res){
	db.Save.remove({_id: req.saveId})
	.then(() => res.send("success"))
	.catch(err => res.json(err));
});

app.get("/api/load",ensureloggedin, function(req,res){
	db.User.findOne({_id: req.id})
	.populate("saves")
	.then(user => res.json(user))
	.catch(err => res.json(err));
});

app.get("*", ensureloggedin, function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
