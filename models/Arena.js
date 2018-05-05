var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ArenaSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true
  },

  description:{
    type: String,
    required: true
  },

  size:{
    type: String,
    required: true
  },

  tiles: {[
    type: Schema.Types.ObjectId,
    ref: "Tile"
  ]}

});

// This creates our model from the above schema, using mongoose's model method
var Arena = mongoose.model("Arena", ArenaSchema);

// Export the Arena model
module.exports = Arena;
