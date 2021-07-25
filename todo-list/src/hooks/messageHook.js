import { userCallback } from 'react';

export const useMessage = () => {
  return userCallback(text => {
    if (window.M && text) {
      window.M.toast({ html: text });
    }
  }, []);
}