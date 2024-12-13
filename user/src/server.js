const mongoose = require("mongoose");
const { app } = require("./app");
const connectDB = require('./config/db');

const start = async () => {
  try {
    const { PORT } = process.env;

    if (!PORT) {
      throw new Error("Environment variables PORT not set");
    }

    // Connect to MongoDB
    connectDB();

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
