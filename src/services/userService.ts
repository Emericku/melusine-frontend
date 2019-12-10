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
                { id: 'mocked-1', firstName: 'Jason', lastName: 'Mangin', nickName: 'Jazi', credit: 120.20 },
                { id: 'mocked-2', firstName: 'Emeric', lastName: 'Hoerner', nickName: 'Kuri', credit: 20.50 },
                { id: 'mocked-3', firstName: 'Stéphane', lastName: 'Mazzei', nickName: 'Labi', credit: 42.00 },
                { id: 'mocked-4', firstName: 'Brian', lastName: 'Dechoux', nickName: 'Chaxi', credit: 27.00 },
                { id: 'mocked-5', firstName: 'Simon', lastName: 'Bandella', credit: 15.00 }
            ]
        };
    }

}

export default new UserService();
