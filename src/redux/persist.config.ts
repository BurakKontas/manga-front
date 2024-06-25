import storage from "redux-persist/lib/storage";
import { PersistConfig } from 'redux-persist';
import { IAuthState } from "./Auth";
import { ICreditState } from "./Credit";


type PersistConfigsType = {
    auth : PersistConfig<IAuthState>,
    credit: PersistConfig<ICreditState>,
}

const PersistConfigs: PersistConfigsType = {
    auth: {
        key: 'auth',
        storage,
        whitelist: [''],
    },
    credit: {
        key: 'credit',
        storage,
        whitelist: [''],
    }
}

export default PersistConfigs;