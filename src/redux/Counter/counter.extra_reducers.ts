import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { IFetchCounter, IFetchCounterParams } from "./counter.types";
import { ICounterState } from ".";

import AsyncThunks from "./counter.async_thunks";

class CounterExtraReducers {

    private static fetchPosts = {
        pending(state: ICounterState, action: Pending<IFetchCounterParams>) {
            console.log("Pending:", state, action)
        },
        fulfilled(state: ICounterState, action: Fulfilled<IFetchCounter, IFetchCounterParams>) {
            console.log("Fullfilled:", state, action)
        },
        rejected(state: ICounterState, action: Rejected<IFetchCounterParams>) {
            console.log("Rejected:", state, action)
        }
    }

    private static addCasesToBuilder(builder: ActionReducerMapBuilder<ICounterState>, name: keyof typeof AsyncThunks) {
        builder.addCase(AsyncThunks[name].pending, this[name].pending);
        builder.addCase(AsyncThunks[name].fulfilled, this[name].fulfilled);
        builder.addCase(AsyncThunks[name].rejected, this[name].rejected);
    }
    
    static extraReducers(builder: ActionReducerMapBuilder<ICounterState>) {
        this.addCasesToBuilder(builder, "fetchPosts");

        return builder;
    }
}

export default CounterExtraReducers;

// Types (do not edit)
type Pending<P> = PayloadAction<void, string, { arg: P; requestId: string; requestStatus: "pending"; }, never>
type Fulfilled<T, P> = PayloadAction<T, string, { arg: P; requestId: string; requestStatus: "fulfilled"; }, never>
type Rejected<P> = PayloadAction<unknown, string, { arg: P; requestId: string; requestStatus: "rejected"; aborted: boolean; condition: boolean; } & ({ rejectedWithValue: true;} | ({ rejectedWithValue: false; } & {})), unknown>
