module.exports = {
  DB_URL:
    process.env.MONGODB_URI ??
    "mongodb://mongo:41tUDGCyeRaOQHxBlJvp@containers-us-west-113.railway.app:7822/test",
  ORIGIN_URL:
    process.env.ORIGIN_URI ?? "https://licify-invoices-test.vercel.app",
  APP_PORT: process.env.APP_PORT ?? 3000,
};
