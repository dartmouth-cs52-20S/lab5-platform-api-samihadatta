import mongoose, { Schema } from 'mongoose';

mongoose.set('useFindAndModify', false);


// create a PostSchema with a title field
const PostSchema = new Schema({
    id: String,
    title: String,
    tags: Array,
    coverUrl: String,
    content: String,
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
});

// create PostModel class from schema
const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;