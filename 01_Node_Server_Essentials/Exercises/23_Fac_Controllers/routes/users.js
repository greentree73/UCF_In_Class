import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/usersController.js';

const router = express.Router();

/**
 * USERS ROUTES
 * 
 * Notice how clean the routes are!
 * All the business logic is in the controller.
 * The router just maps HTTP methods to controller functions.
 */

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
