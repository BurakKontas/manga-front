import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { IFetchCredit, IFetchCreditParams } from "./credit.types";
import { ICreditState } from ".";

import AsyncThunks from "./credit.async_thunks";

class CreditExtraReducers {

    private static fetchCredit = {
        //@ts-ignore
        pending(state: ICreditState, action: Pending<void>) {
        },
        fulfilled(state: ICreditState, action: Fulfilled<IFetchCredit, void>) {
            state.credit = action.payload.credit;
        },
        //@ts-ignore
        rejected(state: ICreditState, action: Rejected<void>) {
        }
    }

    private static addCasesToBuilder(builder: ActionReducerMapBuilder<ICreditState>, name: keyof typeof AsyncThunks) {
        builder.addCase(AsyncThunks[name].pending, this[name].pending);
        builder.addCase(AsyncThunks[name].fulfilled, this[name].fulfilled);
        builder.addCase(AsyncThunks[name].rejected, this[name].rejected);
    }
    
    static extraReducers(builder: ActionReducerMapBuilder<ICreditState>) {
        this.addCasesToBuilder(builder, "fetchCredit");

        return builder;
    }
}

export default CreditExtraReducers;

// Types (do not edit)
type Pending<P> = PayloadAction<void, string, { arg: P; requestId: string; requestStatus: "pending"; }, never>
type Fulfilled<T, P> = PayloadAction<T, string, { arg: P; requestId: string; requestStatus: "fulfilled"; }, never>
type Rejected<P> = PayloadAction<unknown, string, { arg: P; requestId: string; requestStatus: "rejected"; aborted: boolean; condition: boolean; } & ({ rejectedWithValue: true;} | ({ rejectedWithValue: false; } & {})), unknown>
