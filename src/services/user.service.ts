import axios from 'axios';

import { UserResponse, User } from "../models/user.model";
import { Page } from "../models/page.model";
import config from '../config';

class UserService {

    async findByName(name: string): Promise<UserResponse[]> {
        const { data: page } = await axios.get<Page<UserResponse>>(`${config.backendUrl}/users/search?name=${name}`);
        return page.content;
    }

    async creditUser(userId: string, credit: number): Promise<UserResponse> {
        const { data: user } = await axios.patch<UserResponse>(`${config.backendUrl}/users/${userId}`, {
            credit
        });

        return user;
    }

    async getUsers() : Promise<Page<UserResponse>> {
        const { data: page } = await axios.get<Page<UserResponse>>(`${config.backendUrl}/users`);
        return page;
    };

    async createUser(userRequest: User) : Promise<UserResponse> {
        const { data: user } = await axios.post<UserResponse>(`${config.backendUrl}/users`, userRequest);
        return user;
    }

    async updateUser(userRequest: User) : Promise<UserResponse> {
        const body = {
            firstName: userRequest.firstName,
            lastName: userRequest.lastName,
            nickName: userRequest.nickName,
            section : userRequest.section,
            isMembership: userRequest.isMembership,
        }
        const { data : user} = await axios.put<UserResponse>(`${config.backendUrl}/users/${userRequest.id}`, body);
        return user;
    }

    async deleteUser(id: string) : Promise<void> {
        await axios.delete(`${config.backendUrl}/users/${id}`);
    }

}

export default new UserService();
