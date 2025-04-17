const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { connectMongoDB } = require("./connection");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes.js");
const mfaRoutes = require("./routes/mfaRoutes.js");
const cors = require("cors");
const app = express();

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

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/mfa", mfaRoutes);

app.listen(process.env.PORT, () => console.log("SERVER STARTED SUCCESSFULLY."));
