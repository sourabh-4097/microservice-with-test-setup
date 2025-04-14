require('dotenv').config();
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';


const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/users', userRoutes);

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.StatusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ message });
});

module.exports = app ;
