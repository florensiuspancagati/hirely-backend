import express from 'express';

import { analysesCV } from './analyses-controllers.js';
import validation from '../../middlewares/validation.js';
import cvUploadMiddleware from '../../middlewares/upload-file.js';
import { analysisPayloadSchema } from './analyses-validators.js';

const router = express.Router();

router.post('/analyses', validation(analysisPayloadSchema), cvUploadMiddleware.single('cv'), analysesCV);

export default router;