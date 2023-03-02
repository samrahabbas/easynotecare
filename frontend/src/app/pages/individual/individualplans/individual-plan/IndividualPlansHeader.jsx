/* eslint-disable */
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import IndividualHeader from '../IndividualHeader'

function IndividualPlansHeader() {
    const location = useLocation()
    return (
        <div>
            <IndividualHeader />
            <div className='card mb-5 mb-xl-10'>
                <div className='card-body pt-9 pb-0'>
                    <p className='text-gray-800 fs-2 fw-bolder'>Individual Plans</p>
                    <div className='d-flex overflow-auto h-55px'>
                        <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                            <li className='nav-item'>
                                <Link
                                    className={
                                        `nav-link text-active-primary me-6 ` +
                                        (location.pathname === '/individualplans/individual-plan/new' && 'active')
                                    }
                                    to='/individualplans/individual-plan/new'
                                >
                                    Acknowledge
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link
                                    className={
                                        `nav-link text-active-primary me-6 ` +
                                        (location.pathname === '/care/individual-plan/search' && 'active')
                                    }
                                    to='/individualplans/individual-plan/search'
                                >
                                    Search
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IndividualPlansHeader