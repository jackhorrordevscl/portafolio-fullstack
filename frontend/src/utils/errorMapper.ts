import type { MessageKey } from "../types/messages";

const VALID_MESSAGES: MessageKey[] = [
  "VALIDATION_NAME_TOO_SHORT",
  "VALIDATION_EMAIL_INVALID",
  "VALIDATION_SUBJECT_TOO_SHORT",
  "VALIDATION_MESSAGE_TOO_SHORT",
  "EMAIL_SEND_FAILED",
  "UNKNOWN_ERROR",
  "NETWORK_ERROR",
  "CONTACT_SUCCESS",
  "CONTACT_ERROR",
];

const mapSingleMessage = (message: unknown): MessageKey => {
  if (typeof message !== "string") {
    return "UNKNOWN_ERROR";
  }

  const normalized = message.trim().toUpperCase();

  if (VALID_MESSAGES.includes(normalized as MessageKey)) {
    return normalized as MessageKey;
  }

  //RED /CONEXIÓN (errores que no vienen del backend, sino de fetch/axios)
  const lower = normalized.toLowerCase();
  if (
    lower.includes("network") ||
    lower.includes("fetch") ||
    lower.includes("timeout")
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
