export interface UserSearchEntry {
    id: string;
    firstName: string;
    lastName: string;
    nickName?: string;
    credit: number;
}

export interface ConnectedUser {
    id: string;
    email: string;
}
