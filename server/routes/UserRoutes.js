import express from "express"
import { welcomeRoute } from "../controllers/userController.js"

const router = express.Router()

router.get('/', welcomeRoute)

export default router