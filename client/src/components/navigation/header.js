import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import SideDrawer from "./sideNavigation";
import { showToast } from '../../utils/tools';
import { useDispatch, useSelector } from 'react-redux'
import { clearNotification } from '../../store/actions'
import { signOutUser as signOut } from '../../store/actions/user_actions'
import { appLayout } from "../../store/actions/site_actions";
import {globalSuccess} from '../../store/actions'

const Header = (props) => {
    
    const [layout, setLayout] = useState('')
    const notifications = useSelector(state => state.notifications)
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)

    const signOutUser = () => {
        dispatch(signOut())
        props.history.push('/')
        dispatch(globalSuccess(`Successfully logged out from ${users.data.email}`))
        
    }

    useEffect(() => {
        let pathArray = props.location.pathname.split('/')

        if(pathArray[1] === 'dashboard') {
            setLayout('dash_layout')
            dispatch(appLayout('dash_layout'))
        } else {
            setLayout('')
            dispatch(appLayout(''))
        }
    },[props.location.pathname,dispatch])

    useEffect(() => {
        if(notifications && notifications.error) {
            const msg = notifications.msg ? notifications.msg : 'ERROR' 
            showToast('ERROR', msg)
            dispatch(clearNotification())
        }

        if(notifications && notifications.success) {
            const msg = notifications.msg ? notifications.msg : 'SUCCESS' 
            showToast('SUCCESS', msg)
            dispatch(clearNotification())
        }
    },[notifications, dispatch])

    return (
        <>
            <nav className={`navbar fixed-top d-flex ${layout}`}  to="/">
                <Link style={{fontFamily:'Fredoka One'}} to="/" className="navbar-brand">
                    FlickBase
                </Link>
                <SideDrawer users={users} signOutUser={signOutUser}/>
            </nav>
        </>
    )
}

export default withRouter(Header);