const yup = require("yup");
const itemsSchema = require("./item-schema.js");

const invoiceSchema = yup.object({
  isPaid: yup.boolean(),
  items: yup.array(yup.string()),
});

module.exports = invoiceSchema;
