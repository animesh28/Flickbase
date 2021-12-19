import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getArticle } from '../../../store/actions/article_actions'

const ArticleID = (props) => {
    const { current } = useSelector(state => state.articles)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getArticle(props.match.params.id))
    },[dispatch, props.match.params.id])
    return(
        <>
            Article 
        </>
    )
}

export default ArticleID