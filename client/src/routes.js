import React, { useEffect, useState } from "react"
import { Switch, Route, BrowserRouter} from 'react-router-dom'
import GoogleFontLoader from 'react-google-font-loader';
import MainLayout from "./hoc/mainLayout";

import Home from './components/home'
import Header from './components/navigation/header'
import Auth from "./components/auth";

import { useDispatch, useSelector } from 'react-redux'
import { isAuthUser } from "./store/actions/user_actions";
import Loader from "./utils/loader";
import Dashboard from './components/dashboard'
import Profile from "./components/dashboard/profile";
import Article from "./components/dashboard/articles";
import ArticleID from './components/articles/article'
import AddArticle from './components/dashboard/articles/add'
import AuthGuard from "./hoc/authGuard";

const Routes = () => {

  const [loading, setLoading] = useState(true) 
  const dispatch = useDispatch()
  const users = useSelector( state => state.users )

  useEffect(() => {
      dispatch(isAuthUser())
  },[dispatch])

  useEffect(() => {
    if(users.auth !== null) {
      setLoading(false)
    }
  },[users])

  return(
    <BrowserRouter>
    <Header/>
    {
      loading ?
      <>
        <Loader/>
      </> :
      <MainLayout>
        <Switch>
          <Route path="/dashboard/profile" component={ AuthGuard(Profile) } />
          <Route path="/dashboard/articles/add" component={ AuthGuard(AddArticle,true) } />
          <Route path="/dashboard/articles" component={ AuthGuard(Article,true) } />
          <Route path="/dashboard" component={ AuthGuard(Dashboard) } />
          <Route path="/auth" component={ Auth } />
          <Route path="/article/:id" component={ArticleID} />
          <Route path="/" component={ Home } />
        </Switch>
      </MainLayout>
    }
    
      <GoogleFontLoader
        fonts={[
          {font: 'Roboto', weights: [300,400,900]},
          {font: 'Fredoka One'}
        ]}
      />
    </BrowserRouter>
  )
}

export default Routes