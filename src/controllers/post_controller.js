import Post from '../models/post_model';

export const createPost = (req, res) => {
    const post = new Post();
    // eslint-disable-next-line guard-for-in
    console.log('in create post');
    console.log(req.body);
    post.title = req.body.title;
    post.tags = req.body.tags;
    post.coverUrl = req.body.coverUrl;
    post.content = req.body.content;
    post.save()
        .then((result) => {
            // console.log(result);
            res.json(result);
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
//   res.send('post should be created and returned');
};

export const getPosts = (req, res) => {
    console.log('in getposts');
    return Post.find({})
        .then((result) => {
            // next line's sorting was fixed by https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
            result.sort((a, b) => { return ((a.createdAt < b.createdAt) ? 1 : -1); });
            console.log(result);
            res.json(result);
        }).catch((error) => {
            res.status(501).json({ error });
        });
    // res.send('posts should be returned');
};

export const getPost = (req, res) => {
    console.log('in getPost');
    console.log(req.params);
    Post.findById(req.params.id)
        .then((result) => {
            console.log(result);
            res.json(result);
        })
        .catch((error) => {
            res.status(502).json({ error });
        });
    // res.send('single post looked up');
};

export const deletePost = (req, res) => {
    Post.findByIdAndRemove(req.params.id)
        .then((result) => {
            res.json({ message: 'delete success' });
        })
        .catch((error) => {
            res.status(503).json({ error });
        });
    // res.send('delete a post here');
};

export const updatePost = (req, res) => {
    console.log('req');
    console.log(req.params);
    console.log(req.body);
    const updateFields = {};
    if ('title' in req.body) {
        updateFields.title = req.body.title;
    }
    if ('tags' in req.body) {
        updateFields.tags = req.body.tags;
    }
    if ('coverUrl' in req.body) {
        updateFields.coverUrl = req.body.coverUrl;
    }
    if ('content' in req.body) {
        updateFields.content = req.body.content;
    }
    console.log('update fields');
    console.log(updateFields);
    Post.findByIdAndUpdate(req.params.id, updateFields, { new: true })
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
