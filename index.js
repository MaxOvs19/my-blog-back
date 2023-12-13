import express from "express";
import cors from "cors";
import { db } from "./db.js";

import userRouter from "./routes/user.router.js";

import "dotenv/config";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);

const start = async () => {
  try {
    await db.authenticate();
    await db.sync();
    app.listen(PORT, () => {
      console.log("start server in port:", PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
