import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
        unique: true,
    },
    image:{
        type: String,
        default: "https://sustainablemarket.ca/images/blog_images/blog_img_60_default-blog-thumb.png"
    },
    category:{
        type: String,
        default: 'uncategorised',
    },
    slug:{
        type: String,
        required: true,
        unique: true,
    },
}, {timestamps: true}

) 

const Post = mongoose.model('Post', postSchema)

export default Post;