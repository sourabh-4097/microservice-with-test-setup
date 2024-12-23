import app from "./app";
import connectDB from './config/db';

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
