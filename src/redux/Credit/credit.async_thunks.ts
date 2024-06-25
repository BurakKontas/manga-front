import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { ICreditState, IFetchCredit, IFetchCreditParams } from "./credit.types";
import { PaymentService } from "../../service/Payment";

//change IFetchCredit to void if you don't need to return anything
//change IFetchCreditParams to void if you don't need to pass any parameters
const fetchCredit: AsyncThunk<IFetchCredit, void , any> = createAsyncThunk(
    "posts/fetchCredit",
    async (): Promise<IFetchCredit> => {
        try {
            var paymentService = new PaymentService();
            var response = await paymentService.getUserCredit();
            return { credit: response.value.credit };
        } catch (error) {
            throw error; 
        }
    }
);

export default {
    fetchCredit
}