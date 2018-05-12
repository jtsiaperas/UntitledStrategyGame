var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ArenaSchema = new Schema({
  // name is required and of type String
  name: {
    type: String,
    required: true
  },

  description:{
    type: String,
    required: true
  },

  rows:{
    type: Number,
    required: true
  },

  cols:{
    type: Number,
    required: true
  },

  points:{
    type: Number,
    required: true
  },
  
  tiles: {
    type: Array,
    default: []
  }

});

// This creates our model from the above schema, using mongoose's model method
var Arena = mongoose.model("Arena", ArenaSchema);

// Export the Arena model
module.exports = Arena;
