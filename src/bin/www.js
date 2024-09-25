import mongoose from 'mongoose';
import app from '../../server.js';
import config from '../../src/config/index.js';

const hostname = config.HOSTNAME || 'localhost';
const port = config.PORT || 8000;
const connectionUrl = config.NODE_ENV === 'test' ? config.MONGODB_URI : config.MONGODB_URI;

// Logging the connection URL

mongoose.connect(connectionUrl).then(() => {
  console.log('Connected to database successfully');
}).catch((err) => {
  console.error('Database connection error:', err);
});

app.listen(port, () => {
  console.log(`App is Listening on http://${hostname}:${port}`);
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Shutting down server...');
    console.log('Server successfully shutdown');
    process.exit(0);
  });
});
