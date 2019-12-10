import { UserSearchEntry } from "../models/user.model";
import { Page } from "../models/page.model";
import { sleep } from "../utils";

class UserService {

    async findByName(name: string): Promise<Page<UserSearchEntry>> {
        await sleep(300);

        return {
            number: 10,
            size: 5,
            content: [
                { id: 'mocked-1', firstName: 'Jason', lastName: 'Mangin', nickName: 'Jazi' },
                { id: 'mocked-2', firstName: 'Emeric', lastName: 'Hoerner', nickName: 'Kuri' },
                { id: 'mocked-3', firstName: 'Stéphane', lastName: 'Mazzei', nickName: 'Labi' },
                { id: 'mocked-4', firstName: 'Brian', lastName: 'Dechoux', nickName: 'Chaxi' },
                { id: 'mocked-5', firstName: 'Simon', lastName: 'Bandella' }
            ]
        };
    }

}

export default new UserService();
