import express from 'express';

const router = express.Router();

router.post('/auth/register');
router.post('/auth/login');
router.post('/auth/logout');
router.post('/auth/me');

router.post('/analyze');
router.get('/analyze/:id');

export default router;