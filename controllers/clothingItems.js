const ClothingItem = require("../models/clothingItems");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageURL } = req.body;

  ClothingItem.create({
    name: name,
    weather: weather,
    imageURL: imageURL,
  }).then((item) => {
    console.log(item);
    res.send({ data: item }).catch((e) => {
      res.status(500).send({ message: "Error from createItem", e });
    });
  });
};

module.exports = {
  createItem,
};
