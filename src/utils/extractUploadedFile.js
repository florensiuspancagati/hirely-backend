import fs from 'fs';
import { PDFParse } from 'pdf-parse';
import mammoth from 'mammoth';

import InvariantError from '../exceptions/invariant-error.js'

const extractUploadedFile = async (filePath, mimeType) => {
  const fileBuffer = fs.readFileSync(filePath);

  // parsing pdf
  if (mimeType === 'application/pdf') {
    // ternyata ada perubahan library
    // const data = await PDFParse(fileBuffer);
    // return data.text;

    const parser = new PDFParse({ data: fileBuffer });
    const result = await parser.getText();
    await parser.destroy();
    return result.text;
  }

  // parsing docx
  if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    const data = await mammoth.extractRawText({ buffer: fileBuffer });
    return data.value;
  }

  throw new InvariantError('Format file tidak didukung.');
};

export default extractUploadedFile;