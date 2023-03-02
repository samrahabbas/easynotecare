/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React, {FC, useEffect} from 'react'
import {Redirect, Switch, Route, useHistory} from 'react-router-dom'
// import {shallowEqual, useSelector} from 'react-redux'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import {PrivateRoutes} from './PrivateRoutes'
import {AuthPage} from '../modules/auth'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
// import {RootState} from '../../setup'
import {MasterInit} from '../../_metronic/layout/MasterInit'
import {useUser} from '../../_helper/userHooks/userHook'
import {getTokenFromLocalStorage} from '../../_helper/userHooks/common'
import { FallbackView } from '../../_metronic/partials'

const Routes: FC = () => {
  const history = useHistory()
  const isAuthorized = getTokenFromLocalStorage()

  const obj = useUser()
  let role = obj?.user?.roleName
  useEffect(() => {
    if (obj.loaded && !obj.authenticated) {
      // localStorage.clear()
      return history.push('/auth/login')
    }
  }, [obj.loaded])

  if (!obj.loaded) {
    return <FallbackView />
  }

  return (
    <>
      <Switch>
        {obj.loaded && !obj.authenticated ? (
          /*Render auth page when user at `/auth` and not authorized.*/
          <Route>
            <AuthPage />
          </Route>
        ) : (
          /*Otherwise redirect to root page (`/`)*/
          <Redirect from='/auth' to='/' />
        )}

        <Route path='/error' component={ErrorsPage} />

        {obj.loaded && !obj.authenticated ? (
          /*Redirect to `/auth` when user is not authorized*/
          <Redirect to='/auth/login' />
        ) : (
          <>
            <MasterLayout role={role}>
              <PrivateRoutes />
            </MasterLayout>
          </>
        )}
      </Switch>
      <MasterInit />
    </>
  )
}

export {Routes}
