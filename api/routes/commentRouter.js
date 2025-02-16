import { Router } from 'express';
import auth from '../middleware/auth.js';
import CommentController from '../controllers/commentController.js';
import * as commentService from '../models/commentModel.js';

const router = Router();

const commentController = new CommentController(commentService);

router.post('/', auth, commentController.createComment.bind(commentController));
router.delete('/:id', auth, commentController.deleteComment.bind(commentController));

export default router;
