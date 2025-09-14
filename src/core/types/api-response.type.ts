export type ApiResponse<T> = {
    sysMsg: string;
    success: boolean;
    object: T;
};
