import { Section } from './section.model';

export default interface User {
    id?: string;
    firstName: string;
    lastName: string;
    nickName?: string;
    credit: number;
    section : Section;
    isMembership: boolean;
    createdAt?: string;
    updatedAt?: string;
}