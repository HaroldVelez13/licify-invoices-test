const db = require("../models");
const Item = db.item;
const ItemSchemas = require("../validators/item-schema");

// Create and Save a new Item
exports.create = (req, res) => {
  /*  
    #swagger.tags = ['Items']
    #swagger.autoBody=true  
    #swagger.autoQuery=true  
    #swagger.autoHeaders=true  
  */
  // Validate request
  const { body } = req;
  try {
    const data = ItemSchemas.validateSync(body, {
      abortEarly: false,
      stripUnknown: true,
    });
    // Create a Item
    const item = new Item({
      tax: data.tax,
      price: data.price,
      name: data.name,
    });
    // Save Item in the database
    item.save((error, _item) => {
      if (error) {
        res.status(500).send({
          message:
            error.message || "Some error occurred while creating the Item.",
        });
        return;
      }
      res.send(_item);
    });
  } catch (error) {
    console.error("error: ", error);
    return res.status(422).json({ errors: error.errors });
  }
};

// Retrieve all Item from the database.
exports.findAll = (req, res) => {
  /*  
    #swagger.tags = ['Items']
    #swagger.autoBody=true  
    #swagger.autoQuery=true  
    #swagger.autoHeaders=true  
  */
  const name = req.query.name;
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  Item.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Item.",
      });
    });
};

// Find a single Item with an id
exports.findOne = (req, res) => {
  /*  
    #swagger.tags = ['Items']
    #swagger.autoBody=true  
    #swagger.autoQuery=true  
    #swagger.autoHeaders=true  
  */
  const id = req.params.id;
  Item.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Item with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Item with id=" + id });
    });
};

// Update a Item by the id in the request
exports.update = (req, res) => {
  /*  
    #swagger.tags = ['Items']
    #swagger.autoBody=true  
    #swagger.autoQuery=true  
    #swagger.autoHeaders=true  
  */
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Item.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Item with id=${id}. Maybe Item was not found!`,
        });
      } else res.send({ message: "Item was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Item with id=" + id,
      });
    });
};

// Delete a Item with the specified id in the request
exports.delete = (req, res) => {
  /*  
    #swagger.tags = ['Items']
    #swagger.autoBody=true  
    #swagger.autoQuery=true  
    #swagger.autoHeaders=true  
  */
  const id = req.params.id;

  Item.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Item with id=${id}. Maybe Item was not found!`,
        });
      } else {
        res.send({
          message: "Item was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Item with id=" + id,
      });
    });
};
