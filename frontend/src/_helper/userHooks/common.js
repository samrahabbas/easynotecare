import axios from 'axios'

export function storeTokenInLocalStorage(token) {
  localStorage.setItem('authToken', token)
}

export function getTokenFromLocalStorage() {
  return localStorage.getItem('authToken')
}

// this should move to store
export async function getAuthenticatedUser() {
  const defaultReturnObject = {authenticated: false, user: null, token: null}
  try {
    const token = getTokenFromLocalStorage()
    if (!token) {
      return defaultReturnObject
    }
    const response = await axios({
      method: 'GET',
      url: 'users/protected',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const {authenticated = false} = response.data
    return authenticated ? {...response.data, token} : false
  } catch (err) {
    console.log('getAuthenticatedUser, Something Went Wrong', err)
    return defaultReturnObject
  }
}
