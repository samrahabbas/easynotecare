import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import NewServiceAuthorization from './new/NewServiceAuthorization'
import ServiceAuthorizationSearch from './search/ServiceAuthorizationSearch'
import RenewalSearch from './renewal-search/RenewalSearch'
import Archive from './archive/Archive'
import AppliedRateHistorySearch from './applied-rate-history-search/AppliedRateHistorySearch'
import ServiceAuthorizationHeader from './ServiceAuthorizationHeader'

function ISPProgramTemplateLiabraryIndex() {
  return (
    <div>
      <ServiceAuthorizationHeader/>
      <Switch>
        <Route path="/professionalclaim/service-authorization/new">
          <NewServiceAuthorization />
        </Route>
        <Route path="/professionalclaim/service-authorization/search">
          <ServiceAuthorizationSearch />
        </Route>
        <Route path="/professionalclaim/service-authorization/renewal-search">
          <RenewalSearch />
        </Route>
        <Route path="/professionalclaim/service-authorization/archive">
          <Archive />
        </Route>
        <Route path="/professionalclaim/service-authorization/applied-rate-history-search">
          <AppliedRateHistorySearch />
        </Route>
        <Redirect from='/professionalclaim/service-authorization' exact={true} to='/care/isp-program-template-liabrary/new' />
        <Redirect to='/professionalclaim/service-authorization/'/>
      </Switch>
    </div>
  )
}

export default ISPProgramTemplateLiabraryIndex