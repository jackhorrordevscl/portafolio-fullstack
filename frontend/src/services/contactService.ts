// ══════════════════════════════════════════════════════════════
// GROUND ZERO - Servicio de Contacto
// ══════════════════════════════════════════════════════════════
import type { ContactFormData } from "../types";
import { httpClient } from "./httpClient";

import type { MessageKey } from "../types/messages";
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
export const validateContactForm = (
  data: ContactFormData,
): MessageKey[] => {
  const errors: MessageKey[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push("VALIDATION_NAME_TOO_SHORT");
  } else if (data.name.trim().length > 100) {
    errors.push("VALIDATION_NAME_TOO_LONG");
  }
  if (!data.email || !validateEmail(data.email)) {
    errors.push("VALIDATION_EMAIL_INVALID");
  }
  if (!data.subject || data.subject.trim().length < 3) {
    errors.push("VALIDATION_SUBJECT_TOO_SHORT");
  } else if (data.subject.trim().length > 150) {
    errors.push("VALIDATION_SUBJECT_TOO_LONG");
  }
  if (!data.message || data.message.trim().length < 10) {
    errors.push("VALIDATION_MESSAGE_TOO_SHORT");
  } else if (data.message.trim().length > 2000) {
    errors.push("VALIDATION_MESSAGE_TOO_LONG");
  }

  return errors;
}

// ────────────────────────────────────────────────────────────
// Funciones del Servicio
// ────────────────────────────────────────────────────────────

/**
 * Envía el formulario de contacto al backend
 */
export const sendContactForm = async (
  data: ContactFormData,
): Promise<void> => {
  const validationErrors = validateContactForm(data);

  if (validationErrors.length > 0) {
    throw {
      type: "VALIDATION",
      messages: validationErrors,
    };
  }
  await httpClient.post("/contact", {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    subject: data.subject.trim(),
    message: data.message.trim(),
    website: data.website ?? "",
  });
};


