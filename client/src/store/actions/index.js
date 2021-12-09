import {
    GET_ARTICLES,
    GLOBAL_ERROR,
    GLOBAL_SUCCESS,
    CLEAR_NOTIFICATION,
    AUTH_USER
} from '../types'

/////////articles////////////
export const getArticles = (articles) => ({
    type: GET_ARTICLES,
    payload: articles
})

/////////notification////////////
export const globalError = (msg) => ({
    type: GLOBAL_ERROR,
    payload: msg
})

export const globalSuccess = (msg) => ({
    type: GLOBAL_SUCCESS,
    payload: msg
})

export const clearNotification = () => ({
    type: CLEAR_NOTIFICATION
})

/////////authentication////////////

export const authUser = (user) => ({
    type: AUTH_USER,
    payload: user
})