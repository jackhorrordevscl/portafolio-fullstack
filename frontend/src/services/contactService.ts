// ══════════════════════════════════════════════════════════════
// GROUND ZERO - Servicio de Contacto
// ══════════════════════════════════════════════════════════════
import type { ContactFormData, ContactResponse } from "../types";
import { httpClient } from "./httpClient";
import type { HttpError } from "../types/http";
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
    //VALIDACION DE DATOS ANTES DEL ENVÍO
    const validationErrors = validateContactForm(data);
    if (validationErrors.length > 0) {
      return {
        success: false,
        message: validationErrors.join(". "),
      };
    }

    //AQUI SE ENVIA AL BACKEND
    const response = await httpClient.post<ContactResponse>("/contact", {
      name: data.name.trim(),
      email: data.email.trim().toLocaleLowerCase(),
      subject: data.subject.trim(),
      message: data.message.trim(),
    });

    return response.data;
  } catch (error) {
    const httpError = error as HttpError;

    return {
      success: false,
      message: httpError.message,
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


