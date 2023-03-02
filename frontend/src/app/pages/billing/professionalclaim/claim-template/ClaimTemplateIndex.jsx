import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import SearchClaimTemplate from './search/SearchClaimTemplate'
import NewClaimTemplate from './new/NewClaimTemplate'
import ClaimTemplateHeader from './ClaimTemplateHeader'

function ClaimTemplateIndex() {
  return (
    <div>
      <ClaimTemplateHeader/>
      <Switch>
        <Route path="/professionalclaim/claim-template/new">
          <NewClaimTemplate />
        </Route>
        <Route path="/professionalclaim/claim-template/search">
          <SearchClaimTemplate />
        </Route>
        <Redirect from='/professionalclaim/claim-template' exact={true} to='/care/isp-program-template-liabrary/new' />
        <Redirect to='/professionalclaim/claim-template/'/>
      </Switch>
    </div>
  )
}

export default ClaimTemplateIndex