import instance from './instance';

const login = (payload) =>
  instance.post('/auth/sign-in', {
    email: payload.email,
    password: payload.password,
  });

export default login;
