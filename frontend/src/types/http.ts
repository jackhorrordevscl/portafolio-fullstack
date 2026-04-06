export interface HttpError {
    type: "API" | "NETWORK" | "UNKNOWN";
    message: string;
    status?: number;
    data?: unknown;
}

export const isHttpError = (error: unknown): error is HttpError => {
    return (
        typeof error === "object" &&
        error !== null &&
        "type" in error &&
        "message" in error
    );
};