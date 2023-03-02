import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const SubMenuSection = ({ individual }) => {
    const location = useLocation()
    return (
        <div>
            <div>
                <div className="flex-column px-3">
                    <ul className="nav nav-line-tabs  w-100 fs-6 mt-3">
                        <li className="nav-item col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6">
                            <Link
                                 className={
                                    `nav-link text-active-primary fw-bolder ` +
                                    (location.pathname.startsWith('/care/sub/addressList') && 'active')
                                }
                                to={{
                                    pathname: `/care/sub/addressList/${individual?.formID}`,
                                    state: individual
                                }}
                            >
                                Address History
                            </Link>
                        </li>
                        <li className="nav-item  col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6">
                            <Link
                                className={
                                    `nav-link text-active-primary fw-bolder ` +
                                    (location.pathname.startsWith('/care/individual-intake/form') && 'active')
                                }
                                to={{
                                    pathname: `/care/individual-intake/form/${individual?.formID}`,
                                    state: individual
                                }}
                            >
                                Client Form
                            </Link>
                        </li>
                        <li className="nav-item col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6">
                            <Link
                                 className={
                                    `nav-link text-active-primary fw-bolder ` +
                                    (location.pathname.startsWith('/care/sub/clientDetails') && 'active')
                                }
                                to={{
                                    pathname: `/care/sub/clientDetails/${individual?.formID}`,
                                    state: individual
                                }}
                            >
                                Client Details
                            </Link>
                        </li>
                        <li className="nav-item col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6">
                            <Link
                                className={
                                    `nav-link text-active-primary fw-bolder ` +
                                    (location.pathname.startsWith('/care/contact/listing') && 'active')
                                   
                                    
                                }
                                to={{
                                    pathname: `/care/contact/listing/${individual?.formID}`,
                                    state: individual
                                }}
                            >
                                Contact List
                            </Link>
                        </li>
                        <li className="nav-item col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6">
                            <Link
                                className='nav-link text-active-primary fw-bolder'
                                to={{
                                    pathname: `/care/enrollment/individualsprogram/${individual?.formID}`,
                                    state: individual
                                }}
                            >
                                Program Enrollments
                            </Link>
                        </li>
                        <li className="nav-item col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6">
                            <Link
                                className={
                                    `nav-link text-active-primary fw-bolder ` +
                                    (location.pathname.startsWith('/care/sub/healthProfile') && 'active')
                                }
                                to={{
                                    pathname: `/care/sub/healthProfile/${individual?.formID}`,
                                    state: individual
                                }}
                            >
                                Health Profile
                            </Link>
                        </li>
                        <li className="nav-item col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6">
                            <Link
                                className='nav-link text-active-primary fw-bolder'
                                to={{
                                    pathname: `/care/sub/healthProfile/${individual?.formID}`,
                                    state: individual
                                }}
                            >
                                Admission Notes
                            </Link>
                        </li>
                        <li className="nav-item col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6">
                            <Link
                                 className={
                                    `nav-link text-active-primary fw-bolder ` +
                                    (location.pathname.startsWith('/care/sub/guardianList') && 'active')
                                }
                                to={{
                                    pathname: `/care/sub/guardianList/${individual?.formID}`,
                                    state: individual
                                }}
                            >
                                Guardian List
                            </Link>
                        </li>
                        <li className="nav-item col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6">
                            <Link
                                 className={
                                    `nav-link text-active-primary fw-bolder ` +
                                    (location.pathname.startsWith('/care/insurance') && 'active')
                                }
                                to={{
                                    pathname: `/care/insurance/${individual?.formID}`,
                                    state: individual
                                }}
                            >
                                Insurance
                            </Link>
                        </li>
                        <li className="nav-item col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6">
                            <Link
                                className='nav-link text-active-primary fw-bolder'
                                to={{
                                    pathname: `/care/insurance/${individual?.formID}`,
                                    state: individual
                                }}
                            >
                                Attached Files
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={
                                    `nav-link text-active-primary fw-bolder ` +
                                    (location.pathname.startsWith('/care/sub/sharedContact') && 'active')
                                }
                                to={{
                                    pathname: `/care/sub/sharedContact/${individual?.formID}`,
                                    state: individual
                                }}
                            >
                                Shared Contact List
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SubMenuSection