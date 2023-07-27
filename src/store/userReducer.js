import { userService } from "@/services/user";
import { handleError } from "@/utils/handleError";
import { clearCheckins, clearCheckout, getCheckins, getCheckout, setCheckins, setCheckout } from "@/utils/token";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

export const checkinAction = createAsyncThunk('user/checkin', async (data, thunkApi) => {
    try {
        thunkApi.dispatch(userActions.togglecheckinLoading(true))
        const res = await userService.checkin(data)
        console.log(res)
        setCheckins(res.data)
        thunkApi.dispatch(userActions.setCheckins(res.data))
        message.success(res.message)
        thunkApi.fulfillWithValue(data)
        return res.data
    } catch (err) {
        thunkApi.rejectWithValue(err)
        handleError(err)
        throw err?.response?.data.error
    } finally {
        thunkApi.dispatch(userActions.togglecheckinLoading(false))
    }
})

export const checkoutAction = createAsyncThunk('user/checkout', async (data, thunkApi) => {
    try {
        thunkApi.dispatch(userActions.togglecheckoutLoading(true))
        const res = await userService.checkout(data)
        console.log('vào store check out', res.data)
        setCheckout(res.data)
        thunkApi.dispatch(userActions.setCheckout(res.data))
        message.success(res.message)
        thunkApi.fulfillWithValue(data)
        return res.data
    } catch (err) {
        thunkApi.rejectWithValue(err)
        handleError(err)
        throw err?.response?.data.error
    } finally {
        thunkApi.dispatch(userActions.togglecheckoutLoading(false))
    }
})

export const cleartCheckinsAction = createAsyncThunk('user/clearCheckins', async (data, thunkApi) => {
    thunkApi.dispatch(userActions.clearCheckins())
    thunkApi.dispatch(userActions.clearCheckout())
    clearCheckins()
    clearCheckout()

})

export const { reducer: userReducer, actions: userActions, getInitialState } = createSlice({
    initialState: {
        user: {
            checkin: getCheckins(),
            checkout: getCheckout()
        },
        checkinLoading: false,
        checkoutLoading: false
    },
    name: 'user',
    reducers: {
        setCheckins: (state, action) => {
            state.user.checkin = action.payload
        },
        clearCheckins: (state, action) => {
            state.user.checkin = null
        },
        togglecheckinLoading: (state, action) => {
            state.checkinLoading = action.payload
        },
        setCheckout: (state, action) => {
            state.user.checkout = action.payload
        },
        clearCheckout: (state, action) => {
            state.user.checkout = null
        },
        togglecheckoutLoading: (state, action) => {
            state.checkoutLoading = action.payload

        }
    }
})