const ClothingItem = require("../models/clothingItem");
const { findByIdAndUpdate } = require("../models/user");
const {
  invalid_data_400,
  item_notFound_404,
  default_error_500,
} = require("../utils/errors");

const createItem = (req, res) => {
  console.log("user: ", req.user);
  console.log("The req body: ", req.body);

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({
    name: name,
    weather: weather,
    imageUrl: imageUrl,
    owner: req.user._id,
  })
    .then((item) => {
      console.log("clothing item: ", item);
      res.send({ data: item });
    })
    .catch((err) => {
      console.log(err);

      res
        .status(default_error_500)
        .send({ message: "Error from createItem", err });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = 404;
      throw error;
    })
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      res.status(500).send({ message: "Error from getItems", e });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = 404;
      throw error;
    })
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      res
        .status(default_error_500)
        .send({ message: "Error from updateItems", e });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  console.log("clothing item id: ", itemId);
  ClothingItem.findByIdAndDelete(itemId)
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = 404;
      throw error;
    })
    .then(() => res.status(204).send())
    .catch((e) => {
      const statusCode = e.statusCode || 500;
      res
        .status(statusCode)
        .send({ message: e.message || "Error from deleteItem" });
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    {
      $addToSet: { likes: req.user._id },
    }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = 404;
      throw error;
    })
    .then(() => res.status(204).send({ data: item }))
    .catch((e) => {
      console.log("Error from likeItem: ", e);
      const statusCode = e.statusCode || 500;
      res
        .status(statusCode)
        .send({ message: e.message || "Error from likeItem" });
    });
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = 404;
      throw error;
    })
    .then(() => res.status(204).send())
    .catch((e) => {
      const statusCode = e.statusCode || 500;
      res
        .status(statusCode)
        .send({ message: e.message || "Error from dislikeItem" });
    });
};

// Notice that we are passing the {new: true} option to the method.
// We need to set it to return the document after update was applied.
// If we didn't, the update methods would return a pre-update result
// in the service response, giving the impression that the methods
//  are not working.

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
