import userModal from "../modal/usermodal.js"
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs"


export const google = async (req, res, next) => {
    const { username, email, profilePic } = req.body;

    try {
        const user = await userModal.findOne({ email })

        if (user) {
            const token = jwt.sign(
                { userid: user._id, isAdmin: user.isAdmin  },
                process.env.JWT_SECRET,
                {expiresIn: "1d"}
            )
            const { password: pass, ...editedUser } = user._doc;

            res.status(200).cookie('access_tkn', token,
                {
                    httpOnly: true,
                }
            ).json(editedUser)


        } else {
            const randomPass = Math.random().toString(20).slice(-8)

            const hashPass = await bcryptjs.hash(randomPass, 10)
            const newUser = new userModal({ username: username.toLowerCase().split('').join(''), email, password: hashPass, profilePic })
            await newUser.save()
            const token = jwt.sign(
                { userid: newUser._id, isAdmin: newUser.isAdmin },
                process.env.JWT_SECRET,
                {expiresIn: "1d"}
            )
            const { password: pass, ...editedUser } = newUser._doc;
            res.status(200)
            .cookie(
                'access_tkn', token,
                {
                    httpOnly: true,
                }
            ).json(editedUser)


        }
    } catch (error) {
        next(error)
    }

}