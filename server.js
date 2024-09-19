import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

import userRoutes from './routes/user.js';
import adminRoutes from './routes/admin.js';
import authRoutes from './routes/auth.js';
import ErrorHandler from './middlewares/error.js';
import Logger from './middlewares/log.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(Logger.logRequest);
// Routes
app.use(`${process.env.Endpoint}/auth`, authRoutes);
app.use(`${process.env.Endpoint}/user`, userRoutes);
app.use(`${process.env.Endpoint}/admin`, adminRoutes);

// Error handler
app.use(ErrorHandler);

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "Xarme",
})
  .then(() => console.log("Database Connection is ready..."))
  .catch(err => console.error(err));

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App is Listening http://localhost:${PORT}${process.env.Endpoint}`);
});
