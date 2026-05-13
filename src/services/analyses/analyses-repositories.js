import { nanoid } from 'nanoid';

import AnalysesModel from '../../models/analyses-model.js';

class AnalysesRepositories {
  async uploadCV({ filename, filepath, mimetype, jobDescription, extractedText, score, summary, matchedSkills, missingSkills, improvements, recommendedSkills }) {
    const id = nanoid(16);
    
    // create Analyses colection di mongodb
    const analyses = await AnalysesModel.create({
      id,
      filename,
      filepath,
      mimetype,
      jobDescription,
      extractedText,
      score,
      summary,
      matchedSkills,
      missingSkills,
      improvements,
      recommendedSkills,
      status: 'completed',
    });

    return {
      id: analyses.id,
    };
  }
}

export default new AnalysesRepositories();