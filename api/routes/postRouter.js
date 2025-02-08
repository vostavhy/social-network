import { Router } from 'express';
import UserController from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const router = Router();
