import express from "express"
import { verifyUser } from "../middleware/verifyUser.js";
import {createPostComment, getPostComment, commentLike, editComment, deleteComment, deleteDashComment, getDashComment} from "../controllers/comment.js" 

const router = express.Router();

router.post('/create-comment', verifyUser, createPostComment)
router.get('/get-comments/:postId', getPostComment)
router.put('/commentLike/:commentId', verifyUser, commentLike )
router.put('/editComment/:commentId', verifyUser, editComment )
router.delete('/deleteComment/:commentId', verifyUser, deleteComment )
router.delete('/deleteDashComment/:commentId', verifyUser, deleteDashComment )
router.get('/getComments', verifyUser, getDashComment)



export default router;