import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import AdminBillingHeader from '../AdminBillingHeader'

function DescriptionCodeHeader() {
    const location = useLocation()
  return (
    <div>
        <AdminBillingHeader/>
        <div className='card mb-5 mb-xl-10'>
                <div className='card-body pt-9 pb-0'>
                    <p className='text-gray-800 fs-2 fw-bolder'>Description Code</p>
                    <div className='d-flex overflow-auto h-55px'>
                        <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                            <li className='nav-item'>
                                <Link
                                    className={
                                        `nav-link text-active-primary me-6 ` +
                                        (location.pathname === '/billing/description-code/new' && 'active')
                                    }
                                    to='/billing/description-code/new'
                                >
                                    New
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link
                                    className={
                                        `nav-link text-active-primary me-6 ` +
                                        (location.pathname === '/billing/description-code/list' && 'active')
                                    }
                                    to='/billing/description-code/list'
                                >
                                    List
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link
                                    className={
                                        `nav-link text-active-primary me-6 ` +
                                        (location.pathname === '/billing/description-code/archive' && 'active')
                                    }
                                    to='/billing/description-code/archive'
                                >
                                    Archive
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link
                                    className={
                                        `nav-link text-active-primary me-6 ` +
                                        (location.pathname === '/billing/description-code/applied-rate-history-search-professional' && 'active')
                                    }
                                    to='/billing/description-code/applied-rate-history-search-professional'
                                >
                                    Applied Rate History Search Professional
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default DescriptionCodeHeader