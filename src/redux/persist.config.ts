import storage from "redux-persist/lib/storage";
import { PersistConfig } from 'redux-persist';
import { IAuthState } from "./Auth";


type PersistConfigsType = {
    auth : PersistConfig<IAuthState>
}

const PersistConfigs: PersistConfigsType = {
    auth: {
        key: 'auth',
        storage,
        whitelist: ['isLoggedIn', 'token', 'refreshToken'],
    },
}

export default PersistConfigs;