import fs from 'fs';
import pdfParser from 'pdf-parser';
import mammoth from 'mammoth';

import InvariantError from '../exceptions/invariant-error.js'

const extractUploadedFile = async (filePath, mimeType) => {
  const fileBuffer = fs.readFileSync(filePath);

  // parsing pdf
  if (mimeType === 'application/pdf') {
    const data = await pdfParser(fileBuffer);
    return data.text;
  }

  // parsing docx
  if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    const data = await mammoth.extractRawText({ buffer: fileBuffer });
    return data.value;
  }

  throw new InvariantError('Format file tidak didukung.');
};

export default extractUploadedFile;