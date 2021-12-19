import * as articles from './index'
import axios from 'axios'

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