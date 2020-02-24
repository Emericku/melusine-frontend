export interface UserSearchEntry {
    id: string;
    firstName: string;
    lastName: string;
    nickName?: string;
    credit: number;
}

export interface UserResponse {
    firstName: string;
    lastName: string;
    nickName: string;
    section: string;
    credit: number;
    isMembership: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ConnectedUser {
    id: string;
    email: string;
}
