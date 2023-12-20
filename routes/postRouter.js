import { Router } from "express";

const router = Router();

router.get("/get-post", (req, res) => {
  res.send("My name Max!");
});

export default router;
