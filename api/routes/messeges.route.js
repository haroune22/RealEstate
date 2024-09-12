import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { addMessage } from "../controllers/messege.controller.js";

const router = express.Router();

router.post("/", verifyToken, addMessage);


export default router;
