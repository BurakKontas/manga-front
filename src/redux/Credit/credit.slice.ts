import { createAppSlice } from "../hooks";
import { ICreditState } from "./credit.types";

import CreditReducers from "./credit.reducers";
import CreditSelectors from "./credit.selectors";
import CreditExtraReducers from "./credit.extra_reducers";

const initialState: ICreditState = {
    credit: 0
};

export const creditSlice = createAppSlice({
    name: "credit",
    initialState,
    selectors: CreditSelectors.selectors(),
    reducers: CreditReducers.reducers(),
    extraReducers: (builder) => CreditExtraReducers.extraReducers(builder),
});

export const creditActions = creditSlice.actions;
export const creditSelectors = creditSlice.selectors;

export default creditSlice.reducer;