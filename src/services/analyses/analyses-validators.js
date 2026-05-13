import Joi from 'joi';

export const analysisPayloadSchema = Joi.object({
  jobDescription: Joi.string().required(),
});