const mongoose = require("mongoose");

const dbConnection = async () => {
  await mongoose
    .connect(process.env.LOCAL_DB)
    .then(() => {
      console.log("Database connected successfully!");
    })
    .catch((err) => {
      console.log(`Datebase not connected , Error : ${err}`);
    });
};

module.exports = dbConnection;
