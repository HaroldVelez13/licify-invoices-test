module.exports = {
  DB_URL: process.env.MONGODB_URI,
  ORIGIN_URL: process.env.ORIGIN_URI ?? "http://localhost:8081",
  APP_PORT: process.env.APP_PORT ?? 8080,
};
