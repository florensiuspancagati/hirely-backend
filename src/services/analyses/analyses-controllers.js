import AnalysesRepositories from './analyses-repositories.js';
import apiResponse from '../../utils/apiResponse.js';
import InvariantError from '../../exceptions/invariant-error.js';
import extractUploadedFile from '../../utils/extractUploadedFile.js';

// ai service
import aiForAnalysesCV from '../ai/ai-services.js';

const analysesCV = async (req, res, next) => {
  const { jobDescription } = req.body;
  const file = req.file;
  
  if (!file) {
    return next(new InvariantError('Anda harus unggah CV.'));
  }
  
  // parsing filenya.
  const extractedFile = await extractUploadedFile(file.path, file.mimetype);

  // analisis dengan ai.
  const aiAnalysesResult = await aiForAnalysesCV({ extractedFile, jobDescription });

  // panggil fungsi uploadCV dari AnalysesRepositories.
  const analysis = await AnalysesRepositories.uploadCV({
    filename: file.originalname,
    filepath: file.path,
    mimetype: file.mimetype,
    extractedText: extractedFile,
    jobDescription,
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
};

export { analysesCV };