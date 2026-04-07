import type { MessageKey } from "../types/messages";

const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const VALID_MESSAGES: MessageKey[] = [
  "VALIDATION_NAME_TOO_SHORT",
  "VALIDATION_EMAIL_INVALID",
  "VALIDATION_SUBJECT_TOO_SHORT",
  "VALIDATION_MESSAGE_TOO_SHORT",
  "UNKNOWN_ERROR",
  "NETWORK_ERROR",
  "CONTACT_SUCCESS",
  "CONTACT_ERROR",
];

const mapSingleMessage = (message: unknown): MessageKey => {
  if (typeof message !== "string") {
    return "UNKNOWN_ERROR";
  }

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
    normalized.includes("fetch") ||
    normalized.includes("timeout")
  ) {
    return "NETWORK_ERROR";
  }
  return "UNKNOWN_ERROR";
};

export const mapErrorMessages = (
  input: unknown,
): MessageKey[] => {
  if (!input) return ["UNKNOWN_ERROR"];

  const messages: unknown[] = Array.isArray(input)
  ? input
  : [input];

  const mapped = messages.map(mapSingleMessage);

  const valid = mapped.filter(
    (msg): msg is MessageKey =>
      VALID_MESSAGES.includes(msg),
  );

  const unique = Array.from(new Set(valid));

  return unique.length > 0 ? unique : ["UNKNOWN_ERROR"];
};
