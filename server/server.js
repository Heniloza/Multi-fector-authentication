const express = require("express");
const dotenv = require("dotenv");
const { connectMongoDB } = require("./connection");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
dotenv.config();

//Database connection
connectMongoDB(process.env.MONGO_URL)
  .then(() => console.log("CONNECTED TO DATABASE"))
  .catch((err) => console.log("Error in connecting to database", err));

//MiddleWares
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.listen(process.env.PORT, () => console.log("SERVER STARTED SUCCESSFULLY."));
