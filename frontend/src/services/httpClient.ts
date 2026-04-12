// ══════════════════════════════════════════════════════════════
// GROUND ZERO - HTTP Client (Axios Centralizado)
// ══════════════════════════════════════════════════════════════
import axios, { AxiosError } from "axios";
import { getApiBaseUrl } from "../utils/config";
import type { HttpError } from "../types/http";
import { mapErrorMessages } from "../utils/errorMapper";
import { startRequest, endRequest } from './globalLoading';

// ────────────────────────────────────────────────────────────
// Instancia base
// ────────────────────────────────────────────────────────────

export const httpClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ────────────────────────────────────────────────────────────
// Interceptor de Request
// ────────────────────────────────────────────────────────────
httpClient.interceptors.request.use(
  (config) => {
    // Notify global loader that a request has started. This increments
    // an internal counter so the loader remains visible while multiple
    // concurrent requests are active.
    startRequest();

    // Place to inject auth headers, tracing IDs, or request-level logs.
    // e.g. config.headers.Authorization = `Bearer ${token}`
    return config;
  },
  (error) => Promise.reject(error),
);

// ────────────────────────────────────────────────────────────
// Interceptor de Response
// ────────────────────────────────────────────────────────────
httpClient.interceptors.response.use(
  (response) => {
    // On successful response, decrement the loader counter.
    endRequest();
    return response;
  },
  (error: AxiosError) => {
    // Ensure we always decrement the counter on error as well.
    endRequest();
    // =========================
    // NETWORK ERROR
    // =========================
    if (!error?.response) {
      const normalizedError: HttpError = {
        type: "NETWORK",
        messages: mapErrorMessages("NETWORK_ERROR"),
        status: undefined,
        data: undefined,
      };

      console.error("HTTP Error:", normalizedError);
      return Promise.reject(normalizedError);
    }

    // =========================
    // API ERROR (BACKEND RESPONSE)
    // =========================
    const rawData = error.response.data;
    const rawMessage = (rawData as any)?.message;

    const normalizedError: HttpError = {
      type: "API",
      messages: mapErrorMessages(rawMessage),
      status: error.response.status,
      data: rawData,
    };

    console.error("HTTP Error:", normalizedError);
    return Promise.reject(normalizedError);
  },
);
