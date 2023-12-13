import { Router } from "express";

const router = new Router();

router.get("/me", (req, res) => {
  res.send("My name Max");
});

export default router;
