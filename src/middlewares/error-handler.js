/* eslint-disable no-unused-vars */
import apiResponse from '../utils/apiResponse.js';
import ClientError from '../exceptions/client-error.js';

const ErrorHandlerMiddleware = (err, req, res, next) => {
  // handle client error dan subclassnya.
  if (err instanceof ClientError) {
    return apiResponse(res, err.statusCode, err.message, null);
  }

  // handle joi validation errors
  if (err.isJoi) {
    return apiResponse(res, 400, err.details[0].message, null);
  }

  const status = err.statusCode || err.status || 500;
  const message = err.message || 'EHM: Internal Server Error';

  console.error('EHM: Unhandled error: ', err);
  return apiResponse(res, status, message, null);
}

export default ErrorHandlerMiddleware;