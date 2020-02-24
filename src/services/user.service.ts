import axios from 'axios';

import { UserSearchEntry, UserResponse } from "../models/user.model";
import { Page } from "../models/page.model";
import config from '../config';

class UserService {

    async findByName(name: string): Promise<UserSearchEntry[]> {
        const { data: page } = await axios.get<Page<UserSearchEntry>>(`${config.backendUrl}/users/search?name=${name}`);
        return page.content;
    }

    async creditUser(userId: string, credit: number): Promise<UserResponse> {
        const { data: user } = await axios.patch<UserResponse>(`${config.backendUrl}/users/${userId}`, {
            credit
        });

        return user;
    }

}

export default new UserService();
