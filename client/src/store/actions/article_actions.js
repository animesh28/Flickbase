import * as articles from './index'
import axios from 'axios'
import {getAuthHeader} from '../../utils/tools'

axios.defaults.headers.post['Content-Type'] = 'application/json'

export const getArticle = (id) => {
    return async(dispatch) => {
        try{
            const req = await axios.get(`/api/articles/get_article/${id}`)
            dispatch(articles.getArticle(req.data[0]))
        } catch(error) {
            dispatch(articles.globalError(error.response.data.message))
        }
    }
}

export const getArticles = (sort) => {
    return async(dispatch, getState) => {
        try{
            const arts = await axios.post(`/api/articles/loadmore`, sort)
            let newArts = [...arts.data]
            const prevArts = getState().articles.articles

            if(prevArts) {
                newArts = [...prevArts, ...arts.data]
            }

            dispatch(articles.getArticles(newArts))
        } catch(error) {
            dispatch(articles.globalError('Error occurred while fetching articles'))
        }
    }
}

export const addArticles = (article) => {
    return async(dispatch) => {
        try{
            const req = await axios.post(`/api/articles/admin/add_article`, article, getAuthHeader)
            dispatch(articles.addArticles(req.data))
            dispatch(articles.globalSuccess("Article Posted Successfully"))
        } catch(error) {
            dispatch(articles.globalError(error.response.data.message))
        }
    }
}

export const getPaginateArticles = (page=1,limit=5) => {
    return async(dispatch) => {
        try {
            const req = await axios.post(`/api/articles/admin/paginate`,{
                page,limit
            },getAuthHeader)

            dispatch(articles.getPaginateArticles(req.data))
        } catch(error) {
            dispatch(articles.globalError(error.response.data.message))
        }
    }
}