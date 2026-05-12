import express from 'express';

import authentications from '../services/authentications/authentications-routes.js';
// user
// analyze
const router = express.Router();

// router.post('/auth/register');
// router.post('/auth/login');
// router.post('/auth/logout');
// router.post('/auth/me');

// router.post('/analyze');
// router.get('/analyze/:id');

router.use('/', authentications);

export default router;