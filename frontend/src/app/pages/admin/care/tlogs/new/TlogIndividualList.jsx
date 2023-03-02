import { useEffect, useState, useRef, useMemo, Fragment } from "react"
// import data from '../../individual-mock-data.json'
import Pagination from "../../../../../../_helper/paginationHook/Pagination"
import { Sort_by } from "../../../../../../_helper/objectSorter"
import '../../../../../../_helper/tableHeaderSticky/tableHeaderSticky.css'
import TlogIndividualRow from "./TlogIndividualRow"
import AddTlogForm from "./AddTlogForm"
import { filterArray } from "../../../../../../_helper/filterArray"
import axios from "axios"
import { useSelector } from 'react-redux'
const selectAuth = (state) => state.auth;


const TlogIndividualList = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [sortedBy, setSortedBy] = useState('')
    const [PageSize, setPageSize] = useState(50)
    const [individuals, setIndividuals] = useState([])
    const [individualStatic, setIndividualStatic] = useState([])
    const [selectedIndividual, setSelectedIndividual] = useState({})
    const [showNewForm, setShowNewForm] = useState(false)

    const auth = useSelector(selectAuth);

	const companyid = auth.user?.company_code

    useEffect(() => {
        axios.get('clients/get/' + companyid)
        .then(res => {
            let tempvar = res.data
            for(let i = 0; i < tempvar.length; i++){
                tempvar[i].mailingaddress = res.data[i].mailingInfo?.st1 + ' ' +
                    res.data[i].mailingInfo?.st2 + ' ' +
                    res.data[i].mailingInfo?.city + ' ' +
                    res.data[i].mailingInfo?.state + ' ' +
                    res.data[i].mailingInfo?.country
            }
            setIndividuals(tempvar)
            setIndividualStatic(tempvar)
        })
    }, [])

    const PaginationRef = useRef(null)

    useEffect(() => {
        let PaginationElement = PaginationRef.current
        if (PaginationElement !== null) {
            let numberOfPages = PaginationElement.getElementsByTagName("li").length - 2
            if (numberOfPages > 0) {
                if (numberOfPages < currentPage) {
                    let tempPage = currentPage - 1
                    setCurrentPage(tempPage)
                }
            }
        }
    }, [individuals])

    const searchFilterClients = (value) => {
        let sampleFilter = [
            "formID",
            "firstName",
            "lastName",
            "birthDate",
            "medicaidNumber",
            "status",
            "socialSecurityNumber",
            "enteredBy",
            "admittedBy",
            "lastUpdatedBy",
            "admissionDate",
            "mailingaddress"
        ]
        let filteredArray = filterArray(individualStatic, sampleFilter)
        let lowerCaseValue = value.toLowerCase()
        let temparr = []
        for (let i = 0; i < filteredArray.length; i++) {
            if (Object.values(filteredArray[i]).filter(item => typeof item === 'string' ? item.toLowerCase().includes(lowerCaseValue) : false).length > 0) {
                temparr.push(filteredArray[i])
            }
        }
        let tempstate = []
        for (let i = 0; i < individualStatic.length; i++) {
            for (let j = 0; j < temparr.length; j++) {
                if (temparr[j].formID === individualStatic[i].formID) {
                    tempstate.push(individualStatic[i])
                }
            }
        }
        setIndividuals(tempstate)
        setCurrentPage(1)
    }

    const IndividualPaginationData = useMemo(() => {
        if (individuals.length <= PageSize) {
            setCurrentPage(1)
        }
        let tempdata = individuals
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return tempdata.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, individuals, PageSize, sortedBy, individualStatic])

    return (
        <div>
            {
                showNewForm ? <AddTlogForm selectedIndividual={selectedIndividual} setShowNewForm={setShowNewForm} />
                    :
                    <div className='card mb-5 col-mb-10' id='kt_content'>
                        <div className='post d-flex flex-column-fluid' id='kt_post'>
                            <div id='kt_content_container' className='container-xxl'>
                                <div className='card-header border-0 pt-6'>
                                <h1 className='mt-5'>New Client List</h1>
                                    <div className='w-100'>
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
                                                        onChange={(e) => searchFilterClients(e.target.value)}
                                                        placeholder='Search Client'
                                                    />
                                                </div>
                                            </div>
                                            <div className='d-flex'>
                                                <div>
                                                    <p style={{ "margin": "revert" }}>Items Per Page</p>
                                                </div>
                                                <div>
                                                    <select className='form-control form-control-solid form-select'
                                                        onChange={(e) => setPageSize(parseInt(e.target.value))}>
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
                                <div className='card-body stickhyHeaderTable table-responsive mt-4' style={{ padding: "0rem 2.25rem" }}>
                                    <table
                                        className='table table-light table-rounded table-striped border border-2 table-hover fs-6 gy-5'
                                        id='kt_individual_table'
                                    >
                                        <thead>
                                            <tr className='text-start table-dark text-gray-400 table-rounded fw-bolder fs-7 text-uppercase gs-0'>
                                                <th className="px-3 min-w-100px" style={{ cursor: "pointer" }} onClick={() => {
                                                    if (sortedBy !== "formID") {
                                                        let finalSort = individuals.sort(Sort_by('formID', false, parseInt))
                                                        setIndividuals(finalSort)
                                                        setSortedBy("formID")
                                                    } else if (sortedBy === "formID") {
                                                        let finalSort = individuals.sort(Sort_by('formID', true, parseInt))
                                                        setIndividuals(finalSort)
                                                        setSortedBy('')
                                                    }
                                                }}>
                                                    Form ID
                                                    <i className={sortedBy === "formID" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                </th>

                                                <th className="min-w-150px" style={{ cursor: "pointer" }} onClick={() => {
                                                    if (sortedBy !== "firstName") {
                                                        let finalSort = individuals.sort(Sort_by('firstName', false, (a) => a.toUpperCase()))
                                                        setIndividuals(finalSort)
                                                        setSortedBy("firstName")
                                                    } else if (sortedBy === "firstName") {
                                                        let finalSort = individuals.sort(Sort_by('firstName', true, (a) => a.toUpperCase()))
                                                        setIndividuals(finalSort)
                                                        setSortedBy('')
                                                    }
                                                }}>
                                                    Client Name
                                                    <i className={sortedBy === "firstName" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                </th>

                                                <th className="min-w-150px" style={{ cursor: "pointer" }} onClick={() => {
                                                    if (sortedBy !== "socialSecurityNumber") {
                                                        let finalSort = individuals.sort(Sort_by('socialSecurityNumber', false, parseInt))
                                                        setIndividuals(finalSort)
                                                        setSortedBy("socialSecurityNumber")
                                                    } else if (sortedBy === "socialSecurityNumber") {
                                                        let finalSort = individuals.sort(Sort_by('socialSecurityNumber', true, parseInt))
                                                        setIndividuals(finalSort)
                                                        setSortedBy('')
                                                    }
                                                }}>
                                                    Social Security Number
                                                    <i className={sortedBy === "socialSecurityNumber" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                </th>

                                                <th className="min-w-100px" style={{ cursor: "pointer" }} onClick={() => {
                                                    if (sortedBy !== "medicaidNumber") {
                                                        let finalSort = individuals.sort(Sort_by('medicaidNumber', false, parseInt))
                                                        setIndividuals(finalSort)
                                                        setSortedBy("medicaidNumber")
                                                    } else if (sortedBy === "medicaidNumber") {
                                                        let finalSort = individuals.sort(Sort_by('medicaidNumber', true, parseInt))
                                                        setIndividuals(finalSort)
                                                        setSortedBy('')
                                                    }
                                                }}>
                                                    Medicaid Number
                                                    <i className={sortedBy === "medicaidNumber" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                </th>

                                                <th className='min-w-100px' style={{ cursor: "pointer" }} onClick={() => {
                                                    if (sortedBy !== "status") {
                                                        let finalSort = individuals.sort(Sort_by('status', false, (a) => a.toUpperCase()))
                                                        setIndividuals(finalSort)
                                                        setSortedBy("status")
                                                    } else if (sortedBy === "status") {
                                                        let finalSort = individuals.sort(Sort_by('status', true, (a) => a.toUpperCase()))
                                                        setIndividuals(finalSort)
                                                        setSortedBy('')
                                                    }
                                                }}>
                                                    Status
                                                    <i className={sortedBy === "status" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                </th>

                                                <th className='min-w-150px' style={{ cursor: "pointer" }} onClick={() => {
                                                    if (sortedBy !== "enteredBy") {
                                                        let finalSort = individuals.sort(Sort_by('enteredBy', false, (a) => a.toUpperCase()))
                                                        setIndividuals(finalSort)
                                                        setSortedBy("enteredBy")
                                                    } else if (sortedBy === "enteredBy") {
                                                        let finalSort = individuals.sort(Sort_by('enteredBy', true, (a) => a.toUpperCase()))
                                                        setIndividuals(finalSort)
                                                        setSortedBy('')
                                                    }
                                                }}>
                                                    Entered By
                                                    <i className={sortedBy === "enteredBy" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                </th>

                                                <th className='min-w-100px' style={{ cursor: "pointer" }} onClick={() => {
                                                    if (sortedBy !== "admittedBy") {
                                                        let finalSort = individuals.sort(Sort_by('admittedBy', false, (a) => a.toUpperCase()))
                                                        setIndividuals(finalSort)
                                                        setSortedBy("admittedBy")
                                                    } else if (sortedBy === "admittedBy") {
                                                        let finalSort = individuals.sort(Sort_by('admittedBy', true, (a) => a.toUpperCase()))
                                                        setIndividuals(finalSort)
                                                        setSortedBy('')
                                                    }
                                                }}>
                                                    Admitted By
                                                    <i className={sortedBy === "admittedBy" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                </th>

                                                <th className='min-w-150px' style={{ cursor: "pointer" }} onClick={() => {
                                                    if (sortedBy !== "admissionDate") {
                                                        let finalSort = individuals.sort(Sort_by('admissionDate', false, parseInt))
                                                        setIndividuals(finalSort)
                                                        setSortedBy("admissionDate")
                                                    } else if (sortedBy === "admissionDate") {
                                                        let finalSort = individuals.sort(Sort_by('admissionDate', true, parseInt))
                                                        setIndividuals(finalSort)
                                                        setSortedBy('')
                                                    }
                                                }}>
                                                    Admission Date
                                                    <i className={sortedBy === "admissionDate" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                </th>

                                                <th className="min-w-100px" style={{ cursor: "pointer" }} onClick={() => {
                                                    if (sortedBy !== "birthDate") {
                                                        let finalSort = individuals.sort(Sort_by('birthDate', false, parseInt))
                                                        setIndividuals(finalSort)
                                                        setSortedBy("birthDate")
                                                    } else if (sortedBy === "birthDate") {
                                                        let finalSort = individuals.sort(Sort_by('birthDate', true, parseInt))
                                                        setIndividuals(finalSort)
                                                        setSortedBy('')
                                                    }
                                                }}>
                                                    Birth Date
                                                    <i className={sortedBy === "birthDate" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                </th>

                                                <th className='min-w-150px' style={{ cursor: "pointer" }} onClick={() => {
                                                    if (sortedBy !== "lastUpdatedBy") {
                                                        let finalSort = individuals.sort(Sort_by('lastUpdatedBy', false, (a) => a.toUpperCase()))
                                                        setIndividuals(finalSort)
                                                        setSortedBy("lastUpdatedBy")
                                                    } else if (sortedBy === "lastUpdatedBy") {
                                                        let finalSort = individuals.sort(Sort_by('lastUpdatedBy', true, (a) => a.toUpperCase()))
                                                        setIndividuals(finalSort)
                                                        setSortedBy('')
                                                    }
                                                }}>
                                                    Last Updated By
                                                    <i className={sortedBy === "lastUpdatedBy" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                </th>

                                                <th className='min-w-200px' style={{ cursor: "pointer" }} onClick={() => {
                                                    if (sortedBy !== "mailingaddress") {
                                                        let finalSort = individuals.sort(Sort_by('mailingaddress', false, (a) => a.toUpperCase()))
                                                        setIndividuals(finalSort)
                                                        setSortedBy("mailingaddress")
                                                    } else if (sortedBy === "mailingaddress") {
                                                        let finalSort = individuals.sort(Sort_by('mailingaddress', true, (a) => a.toUpperCase()))
                                                        setIndividuals(finalSort)
                                                        setSortedBy('')
                                                    }
                                                }}>
                                                    Mailing Address
                                                    <i className={sortedBy === "mailingaddress" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {IndividualPaginationData.length > 0 ? IndividualPaginationData.map((individual, index) => (
                                                <Fragment key={index}>
                                                    <TlogIndividualRow individual={individual} setShowNewForm={setShowNewForm}
                                                        setSelectedIndividual={setSelectedIndividual} />
                                                </Fragment>
                                            )) :
                                                <tr>
                                                    <td align="center" colSpan={12}><span className='text-gray-600 fs-2 fw-bolder'>No Matching Client Found</span></td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                    <div className="d-flex justify-content-center" ref={PaginationRef}>
                                        <Pagination
                                            className='pagination-bar'
                                            currentPage={currentPage}
                                            totalCount={individuals.length}
                                            pageSize={PageSize}
                                            onPageChange={(page) => setCurrentPage(page)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default TlogIndividualList