const mongoose = require("mongoose");
const app = require("./app");

const PORT = 3000;

/**
 * ✅ MongoDB Connection
 */
mongoose.connect(
  "mongodb+srv://hakkandeel_db_user:Bmwha%40hak112244@cluster0.p12opnr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => {
  console.log("MongoDB Connected");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((error) => {
  console.log("MongoDB Error:", error);
});