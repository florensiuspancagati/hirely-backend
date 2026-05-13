import express from 'express';

import authentications from '../services/authentications/authentications-routes.js';
import users from '../services/users/users-routes.js';
import analyses from '../services/analyses/analyses-routes.js';

const router = express.Router();

router.use('/', authentications);
router.use('/', users);
router.use('/', analyses);

export default router;