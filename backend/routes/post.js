import express from "express"
import { verifyUser } from "../middleware/verifyUser.js";
import {createPost, getPost, deletePost, updatePost} from "../controllers/post.js"

const router = express.Router();

router.post('/create-post', verifyUser, createPost)
router.get('/get-posts', getPost)
router.delete('/delete-post/:userId/:postId', verifyUser, deletePost)
router.put('/update-post/:userId/:postId', verifyUser, updatePost)


export default router;