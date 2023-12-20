import { db } from "../db.js";
import { DataTypes } from "sequelize";

export const User = db.define("user", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  avatar: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "User" },
});

export const Post = db.define("post", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING },
  content: { type: DataTypes.TEXT },
  img: { type: DataTypes.STRING },
});

User.hasMany(Post);
Post.belongsTo(User);
