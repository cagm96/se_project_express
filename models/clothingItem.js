const mongoose = require("mongoose");
const validator = require("validator");

const clothingItem = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  weather: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Link is not",
    },
  },
  // owner: {
  //   //a link to the item author's model of the ObjectId type,
  //   type: String,
  //   required: true,
  // },
  // likes: {
  //   // a list of users who liked the item,
  //   //an ObjectId array with a reference to the user modal (empty by default)
  // },
  // createdAt: {
  //   //the item creation date,
  //   //a field with the Date type and the default value Date.now
  // },
});

module.exports = mongoose.model("clothingItems", clothingItem);
