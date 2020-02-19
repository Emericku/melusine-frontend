export default interface User {
    id: string;
    firstName: string;
    lastName: string;
    nickName?: string;
    credit: number;
    section : string;
    isMembership: boolean;
    createdAt?: string;
    updatedAt?: string;
}