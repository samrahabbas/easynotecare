import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from 'react-redux'
const selectAuth = (state) => state.auth;

function List() {
    const [data, setData] = useState([])
    
    const auth = useSelector(selectAuth);
    const companyid = auth.user?.company_code

    useEffect(() => {
        axios.get("/ddo/get/" + companyid)
        .then(res => {
            console.log(res.data)
            setData(res.data)
        })
    }, [])
    return (
        <div className='card mb-5 col-mb-10' id='kt_content' >
            <div className='post d-flex flex-column-fluid' id='kt_post'>
                <div id='kt_content_container' className='container-xxl'>
                    <div className='mt-4'>
                        <div className='card-body'>
                            <h1 className='mt-5'>Outcome Measure List</h1>
                            <div className='w-100 pt-6 pb-3'>
                                <div className="d-flex w-100 justify-content-between">
                                    <div>
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

                                                placeholder='Search Client'
                                            />
                                        </div>
                                    </div>
                                    <div className='d-flex'>
                                        <div>
                                            <p style={{ "margin": "revert" }}>Items Per Page</p>
                                        </div>
                                        <div>
                                            <select className='form-control form-control-solid form-select'>
                                                <option value={5}>5</option>
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
                            <div className=' stickhyHeaderTable table-responsive' style={{ padding: "0rem 0rem" }}>
                                <table
                                    className='table table-light table-rounded table-striped border border-2 table-hover fs-6 gy-5 mt-5'
                                    id='kt_individual_table'
                                >
                                    <thead>
                                        <tr className='text-start table-dark text-gray-400 table-rounded fw-bolder fs-7 text-uppercase gs-0'>
                                            <th className="px-3 min-w-100px" style={{ cursor: "pointer" }} >
                                                Types
                                            </th>
                                            <th className="px-3 min-w-200px " style={{ cursor: "pointer" }} >
                                                Description
                                            </th>
                                            <th className="px-3 min-w-50px" style={{ cursor: "pointer" }} >
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="px-3" >
                                                OISP (default)
                                            </td>
                                            <td className="px-3" >
                                                <span className="text-gray-800 text-hover-primary mb-1"
                                                style={{ cursor: "pointer" }}
                                            >
                                                Outcome domains reflected in the OISP
                                            </span>
                                            </td>
                                            <td className="px-3" >
                                                <span className="text-gray-800 text-hover-primary mb-1"
                                                style={{ cursor: "pointer" }}
                                            >Approved
                                            </span></td>
                                        </tr>
                                        <tr>
                                            <td className="px-3" >
                                                <span className="text-gray-800 text-hover-primary mb-1"
                                                    style={{ cursor: "pointer" }}
                                                >GP (default)
                                                </span>
                                            </td  >
                                            <td className="px-3"  >
                                                 <span className="text-gray-800 text-hover-primary mb-1"
                                                style={{ cursor: "pointer" }}
                                            >Domain to assess general goal progress across multiple individuals
                                            </span>
                                            </td>
                                            <td className="px-3"  >
                                                <span className="text-gray-800 text-hover-primary mb-1"
                                                style={{ cursor: "pointer" }}
                                            >Approved
                                            </span>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default List