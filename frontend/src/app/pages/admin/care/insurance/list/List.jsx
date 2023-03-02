/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint no-unused-vars: "error" */
/* eslint-disable */
import React from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import data from '../../../../../../mock-data.json'
import ReadOnlyRow from './ReadOnlyRow'


function List() {

  const [insurances, setInsurance] = useState(data)

  return (
    <div>
      <div className='fv-row mb-7 fv-plugins-icon-container p-5 card'>
        <div className='card-body'>
          <h1 className='mb-5'>Individual Search</h1>
          <div className='row'>
            <div className='card mb-5 col-mb-10' id='kt_content'>
              <div className='post d-flex flex-column-fluid' id='kt_post'>
                <div id='kt_content_container' className='container-xxl'>
                  <div className='card'>
                    {/* <h2 className='mt-6 mb-0'>Individual Search</h2> */}
                    <div className='card-header border-0 pt-6'>
                      <div className='card-title'>
                        <div className='d-flex align-items-center position-relative overflow-auto my-1'>
                          <span className='svg-icon svg-icon-1 position-absolute ms-6'>
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
                            placeholder='Search Individual'
                          />
                        </div>
                      </div>
                    </div>

                    <div className='card-body table-responsive pt-0'>
                      <table
                        className='table align-middle table-row-dashed fs-6 gy-5'
                        id='kt_insurance_table'
                      >
                        <thead>
                          <tr className='text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0'>
                            <th className="min-w-200px">Form ID</th>
                            <th className="min-w-200px">Individual</th>
                            <th className="min-w-200px">Social Security Number</th>
                            <th className="min-w-200px">Medicaid Number</th>
                            <th className="min-w-200px">Medicare Number</th>
                            <th className="min-w-200px">Status</th>
                            <th className="min-w-200px">Birth Date</th>
                            <th className="min-w-200px">Case Status</th>
                            <th className="min-w-200px">Entered By</th>
                            <th className="min-w-200px">Admited By</th>
                            <th className="min-w-200px">Last Updated By</th>
                            <th className="min-w-200px">Admission Date</th>
                            <th className="min-w-200px">Individual ID Number</th>
                          </tr>
                          </thead>
                          <tbody className='fw-bold text-gray-600'>
                            {insurances.map((insurance) => (
                              <Fragment>
                                <ReadOnlyRow
                                  insurance={insurance}
                                />
                              </Fragment>
                            ))}
                          </tbody>
                          {/*end::Table body*/}
                      </table>
                      {/*end::Table*/}
                    </div>
                    {/*end::Card body*/}
                  </div>
                  {/*end::Card*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div>
        {/*start::Card*/}
        <div className='fv-row mb-7 p-5 card'>
          <div className='row'>
            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-1'>
              <Link to='#'>
                <div><b>Export to Excel</b></div>
              </Link>
            </div>
          </div>
        </div>
        {/*end::Card*/}
      </div>


      <div className='d-flex flex-stack'>
        <div className=''>
          <Link to='/care/behavior-antecedent-intervention-categories'>
            <button className='btn btn-primary mt-4'>Cancel</button>
          </Link>
        </div>
        <div>
          <button className='btn btn-primary mt-4  '>Save</button>
        </div>
      </div>

    </div>
  )
}

export default List