import { Router } from 'express';
import auth from '../middleware/auth.js';
import FollowerController from '../controllers/followerController.js';
import * as followerService from '../models/followerModel.js';

const router = Router();

const followerController = new FollowerController(followerService);

router.post('/', auth, followerController.follow.bind(followerController));
router.delete('/:followingId', auth, followerController.unfollow.bind(followerController));

export default router;
