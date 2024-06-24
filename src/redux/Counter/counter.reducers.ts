import { PayloadAction } from "@reduxjs/toolkit";
import { ICounterState } from "./counter.types";

class CounterReducers {

    private static increment(state: ICounterState, action: PayloadAction<number>) {
        state.counter += action.payload;
    }

    private static decrement(state: ICounterState, action: PayloadAction<number>) {
        state.counter -= action.payload;
    }

    private static reset(state: ICounterState) {
        state.counter = 0;
    }
    
    static reducers() {
        return {
            increment: this.increment,
            decrement: this.decrement,
            reset: this.reset,
        }    
    }
}

export default CounterReducers;