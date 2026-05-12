import InvariantError from '../exceptions/invariant-error.js';

const validation = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true
  });

  if (error) {
    return next(new InvariantError(error.message));
  }

  req.validated = value;
  next();
};

export default validation;