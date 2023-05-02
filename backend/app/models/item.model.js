const mongoose = require("mongoose");
const SchemaTypes = mongoose.Schema.Types;
function getFloat(value) {
  if (typeof value !== "undefined") {
    return parseFloat(value.toString());
  }
  return value;
}
const Item = mongoose.model(
  "Item",
  new mongoose.Schema(
    {
      name: SchemaTypes.String,
      tax: {
        type: SchemaTypes.Decimal128,
        get: getFloat,
        required: false,
        default: 0,
      },
      price: {
        type: SchemaTypes.Decimal128,
        get: getFloat,
        required: true,
      },
      total: {
        type: Number,
        default: function () {
          return this.price * this.tax + this.price;
        },
      },
    },
    { toJSON: { getters: true }, toObject: { getters: true } }
  )
);

module.exports = Item;
