const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const routes = require("./routes");
const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((e) => console.error(e));

app.use(express.json());
app.use("/", mainRouter);
app.use((req, res, next) => {
  req.user = {
    _id: "665527ae985ce6432f836d6e",
  };

  next();
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
