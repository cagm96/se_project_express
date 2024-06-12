const mongoose = require("mongoose");
const validator = require("validator");

const { Schema } = mongoose;

const clothingItem = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [30, "Name bust be no more than 30 characters long"],
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
    ref: "user",
    required: true,
  },
  likes: {
    type: [{ type: Schema.Types.ObjectId, ref: "user" }], // referencing the 'User' model
    default: [], // default to an empty array
  },
  createdAt: {
    type: Date,
    default: Date.now, // setting default value to the current date
  },
});

module.exports = mongoose.model("clothingItems", clothingItem);
