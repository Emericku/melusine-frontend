import axios from 'axios';

import { AccountResponse, AccountRequest } from "../models/account.model";
import config from '../config';

class AccountService {

    async createAccount(request: AccountRequest) : Promise<AccountResponse> {
        const { data : account} = await axios.post<AccountResponse>(`${config.backendUrl}/account`, request);
        return account;
    }

    async updateAccount(request: AccountRequest) : Promise<AccountResponse> {
        const { data : account} = await axios.patch<AccountResponse>(`${config.backendUrl}/account`, request);
        return account;
    }

}

export default new AccountService();
