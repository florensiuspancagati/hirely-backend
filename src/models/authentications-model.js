import mongoose from 'mongoose';

const authenticationSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
});

const AuthenticationModel = mongoose.model(
  'Authentication',
  authenticationSchema
);

export default AuthenticationModel;