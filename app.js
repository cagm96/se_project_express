const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((e) => console.error(e));
mongoose.set("strictQuery", true);
app.use(cors());
app.use(express.json());

app.use("/", indexRouter);
app.use("/", userRouter);

app.get("/items", (req, res) => {
  res.json({ message: "CORS issue fixed!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
