import type { MessageKey } from "../types/messages";

export const messages: Record<MessageKey, string> = {
    VALIDATION_NAME_TOO_SHORT: "El nombre debe tener al menos 2 caracteres, chuchatumare",
    VALIDATION_EMAIL_INVALID: "El email no es válido, sacowea",
    VALIDATION_SUBJECT_TOO_SHORT: "El asunto debe ser mas largo que tu pichula (3 caracteres)",
    VALIDATION_MESSAGE_TOO_SHORT: "El mensaje debe durar mas que tu vieja en cuatro",

    UNKNOWN_ERROR: "Error bizarro",
    NETWORK_ERROR: "Error de red red red",

    CONTACT_SUCCESS: "Mensaje exitoosoooooo",
    CONTACT_ERROR: "ANDA A LAAR",
};

export const t = (key: MessageKey): string => {
    return messages[key] ?? key;
};