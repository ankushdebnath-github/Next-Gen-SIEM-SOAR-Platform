'use strict';

const mongoose = require('mongoose');

/**
 * Establishes a connection to MongoDB using Mongoose.
 * Handles retries and logs connection lifecycle events.
 */
async function connectDatabase() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/siem_soar';

  // Mongoose 7+ no longer needs useNewUrlParser / useUnifiedTopology
  const options = {
    serverSelectionTimeoutMS: 5000,   // fail fast on startup if Mongo is unreachable
    socketTimeoutMS: 45000,           // close idle sockets after 45 s
  };

  mongoose.connection.on('connected', () => {
    console.log(`[DB] MongoDB connected → ${mongoose.connection.host}/${mongoose.connection.name}`);
  });

  mongoose.connection.on('error', (err) => {
    console.error('[DB] Connection error:', err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('[DB] MongoDB disconnected. Attempting to reconnect…');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('[DB] MongoDB reconnected.');
  });

  // Gracefully close the connection when the process is terminated
  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('[DB] Connection closed on SIGINT.');
    process.exit(0);
  });

  await mongoose.connect(uri, options);
}

module.exports = { connectDatabase };
