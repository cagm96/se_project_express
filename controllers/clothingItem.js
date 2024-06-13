const ClothingItem = require("../models/clothingItem");

const { invalidData400, defaultError500 } = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: req.user._id,
  })
    .then((item) => {
      // console.log("clothing item: ", item);
      res.send({ data: item });
    })
    .catch((err) => {
      console.error("createItem error: ", err.name);
      if (err.name === "ValidationError") {
        return res.status(invalidData400).send({ message: "Invalid data" });
      }

      return res
        .status(defaultError500)
        .send({ message: "An error has occurred on the server." });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error("getItems error name: ", err.name);
      res
        .status(defaultError500)
        .send({ message: "An error has occurred on the server." });
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
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      console.error("deleteItem error name: ", err.name);
      const statusCode = err.statusCode || 500;

      if (err.name === "CastError") {
        return res
          .status(invalidData400)
          .send({ message: "Error from deleteItem" });
      }
      return res
        .status(statusCode)
        .send({ message: "An error has occurred on the server." });
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = 404;
      throw error;
    })
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      console.log("Error from likeItem: ", err.name);
      const statusCode = err.statusCode || 500;

      if (err.name === "CastError") {
        return res
          .status(invalidData400)
          .send({ message: "Error form likeItem " });
      }
      return res
        .status(statusCode)
        .send({ message: "An error has occurred on the server." });
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
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      console.error("dislikeItem error name: ", err.name);
      const statusCode = err.statusCode || 500;

      if (err.name === "CastError") {
        return res
          .status(invalidData400)
          .send({ message: "Error from dislikeItem" });
      }
      return res
        .status(statusCode)
        .send({ message: "An error has occurred on the server." });
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
