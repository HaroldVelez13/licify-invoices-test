const mongoose = require("mongoose");
const SchemaTypes = mongoose.Schema.Types;
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: SchemaTypes.String,
    password: SchemaTypes.String,
    roles: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Role",
      },
    ],
  })
);

module.exports = User;
