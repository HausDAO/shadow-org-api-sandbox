import express from "express";

import discord from "./discord";
import { apiKeyAuth } from "../../middlewares";

const router = express.Router();

router.use(apiKeyAuth);
router.use("/discord", discord);

export default router;
