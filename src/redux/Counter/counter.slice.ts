import { createAppSlice } from "../hooks";
import { ICounterState } from "./counter.types";

import CounterReducers from "./counter.reducers";
import CounterSelectors from "./counter.selectors";
import CounterExtraReducers from "./counter.extra_reducers";

const initialState: ICounterState = {
    counter: 0
};

export const counterSlice = createAppSlice({
    name: "counter",
    initialState,
    selectors: CounterSelectors.selectors(),
    reducers: CounterReducers.reducers(),
    extraReducers: (builder) => CounterExtraReducers.extraReducers(builder),
});

// Action creators are generated for each case reducer function
export const counterActions = counterSlice.actions;
export const counterSelectors = counterSlice.selectors;

export default counterSlice.reducer;