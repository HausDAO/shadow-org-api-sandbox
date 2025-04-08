import express from "express";

import MessageResponse from "../interfaces/MessageResponse";
import talk from "./talk";

const router = express.Router();

router.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "🤖🤖🤖🤖🤖",
  });
});

router.use("/talk", talk);

export default router;
