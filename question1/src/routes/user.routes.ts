// user.routes.ts
import express from 'express';
import UserController from '../controllers/user.controller'; 

const router = express.Router();
const userController = new UserController(); 

// Define routes
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;