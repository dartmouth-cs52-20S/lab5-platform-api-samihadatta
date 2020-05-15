import { Router } from 'express';
import * as Posts from './controllers/post_controller';
import * as Comments from './controllers/comment_controller';


const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'welcome to our blog api!' });
});

// /your routes will go here

router.route('/posts')
    .post(
        Posts.createPost,
    )
    .get(
        Posts.getPosts,
    );

router.route('/posts/:id')
    .get(
        Posts.getPost,
    )
    .put(
        Posts.updatePost,
    )
    .delete(
        Posts.deletePost,
    );

router.route('/comments/post=:id')
    .get(
        // id is post id
        Comments.getComments,
    )
    .post(
        // id is post id
        Comments.addComment,
    )
    .delete(
        Comments.deleteComments,
    );
router.route('/comments/comment=:id')
    .get(
        Comments.getComment,
    )
    .put(
        // id is comment id
        Comments.updateComment,
    )
    .delete(
        // id is comment id
        Comments.deleteComment,
    );

router.route('/search/posts/:request')
    .get(
        Posts.search,
    );

/*
// POST /posts: Posts.createPost
router.post('/posts', (req, res) => {
    Posts.createPost(req, res);
});

// GET /posts: Posts.getPosts
router.get('/posts', (req, res) => {
    Posts.getPost(req, res);
});

// GET /posts/:id: Posts.getPost
router.get('/posts/:id', (req, res) => {
    Posts.getPost(req, res);
});

// PUT /posts/:id: Posts.updatePost
router.put('/posts/:id', (req, res) => {
    Posts.updatePost(req, res);
});

// DELETE /posts/:id: Posts.deletePost
router.delete('/posts/:id', (req, res) => {
    Posts.deletePost(req, res);
});
*/

export default router;
