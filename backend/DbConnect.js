const mongoose = require("mongoose");

// const mongodbURL = process.env.MONGO_URL;

const mongodbURL = process.env.OMONGO_URL;

console.log(mongodbURL);

const DbConnect = async () => {
  await mongoose
    .connect(mongodbURL)
    .then(() => {
      console.log("Database connected Successfully");
    })
    .catch((err) => {
      console.log("Error", err);
    });
};

module.exports = DbConnect;
