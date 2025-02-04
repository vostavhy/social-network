import { Router } from 'express';
import UserController from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const router = Router();
const userController = new UserController();

/* all auth routes */
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/current', auth, userController.current);
router.get('/user/:id', auth, userController.getUserById);
router.put('/update/:id', auth, userController.updateUser);

export default router;
