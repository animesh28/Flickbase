import React, {useReducer, useEffect} from "react"
import { Grid, Button } from "@mui/material"
import ArticleCard from "../../utils/articleCard"

import { useSelector, useDispatch } from 'react-redux'
import { getArticles } from "../../store/actions/article_actions"

const initialSort = { sortBy: "_id", order: "desc", limit: 8, skip: 0 }

const Home = () => {

  const [sort, setSort] = useReducer(
    (state, newState) => ({...state, ...newState})
    ,initialSort
  )

  const articles = useSelector(state => state.articles)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(articles && !articles.articles){
      dispatch(getArticles(initialSort))
    }
  },[dispatch,articles])
  return(
    <>
    <div>
       <Grid container spacing={2} className="article_card">
         { articles && articles.articles ?
            articles.articles.map((item) => (
            <Grid key={item._id} item xs={12} sm={6} lg={3}>
              <ArticleCard key={item._id} article={item}/>
            </Grid>
            ))
         :null}
       </Grid>
    </div>

    <div className="container d-flex justify-content-center align-items-center mt-3">
      <Button variant="outlined" onClick={()=>{
          let skip = sort.skip + sort.limit
          dispatch(getArticles({...sort,skip:skip}))
          setSort({skip:skip})
        }}>Load More</Button>
    </div>
    </>
  )
}

export default Home