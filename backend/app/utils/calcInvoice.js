exports.taxTotal = (items) => {
  if (!items.length) return 0.0;
  const sumTax = items.reduce((acc, cur) => acc + cur.tax, 0).toFixed(2);
  return parseFloat(sumTax).toFixed(2);
};
exports.priceTotal = (items) => {
  if (!items.length) return 0;
  const sumPrice = items.reduce((acc, cur) => acc + cur.total, 0);
  return parseFloat(sumPrice).toFixed(2);
};

exports.setRequestInvoices = (invoices) => {
  return invoices.map((invoice) => {
    return {
      taxTotal: taxTotal(invoice.items),
      priceTotal: priceTotal(invoice.items),
      ...invoice._doc,
    };
  });
};
