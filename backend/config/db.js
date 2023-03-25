const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL);
    console.log(`DB connection established on ${con.connection.host}`.cyan.underline );
  } catch (error) {
    console.log(`Connection to DB failed`.red.underline.bold);
    process.exit(1);
  }
};


module.exports = connectDB;