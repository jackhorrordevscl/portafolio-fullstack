import type { MessageKey } from "../types/messages";

const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const mapSingleMessage = (message: string): MessageKey => {
  const normalized = normalizeText(message);

  //VALIDACIÓN DE EMAIL
  if (normalized.includes("email") && normalized.includes("valido")) {
    return "VALIDATION_EMAIL_INVALID";
  }
  //NOMBRE
  if (normalized.includes("nombre") && normalized.includes("2")) {
    return "VALIDATION_NAME_TOO_SHORT";
  }
  //ASUNTO
  if (normalized.includes("asunto") && normalized.includes("3")) {
    return "VALIDATION_SUBJECT_TOO_SHORT";
  }
  //MENSAJE
  if (normalized.includes("mensaje") && normalized.includes("10")) {
    return "VALIDATION_MESSAGE_TOO_SHORT";
  }
  //RED /CONEXIOŃ
  if (
    normalized.includes("network") ||
    normalized.includes("conexion") ||
    normalized.includes("servidor") ||
    normalized.includes("fetch")
  ) {
    return "NETWORK_ERROR";
  }
  return "UNKNOWN_ERROR";
};

export const mapErrorMessages = (
  input: string | string[] | undefined,
): MessageKey[] => {
  if (!input) return ["UNKNOWN_ERROR"];

  const messages = Array.isArray(input) ? input : [input];

  return messages.map(mapSingleMessage);
};
