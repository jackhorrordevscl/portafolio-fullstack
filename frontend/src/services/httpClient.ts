// ══════════════════════════════════════════════════════════════
// GROUND ZERO - HTTP Client (Axios Centralizado)
// ══════════════════════════════════════════════════════════════
import axios from "axios";
import { getApiBaseUrl } from "../utils/config";
import type { HttpError } from "../types/http";

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
    //AGREGAR TOKENS JWT, TRACING HEADERS, LOGS
    return config;
  },
  (error) => Promise.reject(error),
);

// ────────────────────────────────────────────────────────────
// Interceptor de Response
// ────────────────────────────────────────────────────────────
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let normalizedError: HttpError;

    if (axios.isAxiosError(error)) {
      // 📌 Error con respuesta del backend
      if (error.response) {
        normalizedError = {
          type: "API",
          message:
            error.response.data.message,
          status: error.response.status,
          data: error.response.data,
        };
      }
      // 📌 Error de red
      else if (error.request) {
        normalizedError = {
          type: "NETWORK",
          message: "No se pudo conectar con el servidor",
        };
      }
      // 📌 Error Axios inesperado
      else {
        normalizedError = {
          type: "UNKNOWN",
          message: error.message || "Error desconocido",
        };
      }
    } else {
      // 📌 Error completamente inesperado
      normalizedError = {
        type: "UNKNOWN",
        message: "Ocurrió un error inesperado",
      };
    }

    console.error("HTTP Error:", normalizedError);

    return Promise.reject(normalizedError);
  },
);
