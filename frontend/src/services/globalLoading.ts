/**
 * globalLoading.ts
 *
 * Simple global request counter to drive a shared loading indicator.
 * - Keeps a counter of active requests to support concurrent requests.
 * - Exposes `registerLoadingCallback` so a UI provider can subscribe
 *   and show/hide a top-level loader when the counter transitions.
 *
 * Usage:
 *  - Call `startRequest()` when a request begins.
 *  - Call `endRequest()` when it finishes (both success and error).
 *  - Register the UI callback from a provider (see `LoadingProvider`).
 */

let counter = 0; // number of active requests
let setLoadingCallback: ((v: boolean) => void) | null = null;

/** Register a callback from the UI layer (LoadingProvider) */
export const registerLoadingCallback = (cb: (v: boolean) => void) => {
  setLoadingCallback = cb;
};

/** Clear the registered callback (called on unmount) */
export const clearLoadingCallback = () => {
  setLoadingCallback = null;
};

/**
 * Mark the start of a request. Increments the counter and notifies the UI
 * to show the loader. Safe to call multiple times for concurrent requests.
 */
export const startRequest = () => {
  counter += 1;
  if (setLoadingCallback) setLoadingCallback(true);
};

/**
 * Mark the end of a request. Decrements the counter and only hides the loader
 * when all tracked requests have finished (counter === 0).
 */
export const endRequest = () => {
  counter = Math.max(0, counter - 1);
  if (counter === 0 && setLoadingCallback) setLoadingCallback(false);
};

/** Force-reset the counter and hide the loader (useful for error recovery) */
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
