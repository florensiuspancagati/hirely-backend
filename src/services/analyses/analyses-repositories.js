import { nanoid } from 'nanoid';

import AnalysesModel from '../../models/analyses-model.js';

class AnalysesRepositories {
  async uploadCV({ filename, filepath, mimetype, jobDescription, extractedText, fullname, position, education, experience, skill, cv_text, score, isMatch, summary, cvSkills, jdSkills, matchedSkills, missingSkills, recommendedSkills }) {
    const id = nanoid(16);
    
    // create Analyses colection di mongodb
    const analyses = await AnalysesModel.create({
      id,
      filename,
      filepath,
      mimetype,
      jobDescription,
      extractedText,
      fullname,
      position,
      education,
      experience,
      skill,
      cv_text,
      score,
      isMatch,
      summary,
      cvSkills,
      jdSkills,
      matchedSkills,
      missingSkills,
      recommendedSkills,
      status: 'completed',
    });

    return {
      analyses
    };
  }
}

export default new AnalysesRepositories();