import { Router } from 'express';
import auth from '../middleware/auth.js';
import LikeController from '../controllers/likeController.js';
import * as likeService from '../models/likeModel.js';

const router = Router();

const likeController = new LikeController(likeService);

router.post('/like', auth, likeController.like.bind(likeController));
router.post('/unlike', auth, likeController.unlike.bind(likeController));

export default router;
