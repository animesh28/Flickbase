import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import SideDrawer from "./sideNavigation";
import { showToast } from '../../utils/tools';
import { useDispatch, useSelector } from 'react-redux'
import { clearNotification } from '../../store/actions'

const Header = (props) => {
    
    const notifications = useSelector(state => state.notifications)
    const dispatch = useDispatch()

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
            <nav className="navbar fixed-top d-flex" to="/">
                <Link style={{fontFamily:'Fredoka One'}} to="/" className="navbar-brand">
                    FlickBase
                </Link>
                <SideDrawer/>
            </nav>
        </>
    )
}

export default withRouter(Header);