import { Router } from 'express';
import UserController from '../controllers/userController.js';

const router = Router();
const userController = new UserController();

/* all auth routes */
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/user/:id', userController.getUserById);
router.put('/update/:id', userController.updateUserById);

export default router;
