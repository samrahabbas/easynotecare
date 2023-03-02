import {useState, useEffect} from 'react'
import {getAuthenticatedUser, getTokenFromLocalStorage} from './common'
import {useHistory} from 'react-router-dom'
import {actions} from '../../app/modules/auth/redux/AuthRedux'
import {useDispatch} from 'react-redux'

export function useUser() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [state, setState] = useState({
    user: {
      roleName: '',
    },
    authenticated: false,
    loaded: false,
  })

  useEffect(() => {
    async function getUserDetails() {
      const obj = await getAuthenticatedUser()
      dispatch(actions.setUser(obj.user, obj.token))
      setState({
        user: obj.user,
        authenticated: obj.authenticated,
        loaded: true,
      })
    }
    getUserDetails()
  }, [])

  return {...state}
}
