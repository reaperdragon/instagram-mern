import express from "express";

import dotenv from "dotenv";
dotenv.config();

//express async errors
import "express-async-errors";

//morgan
import morgan from "morgan";

// Database
import connectDB from "./db/connection.js";

//Routes
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import feedRoute from "./routes/feedRoute.js";

//middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome");
});

//Route
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", authenticateUser, userRoute);
app.use("/api/v1/feed", authenticateUser, feedRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server Running on port : ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
