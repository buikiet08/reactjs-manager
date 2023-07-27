import { authService } from "@/services/auth";
import { userService } from "@/services/user";
import { handleError } from "@/utils/handleError";
import { clearUser, getDeleteCheckins, getToken, getUser, setCheckins, setCheckout, setDeleteCheckins, setToken, setUser } from "@/utils/token";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userActions } from "./userReducer";
import { message, notification } from "antd";


export const loginThunkAction = createAsyncThunk('auth/login', async (data, thunkApi) => {
    try {
        thunkApi.dispatch(authActions.toggleLoading(true))
        const res = await authService.login(data)
        setToken(res.token)
        const idUser = res.data?.id || 0
        const user = await userService.getProfile(idUser)
        setUser(user.data)
        if (user?.data.admin === 0) {
            if(!getDeleteCheckins()) {
                const resDelete = await userService.deleteCheckin(idUser)
                if(resDelete.success === true) {
                    setDeleteCheckins(resDelete.message)
                    notification.open({
                        message: 'Thông báo',
                        description:resDelete.success,
                        duration:0
                    });
                }
            }
            const dataCheckins = await userService.getCheckinByDay(idUser)
            if (dataCheckins?.data[0]) {
                const { checkout_time, time_out, checkin_time, time_late, ...other } = dataCheckins.data[0]
                setCheckins({ ...other, checkin_time: checkin_time, time_late: time_late })
                thunkApi.dispatch(userActions.setCheckins({ ...other, checkin_time: checkin_time, time_late: time_late }))
                if (checkout_time) {
                    setCheckout({ ...other, checkout_time: checkout_time, time_out: time_out })
                    thunkApi.dispatch(userActions.setCheckout({ ...other, checkout_time: checkout_time, time_out: time_out }))
                }
            }
        }
        thunkApi.fulfillWithValue(data)
        return user.data
    } catch (err) {
        thunkApi.rejectWithValue(err)
        handleError(err)
        throw err?.response?.data.error
    } finally {
        thunkApi.dispatch(authActions.toggleLoading(false))
    }
})
export const setUserAction = createAsyncThunk('auth/setUser', (user, thunkApi) => {
    console.log(user)
    setUser(user)
    thunkApi.dispatch(authActions.setUser(user))

})

// export const getUserAction = createAsyncThunk('auth,getUser', async (_,thunkApi) => {
//     try {
//         if(getToken()) {
//             const res = await userService.getProfile(getUser()?.id)
//             setUser(res.data)
//             thunkApi.dispatch(authActions.setUser(res.data))
//         }
//     } catch (error) {
        
//     }
// })
// export const logoutThunkAction = createAsyncThunk('auth/logout', async (_,thunkApi) => {
//     thunkApi.dispatch(authActions.logout())
//     clearUser()
// })

export const { reducer: authReducer, actions: authActions, getInitialState } = createSlice({
    initialState: {
        user: getUser(),
        loginLoading: false
    },
    name: 'auth',
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        },
        toggleLoading: (state, action) => {
            state.loginLoading = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginThunkAction.pending, (state) => {
            state.loginLoading = true
            state.status = 'pending'
        })
        builder.addCase(loginThunkAction.fulfilled, (state, action) => {
            state.user = action.payload
            state.status = 'success'
            state.loginLoading = false

        })
        builder.addCase(loginThunkAction.rejected, (state) => {
            state.status = 'error'
            state.loginLoading = false

        })
    }
})