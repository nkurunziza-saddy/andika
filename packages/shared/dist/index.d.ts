export interface User {
    id: string;
    name: string;
    email: string;
}
export type ApiResponse<T> = {
    success: boolean;
    data?: T;
    error?: string;
};
export declare const API_BASE_URL = "http://localhost:3000";
export declare const createApiResponse: <T>(data: T) => ApiResponse<T>;
export declare enum UserRole {
    ADMIN = "admin",
    USER = "user"
}
//# sourceMappingURL=index.d.ts.map