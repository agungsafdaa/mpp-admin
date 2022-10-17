
import { useEffect, useState } from 'react'
import '../styles/css/main.css';
import Layout from '../components/Layout.jsx';
import { authenticateUser } from '../auth'
import { getTokenFromCookie } from '../util'
function MyApp({ Component, pageProps }) {
  // const [loading,setLoading] = useState(true)
  // useEffect(() => {
  //   const user = getTokenFromCookie() // check for cookie
  //   if(user) authenticateUser()
  //   setLoading(false)
  // })
  // if(loading) return <p>Loading...</p>
  return (
    <Layout>
    <Component {...pageProps} />
  </Layout>
  )
}

export default MyApp
