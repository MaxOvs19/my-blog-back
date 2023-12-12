import express from "express";
import cors from "cors";
import { sequelize } from "./db.js";
import "dotenv/config";

sequelize;

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cors());

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log("start server in port:", PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
