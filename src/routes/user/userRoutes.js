import express from 'express';
import { createUser, getUsers, updateUser, deleteUser,deleteAllUsers,loginUser } from '../../controller/user/userController.js';

const router = express.Router();
router.post("/login",loginUser)
router.post('/', createUser);     // Create
router.get('/', getUsers);        // Read
router.put('/:id', updateUser);   // Update
router.delete('/:id', deleteUser);// Delete
router.delete('/', deleteAllUsers); // 

export default router;
