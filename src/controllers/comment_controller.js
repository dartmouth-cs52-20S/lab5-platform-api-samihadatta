import Comment from '../models/comment_model';

export const createComment = (req, res) => {
    const comment = new Comment();
    console.log('in create post');
    console.log(req.body);
    comment.postId = req.params.id;
    comment.content = req.body.content;
    comment.save()
        .then((result) => {
            // console.log(result);
            res.json(result);
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
//   res.send('post should be created and returned');
};

export const getComments = (req, res) => {
    console.log('in getposts');
    const postId = req.params.id;
    return Comment.find({ postId })
        .then((result) => {
            // next line's sorting was fixed by https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
            result.sort((a, b) => { return ((a.createdAt > b.createdAt) ? 1 : -1); });
            console.log(result);
            res.json(result);
        }).catch((error) => {
            res.status(505).json({ error });
        });
    // res.send('posts should be returned');
};

export const deleteComment = (req, res) => { // structure this this way!
    Comment.findByIdAndRemove(req.body.id)
        .then((result) => {
            res.json({ message: 'delete success' });
        })
        .catch((error) => {
            res.status(503).json({ error });
        });
    // res.send('delete a post here');
};

export const updateComment = (req, res) => { // structure this this way!
    console.log('req');
    console.log(req.params);
    console.log(req.body);
    const updateFields = {};
    if ('content' in req.body) {
        updateFields.content = req.body.content;
    }
    console.log('update fields');
    console.log(updateFields);
    Comment.findByIdAndUpdate(req.body.id, updateFields, { new: true })
        .then((result) => {
            console.log('result');
            console.log(result);
            res.json(result);
            // getPost(req, res);
        })
        .catch((error) => {
            res.status(504).json({ error });
        });
    // res.send('update a post here');
};
