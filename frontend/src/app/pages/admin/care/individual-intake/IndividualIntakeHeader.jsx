import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import AdminCareHeader from '../AdminCareHeader'

function IndividualIntakeHeader() {
    const location = useLocation()
    return (
        <div>
            <AdminCareHeader />
            <div className='card mb-5 mb-xl-10'>
                <div className='card-body pt-9 pb-0'>
                    <p className='text-gray-800 fs-2 fw-bolder'>Clients Intake</p>
                    <div className='d-flex overflow-auto h-55px'>
                        <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                            <li className='nav-item'>
                                <Link
                                    className={
                                        `nav-link text-active-primary me-6 ` +
                                        (location.pathname.startsWith('/care/individual-intake/list') && ' active ')
                                         + (location.pathname.startsWith('/care/individual-intake/form') && ' active ')
                                    }
                                    to='/care/individual-intake/list'
                                >
                                    List of Clients
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link
                                    className={
                                        `nav-link text-active-primary me-6 ` +
                                        (location.pathname === '/care/individual-intake/new' && 'active')
                                    }
                                    to='/care/individual-intake/new'
                                >
                                    Add New Client
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link
                                    className={
                                        `nav-link text-active-primary me-6 ` +
                                        (location.pathname === '/care/individual-intake/search' && 'active')
                                    }
                                    to='/care/individual-intake/search'
                                >
                                    Search Clients
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link
                                    className={
                                        `nav-link text-active-primary me-6 ` +
                                        (location.pathname === '/care/individual-intake/import-from-excel' && 'active')
                                    }
                                    to='/care/individual-intake/import-from-excel'
                                >
                                    Import from Excel
                                </Link>
                            </li>
                            {/* <li className='nav-item'>
                                <Link
                                    className={
                                        `nav-link text-active-primary me-6 ` +
                                        (location.pathname === '/care/individual-intake/search-imported-excel' && 'active')
                                    }
                                    to='/care/individual-intake/search-imported-excel'
                                >
                                    Search Imported Excel
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link
                                    className={
                                        `nav-link text-active-primary me-6 ` +
                                        (location.pathname === '/care/individual-intake/pending-admission-notes' && 'active')
                                    }
                                    to='/care/individual-intake/pending-admission-notes'
                                >
                                    Pending Admission Notes
                                </Link>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IndividualIntakeHeader