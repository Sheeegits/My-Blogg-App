import mongoose from 'mongoose';
import Comment from '../model/comment.js';

export const newComment = async (request, response) => {
    try {
        const comment = new Comment(request.body);
        await comment.save();  // await the save operation

        response.status(200).json('Comment saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}


export const getComments = async (request, response) => {
    try {
        const comments = await Comment.find({ postId: request.params.id });
        
        response.status(200).json(comments);
    } catch (error) {
        response.status(500).json(error)
    }
}


export const deleteComment = async (request, response) => {
    try {
        const commentId = request.params.id;

        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return response.status(400).json({ msg: 'Invalid Comment ID' });
        }

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return response.status(404).json({ msg: 'Comment not found' });
        }

        await comment.deleteOne(); // Use deleteOne() to delete the comment

        response.status(200).json('Comment deleted successfully');
    } catch (error) {
        response.status(500).json({ msg: 'Server Error' });
    }
}

