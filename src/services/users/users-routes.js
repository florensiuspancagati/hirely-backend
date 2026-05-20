import express from 'express';
import { createUser, getUserById, getUserByUsername } from './users-controllers.js';
import validation from '../../middlewares/validation.js';
import { userPayloadSchema } from './users-validators.js';

const router = express.Router();

router.post('/users', validation(userPayloadSchema), createUser);
router.get('/users/:id', getUserById);
router.get('/users', getUserByUsername);

export default router;