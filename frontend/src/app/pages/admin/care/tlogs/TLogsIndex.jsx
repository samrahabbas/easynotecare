import { Redirect, Route, Switch } from 'react-router-dom'
import TLogsHeader from './TLogsHeader'
import TlogIndividualList from './new/TlogIndividualList'
import ListOfTlogs from './list/ListOfTlogs'
import SearchTlogFields from './search/SearchTlogFields'

const TLogsIndex = () => {
    return (
        <div>
            <TLogsHeader />
            <Switch>
                <Route path="/care/tlogs/new" component={TlogIndividualList} />
                <Route path="/care/tlogs/list" component={ListOfTlogs} />
                <Route path="/care/tlogs/search" component={SearchTlogFields} />
                <Redirect from="/care/tlog" to="/care/tlogs/new" />
                <Redirect from="/care/tlogs" to="/care/tlogs/new" />
            </Switch>
        </div>
    )
}

export default TLogsIndex