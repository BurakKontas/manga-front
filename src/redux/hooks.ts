import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit'

import type { RootState, AppDispatch } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const createAppSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
})
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector