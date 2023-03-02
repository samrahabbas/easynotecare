import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import SharedContactHeader from './SharedContactHeader'
import SharedContactNew from './new/SharedContactNew'
import SharedContactList from './list/SharedContactList'
import Link from './link/Link'
import ImportFromExcel from './import-from-excel/ImportFromExcel'
import NewType from './newType/NewType'

function SharedContactIndex() {
    return (
        <div>
            <SharedContactHeader />
            <Switch>
                <Route path="/general/shared-contact/new">
                    <SharedContactNew />
                </Route>
                <Route path="/general/shared-contact/list">
                    <SharedContactList />
                </Route>
                 <Route path="/general/shared-contact/link">
                    <Link />
                </Route>
                <Route path="/general/shared-contact/type/list">
                    <NewType />
                </Route>
                 <Route path="/general/shared-contact/import-from-excel">
                    <ImportFromExcel />
                </Route>
                <Redirect from='/general/shared-contact' exact={true} to='/general/shared-contact/new' />
                <Redirect to='/general/shared-contact/new' />
            </Switch>
        </div>
    )
}

export default SharedContactIndex