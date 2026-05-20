import express from 'express';

import authentications from '../services/authentications/authentications-routes.js';
import users from '../services/users/users-routes.js';
import analyses from '../services/analyses/analyses-routes.js';

const router = express.Router();

router.use('/', authentications);
router.use('/', users);
router.use('/', analyses);

// for keep the server running
router.get('/ping', async (req, res) => {
  return res.status(200).json({
    status: 'success',
    message: 'Server is OK',
  });
});

export default router;