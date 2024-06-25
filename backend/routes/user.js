import express from "express"
import {updateUser, deleteUser, getUsers, delUser, getCommentUser} from "../controllers/user.js"
import { verifyUser } from "../middleware/verifyUser.js";

const router = express.Router();

router.put('/update/:userId', verifyUser, updateUser)
router.delete('/delete/:userId', verifyUser, deleteUser)
router.get('/get-users/:userId',verifyUser, getUsers)
router.delete('/delete-user/:userId/:delId',verifyUser, delUser)
router.get('/getusers/:userId', getCommentUser)

export default router; 