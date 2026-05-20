import multer from 'multer';
import InvariantError from '../exceptions/invariant-error.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/cv/');
  },

  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new InvariantError('Format file harus PDF atau DOCX'), false);
  }
};

const multerUploadMiddleware = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

export default multerUploadMiddleware;