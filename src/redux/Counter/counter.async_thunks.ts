import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { IFetchCounter, IFetchCounterParams } from "./counter.types";

//change IFetchCounter to void if you don't need to return anything
//change IFetchCounterParams to void if you don't need to pass any parameters
const fetchPosts: AsyncThunk<IFetchCounter, IFetchCounterParams , any> = createAsyncThunk(
    "posts/fetchPosts",
    async ({ counter }: IFetchCounterParams): Promise<IFetchCounter> => {
        try {
            //api response example
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    let randomNumber = Math.floor(Math.random() * 100);
                    if (randomNumber % 2 === 0) {
                        resolve({ counter });
                    } else {
                        reject("An error occurred while fetching posts.");
                    }
                }, 3000)
            });
        } catch (error) {
            throw error; 
        }
    }
);

export default {
    fetchPosts
}