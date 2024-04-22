import express from "express"
import { welcomeRoute, updateUser } from "../controllers/userController.js"
import { verifyToken } from "../utils/verifyUser.js"

const router = express.Router()

router.get('/', welcomeRoute)

router.post('/update/:id', verifyToken ,updateUser)

export default router