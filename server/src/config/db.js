const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://hakkandeel_db_user:Bmwha%40hak112244@cluster0.p12opnr.mongodb.net/?appName=Cluster0"
    );

    console.log("MongoDB Connected Successfully 🚀");
  } catch (error) {
    console.log("DB Connection Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;