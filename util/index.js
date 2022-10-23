import Cookies from 'js-cookie'

export const getTokenFromCookie = () => {
    const token = Cookies.get('token')
    // if username cookie not found, return empty string
    return token || ''
}

export const setTokenCookie = (value) => {
    
  Cookies.set('token', value) // 1 day expiry
}


  export const logoutUser = () => Cookies.remove('token');  