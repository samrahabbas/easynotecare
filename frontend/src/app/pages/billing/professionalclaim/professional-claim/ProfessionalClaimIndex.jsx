import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import NewTemplateForm from './new-template/NewTemplateForm'
import NewProfessionalClaimForm from './new/NewProfessionalClaimForm'
import SearchProfessionalClaim from './search/SearchProfessionalClaim'
// import Search from './search/Search'
// import New from './new/New'
// import Archive from './archive/Archive'
// import NewTemplate from './new-template/NewTemplate'
import ProfessionalClaimHeader from './ProfessionalClaimHeader'

function ProfessionalClaimIndex() {
  return (
    <div>
      <ProfessionalClaimHeader/>
      <Switch>
        <Route path="/professionalclaim/professional-claim/new">
          <NewProfessionalClaimForm />
        </Route>
        <Route path="/professionalclaim/professional-claim/search">
          <SearchProfessionalClaim />
        </Route>
        {/* <Route path="/professionalclaim/professional-claim/archive">
          <Archive />
        </Route> */}
        <Route path="/professionalclaim/professional-claim/new-template">
          <NewTemplateForm />
        </Route>
        <Redirect from='/professionalclaim/professional-claim' exact={true} to='/care/isp-program-template-liabrary/new' />
        <Redirect to='/professionalclaim/professional-claim/'/>
      </Switch>
    </div>
  )
}

export default ProfessionalClaimIndex