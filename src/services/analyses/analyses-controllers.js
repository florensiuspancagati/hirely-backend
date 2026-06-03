import AnalysesRepositories from './analyses-repositories.js';
import apiResponse from '../../utils/apiResponse.js';
import InvariantError from '../../exceptions/invariant-error.js';
import { extractUploadedFile, deleteUploadedFile } from '../../utils/extractUploadedFile.js';

// ai service
import aiForAnalysesCV from '../ai/ai-services.js';

const analysesCV = async (req, res, next) => {
  const { jobDescription } = req.body;
  const { fullname, position, education, experience, skill } = req.body;
  const file = req.file;

  // console.log('REQ FILE:', req.file);
  // console.log('REQ BODY:', req.body);
  
  if (!file) {
    return next(new InvariantError('Anda harus unggah CV.'));
  }
  

  try {
    // parsing filenya.
    const extractedFile = await extractUploadedFile(file.path, file.mimetype);
  
    // analisis dengan ai.
    // sementara, 5 param lainnya tidak di pakai dulu: fullname, position, education, experience, skill
    const aiAnalysesResult = await aiForAnalysesCV({ extractedFile, jobDescription });
  
    // panggil fungsi uploadCV dari AnalysesRepositories. Ini untuk simpan ke mongodb
    const analysis = await AnalysesRepositories.uploadCV({
      filename: file.originalname,
      filepath: file.path,
      mimetype: file.mimetype,
      extractedText: extractedFile,
      jobDescription,
      fullname,
      position,
      education,
      experience,
      skill,
      score: aiAnalysesResult.score,
      summary: aiAnalysesResult.summary,
      matchedSkills: aiAnalysesResult.matchedSkills,
      missingSkills: aiAnalysesResult.missingSkills,
      improvements: aiAnalysesResult.improvements,
      recommendedSkills: aiAnalysesResult.recommendedSkills,
    });
  
    if (!analysis) {
      return next(new InvariantError('Gagal menganalisis CV'));
    }
  
    return apiResponse(res, 201, 'Berhasil menganalisis CV', analysis);
    
  } catch (err) {
    next(err);
  } finally {
    await deleteUploadedFile(file.path);
  }
};


export { analysesCV };