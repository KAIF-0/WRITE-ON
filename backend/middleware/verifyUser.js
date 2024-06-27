import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const verifyUser = (req, res, next)=>{
    const token = req.cookies.access_tkn;
    if(!token){
        return next(errorHandler(401, "SIGN IN REQUIRED!"));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err){
            return next(errorHandler(401, "UNAUTHORISED USER!")), console.log(err); 
        }
        req.user = user;
        next();
    });
console.log(req.user)
};