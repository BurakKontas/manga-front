import creditSlice, { creditActions, creditSelectors } from "./credit.slice";
import creditAsyncThunks from "./credit.async_thunks";

export type { ICreditState } from "./credit.types";

export default {
    actions: creditActions,
    selectors: creditSelectors,
    slice: creditSlice,
    async_thunks: creditAsyncThunks 
}