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
    startRequest();
    // AGREGAR TOKENS JWT, TRACING HEADERS, LOGS
    return config;
  },
  (error) => Promise.reject(error),
);

// ────────────────────────────────────────────────────────────
// Interceptor de Response
// ────────────────────────────────────────────────────────────
httpClient.interceptors.response.use(
  (response) => {
    endRequest();
    return response;
  },
  (error: AxiosError) => {
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
