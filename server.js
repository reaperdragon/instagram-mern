import express from "express";

import dotenv from "dotenv";
dotenv.config();

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

//express async errors
import "express-async-errors";

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

import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

//Route
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", authenticateUser, userRoute);
app.use("/api/v1/feed", authenticateUser, feedRoute);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

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
