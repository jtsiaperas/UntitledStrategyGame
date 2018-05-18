var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var SaveSchema = new Schema({
  // `title` is required and of type String
  time: {
    type: Date,
    required: true
  },
  clicked:{
  	type: Boolean
  },
  active: {
    type: {}
  },
  tiles: {
    type: Array
  },
  player1Army: {
    type: Array
  },
  player2Army: {
    type: Array
  },
  charactersPlaced: {
  	type: Boolean
  }
});

// This creates our model from the above schema, using mongoose's model method
var Save = mongoose.model("Save", SaveSchema);

// Export the Save model
module.exports = Save;
