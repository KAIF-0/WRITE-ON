import express from "express"
import {signUp} from "../controllers/signup.js"
import {signIn} from "../controllers/signin.js"
import {google} from "../controllers/google.js"
import {signout} from "../controllers/signout.js"

const router = express.Router();

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/google', google)
router.post('/signout', signout)

export default router;