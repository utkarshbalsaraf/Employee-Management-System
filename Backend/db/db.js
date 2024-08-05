const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect("mongodb://localhost:27017/Employee_Management")
    .then(console.log("Database Connected Successfully !!!"))
    .catch((error) => {
      console.error("Error connecting to Database : ", error);
    });
};

module.exports = dbConnect;
