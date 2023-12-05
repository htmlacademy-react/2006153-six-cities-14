export const AUTH_KEY: string = 'six-cities';

type token = string;

export const getToken = (): token => {
  const token = localStorage.getItem(AUTH_KEY);

  return token ?? '';
};

export const saveToken = (token: token): void => {
  localStorage.setItem(AUTH_KEY, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_KEY);
};
