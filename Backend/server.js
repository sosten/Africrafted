import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import uploadRouter from "./routes/upload.js";
import userRouter from "./routes/usersRouter.js";
import productRouter from "./routes/productRouter.js";
import seedRouter from "./routes/seedRouter.js";
import orderRouter from "./routes/orderRouter.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => console.log("Database is connected"))
  .catch((e) => console.log(e));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
app.use("/api", seedRouter);
app.use("/api/upload", uploadRouter);
app.use("/api", userRouter);
app.use("/api", productRouter);
app.use("/api", orderRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html")))

app.use((err, res, req, next) => {
  res.status(500).send({ message: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
