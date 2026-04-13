import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock globalLoading to spy on startRequest/endRequest
vi.mock('../globalLoading', () => {
  return {
    startRequest: vi.fn(),
    endRequest: vi.fn(),
    registerLoadingCallback: vi.fn(),
    clearLoadingCallback: vi.fn(),
    resetRequests: vi.fn(),
  };
});

import { httpClient } from '../httpClient';
import * as globalLoading from '../globalLoading';

describe('httpClient interceptors', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls startRequest on request', () => {
    // get the registered request interceptor function
    const handler = (httpClient.interceptors.request as any).handlers[0].fulfilled;
    handler({});
    expect(globalLoading.startRequest).toHaveBeenCalled();
  });

  it('calls endRequest on response and on error', async () => {
    const resHandler = (httpClient.interceptors.response as any).handlers[0].fulfilled;
    const errHandler = (httpClient.interceptors.response as any).handlers[0].rejected;

    // simulate response
    resHandler({});
    expect(globalLoading.endRequest).toHaveBeenCalled();

    // simulate error and await the rejected promise to avoid unhandled rejection
    await errHandler({}).catch(() => {});
    expect(globalLoading.endRequest).toHaveBeenCalled();
  });
});
