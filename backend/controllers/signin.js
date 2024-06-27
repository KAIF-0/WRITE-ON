import userModal from "../modal/usermodal.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";


export const signIn = async (req, res, next)=>{
    const { email, password } = req.body

    if(email=== ''|| password==='' || !email || !password){
        next(errorHandler(400, "All FIELD ARE REQUIRED"))
    }

    try {
        const getUser = await userModal.findOne({email})
        if(!getUser){
            next(errorHandler(404, "USER NOT FOUND"))
        }
        const getPass = await bcryptjs.compare(password, getUser.password)
        if(!getPass){
            next(errorHandler(400, "USER NOT FOUND"))
        }
        const token = jwt.sign(
            {userid: getUser._id, isAdmin: getUser.isAdmin },
            process.env.JWT_SECRET,
        )

        const {password: pass, ...editedUser} = getUser._doc;

        res.status(200).cookie('access_tkn', token,
            {
                httpOnly: true,
            }
        ).json(editedUser)

    } catch (error) {
       next(error) 
    }

}