import { Fragment, useEffect, useState, useMemo, useRef } from 'react'
import PgRow from './PgRow'
import PgEnRow from './PgEnRow'
import Pagination from '../../../../../../_helper/paginationHook/Pagination'
import { Sort_by } from '../../../../../../_helper/objectSorter'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../../setup'
const selectAuth = (state: RootState) => state.auth;

let individualData: any = []

const ProgramIndividuals = ({ setShowIndividuals, editProgramData }: { setShowIndividuals: any, editProgramData: any }) => {
    const [enrolledInds, setEnrolledInds] = useState<any[]>([])
    const [enrollableInds, setEnrollableInds] = useState<any[]>([])
    const [enrolledIndStatic, setEnrolledIndStatic] = useState<any[]>([])
    const [enrollableIndStatic, setEnrollableIndStatic] = useState<any[]>([])
    const [enrollKey, setEnrollKey] = useState('')
    const [delistKey, setDelistKey] = useState('')
    const [currentPageEnrollable, setCurrentPageEnrollable] = useState(1)
    const [currentPageEnrolled, setCurrentPageEnrolled] = useState(1)
    const [PageSizeEnrollable, setPageSizeEnrollable] = useState(25)
    const [PageSizeEnrolled, setPageSizeEnrolled] = useState(25)
    const [sortedBy, setSortedBy] = useState('')
    const [sortByEnrolled, setSortByEnrolled] = useState('')

    const auth = useSelector(selectAuth);

    const companyid = auth.user?.company_code

    useEffect(() => {
        axios.get('clients/get/' + companyid)
            .then(res => {
                individualData = res.data
                let tempvar = editProgramData.individualsAdded
                let enrolled = []
                let notenrolled = []
                for (const element of individualData) {
                    element.mailingaddress = element.mailingInfo.st1 + ' ' +
                        element.mailingInfo?.st2 + ' ' +
                        element.mailingInfo?.city + ' ' +
                        element.mailingInfo?.state + ' ' +
                        element.mailingInfo?.country
                    if (tempvar.includes(element.formID)) {
                        enrolled.push(element)
                    } else {
                        notenrolled.push(element)
                    }
                }
                setEnrolledInds(enrolled)
                setEnrollableInds(notenrolled)
                setEnrolledIndStatic(enrolled)
                setEnrollableIndStatic(notenrolled)
            })

    }, [])

    useEffect(() => {
        if (enrollKey) {
            let indObj = individualData.find((element: { formID: string }) => element.formID === enrollKey);
            setEnrolledInds([...enrolledInds, indObj])
            setEnrollableInds(prevState =>
                prevState.filter((ind) => ind.formID !== enrollKey)
            )
            setEnrollableIndStatic(prevState =>
                prevState.filter((ind) => ind.formID !== enrollKey)
            )
            setEnrolledIndStatic([...enrolledInds, indObj])
            setEnrollKey('')
        }
    }, [enrollKey])

    useEffect(() => {
        if (delistKey) {
            let indObj = individualData.find((element: { formID: string }) => element.formID === delistKey);
            setEnrollableInds([...enrollableInds, indObj])
            setEnrolledInds(prevState =>
                prevState.filter((ind) => ind.formID !== delistKey)
            )
            setEnrollableIndStatic([...enrollableInds, indObj])
            setEnrolledIndStatic(prevState =>
                prevState.filter((ind) => ind.formID !== delistKey)
            )
            setDelistKey('')
        }
    }, [delistKey])

    const PaginationRefEnrollable = useRef(null)
    const PaginationRefEnrolled = useRef(null)

    useEffect(() => {
        let PaginationElement: any = PaginationRefEnrollable.current
        if (PaginationElement !== null) {
            let numberOfPages = PaginationElement.getElementsByTagName("li").length - 2
            if (numberOfPages > 0) {
                if (numberOfPages < currentPageEnrollable) {
                    let tempPage = currentPageEnrollable - 1
                    setCurrentPageEnrollable(tempPage)
                }
            }
        }
    }, [enrollableInds])

    useEffect(() => {
        let PaginationElement: any = PaginationRefEnrolled.current
        if (PaginationElement !== null) {
            let numberOfPages = PaginationElement.getElementsByTagName("li").length - 2
            if (numberOfPages > 0) {
                if (numberOfPages < currentPageEnrolled) {
                    let tempPage = currentPageEnrolled - 1
                    setCurrentPageEnrolled(tempPage)
                }
            }
        }
    }, [enrolledInds])

    const SavePrograms = () => {
        let tempobj = editProgramData
        tempobj.individualsAdded = enrolledInds.map((ind) => ind.formID)
        axios.put('programs/update', tempobj)
        .then(res => {
            console.log(res.data)
            setShowIndividuals(false)
        })
    }

    const filterArrayEnroll = (dataProp: {}[]) => {
        let arrayCopy = JSON.stringify(dataProp)
        arrayCopy = JSON.parse(arrayCopy)
        let filteredArray = []
        let sampleFilter = [
            "formID",
            "firstName",
            "lastName",
            "birthDate",
            "medicaidNumber",
            "status",
            "socialSecurityNumber",
            "mailingaddress"
        ]
        for (let j = 0; j < arrayCopy.length; j++) {
            let allkeys = Object.keys(arrayCopy[j])
            let obj1: any = {
                "formID": '',
                "firstName": '',
                "lastName": '',
                "birthDate": '',
                "medicaidNumber": '',
                "status": '',
                "socialSecurityNumber": '',
                "mailingaddress": ''
            }
            for (let i = 0; i < allkeys.length; i++) {
                if (sampleFilter.includes(allkeys[i])) {
                    let tempvar1 = allkeys[i]
                    obj1[tempvar1 as keyof object] = arrayCopy[j][tempvar1 as keyof object]
                }
            }
            filteredArray.push(obj1)
        }
        return filteredArray
    }
    const searchFilterClientsEnrollable = (value: string) => {
        const filteredArray = filterArrayEnroll(enrollableIndStatic)
        let lowerCaseValue = value.toLowerCase()
        let temparr = []
        for (const element of filteredArray) {
            if (Object.values(element).filter(item => typeof item === 'string' ? item.toLowerCase().includes(lowerCaseValue) : false).length > 0) {
                temparr.push(element)
            }
        }
        setEnrollableInds(temparr)
        setCurrentPageEnrollable(1)
    }

    const searchFilterClientsEnrolled = (value: string) => {
        const filteredArray = filterArrayEnroll(enrolledIndStatic)
        let lowerCaseValue = value.toLowerCase()
        let temparr = []
        for (const element of filteredArray) {
            if (Object.values(element).filter(item => typeof item === 'string' ? item.toLowerCase().includes(lowerCaseValue) : false).length > 0) {
                temparr.push(element)
            }
        }
        setEnrolledInds(temparr)
        setCurrentPageEnrolled(1)
    }

    const ProgramPaginationDataEnrollable = useMemo(() => {
        if (enrollableInds.length <= PageSizeEnrollable) {
            setCurrentPageEnrollable(1)
        }
        let tempdata = enrollableInds
        const firstPageIndex = (currentPageEnrollable - 1) * PageSizeEnrollable;
        const lastPageIndex = firstPageIndex + PageSizeEnrollable;
        return tempdata.slice(firstPageIndex, lastPageIndex);
    }, [currentPageEnrollable, enrollableInds, PageSizeEnrollable, enrollableIndStatic, sortedBy])

    const ProgramPaginationDataEnrolled = useMemo(() => {
        if (enrolledInds.length <= PageSizeEnrolled) {
            setCurrentPageEnrolled(1)
        }
        let tempdata = enrolledInds
        const firstPageIndex = (currentPageEnrolled - 1) * PageSizeEnrolled;
        const lastPageIndex = firstPageIndex + PageSizeEnrolled;
        return tempdata.slice(firstPageIndex, lastPageIndex);
    }, [currentPageEnrolled, enrolledInds, PageSizeEnrolled, enrolledIndStatic, sortByEnrolled])

    return (
        <div>
            <div className="d-flex justify-content-center">
                <div className="card card-flush h-md-100 w-100">
                    <div className='d-flex justify-content-between w-100'>
                        <div className="card-header w-75">
                            <div className="card-title">
                                <p className='text-gray-800 fs-2 fw-bolder'>Program Details</p>
                            </div>
                        </div>
                        <div className='mt-4'>
                            <div className="d-flex justify-content-center">
                                <button className='btn btn-primary btn-active-secondary mx-2' onClick={() => SavePrograms()}>Save</button>
                                <button className='btn btn-secondary btn-active-primary mx-2'
                                    onClick={() => setShowIndividuals(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>

                    <div className="card-body py-1">
                        <div className="d-flex py-4">
                            <label className="w-50 fw-bolder form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">Program Name:</label>
                            <label className="w-50 form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">{editProgramData.programName}</label>
                        </div>
                        <div className="d-flex py-4">
                            <label className="w-50 fw-bolder form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">Site Name:</label>
                            <label className="w-50 form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">{editProgramData.siteName}</label>
                        </div>
                        <div className="py-3">
                            <hr />
                            <div className="d-flex">
                                <h6 className='fw-bolder py-3'>Enrollable Individual(s)</h6>
                            </div>
                            <div className='d-flex justify-content-between py-6'>
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
                                            onChange={(e) => searchFilterClientsEnrollable(e.target.value)}
                                            placeholder='Search Client'
                                        />
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div>
                                        <p style={{ "margin": "revert" }}>Items Per Page</p>
                                    </div>
                                    <div>
                                        <select className='form-control form-control-solid form-select'
                                            onChange={(e) => setPageSizeEnrollable(parseInt(e.target.value))}>
                                            <option value={25}>25</option>
                                            <option value={50}>50</option>
                                            <option value={100}>100</option>
                                            <option value={150}>150</option>
                                            <option value={200}>200</option>
                                            <option value={300}>300</option>
                                            <option value={5}>5</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="stickhyHeaderTable table-responsive" style={{ padding: "0rem 2.25rem" }}>
                                <table
                                    className='table table-light table-rounded table-striped border border-2 table-hover fs-6 gy-5'
                                    id='kt_programInd_table'>
                                    <thead>
                                        <tr className='text-start table-dark text-gray-400 table-rounded fw-bolder fs-7 text-uppercase gs-0'>
                                            <th className="px-3 min-w-100px" style={{ cursor: "pointer" }} onClick={() => {
                                                if (sortedBy !== "formID") {
                                                    let finalSort = enrollableInds.sort(Sort_by('formID', false, parseInt))
                                                    console.log(finalSort[0])
                                                    setEnrollableInds(finalSort)
                                                    setSortedBy("formID")
                                                } else if (sortedBy === "formID") {
                                                    let finalSort = enrollableInds.sort(Sort_by('formID', true, parseInt))
                                                    console.log(finalSort[0])
                                                    setEnrollableInds(finalSort)
                                                    setSortedBy('')
                                                }
                                            }}>
                                                Form ID
                                                <i className={sortedBy === "formID" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                            </th>

                                            <th className="min-w-150px" style={{ cursor: "pointer" }} onClick={() => {
                                                if (sortedBy !== "firstName") {
                                                    let finalSort = enrollableInds.sort(Sort_by('firstName', false, (a: any) => a.toUpperCase()))
                                                    setEnrollableInds(finalSort)
                                                    setSortedBy("firstName")
                                                } else if (sortedBy === "firstName") {
                                                    let finalSort = enrollableInds.sort(Sort_by('firstName', true, (a: any) => a.toUpperCase()))
                                                    setEnrollableInds(finalSort)
                                                    setSortedBy('')
                                                }
                                            }}>
                                                Client Name
                                                <i className={sortedBy === "firstName" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                            </th>

                                            <th className="min-w-100px" style={{ cursor: "pointer" }} onClick={() => {
                                                if (sortedBy !== "birthDate") {
                                                    let finalSort = enrollableInds.sort(Sort_by('birthDate', false, parseInt))
                                                    setEnrollableInds(finalSort)
                                                    setSortedBy("birthDate")
                                                } else if (sortedBy === "birthDate") {
                                                    let finalSort = enrollableInds.sort(Sort_by('birthDate', true, parseInt))
                                                    setEnrollableInds(finalSort)
                                                    setSortedBy('')
                                                }
                                            }}>
                                                Birth Date
                                                <i className={sortedBy === "birthDate" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                            </th>

                                            <th className='min-w-300px' style={{ cursor: "pointer" }} onClick={() => {
                                                if (sortedBy !== "mailingaddress") {
                                                    let finalSort = enrollableInds.sort(Sort_by('mailingaddress', false, (a: any) => a.toUpperCase()))
                                                    setEnrollableInds(finalSort)
                                                    setSortedBy("mailingaddress")
                                                } else if (sortedBy === "mailingaddress") {
                                                    let finalSort = enrollableInds.sort(Sort_by('mailingaddress', true, (a: any) => a.toUpperCase()))
                                                    setEnrollableInds(finalSort)
                                                    setSortedBy('')
                                                }
                                            }}>
                                                Mailing Address
                                                <i className={sortedBy === "mailingaddress" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                            </th>

                                            <th className="min-w-150px" style={{ cursor: "pointer" }} onClick={() => {
                                                if (sortedBy !== "socialSecurityNumber") {
                                                    let finalSort = enrollableInds.sort(Sort_by('socialSecurityNumber', false, parseInt))
                                                    setEnrollableInds(finalSort)
                                                    setSortedBy("socialSecurityNumber")
                                                } else if (sortedBy === "socialSecurityNumber") {
                                                    let finalSort = enrollableInds.sort(Sort_by('socialSecurityNumber', true, parseInt))
                                                    setEnrollableInds(finalSort)
                                                    setSortedBy('')
                                                }
                                            }}>
                                                Social Security Number
                                                <i className={sortedBy === "socialSecurityNumber" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                            </th>

                                            <th className="min-w-100px" style={{ cursor: "pointer" }} onClick={() => {
                                                if (sortedBy !== "medicaidNumber") {
                                                    let finalSort = enrollableInds.sort(Sort_by('medicaidNumber', false, parseInt))
                                                    setEnrollableInds(finalSort)
                                                    setSortedBy("medicaidNumber")
                                                } else if (sortedBy === "medicaidNumber") {
                                                    let finalSort = enrollableInds.sort(Sort_by('medicaidNumber', true, parseInt))
                                                    setEnrollableInds(finalSort)
                                                    setSortedBy('')
                                                }
                                            }}>
                                                Medicaid Number
                                                <i className={sortedBy === "medicaidNumber" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                            </th>

                                            <th className='min-w-100px' style={{ cursor: "pointer" }} onClick={() => {
                                                if (sortedBy !== "status") {
                                                    let finalSort = enrollableInds.sort(Sort_by('status', false, (a: any) => a.toUpperCase()))
                                                    setEnrollableInds(finalSort)
                                                    setSortedBy("status")
                                                } else if (sortedBy === "status") {
                                                    let finalSort = enrollableInds.sort(Sort_by('status', true, (a: any) => a.toUpperCase()))
                                                    setEnrollableInds(finalSort)
                                                    setSortedBy('')
                                                }
                                            }}>
                                                Status
                                                <i className={sortedBy === "status" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                            </th>

                                            <th className='min-w-100px'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            ProgramPaginationDataEnrollable.length > 0 ?
                                                ProgramPaginationDataEnrollable.map((ind, index) => (
                                                    <Fragment key={index}>
                                                        <PgRow individual={ind} setEnrollKey={setEnrollKey} index={index} />
                                                    </Fragment>
                                                ))
                                                :
                                                <tr>
                                                    <td align="center" colSpan={12}><span className='text-gray-600 fs-2 fw-bolder'>No Individuals to Enroll in this program</span></td>
                                                </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="d-flex justify-content-center" ref={PaginationRefEnrollable}>
                                <Pagination
                                    className='pagination-bar'
                                    currentPage={currentPageEnrollable}
                                    totalCount={enrollableInds.length}
                                    pageSize={PageSizeEnrollable}
                                    onPageChange={(page: React.SetStateAction<number>) => setCurrentPageEnrollable(page)}
                                />
                            </div>
                        </div>
                        <div className="py-6">
                            <hr />
                            <div className="d-flex">
                                <h6 className='fw-bolder py-3'>Enrolled Individual(s)</h6>
                            </div>
                            <div className='d-flex justify-content-between py-6'>
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
                                            onChange={(e) => searchFilterClientsEnrolled(e.target.value)}
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
                                            onChange={(e) => setPageSizeEnrolled(parseInt(e.target.value))}>
                                            <option value={25}>25</option>
                                            <option value={50}>50</option>
                                            <option value={100}>100</option>
                                            <option value={150}>150</option>
                                            <option value={200}>200</option>
                                            <option value={300}>300</option>
                                            <option value={5}>5</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="stickhyHeaderTable table-responsive">
                                <table
                                    className='table table-light table-rounded table-striped border border-2 table-hover fs-6 gy-5'
                                    id='kt_programInd_table'>
                                    <thead>
                                        <tr className='text-start table-dark text-gray-400 table-rounded fw-bolder fs-7 text-uppercase gs-0'>
                                            <th className="px-3 min-w-100px" style={{ cursor: "pointer" }} onClick={() => {
                                                if (sortByEnrolled !== "formID") {
                                                    let finalSort = enrolledInds.sort(Sort_by('formID', false, parseInt))
                                                    setEnrolledInds(finalSort)
                                                    setSortByEnrolled("formID")
                                                } else if (sortByEnrolled === "formID") {
                                                    let finalSort = enrolledInds.sort(Sort_by('formID', true, parseInt))
                                                    setEnrolledInds(finalSort)
                                                    setSortByEnrolled('')
                                                }
                                            }}>
                                                Form ID
                                                <i className={sortByEnrolled === "formID" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                            </th>

                                            <th className="min-w-150px" style={{ cursor: "pointer" }} onClick={() => {
                                                if (sortByEnrolled !== "firstName") {
                                                    let finalSort = enrolledInds.sort(Sort_by('firstName', false, (a: any) => a.toUpperCase()))
                                                    setEnrolledInds(finalSort)
                                                    setSortByEnrolled("firstName")
                                                } else if (sortByEnrolled === "firstName") {
                                                    let finalSort = enrolledInds.sort(Sort_by('firstName', true, (a: any) => a.toUpperCase()))
                                                    setEnrolledInds(finalSort)
                                                    setSortByEnrolled('')
                                                }
                                            }}>
                                                Client Name
                                                <i className={sortByEnrolled === "firstName" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                            </th>

                                            <th className="min-w-100px" style={{ cursor: "pointer" }} onClick={() => {
                                                if (sortByEnrolled !== "birthDate") {
                                                    let finalSort = enrolledInds.sort(Sort_by('birthDate', false, parseInt))
                                                    setEnrolledInds(finalSort)
                                                    setSortByEnrolled("birthDate")
                                                } else if (sortByEnrolled === "birthDate") {
                                                    let finalSort = enrolledInds.sort(Sort_by('birthDate', true, parseInt))
                                                    setEnrolledInds(finalSort)
                                                    setSortByEnrolled('')
                                                }
                                            }}>
                                                Birth Date
                                                <i className={sortByEnrolled === "birthDate" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                            </th>

                                            <th className='min-w-300px' style={{ cursor: "pointer" }} onClick={() => {
                                                if (sortByEnrolled !== "mailingaddress") {
                                                    let finalSort = enrolledInds.sort(Sort_by('mailingaddress', false, (a: any) => a.toUpperCase()))
                                                    setEnrolledInds(finalSort)
                                                    setSortByEnrolled("mailingaddress")
                                                } else if (sortByEnrolled === "mailingaddress") {
                                                    let finalSort = enrolledInds.sort(Sort_by('mailingaddress', true, (a: any) => a.toUpperCase()))
                                                    setEnrolledInds(finalSort)
                                                    setSortByEnrolled('')
                                                }
                                            }}>
                                                Mailing Address
                                                <i className={sortByEnrolled === "mailingaddress" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                            </th>

                                            <th className="min-w-150px" style={{ cursor: "pointer" }} onClick={() => {
                                                if (sortByEnrolled !== "socialSecurityNumber") {
                                                    let finalSort = enrolledInds.sort(Sort_by('socialSecurityNumber', false, parseInt))
                                                    setEnrolledInds(finalSort)
                                                    setSortByEnrolled("socialSecurityNumber")
                                                } else if (sortByEnrolled === "socialSecurityNumber") {
                                                    let finalSort = enrolledInds.sort(Sort_by('socialSecurityNumber', true, parseInt))
                                                    setEnrolledInds(finalSort)
                                                    setSortByEnrolled('')
                                                }
                                            }}>
                                                Social Security Number
                                                <i className={sortByEnrolled === "socialSecurityNumber" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                            </th>

                                            <th className="min-w-100px" style={{ cursor: "pointer" }} onClick={() => {
                                                if (sortByEnrolled !== "medicaidNumber") {
                                                    let finalSort = enrolledInds.sort(Sort_by('medicaidNumber', false, parseInt))
                                                    setEnrolledInds(finalSort)
                                                    setSortByEnrolled("medicaidNumber")
                                                } else if (sortByEnrolled === "medicaidNumber") {
                                                    let finalSort = enrolledInds.sort(Sort_by('medicaidNumber', true, parseInt))
                                                    setEnrolledInds(finalSort)
                                                    setSortByEnrolled('')
                                                }
                                            }}>
                                                Medicaid Number
                                                <i className={sortByEnrolled === "medicaidNumber" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                            </th>

                                            <th className='min-w-100px' style={{ cursor: "pointer" }} onClick={() => {
                                                if (sortByEnrolled !== "status") {
                                                    let finalSort = enrolledInds.sort(Sort_by('status', false, (a: any) => a.toUpperCase()))
                                                    setEnrolledInds(finalSort)
                                                    setSortByEnrolled("status")
                                                } else if (sortByEnrolled === "status") {
                                                    let finalSort = enrolledInds.sort(Sort_by('status', true, (a: any) => a.toUpperCase()))
                                                    setEnrolledInds(finalSort)
                                                    setSortByEnrolled('')
                                                }
                                            }}>
                                                Status
                                                <i className={sortByEnrolled === "status" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                            </th>

                                            <th className='min-w-100px'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            ProgramPaginationDataEnrolled.length > 0 ?
                                                ProgramPaginationDataEnrolled.map((ind, index) => (
                                                    <Fragment key={index}>
                                                        <PgEnRow individual={ind} setDelistKey={setDelistKey} index={index} />
                                                    </Fragment>
                                                ))
                                                :
                                                <tr>
                                                    <td align="center" colSpan={12}><span className='text-gray-600 fs-2 fw-bolder'>No Individuals are enrolled in this program</span></td>
                                                </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="d-flex justify-content-center" ref={PaginationRefEnrolled}>
                                <Pagination
                                    className='pagination-bar'
                                    currentPage={currentPageEnrolled}
                                    totalCount={enrolledInds.length}
                                    pageSize={PageSizeEnrolled}
                                    onPageChange={(page: React.SetStateAction<number>) => setCurrentPageEnrolled(page)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProgramIndividuals