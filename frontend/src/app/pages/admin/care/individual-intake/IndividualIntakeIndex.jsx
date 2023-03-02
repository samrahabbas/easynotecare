import { Redirect, Route, Switch } from 'react-router-dom'
import IndividualIntakeHeader from './IndividualIntakeHeader'
import NewIndividual from './new/NewIndividual'
import IndividualList from './listIndividual/IndividualList'
import SearchFields from './searchFields/SearchFields.jsx'
import EditIndividualForm from './listIndividual/editIndividualForm'
import ImportFromExcel from './import-from-excel/ImportFromExcel'
// import PendingAdmissionNotes from './pending-admission-notes/PendingAdmissionNotes'
// import SearchImportedExcel from './search-imported-excel/SearchImportedExcel'

function IndividualIntakeIndex() {
    return (
        <div>
            <IndividualIntakeHeader />
            <Switch>
                <Route path="/care/individual-intake/list" component={IndividualList} />
                <Route path="/care/individual-intake/form/*" component={EditIndividualForm} />
                <Route path="/care/individual-intake/new">
                    <NewIndividual />
                </Route>
                <Route path="/care/individual-intake/search">
                    <SearchFields />
                </Route>
                
                <Route path="/care/individual-intake/import-from-excel">
                    <ImportFromExcel />
                </Route>
                {/* <Route path="/care/individual-intake/search-imported-excel">
                    <SearchImportedExcel />
                </Route>
                <Route path="/care/individual-intake/pending-admission-notes">
                    <PendingAdmissionNotes />
                </Route> */}
                <Redirect from='/care' exact={true} to='/care/individual-intake/list' />
                <Redirect from='/care/individual-intake' exact={true} to='/care/individual-intake/list' />
            </Switch>
        </div>
    )
}

export default IndividualIntakeIndex