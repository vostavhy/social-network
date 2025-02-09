import { Router } from 'express';
import auth from '../middleware/auth.js';
import PostController from '../controllers/postController.js';

const router = Router();

const postController = new PostController();

router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);
router.post('/create', auth, postController.createPost);
router.put('/update/:id', auth, postController.updatePost);
router.delete('/delete/:id', auth, postController.deletePost);

export default router;
