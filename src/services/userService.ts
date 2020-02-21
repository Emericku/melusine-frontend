import { UserSearchEntry } from "../models/userSearchEntry.model";
import Page from "../models/page.model";
import User from "../models/user.model";
import { sleep } from "../utils";
import axios from "axios";

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

    async getUsers() : Promise<Page<User>> {
        axios.defaults.headers.common['Authorization'] = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJmci5wb2x5dGVjaCIsImlhdCI6MTU4MjI3MTg1MCwiZXhwIjoxNTgyMzA3ODUwLCJzdWIiOiI4ZmEzYWNhMS1jMGJmLTQ1ODYtYjUxOS1hNzg3OGQ2NTc3YzAiLCJlbWFpbCI6ImVtZXJpYy5ob2VybmVyQGdtYWlsLmNvbSJ9.tANPgb8yMGKbO011EeCPzSmzBzy7nreLbMV6lNEo-Qk";
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        const response = await axios.get(`http://localhost:8080/users`);
        return response.data as Page<User>;
    };

    async createUser(user: User) : Promise<User> {
        axios.defaults.headers.common['Authorization'] = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJmci5wb2x5dGVjaCIsImlhdCI6MTU4MjI3MTg1MCwiZXhwIjoxNTgyMzA3ODUwLCJzdWIiOiI4ZmEzYWNhMS1jMGJmLTQ1ODYtYjUxOS1hNzg3OGQ2NTc3YzAiLCJlbWFpbCI6ImVtZXJpYy5ob2VybmVyQGdtYWlsLmNvbSJ9.tANPgb8yMGKbO011EeCPzSmzBzy7nreLbMV6lNEo-Qk";
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        const body = {
            firstName: user.firstName,
            lastName: user.lastName,
            nickName: user.nickName,
            credit: user.credit,
            section : user.section,
            isMembership: user.isMembership,
            account: null
        }
        const response = await axios.post(`http://localhost:8080/users`, body);
        return response.data as User;
    }

}

export default new UserService();
