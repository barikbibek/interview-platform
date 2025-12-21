import { Router } from "express";
import { getStreamToken } from "../controllers/chat.controller";
import { protectRoute } from "../middleware/protectRoute";


const router = Router()

router.get('/token',protectRoute, getStreamToken)

export default router;