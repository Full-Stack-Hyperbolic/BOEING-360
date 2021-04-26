import express from "express";

import { getPois } from  "../controllers/pois.js";

const router = express.Router();

router.get("/get-pois", getPois);

export default router;