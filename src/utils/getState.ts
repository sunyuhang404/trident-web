import 'crypto';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const getState = (len: number = 32): string => {
  const array = new Uint8Array(len);
  window.crypto.getRandomValues(array);

  let res = '';

  for (let i = 0; i < len; i++) {
    res += characters.charAt(array[i] % characters.length);
  }
  return res;
};
