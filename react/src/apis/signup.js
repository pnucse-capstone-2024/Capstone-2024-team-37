import instance from './instance';

const signup = (payload) =>
  instance.post('/auth/sign-up', {
    email: payload.email,
    username: payload.username,
    password: payload.password,
  });

export default signup;

export const getEmailCheckCode = (payload) =>
  instance.get(`/email/get-code?email=${payload.email}`);

export const getValidCheck = (payload) =>
  instance.get(`/email/check-valid?code=${payload.code}`);
