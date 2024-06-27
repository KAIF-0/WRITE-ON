import { errorHandler } from "../utils/error.js";
import Comment from "../modal/commentModal.js";

export const createPostComment = async (req, res, next) => {
    try {
        const { content, postId, userId } = req.body;

        if (userId !== req.user.userid) {
            return next(errorHandler(403, 'NOT ALLOWED TO ADD COMMENT!'));
        }

        const comments = await Comment.create({
            content,
            postId,
            userId
        });
        await comments.save();
        return res.status(201).json(comments);

    } catch (error) {
        next(error)
    }
};


export const getPostComment = async (req, res, next) => {
    if (!req.params.postId) {
        return next(errorHandler(400, 'POST ID IS REQUIRED!'))
    }
    try {
        const comment = await Comment.find({ postId: req.params.postId })
            .sort({
                createdAt: -1,
            });
        return res.status(200).json(comment);


    } catch (error) {
        next(error)
    }

}


export const commentLike = async (req, res, next) => {
    try {
        const { commentId } = req.params;
        const { userid } = req.user;
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return next(errorHandler(404, 'COMMENT NOT FOUND!'))
        }


        if (!comment.likes.includes(userid)) {
            comment.likes.push(userid);
        } else {
            comment.likes.remove(userid);
        }
        await comment.save();
        res.status(200).json(comment)



    } catch (error) {
        next(error)
    }
}



export const editComment = async (req, res, next) => {
    try {
        const { commentId } = req.params;
        const { userid } = req.user;
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return next(errorHandler(404, 'COMMENT NOT FOUND!'))
        }
        if (comment.userId !== userid) {
            return next(errorHandler(403, 'YOU ARE NOT AUTHORIZED TO EDIT COMMENT!'))
        } else {
            const newComment = await Comment.findByIdAndUpdate(commentId, {
                $set: {
                    content: req.body.content,
                },
            }, { new: true });
            res.status(200).json(newComment)
        }

    } catch (error) {
        next(error)
    }
}



export const deleteComment = async (req, res, next) => {
    try {
        const { commentId } = req.params;
        const { userid } = req.user;
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return next(errorHandler(404, 'COMMENT NOT FOUND!'))
        }
        if (comment.userId !== userid) {
            return next(errorHandler(403, 'YOU ARE NOT AUTHORIZED TO EDIT COMMENT!'))
        } else {
            await Comment.findByIdAndDelete(commentId);
            res.status(200).json({ message: 'COMMENT DELETED SUCCESSFULLY' })
        }
    } catch (error) {
        next(error)
    }
}

export const getDashComment = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(400, 'NOT ALLOWED TO SEE COMMENTS SECTION!'))
    }
    const index = parseInt(req.query.index) || 0;
    const limit = parseInt(req.query.limit) || 15;
    const sorting = req.query.sorting === 'ascending' ? 1 : -1;
    try {
        const comments = await Comment.find()
        .sort({ createdAt: sorting })
        .skip(index)
        .limit(limit);

        const totalComments = await Comment.countDocuments();
        res.status(200).json({ comments, totalComments });


    } catch (error) {
        next(error)
    }

}



export const deleteDashComment = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(400, 'NOT AUTHORIZED TO DELETE COMMENT!'))
    }
    try {
        const { commentId } = req.params;
        // const { userid } = req.user;
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return next(errorHandler(404, 'COMMENT NOT FOUND!'))
        }
        // if (comment.userId !== userid) {
        //     return next(errorHandler(403, 'You are not authorized to delete this comment...'))
        // } else {
            await Comment.findByIdAndDelete(commentId);
            res.status(200).json({ message: 'COMMENT DELETED SUCCESSFULLY' })
        // }
    } catch (error) {
        next(error)
    }
}