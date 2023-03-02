import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import DocumentStorageHeader from './DocumentStorageHeader'
import DocumentStorageForm from './new/DocumentStorageForm'
import DocumentStorageSearchForm from './search/DocumentStorageSearchForm'

function DocumentStorageIndex() {
  return (
    <div>
      <DocumentStorageHeader />
      <Switch>
        <Route path='/agency-wide-document-storage/document-storage/new'>
          <DocumentStorageForm />
        </Route>
        <Route path='/agency-wide-document-storage/document-storage/search'>
          <DocumentStorageSearchForm />
        </Route>
        <Redirect from='/agency-wide-document-storage/document-storage' exact={true} to='/agency-wide-document-storage/document-storage/new' />
        <Redirect to='/agency-wide-document-storage/document-storage/new' />
      </Switch>
    </div>
  )
}

export default DocumentStorageIndex