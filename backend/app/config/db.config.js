module.exports = {
  DB_URL: process.env.MONGODB_URI,
  ORIGIN_URL:
    process.env.ORIGIN_URI ??
    "https://licify-invoices-test-production.up.railway.app/api",
  APP_PORT: process.env.APP_PORT ?? 3000,
};
