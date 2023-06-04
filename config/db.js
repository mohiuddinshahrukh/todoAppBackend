const mongoose = require("mongoose");
const connectDB = async (uri) => {
  // This try-catch block checks if any errors occurred during the initial connection with the DB
  let conAttemps = 10;
  while (conAttemps != 0) {
    try {
      const conn = await mongoose.connect(uri);
      console.log(`MongoDB Connected ${conn.connection.host}`.cyan.underline);
      break;
    } catch (error) {
      console.log(error);
      conAttemps--;
      // process.exit(1);
    }
  }
};
// Listens for error events that occur after initial connection has been established.
// if emitted, logs the error

mongoose.connection.on("error", (err) => {
  logError(err);
  connectDB(process.env.MONGO_URI);
});

module.exports = connectDB;
