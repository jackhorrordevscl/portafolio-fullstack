import type { MessageKey } from "./messages";

export interface HttpError {
    type: "API" | "NETWORK" | "UNKNOWN";
    messages: MessageKey[];
    status?: number;
    data?: unknown;
}

export const isHttpError = (error: unknown): error is HttpError => {
    if (typeof error !== "object" || error === null) 
        return false;
    const e = error as Partial<HttpError>;

    return (
        typeof e.type === "string" &&
        Array.isArray(e.messages)
    );    
};