import mongoose from 'mongoose';

const analysesSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    filename: {
      type: String,
      required: true,
    },

    filepath: {
      type: String,
      required: true,
    },

    mimetype: {
      type: String,
      required: true,
    },

    jobDescription: {
      type: String,
      required: true,
    },

    extractedText: {
      type: String,
      required: true,
    },

    score: {
      type: Number,
    },

    summary: {
      type: String,
    },

    matchedSkills: [String],

    missingSkills: [String],

    improvements: [String],

    recommendedSkills: [String],

    status: {
      type: String,
      default: 'completed',
    },
  },
  {
    timestamps: true,
  }
);

const AnalysesModel = mongoose.model('Analyses', analysesSchema);

export default AnalysesModel;