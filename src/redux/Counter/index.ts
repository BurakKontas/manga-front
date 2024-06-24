import counterSlice, { counterActions, counterSelectors } from "./counter.slice";
import counterAsyncThunks from "./counter.async_thunks";

export type { ICounterState } from "./counter.types";

export default {
    actions: counterActions,
    selectors: counterSelectors,
    slice: counterSlice,
    async_thunks: counterAsyncThunks 
}