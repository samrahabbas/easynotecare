import { Redirect, Route, Switch } from "react-router-dom"
import AdminCareHeader from "../AdminCareHeader"
import AddressList from "./AddressesData/AddressList"
import ClientDetailsForm from "./ClientDetails/ClientDetailsForm"
import HealthBody from "./HealthProfile/HealthBody"
import SharedContactsSubSection from "./SharedContacts/SharedContactsSubSection"
import GuardianList from "./GuardianData/GuardianList"

const SubMenuIndex = () => {
  return (
    <div>
        <AdminCareHeader />
        <Switch>
            <Route path="/care/sub/addressList/" component={AddressList} />
            <Route path="/care/sub/clientDetails/" component={ClientDetailsForm} />
            <Route path='/care/sub/healthProfile/' component={HealthBody} />
            <Route path='/care/sub/sharedContact/' component={SharedContactsSubSection} />
            <Route path='/care/sub/guardianList' component={GuardianList} />
        </Switch>
    </div>
  )
}

export default SubMenuIndex