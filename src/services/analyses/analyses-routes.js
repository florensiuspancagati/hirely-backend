import express from 'express';
import { uploadCV } from './analyses-controllers.js';
// import validation from '../../middlewares/validation.js';
// import { userPayloadSchema } from './analyses-validators.js';

const router = express.Router();

// router.post('/users', validation(userPayloadSchema), createUser);
// router.get('/users/:id', getUserById);
// router.get('/users', getUserByUsername);

router.post('/upload', uploadCV);

export default router;