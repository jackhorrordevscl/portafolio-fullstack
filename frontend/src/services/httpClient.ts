// ══════════════════════════════════════════════════════════════
// GROUND ZERO - HTTP Client (Axios Centralizado)
// ══════════════════════════════════════════════════════════════
import axios, { AxiosError } from "axios";
import { getApiBaseUrl } from "../utils/config";
import type { HttpError } from "../types/http";
import { mapErrorMessages } from "../utils/errorMapper";

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
    // AGREGAR TOKENS JWT, TRACING HEADERS, LOGS
    return config;
  },
  (error) => Promise.reject(error),
);

// ────────────────────────────────────────────────────────────
// Interceptor de Response
// ────────────────────────────────────────────────────────────
httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // =========================
    // NETWORK ERROR
    // =========================
    if (!error?.response) {
      const normalizedError: HttpError = {
        type: "NETWORK",
        messages: ["NETWORK_ERROR"],
        status: undefined,
        data: error,
      };

      console.error("HTTP Error:", normalizedError);
      return Promise.reject(normalizedError);
    }

    // =========================
    // API ERROR (BACKEND RESPONSE)
    // =========================
    const normalizedError: HttpError = {
      type: "API",
      messages: mapErrorMessages(
        (error.response.data as { 
          message?: string | string[] 
        })?.message
      ),
      status: error.response.status,
      data: error.response.data,
    };

    console.error("HTTP Error:", normalizedError);
    return Promise.reject(normalizedError);
  },
);
