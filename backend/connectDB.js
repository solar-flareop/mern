const mongoose = require("mongoose");

const connectDB = async (url) => {
  console.log("DB Connected");
  return await mongoose.connect(url);
};

module.exports = connectDB;
