import { Fragment, useEffect, useState, useRef, useMemo } from "react"
import { useHistory } from "react-router-dom"
// import contactData from '../../contact-mock-data.json'
import GuardianRow from "./GuardianRow"
import { Sort_by } from "../../../../../../_helper/objectSorter"
import SubMenuSection from "../SubMenuSection"
import axios from "axios"

const GuardianList = ({ location }) => {
    const [sortedBy, setSortedBy] = useState('')
    const [guardians, setGuardians] = useState([])
    const [guardianStatic, setGuardianStatic] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [guardianInfo, setGuardianInfo] = useState({})
    const [PageSize, setPageSize] = useState(50)

    const history = useHistory()
    
    useEffect(() => {
        if (location.state === undefined) {
            history.push('/care/individual-intake/list')
        } else {
            axios.get("/contacts/get")
                .then(res => {
                    let conData = res.data.filter(contact => contact.individualID === location.state.formID)
                    let temparr = []
                    let tempvar = {}
                    for (let i = 0; i < conData.length; i++) {
                        if (conData[i].isGuardian === true) {
                            tempvar.firstName = conData[i].firstName
                            tempvar.lastName = conData[i].lastName
                            tempvar.formID = conData[i].formID
                            tempvar.guardianType = conData[i].guardianInfo.guardianType
                            tempvar.guardianAuthority = conData[i].guardianInfo.guardianAuthority
                            tempvar.guardianEstablishDate = conData[i].guardianInfo.guardianEstablishDate
                            tempvar.guardianEstablishEndDate = conData[i].guardianInfo.guardianEstablishEndDate
                            temparr.push(JSON.stringify(tempvar))
                        }
                    }
                    for(let i = 0; i < temparr.length; i++){
                        temparr[i] = JSON.parse(temparr[i])
                    }
                    setGuardians(temparr)
                    setGuardianStatic(temparr)
                })
        }
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
    }, [guardians])

    const filterArray = (dataProp) => {
        let arrayCopy = JSON.stringify(dataProp)
        arrayCopy = JSON.parse(arrayCopy)
        let filteredArray = []
        let sampleFilter = [
            "formID",
            "firstName",
            "lastName",
            "guardianType",
            "guardianAuthority",
            "guardianEstablishDate",
            "guardianEstablishEndDate",
        ]
        for (let j = 0; j < arrayCopy.length; j++) {
            let allkeys = Object.keys(arrayCopy[j])

            let obj1 = {
                "formID": '',
                "name": '',
                "guardianType": '',
                "guardianAuthority": '',
                "guardianEstablishDate": '',
                "guardianEstablishEndDate": '',
            }
            for (let i = 0; i < allkeys.length; i++) {
                if (sampleFilter.includes(allkeys[i])) {
                    let tempvar1 = allkeys[i]
                    obj1[tempvar1] = arrayCopy[j][tempvar1]
                }
            }
            filteredArray.push(obj1)
        }
        return filteredArray
    }
    const searchFilterGuardians = (value) => {
        let filteredArray = filterArray(guardianStatic)
        let lowerCaseValue = value.toLowerCase()
        let temparr = []
        for (let i = 0; i < filteredArray.length; i++) {
            if (Object.values(filteredArray[i]).filter(item => typeof item === 'string' ? item.toLowerCase().includes(lowerCaseValue) : false).length > 0) {
                temparr.push(filteredArray[i])
            }
        }
        setGuardians(temparr)
        setCurrentPage(1)
    }

    const GuardianPaginationData = useMemo(() => {
        if (guardians.length <= PageSize) {
            setCurrentPage(1)
        }
        let tempdata = guardians
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return tempdata.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, guardians, PageSize, sortedBy, guardianStatic])

    return (
        <div className='card mb-5 col-mb-10' id='kt_content'>
            <div className="mt-6 mx-6">
                <SubMenuSection individual={location.state} />
            </div>
            <div className="px-7 pt-7">
                <h3 className="fw-bolder">List of Guardians under: {location.state?.firstName} {location.state?.lastName}</h3>
            </div>
            <div className='card mb-5 col-mb-10' id='kt_content'>
                <div className='post d-flex flex-column-fluid' id='kt_post'>
                    <div id='kt_content_container' className='container-xxl'>
                        <div className='card-header border-0 pt-6'>
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
                                                onChange={(e) => searchFilterGuardians(e.target.value)}
                                                placeholder='Search Guardians'
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
                        <div className='my-4'>
                            <div className="card-body stickhyHeaderTable table-responsive" style={{ padding: "0rem 2.25rem" }}>
                                <table
                                    className='table table-light table-rounded table-striped border border-2 table-hover fs-6 gy-5'
                                    id='kt_contacts_table'
                                >
                                    <thead>
                                        <tr className='text-start table-dark text-gray-400 table-rounded fw-bolder fs-7 text-uppercase gs-0'>

                                            <th className="px-3 min-w-150px" style={{ cursor: "pointer" }} onClick={() => {
                                                if (sortedBy !== "formID") {
                                                    let finalSort = guardians.sort(Sort_by('formID', false, (a) => a.toUpperCase()))
                                                    setGuardians(finalSort)
                                                    setSortedBy("formID")
                                                } else if (sortedBy === "formID") {
                                                    let finalSort = guardians.sort(Sort_by('formID', true, (a) => a.toUpperCase()))
                                                    setGuardians(finalSort)
                                                    setSortedBy('')
                                                }
                                            }}>
                                                Form ID
                                                <i className={sortedBy === "formID" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                            </th>

                                            <th className="min-w-150px" style={{ cursor: "pointer" }} onClick={() => {
                                                if (sortedBy !== "firstName") {
                                                    let finalSort = guardians.sort(Sort_by('firstName', false, (a) => a.toUpperCase()))
                                                    setGuardians(finalSort)
                                                    setSortedBy("firstName")
                                                } else if (sortedBy === "firstName") {
                                                    let finalSort = guardians.sort(Sort_by('firstName', true, (a) => a.toUpperCase()))
                                                    setGuardians(finalSort)
                                                    setSortedBy('')
                                                }
                                            }}>
                                                Name
                                                <i className={sortedBy === "firstName" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                            </th>

                                            <th className="min-w-200px" style={{ cursor: "pointer" }} onClick={() => {
                                                if (sortedBy !== "guardianType") {
                                                    let finalSort = guardians.sort(Sort_by('guardianType', false, (a) => a.toUpperCase()))
                                                    setGuardians(finalSort)
                                                    setSortedBy("guardianType")
                                                } else if (sortedBy === "guardianType") {
                                                    let finalSort = guardians.sort(Sort_by('guardianType', true, (a) => a.toUpperCase()))
                                                    setGuardians(finalSort)
                                                    setSortedBy('')
                                                }
                                            }}>
                                                Guardian Type
                                                <i className={sortedBy === "guardianType" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                            </th>

                                            <th className="min-w-200px" style={{ cursor: "pointer" }} onClick={() => {
                                                if (sortedBy !== "guardianAuthority") {
                                                    let finalSort = guardians.sort(Sort_by('guardianAuthority', false, (a) => a.toUpperCase()))
                                                    setGuardians(finalSort)
                                                    setSortedBy("guardianAuthority")
                                                } else if (sortedBy === "guardianAuthority") {
                                                    let finalSort = guardians.sort(Sort_by('guardianAuthority', true, (a) => a.toUpperCase()))
                                                    setGuardians(finalSort)
                                                    setSortedBy('')
                                                }
                                            }}>
                                                Guardian Authority
                                                <i className={sortedBy === "guardianAuthority" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                            </th>

                                            <th className="min-w-150px" style={{ cursor: "pointer" }} onClick={() => {
                                                if (sortedBy !== "guardianEstablishDate") {
                                                    let finalSort = guardians.sort(Sort_by('guardianEstablishDate', false, parseInt))
                                                    setGuardians(finalSort)
                                                    setSortedBy("guardianEstablishDate")
                                                } else if (sortedBy === "guardianEstablishDate") {
                                                    let finalSort = guardians.sort(Sort_by('guardianEstablishDate', true, parseInt))
                                                    setGuardians(finalSort)
                                                    setSortedBy('')
                                                }
                                            }}>
                                                Guardian Establish Date
                                                <i className={sortedBy === "guardianEstablishDate" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                            </th>

                                            <th className="min-w-150px" style={{ cursor: "pointer" }} onClick={() => {
                                                if (sortedBy !== "guardianEstablishEndDate") {
                                                    let finalSort = guardians.sort(Sort_by('guardianEstablishEndDate', false, parseInt))
                                                    setGuardians(finalSort)
                                                    setSortedBy("guardianEstablishEndDate")
                                                } else if (sortedBy === "guardianEstablishEndDate") {
                                                    let finalSort = guardians.sort(Sort_by('guardianEstablishEndDate', true, parseInt))
                                                    setGuardians(finalSort)
                                                    setSortedBy('')
                                                }
                                            }}>
                                                Guardian Establish End Date
                                                <i className={sortedBy === "guardianEstablishEndDate" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {GuardianPaginationData.length > 0 ? GuardianPaginationData.map((guardian, index) => (
                                            <Fragment key={index}>
                                                <GuardianRow guardian={guardian} setGuardianInfo={setGuardianInfo} />
                                            </Fragment>
                                        )) :
                                            <tr>
                                                <td align="center" colSpan={12}><span className='text-gray-600 fs-2 fw-bolder'>No Guardian Found</span></td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL FOR DELETING CONTACT */}
            <div className='modal fade' id="kt_modal_show_guardian" tabIndex={-1} aria-hidden="true">
                {/*begin::Modal dialog*/}
                <div className="modal-dialog modal-dialog-centered mw-800px mh-500px">
                    {/*begin::Modal content*/}
                    <div className="modal-content">
                        {/*begin::Modal header*/}
                        <div className="modal-header d-flex justify-content-center">
                            {/*begin::Modal title*/}
                            <h3 className="fw-bolder">Guardian Info</h3>
                            {/*end::Modal title*/}
                        </div>
                        <div className='modal-body scroll-y mx-lg-5'>
                            <div className='row'>
                                <label className='w-50 fs-4'>Client Name</label>
                                <label className='fs-6 mb-5 w-50'>{location.state?.firstName} {location.state?.lastName}</label>
                            </div>
                            <div className="row my-2">
                                <h5 className="fw-bold">Guardian Details</h5>
                                <hr />
                            </div>
                            <div className="row">
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className='fw-bold fs-6 mb-2 mx-3'>Guardian Name: </label>
                                    <span>{guardianInfo.firstName + ' ' + guardianInfo.lastName}</span>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className='fw-bold fs-6 mb-2 mx-3'>Guardian Type: </label>
                                    <span>{guardianInfo.guardianType}</span>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className='fw-bold fs-6 mb-2 mx-3'>Guardian Authority: </label>
                                    <span>{guardianInfo.guardianAuthority}</span>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className='fw-bold fs-6 mb-2 mx-3'>Established Date:</label>
                                    <span>{guardianInfo.guardianEstablishDate}</span>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className='fw-bold fs-6 mb-2 mx-3'>Establish End Date:</label>
                                    <span>{guardianInfo.guardianEstablishEndDate}</span>
                                </div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <button className='btn btn-light me-3' data-bs-dismiss="modal"
                                    aria-label="Close">Discard
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GuardianList