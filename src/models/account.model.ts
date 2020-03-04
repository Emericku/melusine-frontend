export interface AccountRequest {
    id?: string;
    clientId?: string,
    password?: string,
    email?: string,
    isBarman: boolean
}

export interface AccountResponse {
    clientId: string,
    email: string,
    isBarman: boolean
}
