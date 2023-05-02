const db = require("../models");
const Invoice = db.invoice;

const taxTotal = (items) => {
  if (!items.length) return 0.0;
  const sumTax = items.reduce((acc, cur) => acc + cur.tax, 0).toFixed(2);
  return parseFloat(sumTax).toFixed(2);
};
const priceTotal = (items) => {
  if (!items.length) return 0;
  const sumPrice = items.reduce((acc, cur) => acc + cur.total, 0);
  return parseFloat(sumPrice).toFixed(2);
};

const setRequestInvoices = (invoices) => {
  return invoices.map((invoice) => {
    return {
      taxTotal: taxTotal(invoice.items),
      priceTotal: priceTotal(invoice.items),
      ...invoice._doc,
    };
  });
};
// Create and Save a new Invoice
exports.create = (req, res) => {
  /*  
    #swagger.tags = ['Invoice']
    #swagger.autoBody=true  
    #swagger.autoQuery=true  
    #swagger.autoHeaders=true  
  */
  // Validate request
  const { body } = req;
  try {
    const InvoiceSchemas = require("../validators/invoice-schema");
    const data = InvoiceSchemas.validateSync(body, {
      abortEarly: false,
      stripUnknown: true,
    });

    // Create a Invoice
    const invoice = new Invoice({
      isPaid: data.isPaid,
      items: data.items,
    });
    // Save Invoice in the database
    invoice.save((error, _invoice) => {
      if (error) {
        res.status(500).send({
          message:
            error.message || "Some error occurred while creating the Invoice.",
        });
        return;
      }
      res.send(_invoice);
    });
  } catch (error) {
    return res.status(422).json({ errors: error.errors });
  }
};

// Retrieve all Invoices from the database.
exports.findAll = (req, res) => {
  /*  
    #swagger.tags = ['Invoice']
    #swagger.autoBody=true  
    #swagger.autoQuery=true  
    #swagger.autoHeaders=true  
  */
  const ref = req.query.ref;
  var condition = ref
    ? { references: { $regex: new RegExp(ref), $options: "i" } }
    : {};

  Invoice.find(condition)
    .then((data) => {
      const invoicesList = setRequestInvoices(data);
      res.send(invoicesList);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Invoices.",
      });
    });
};

// Find a single Invoice with an id
exports.findOne = (req, res) => {
  /*  
    #swagger.tags = ['Invoice']
    #swagger.autoBody=true  
    #swagger.autoQuery=true  
    #swagger.autoHeaders=true  
  */
  const id = req.params.id;
  Invoice.findById(id)
    .then((invoice) => {
      if (!invoice)
        res.status(404).send({ message: "Not found Invoice with id " + id });
      else
        res.send({
          taxTotal: taxTotal(invoice.items),
          priceTotal: priceTotal(invoice.items),
          ...invoice._doc,
        });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Invoice with id=" + id });
    });
};

// Update a Invoice by the id in the request
exports.update = (req, res) => {
  /*  
    #swagger.tags = ['Invoice']
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

  Invoice.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Invoice with id=${id}. Maybe Invoice was not found!`,
        });
      } else res.send({ message: "Invoice was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Invoice with id=" + id,
      });
    });
};

// Delete a Invoice with the specified id in the request
exports.delete = (req, res) => {
  /*  
    #swagger.tags = ['Invoice']
    #swagger.autoBody=true  
    #swagger.autoQuery=true  
    #swagger.autoHeaders=true  
  */
  const id = req.params.id;
  Invoice.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Invoices were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Invoices.",
      });
    });
};
