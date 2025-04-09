import express from "express";

import MessageResponse from "../interfaces/MessageResponse";
import talk from "./talk";
import setupDiscord from "./setup";
import { apiKeyAuth } from "../middlewares";

const router = express.Router();

router.get<{}, MessageResponse>("/", (req, res, next) => {
  res.json({
    message: "🤖🤖🤖🤖🤖",
  });
});

router.use(apiKeyAuth);
router.use("/talk", talk);
router.use("/setup", setupDiscord);

export default router;
