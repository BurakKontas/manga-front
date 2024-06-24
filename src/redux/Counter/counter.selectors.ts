import { ICounterState } from "./counter.types";

class CounterSelectors {

    private static getCounter(state: ICounterState) {
        return state.counter;
    }

    static selectors() {
        return {
            getCounter: this.getCounter,
        };
    }
}

export default CounterSelectors;