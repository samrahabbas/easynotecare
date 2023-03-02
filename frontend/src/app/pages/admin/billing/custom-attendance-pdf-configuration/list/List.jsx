/* eslint-disable */
import React from 'react'
import { Link } from 'react-router-dom'

function List() {
    return (
        <div>
            <div className='fv-row mb-7 fv-plugins-icon-container p-5 card'>
                <h1 className='p-7'>Custom Attendance PDF Configuration (List)</h1>
                <div className='card'>
                    <div className='card-body'>
                        <h1 className='text-center p-7'>No data available in table</h1>
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
                            <Link to='#'>
                                <div><b>Create New</b></div>
                            </Link>
                        </div>
                    </div>
                </div>
                {/*end::Card*/}
            </div>
        </div>
    )
}

export default List