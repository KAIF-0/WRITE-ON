import Post from "../modal/postModal.js"
import { errorHandler } from "../utils/error.js"

export const createPost = async (req, res, next) => {
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "ALL FIELDS ARE REQUIRED..."))
  }

  const slug = req.body.title.split(' ').join('-').toLowerCase()

  const post = new Post({
    ...req.body,
    slug,
    userId: req.user.userid,
  })

  try {
    const savePost = post.save();
    res.status(201).json(post)
  } catch (error) {
    next(error)
  }
};




export const getPost = async (req, res, next) => {
  try {
    const index = parseInt(req.query.index) || 0;
    const limit = parseInt(req.query.limit) || 7;
    const sorting = req.query.sorting === 'Oldest' ? 1 : -1;

    // Base query object
    let query = {};

    if (req.query.userId) {
      query = { ...query, userId: req.query.userId };
    }
    if (req.query.category) {
      query = { ...query, category: req.query.category };
    }
    if (req.query.slug) {
      query = { ...query, slug: req.query.slug };
    }
    if (req.query.postId) {
      query = { ...query, _id: req.query.postId };
    }
    if (req.query.search) {
      const searched = { $regex: req.query.search, $options: 'i' };
      query = {
        ...query,
        $or: [
          { title: searched },
          { content: searched }
        ]
      };
    }

    const posts = await Post.find(query)
      .sort({ createdAt: sorting })
      .skip(index)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    res.status(200).json({ posts, totalPosts })

  } catch (error) {
    next(error)
    console.log(error)
  }
};



export const deletePost = async (req, res, next) => {
  if(!req.user.isAdmin){
    if (req.user.userid !== req.params.userId) {
      return next(errorHandler(400, "NOT ALLOWED TO DELETE POST..."))
    }
  }
  try {
    const post = await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json("POST DELETED SUCCESSFULLY")
  } catch (error) {
    next(error)
  }

}




export const updatePost = async (req, res, next) => {
  if(!req.user.isAdmin){
    if (req.user.userid !== req.params.userId) {
      return next(errorHandler(400, "NOT ALLOWED TO UPDATE POST..."))
    }
  }
  try {
    if(req.body.title){
      const slug = req.body.title.split(' ').join('-').toLowerCase()
      const post = await Post.findByIdAndUpdate(req.params.postId, {
        $set: {
          title: req.body.title,
          category: req.body.category,
          image: req.body.image,
          content: req.body.content,
          slug,
        },
      }, { new: true });
      res.status(200).json(post)
    }else{
      const post = await Post.findByIdAndUpdate(req.params.postId, {
        $set: {
          title: req.body.title,
          category: req.body.category,
          image: req.body.image,
          content: req.body.content,
        },
      }, { new: true });
      res.status(200).json(post)
    }
    
    
    
  } catch (error) {
    next(error)
  }
}