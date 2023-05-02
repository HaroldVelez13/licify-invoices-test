const mongoose = require("mongoose");
const crypto = require("crypto");
const SchemaTypes = mongoose.Schema.Types;
const Invoice = mongoose.model(
  "Invoice",
  new mongoose.Schema(
    {
      isPaid: SchemaTypes.Boolean,
      items: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
          autopopulate: true,
        },
      ],
      references: {
        type: SchemaTypes.String,
        required: true,
        default: () => crypto.randomBytes(10).toString("hex"),
      },
    },
    {
      timestamps: true,
    }
  ).plugin(require("mongoose-autopopulate"))
);

module.exports = Invoice;
