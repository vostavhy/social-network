import { Router } from 'express';
import auth from '../middleware/auth.js';
import PostController from '../controllers/postController.js';
import * as postService from '../models/postModel.js';

const router = Router();

const postController = new PostController(postService);

router.get('/', postController.getPosts.bind(postController));
router.get('/:id', postController.getPostById.bind(postController));
router.post('/create', auth, postController.createPost.bind(postController));
router.patch('/update/:id', auth, postController.updatePost.bind(postController));
router.delete('/delete/:id', auth, postController.deletePost.bind(postController));

export default router;
