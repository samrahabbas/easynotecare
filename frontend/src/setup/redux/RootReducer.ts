import {all} from 'redux-saga/effects'
import {combineReducers} from 'redux'

import * as auth from '../../app/modules/auth'
import agency from '../../app/pages/agency/store'
import users from '../../app/pages/users/store'
import behavior from '../../app/pages/admin/care/behavior/behavior-antecedent-intervention-categories/store/redux'
export const rootReducer = combineReducers({
  auth: auth.reducer,
  agency,
  users,
  behavior
})

export type RootState = ReturnType<typeof rootReducer>