import expres from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/User.Routes.js";
import authRouter from "./routes/Auth.Routes.js";
import listingRouter from "./routes/Listing.Routes.js"
import cors from "cors";
import path from "path"
import { fileURLToPath } from 'url';

dotenv.config();

const app = expres();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(cors());
app.use(expres.json());
app.use("/api/user", userRoutes);
app.use("/api/auth", authRouter);
app.use("/public", expres.static(path.join(__dirname, "public")));
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    succcess: false,
    statusCode,
    message,
  });
});
app.use("/api/listing", listingRouter);

mongoose
  .connect(process.env.MONGO_DB_URI, {
    dbName: "MyPlace",
  })
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(300, () => {
  console.log("Server is running at port 300");
});
