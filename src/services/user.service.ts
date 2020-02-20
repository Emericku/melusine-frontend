import axios from 'axios';

import { UserSearchEntry } from "../models/user.model";
import { Page } from "../models/page.model";
import { sleep } from "../utils";
import config from '../config';

class UserService {

    constructor(private isMocked: boolean) { }

    async findByName(name: string): Promise<UserSearchEntry[]> {
        if (this.isMocked) {
            await sleep(300);

            return [
                { id: 'mocked-1', firstName: 'Jason', lastName: 'Mangin', nickName: 'Jazi', credit: 120.20 },
                { id: 'mocked-2', firstName: 'Emeric', lastName: 'Hoerner', nickName: 'Kuri', credit: 20.50 },
                { id: 'mocked-3', firstName: 'Stéphane', lastName: 'Mazzei', nickName: 'Labi', credit: 42.00 },
                { id: 'mocked-4', firstName: 'Brian', lastName: 'Dechoux', nickName: 'Chaxi', credit: 27.00 },
                { id: 'mocked-5', firstName: 'Simon', lastName: 'Bandella', credit: 15.00 }
            ];
        }

        const { data: page } = await axios.get<Page<UserSearchEntry>>(`${config.backendUrl}/users?name=${name}`);
        return page.content;
    }

}

export default new UserService(false);
