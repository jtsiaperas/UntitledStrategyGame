var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new CharacterSchema object
// This is similar to a Sequelize model
var CharacterSchema = new Schema({
  name: {
  	type:String,
  	required: true
  },
  faction: {
  	type:String,
  	required: true
  },
  description: {
  	type:String,
  	required: true
  },
  strength: {
  	type:Number,
  	required: true
  },
  skill: {
  	type:Number,
  	required: true
  },
  health: {
  	type:Number,
  	required: true
  },
  rangeMin: {
  	type:Number,
  	required: true
  },
  rangeMax: {
  	type:Number,
  	required: true
  },
  attackType: {
  	type:String,
  	required: true
  },
  pointValue: {
  	type: Number,
  	required: true
  },
  image: {
  	type: Number,
  	required: true
  }
  
});

// This creates our model from the above schema, using mongoose's model method
var Character = mongoose.model("Character", CharacterSchema);

// Export the Character model
module.exports = Character;
