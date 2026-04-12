let counter = 0;
let setLoadingCallback: ((v: boolean) => void) | null = null;

export const registerLoadingCallback = (cb: (v: boolean) => void) => {
  setLoadingCallback = cb;
};

export const clearLoadingCallback = () => {
  setLoadingCallback = null;
};

export const startRequest = () => {
  counter += 1;
  if (setLoadingCallback) setLoadingCallback(true);
};

export const endRequest = () => {
  counter = Math.max(0, counter - 1);
  if (counter === 0 && setLoadingCallback) setLoadingCallback(false);
};

export const resetRequests = () => {
  counter = 0;
  if (setLoadingCallback) setLoadingCallback(false);
};

export default {
  registerLoadingCallback,
  clearLoadingCallback,
  startRequest,
  endRequest,
  resetRequests,
};
