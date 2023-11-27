import express from 'express';
import UserController from '../controllers/user.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();
router.get('/', UserController.getAll);
router.post('/login', UserController.login);
// router.get('/:id', UserController.getById);
router.post('/register', UserController.register);
export default router;
