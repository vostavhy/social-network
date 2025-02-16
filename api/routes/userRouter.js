import { Router } from 'express';
import auth from '../middleware/auth.js';
import UserController from '../controllers/userController.js';
import * as userService from '../models/userModel.js';

const router = Router();
const userController = new UserController(userService);

/* all auth routes */
router.post('/register', userController.register.bind(userController));
router.post('/login', userController.login.bind(userController));
router.get('/current', auth, userController.current.bind(userController));
router.put('/users/:id', auth, userController.updateUser.bind(userController));
router.get('/users/:id', auth, userController.getUserById.bind(userController));
router.delete('/delete', auth, userController.delete.bind(userController));

export default router;
