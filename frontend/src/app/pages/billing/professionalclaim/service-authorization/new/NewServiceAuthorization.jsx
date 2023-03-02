import React, { Fragment, useEffect, useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'




const NewServiceAuthorization = () => {

    const [showIndividuals, setShowIndividuals] = useState(false)
    const [programs, setPrograms] = useState([])
    const [programStatic, setProgramStatic] = useState([])
    const [editProgramData, setEditProgramData] = useState({
        programName: '',
        siteName: '',
        siteAddress: '',
        programType: '',
        programCostCenterNumber: '',
        createDate: '',
        formID: '',
    })
    useEffect(() => {
        axios.get("/programs/get")
            .then((response) => {
                setPrograms(response.data)
                console.log(response.data)
                setProgramStatic(response.data)
            })
    }, [showIndividuals])


    return (
        <div>
            <div className='card mb-5 col-mb-10' id='kt_content'>
                <div className='post d-flex flex-column-fluid' id='kt_post'>
                    <div id='kt_content_container' className='container-xxl'>
                        <div className='card-header border-0 pt-6'>
                            <h1 className='mt-6 mb-0'>Select Program For Service Authorization</h1>
                            <div className='w-100'>
                                <div className="d-flex w-100 justify-content-between">
                                    <div>
                                        <div className='d-flex align-items-between position-relative overflow-auto my-1 mt-6'>
                                            <span className='svg-icon svg-icon-1 position-absolute mt-4 ms-6'>
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    width={24}
                                                    height={24}
                                                    viewBox='0 0 24 24'
                                                    fill='none'
                                                >
                                                    <rect
                                                        opacity='0.5'
                                                        x='17.0365'
                                                        y='15.1223'
                                                        width='8.15546'
                                                        height={2}
                                                        rx={1}
                                                        transform='rotate(45 17.0365 15.1223)'
                                                        fill='black'
                                                    />
                                                    <path
                                                        d='M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z'
                                                        fill='black'
                                                    />
                                                </svg>
                                            </span>
                                            <input
                                                type='text'
                                                data-kt-customer-table-filter='search'
                                                className='form-control form-control-solid w-250px ps-15'
                                                // onChange={(e) => searchFilterClients(e.target.value)}
                                                placeholder='Search Program'
                                            />
                                        </div>
                                    </div>
                                    <div className='d-flex'>
                                        <div>
                                            <p style={{ "margin": "revert" }}>Items Per Page</p>
                                        </div>
                                        <div>
                                            <select className='form-control form-control-solid form-select'
                                            // onChange={(e) => setPageSize(parseInt(e.target.value))}
                                            >
                                                <option value={50}>50</option>
                                                <option value={100}>100</option>
                                                <option value={150}>150</option>
                                                <option value={200}>200</option>
                                                <option value={300}>300</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='card-body table-responsive mt-6' style={{ padding: "0rem 2.25rem" }}>
                            <table
                                className='table table-light table-rounded table-striped border border-2 table-hover fs-6 gy-5'
                                id='kt_program_table'
                            >
                                <thead>
                                    <tr className='text-start table-dark text-gray-400 table-rounded fw-bolder fs-7 text-uppercase gs-0'>
                                        <th className="px-3 min-w-200px">Program ID</th>
                                        <th className="min-w-200px">Program Name</th>
                                        <th className="min-w-250px">Site Address</th>
                                        <th className="min-w-150px">Program Type</th>
                                        <th className="min-w-100px">Cost Center Number</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        programs.map((program, index) => (
                                            <Fragment key={index}>
                                                <tr>
                                                    <td className="px-3">
                                                        <span className="text-gray-800 text-hover-primary mb-1"
                                                            onClick={() => {
                                                                setEditProgramData(program);
                                                                setShowIndividuals(true);
                                                            }}
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            {program.formID}
                                                        </span>
                                                    </td>
                                                    <td className="px-3">
                                                        <span className="text-gray-800 text-hover-primary mb-1"
                                                            onClick={() => {
                                                                setEditProgramData(program);
                                                                setShowIndividuals(true);
                                                            }}
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            {program.programName}
                                                        </span>
                                                    </td>
                                                    <td className="px-3">
                                                        <span className="text-gray-800 text-hover-primary mb-1"
                                                            onClick={() => {
                                                                setEditProgramData(program);
                                                                setShowIndividuals(true);
                                                            }}
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            {program.siteAddress}
                                                        </span>
                                                    </td>
                                                    <td className="px-3">
                                                        <span className="text-gray-800 text-hover-primary mb-1"
                                                            onClick={() => {
                                                                setEditProgramData(program);
                                                                setShowIndividuals(true);
                                                            }}
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            {program.siteName}
                                                        </span>
                                                    </td>
                                                    <td className="px-3">
                                                        <span className="text-gray-800 text-hover-primary mb-1"
                                                            onClick={() => {
                                                                setEditProgramData(program);
                                                                setShowIndividuals(true);
                                                            }}
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            {program.programCostCenterNumber}
                                                        </span>
                                                    </td>
                                                </tr>
                                            </Fragment>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewServiceAuthorization