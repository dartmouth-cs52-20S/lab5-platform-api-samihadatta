import mongoose, { Schema } from 'mongoose';

mongoose.set('useFindAndModify', false);

// create a PostSchema with a title field
const PostSchema = new Schema({
    id: String,
    title: String,
    tags: Array,
    coverUrl: String,
    content: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
});

PostSchema.index(
    { title: 'text', tags: 'text', content: 'text' },
    { weights: { title: 3, tags: 2, content: 2 } },
);

// create PostModel class from schema
const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
