const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error("database couldnt connect lad", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
