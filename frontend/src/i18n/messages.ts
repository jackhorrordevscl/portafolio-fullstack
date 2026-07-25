import type { MessageKey } from "../types/messages";

export const messages: Record<MessageKey, string> = {
    VALIDATION_NAME_TOO_SHORT: "El nombre debe ser de al menos 2 caracteres",
    VALIDATION_NAME_TOO_LONG: "El nombre no puede superar los 100 caracteres",
    VALIDATION_EMAIL_INVALID: "Email no válido",
    VALIDATION_SUBJECT_TOO_SHORT: "El asunto debe ser de al menos 3 caracteres",
    VALIDATION_SUBJECT_TOO_LONG: "El asunto no puede superar los 150 caracteres",
    VALIDATION_MESSAGE_TOO_SHORT: "El mensaje debe ser de al menos 10 caracteres",
    VALIDATION_MESSAGE_TOO_LONG: "El mensaje no puede superar los 2000 caracteres",

    UNKNOWN_ERROR: "Error Desconocido",
    NETWORK_ERROR: "Error de red",
    EMAIL_SEND_FAILED: "No se pudo enviar el mensaje, intentá nuevamente",

    CONTACT_SUCCESS: "Mensaje enviado!",
    CONTACT_ERROR: "Error al enviar mensaje",
};

export const t = (key: MessageKey): string => {
    return messages[key] ?? key;
};