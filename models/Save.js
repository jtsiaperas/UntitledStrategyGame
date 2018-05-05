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

  title: {
    type: String,
    required: true
  },
  
  active: {
    type: Schema.Types.ObjectId,
    ref: "Character"
  },

  points: {
    type: Number,
    required: true
  },

  arena: {
    type: Schema.Types.ObjectId,
    ref: "Arena"
  },
  // `characters` is an array of objects containing a character id
  // The ref property links the ObjectId to the Character model
  // This allows us to populate the array with associated characters
  characters: [{
    type: Schema.Types.ObjectId,
    ref: "Character"
  }]
});

// This creates our model from the above schema, using mongoose's model method
var Save = mongoose.model("Save", SaveSchema);

// Export the Save model
module.exports = Save;
