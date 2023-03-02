import { Link, useLocation } from 'react-router-dom'
import AdminCareHeader from '../AdminCareHeader'

const TLogsHeader = () => {
    const location = useLocation()
    return (
        <div>
            <AdminCareHeader />
            <div className='card mb-5 mb-xl-10'>
                <div className='card-body pt-9 pb-0'>
                    <p className='text-gray-800 fs-2 fw-bolder'>TLogs</p>
                    <div className='d-flex overflow-auto h-55px'>
                        <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                            <li className='nav-item'>
                                <Link
                                    className={
                                        `nav-link text-active-primary me-6 ` +
                                        (location.pathname === '/care/tlogs/new' && 'active')
                                    }
                                    to='/care/tlogs/new'
                                >
                                    New TLogs
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link
                                    className={
                                        `nav-link text-active-primary me-6 ` +
                                        (location.pathname === '/care/tlogs/list' && 'active')
                                    }
                                    to='/care/tlogs/list'
                                >
                                    List TLogs
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link
                                    className={
                                        `nav-link text-active-primary me-6 ` +
                                        (location.pathname === '/care/tlogs/search' && 'active')
                                    }
                                    to='/care/tlogs/search'
                                >
                                    Search TLogs
                                </Link>
                            </li>
                            {/* <li className='nav-item'>
                                <Link
                                    className={
                                        `nav-link text-active-primary me-6 ` +
                                        (location.pathname === '/care/individual-intake/import-from-excel' && 'active')
                                    }
                                    to='/care/individual-intake/import-from-excel'
                                >
                                    Import from Excel
                                </Link>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TLogsHeader