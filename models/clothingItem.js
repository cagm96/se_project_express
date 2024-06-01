const mongoose = require("mongoose");
const validator = require("validator");
const { user } = require("./user");
const { Schema } = mongoose;

const clothingItem = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  weather: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Link is not",
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Author", // assuming 'Author' is the name of the model you're referencing
    required: true,
  },
  likes: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }], // referencing the 'User' model
    default: [], // default to an empty array
  },
  createdAt: {
    type: Date,
    default: Date.now, // setting default value to the current date
  },
});

module.exports = mongoose.model("clothingItems", clothingItem);
