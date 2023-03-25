const express = require("express");
const path = require("path");
const colors = require("colors");
const { errorHandler } = require("./middlewares/errorHandler");
const dotenv = require("dotenv").config();
const userRouter = require("./routes/userRoute");
const ticketRouter = require("./routes/ticketsRoute");
const connectDB = require("./config/db");

const app = express();
const port = process.env.PORT || 4000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", userRouter);
app.use("/api/tickets", ticketRouter);

// Serve front-end
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(__dirname, "../", "frontend", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: " Welcome to the Support Desk API" });
  });
}

app.use(errorHandler);
app.listen(port, () => console.log(`Server listening on port ${port}!`));
