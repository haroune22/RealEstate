import express from "express"
import { admin, logged_in } from "../controllers/test.controller.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router()


router.post('/logged-in', verifyToken, logged_in)
router.post('/admin', admin)


export default router