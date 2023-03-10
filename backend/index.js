const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const workoutsRouter = require("./routes/workouts");
const connectDB = require("./connectDB");

//middleware
app.use(express.json());
app.use(cors());

//paths
app.use("/api/workouts", workoutsRouter);

//connectDB and listen port
const port = process.env.PORT;
connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`listning on port:${port}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
