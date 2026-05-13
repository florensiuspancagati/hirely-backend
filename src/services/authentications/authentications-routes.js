import express from 'express';
import validation from '../../middlewares/validation.js';
import { login, refreshToken, logout } from './authentications-controllers.js';
import { postAuthenticationPayloadSchema, putAuthenticationPayloadSchema, deleteAuthenticationPayloadSchema } from './authentications-validators.js';

const router = express.Router();

router.post('/authentications', validation(postAuthenticationPayloadSchema), login);
router.put('/authentications', validation(putAuthenticationPayloadSchema), refreshToken);
router.delete('/authentications', validation(deleteAuthenticationPayloadSchema), logout);

export default router;