import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Use import path to the module under test
import * as globalLoading from '../globalLoading';

describe('globalLoading', () => {
  beforeEach(() => {
    // reset module state
    globalLoading.resetRequests();
  });

  afterEach(() => {
    globalLoading.resetRequests();
    vi.useRealTimers();
  });

  it('shows loader only after debounce delay', async () => {
    vi.useFakeTimers();

    const cb = vi.fn();
    globalLoading.registerLoadingCallback(cb);

    // start a request and advance time less than SHOW_DELAY_MS
    globalLoading.startRequest();
    vi.advanceTimersByTime(100);
    expect(cb).not.toHaveBeenCalled();

    // advance beyond debounce
    vi.advanceTimersByTime(200);
    expect(cb).toHaveBeenCalledWith(true);

    // end request should hide loader
    globalLoading.endRequest();
    expect(cb).toHaveBeenCalledWith(false);
  });

  it('does not flash loader for very short request', () => {
    vi.useFakeTimers();
    const cb = vi.fn();
    globalLoading.registerLoadingCallback(cb);

    globalLoading.startRequest();
    // end before debounce fires
    vi.advanceTimersByTime(100);
    globalLoading.endRequest();
    vi.advanceTimersByTime(200);

    expect(cb).not.toHaveBeenCalled();
  });
});
