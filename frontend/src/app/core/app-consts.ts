export const apiURL: string = 'http://localhost:3000';

export const ENDPOINTS = {
  JOKES: `${apiURL}/jokes`,
  USER_JOKES: `${apiURL}/user-jokes`,
  AUTH: {
    SIGNIN: `${apiURL}/auth/signin`,
    SIGNUP: `${apiURL}/auth/signup`,
    VERIFY: `${apiURL}/auth/verify`,
  },
  CATEGORIES: `${apiURL}/categories`,
};
