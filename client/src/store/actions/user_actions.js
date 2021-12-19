import * as users from './index'
import axios from 'axios'
import { getAuthHeader, removeCookie } from '../../utils/tools'

axios.defaults.headers.post['Content-Type'] = 'application/json'

export const registerUser = (values) => {
    return async (dispatch) => {
        try{

            const user = await axios.post(`api/users/register`, {
                email: values.email,
                password: values.password
            })

            dispatch(users.authUser({data: user.data, auth: true}))
            dispatch(users.globalSuccess('Welcome! Check your email to validate your account'))

        } catch(error) {
            dispatch(users.globalError(error.response.data.message))
        }
    }
}

export const signInUser = (values) => {
    return async (dispatch) => {
        try{

            const user = await axios.post(`api/users/login`, {
                email: values.email,
                password: values.password
            })

            dispatch(users.authUser({data: user.data, auth: true}))
            dispatch(users.globalSuccess('Welcome back!'))

        } catch(error) {
            dispatch(users.globalError(error.response.data.message))
        }
    }
}

export const isAuthUser = () => {
    return async(dispatch) => {
        try{
            if(!getAuthHeader()) {
                throw new Error()
            }
            const user = await axios.get(`/api/users/isauth`, getAuthHeader)
            dispatch(users.authUser({data: user.data, auth: true}))
        } catch(error) {
            dispatch(users.authUser({data: {}, auth: false}))
        }
    }
}

export const signOutUser = () => {
    return async(dispatch) => {
        removeCookie()
        dispatch(users.signOut())
    }
}