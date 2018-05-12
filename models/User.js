var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var UserSchema = new Schema({
  // `title` is required and of type String
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true
  },

  name: {
    type: String,
    required: true,
    unique: true
  },

  saves:{[
    type: Schema.Types.ObjectId,
    ref: "Save"
  ]}

});

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = User;
