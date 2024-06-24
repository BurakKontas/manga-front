import storage from "redux-persist/lib/storage";
import { PersistConfig } from 'redux-persist';
import { ICounterState } from "./Counter";


type PersistConfigsType = {
    counter : PersistConfig<ICounterState>
}

const PersistConfigs: PersistConfigsType = {
    counter: {
        key: 'counter',
        storage,
        whitelist: ['counter'],
    },
}

export default PersistConfigs;