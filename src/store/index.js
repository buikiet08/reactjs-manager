import { ENV } from '@/config'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authReducer } from './authReducer'
import { userReducer } from './userReducer'

const reducers = combineReducers({
    auth: authReducer,
    user:userReducer
})

export const store = configureStore({
    reducer: reducers,
    devTools: ENV === 'development'
})