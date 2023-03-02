import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import InsuranceHeader from './InsuranceHeader'
import List from './list/List'
import ImportFromExcel from './import-from-excel/ImportFromExcel'
import SearchImportedExcel from './search-imported-excel/SearchImportedExcel'
import InsuranceClients from './list/InsuranceClients'
import MainInsuranceForm from './Main Insurance Form/MainInsuranceForm'

function InsuranceIndex() {
    return (
        <div>
            <InsuranceHeader />
            <Switch>
                <Route path="/care/insurance/list" component={InsuranceClients} />
                <Route path='/care/insurance/:id' component={MainInsuranceForm} />
                <Route path="/care/insurance/import-from-excel">
                    <ImportFromExcel />
                </Route>
                <Route path="/care/insurance/search-imported-excel">
                    <SearchImportedExcel />
                </Route>
                <Redirect from='/care/insurance' exact={true} to='/care/insurance/list' />
                <Redirect to='/care/insurance/list' />
            </Switch>
        </div>
    )
}

export default InsuranceIndex