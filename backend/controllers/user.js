import User from "../modal/usermodal.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs"

export const updateUser = async (req, res, next) => {
  // const { username, password, email, profilePic} = req.body

  if (req.user.userid !== req.params.userId) {
    return next(errorHandler(403, "NOT ALLOWED TO UPDATE USER!"))
  }

  if (req.body.password) {
    if (req.body.password < 4) {
      return next(errorHandler(400, "PASSWORD MUST BE ATLEAST 5 CHARECTERS!"))
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10)
  }

  if (req.body.username) {
    if (req.body.username < 3 || req.body.username > 20) {
      return next(errorHandler(400, "USERNAME MUST BE BETWEEN 4 TO 20 CHARECTERS!"))
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(errorHandler(400, "USERNAME MUST ONLY CONTAIN LETTERS AND NUMBERS!"))
    }
  }

  try {
    const update = await User.findByIdAndUpdate(req.params.userId, {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        profilePic: req.body.profilePic
      },
    }, { new: true });

    const { password: pass, ...editedUser } = update._doc;
    console.log(editedUser)
    res.status(200).json(editedUser);
  } catch (error) {
    next(error)
  }
  // console.log(req.user) 
}


//DELETE USER 

export const deleteUser = async (req, res, next) => {
  if (req.user.userid !== req.params.userId) {
    return next(errorHandler(403, "NOT ALLOWED TO DELETE USER!"))
  }
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("USER HAS BEEN DELETED");
  } catch (error) {
    next(error)
  }

};


export const delUser = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.userid !== req.params.userId) {
    return next(errorHandler(403, "NOT ALLOWED TO DELETE USER!"))
  }
  try {
    const user = await User.findByIdAndDelete(req.params.delId);
    res.status(200).json("USER HAS BEEN DELETED");
  } catch (error) {
    next(error)
  }

};




export const getUsers = async (req, res, next) => {

  if (req.user.userid !== req.params.userId) {
    return next(errorHandler(403, "NOT ALLOWED TO SEE USERS!"))
  }
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "NOT ALLOWED TO SEE USERS SECTION!"))
  }

  const index = parseInt(req.query.index) || 0;
  const limit = parseInt(req.query.limit) || 7;
  const sorting = req.query.sorting === 'ascending' ? 1 : -1;


  try {
    const users = await User.find()
      .sort({ createdAt: sorting })
      .skip(index)
      .limit(limit); 

    const removePass = users.map((e) => {
      const { password: pass, ...editedUsers } = e._doc;
      return editedUsers
    })

 
    const totalUsers = await User.countDocuments();
    res.status(200).json({ removePass, totalUsers });

  } catch (error) {
    next(error)
  }
}


export const getCommentUser = async (req, res, next) => {
  try {
    const users = await User.findById(req.params.userId)
    if(!users){
      return next(errorHandler(404, "USER NOT FOUND!"))
    }
    const { password: pass, ...editedUsers } = users._doc;
    res.status(200).json(editedUsers);

  } catch (error) {
    next(error)
  }
}
