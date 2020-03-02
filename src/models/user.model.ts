import { AccountRequest } from './account.model';

export interface UserSearchEntry {
    id: string;
    firstName: string;
    lastName: string;
    nickName?: string;
    credit: number;
}

export interface UserResponse {
    id: string;
    firstName: string;
    lastName: string;
    nickName: string;
    section: string;
    credit: number;
    isMembership: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface User {
    id? : string
    firstName: string;
    lastName: string;
    nickName?: string;
    section: string;
    credit: number;
    isMembership: boolean;
    account?: AccountRequest;
}

export interface UserCreation {
    id? : string
    firstName: string;
    lastName: string;
    nickName: string;
    section: string;
    isMembership: boolean;
}

export interface ConnectedUser {
    id: string;
    email: string;
}
