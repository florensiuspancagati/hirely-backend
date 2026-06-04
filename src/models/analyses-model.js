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

    fullname: {
      type: String,
      required: true,
    },

    position: {
      type: String,
      required: true,
    },

    education: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },

    skill: {
      type: String,
      required: true,
    },

    cv_text: {
      type: String,
      required: true,
    },

    score: {
      type: Number,
    },

    isMatch: {
      type: Boolean,
    },

    summary: {
      type: String,
    },

    cvSkills: [String],

    jdSkills: [String],

    matchedSkills: [String],

    missingSkills: [String],

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