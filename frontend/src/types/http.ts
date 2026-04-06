export interface HttpError {
    type: "API" | "NETWORK" | "UNKNOWN";
    message: string;
    status?: number;
    data?: unknown;
}