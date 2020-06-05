import mongoose, { Schema } from 'mongoose';

// create a CommentSchema with a title field
const CommentSchema = new Schema({
    id: String,
    postId: String,
    content: String,
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
});

// create PostModel class from schema
const CommentModel = mongoose.model('Comment', CommentSchema);

export default CommentModel;
