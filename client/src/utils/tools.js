import cookie from 'react-cookies'
import { toast } from 'react-toastify'

export const showToast = (type, msg) => {
    switch(type) {
        case 'SUCCESS':
            toast.success(msg, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            break
        case 'ERROR':
            toast.error(msg, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            break
        default:
            return false
    }
}

export const getCookie = () => cookie.load('x-access-token')
export const removeCookie = () => cookie.remove('x-access-token')
export const getAuthHeader = { headers: { 'x-access-token': getCookie() } }