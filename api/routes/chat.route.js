import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { addchat, getchat, getchats, readChat } from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/", verifyToken, getchats);
router.get("/:id", verifyToken, getchat);
router.post("/", verifyToken, addchat);
router.put("/read/:id", verifyToken, readChat);

export default router;
