import Comment from '../models/comment_model';

export const addComment = (req, res) => {
    const comment = new Comment();
    console.log('in add comment');
    console.log(req.body);
    comment.postId = req.params.id;
    comment.content = req.body.content;
    console.log('comment');
    console.log(comment);
    comment.save()
        .then((result) => {
            console.log(result);
            res.json(result);
        })
        .catch((error) => {
            res.status(505).json({ error });
        });
//   res.send('post should be created and returned');
};

export const getComments = (req, res) => {
    console.log('in get comments');
    const postId = req.params.id;
    console.log(`id: ${postId}`);
    return Comment.find({ postId })
        .then((result) => {
            // next line's sorting was fixed by https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
            result.sort((a, b) => { return ((a.createdAt > b.createdAt) ? 1 : -1); });
            console.log(result);
            res.json(result);
        }).catch((error) => {
            res.status(506).json({ error });
        });
    // res.send('posts should be returned');
};

export const deleteComments = (req, res) => {
    console.log('in get comments');
    const postId = req.params.id;
    console.log(`id: ${postId}`);
    return Comment.find({ postId })
        .then((result) => {
            // next line's sorting was fixed by https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
            // result.sort((a, b) => { return ((a.createdAt > b.createdAt) ? 1 : -1); });
            console.log(result);
            for (let i = 0; i < result.length; i += 1) {
                const comment = result[i];
                Comment.findByIdAndRemove(comment._id)
                    .then((deepResult) => {
                        console.log(deepResult);
                    })
                    .catch((error) => {
                        res.status(510).json({ error });
                    });
            }
            res.json({ message: 'all comments for this post have been deleted' });
        }).catch((error) => {
            res.status(506).json({ error });
        });
    // res.send('posts should be returned');
};

export const getComment = (req, res) => {
    console.log('in getComment');
    console.log(req.params);
    Comment.findById(req.params.id)
        .then((result) => {
            console.log(result);
            res.json(result);
        })
        .catch((error) => {
            console.log(error);
            res.status(509).json({ error });
        });
};

export const deleteComment = (req, res) => { // structure this this way!
    Comment.findByIdAndRemove(req.params.id)
        .then((result) => {
            res.json({ message: 'delete success' });
        })
        .catch((error) => {
            res.status(507).json({ error });
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
    Comment.findByIdAndUpdate(req.params.id, updateFields, { new: true })
        .then((result) => {
            console.log('result');
            console.log(result);
            res.json(result);
            // getPost(req, res);
        })
        .catch((error) => {
            res.status(508).json({ error });
        });
    // res.send('update a post here');
};
