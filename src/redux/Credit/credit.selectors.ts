import { ICreditState } from "./credit.types";

class CreditSelectors {

    private static getCredit(state: ICreditState) {
        return state.credit;
    }

    static selectors() {
        return {
            getCredit: this.getCredit,
        };
    }
}

export default CreditSelectors;