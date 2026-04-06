// ══════════════════════════════════════════════════════════════
// GROUND ZERO - Servicio de Contacto
// ══════════════════════════════════════════════════════════════

import axios from "axios";
import type { ContactFormData, ContactResponse } from "../types";
import { getApiBaseUrl } from "../utils/config";

// ────────────────────────────────────────────────────────────
// Configuración de Axios
// ────────────────────────────────────────────────────────────
const contactApi = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

// ────────────────────────────────────────────────────────────
// Validaciones
// ────────────────────────────────────────────────────────────

/**
 * Valida el formato de email
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida los datos del formulario de contacto
 */
export const validateContactForm = (data: ContactFormData): string[] => {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push("El nombre debe tener al menos 2 caracteres");
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.push("El email no es válido");
  }

  if (!data.subject || data.subject.trim().length < 3) {
    errors.push("El asunto debe tener al menos 3 caracteres");
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push("El mensaje debe tener al menos 10 caracteres");
  }

  return errors;
};

// ────────────────────────────────────────────────────────────
// Funciones del Servicio
// ────────────────────────────────────────────────────────────

/**
 * Envía el formulario de contacto al backend
 */
export const sendContactForm = async (
  data: ContactFormData,
): Promise<ContactResponse> => {
  try {
    // Validar datos antes de enviar
    const validationErrors = validateContactForm(data);
    if (validationErrors.length > 0) {
      return {
        success: false,
        message: validationErrors.join(". "),
      };
    }

    // Enviar al backend
    const response = await contactApi.post<ContactResponse>("/contact", {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      subject: data.subject.trim(),
      message: data.message.trim(),
    });

    return response.data;
  } catch (error) {
    console.error("Error sending contact form:", error);

    if (axios.isAxiosError(error)) {
      // Error de la API
      if (error.response) {
        return {
          success: false,
          message: error.response.data?.message || "Error al enviar el mensaje",
        };
      }

      // Error de red
      if (error.request) {
        return {
          success: false,
          message: "No se pudo conectar con el servidor. Intenta nuevamente.",
        };
      }
    }

    return {
      success: false,
      message: "Ocurrió un error inesperado. Por favor, intenta nuevamente.",
    };
  }
};

/**
 * Sanitiza los datos del formulario para prevenir XSS
 */
export const sanitizeContactFormData = (
  data: ContactFormData,
): ContactFormData => {
  const sanitize = (text: string): string => {
    return text
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;");
  };

  return {
    name: sanitize(data.name),
    email: sanitize(data.email),
    subject: sanitize(data.subject),
    message: sanitize(data.message),
  };
};


