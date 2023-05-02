const mongoose = require("mongoose");
const SchemaTypes = mongoose.Schema.Types;
const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    name: SchemaTypes.String,
  })
);

module.exports = Role;
