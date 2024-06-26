import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import PersistConfigs from "./persist.config";

import auth from "./Auth"
import credit from "./Credit"

const rootReducer = {
    auth: persistReducer(PersistConfigs.auth, auth.slice),
    credit: persistReducer(PersistConfigs.credit, credit.slice),
};

// Configure store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

// Persisted store
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;