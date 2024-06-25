import userModal from "../modal/usermodal.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";


export const signUp = async (req, res, next) => {
    const { username, email, password } = req.body

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        next(errorHandler(400, "ALL FIELDS ARE REQUIRED"))
    }


    const hashPass = await bcryptjs.hash(password, 10)

    const newUser = new userModal({
        username: username,
        email: email,
        password: hashPass
    });

try { 
    
    await newUser.save();
    res.status(200).send(newUser)
} catch (error) {
    next(error)                                       //will use middleware from any point
}

    console.log(req.body)
};
