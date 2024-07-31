require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");
const { initSocket } = require("./socket");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("connected to db");
    }
  })
  .catch((err) => {
    console.log("can't connect to db\n", err.message);
  });

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

initSocket(server);
