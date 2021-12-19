import {
    GET_ARTICLE,
    GET_ARTICLES,
    GLOBAL_ERROR,
    GLOBAL_SUCCESS,
    CLEAR_NOTIFICATION,
    AUTH_USER,
    SIGN_OUT,
    SITE_LAYOUT
} from '../types'

/////////articles////////////
export const getArticle = (article) => ({
    type: GET_ARTICLE,
    payload: article
})

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

export const signOut = () => ({
    type: SIGN_OUT
})

/////////site////////////

export const appLayout = (layout) => ({
    type: SITE_LAYOUT,
    payload: layout
})