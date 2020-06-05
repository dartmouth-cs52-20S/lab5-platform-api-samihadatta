import { Router } from 'express';
import * as Posts from './controllers/post_controller';
import * as Comments from './controllers/comment_controller';
import * as UserController from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport';
import signS3 from './services/s3';


const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'welcome to our blog api!' });
});

// /your routes will go here

router.route('/posts')
    .post(
        requireAuth,
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
        requireAuth,
        Posts.updatePost,
    )
    .delete(
        requireAuth,
        Posts.deletePost,
    );

router.route('/comments/post=:id')
    .get(
        // id is post id
        Comments.getComments,
    )
    .post(
        // id is post id
        requireAuth,
        Comments.addComment,
    )
    .delete(
        requireAuth,
        Comments.deleteComments,
    );
router.route('/comments/comment=:id')
    .get(
        Comments.getComment,
    )
    .put(
        // id is comment id
        requireAuth,
        Comments.updateComment,
    )
    .delete(
        // id is comment id
        requireAuth,
        Comments.deleteComment,
    );

router.route('/search/posts/:request')
    .get(
        Posts.search,
    );

router.post('/signin', requireSignin, UserController.signin);

router.post('/signup', UserController.signup);

router.get('/sign-s3', signS3);

export default router;
