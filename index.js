import express from "express";
import cors from "cors";
import { db } from "./db.js";

import router from "./routes/index.js";
// import { User, Post } from "./models/models.js";

import "dotenv/config";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", router);

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
