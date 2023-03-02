import { Fragment, useEffect, useState, useMemo, useRef } from 'react'
import Pagination from '../../../../../../_helper/paginationHook/Pagination'
// import programData from '../../program-mock-data.json'
import IEnRow from './IEnRow'
import IRow from './IRow'
import SubMenuSection from '../../subMenuSection/SubMenuSection'
import axios from 'axios'
import { Sort_by } from '../../../../../../_helper/objectSorter'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../../setup'
import { filterArray } from '../../../../../../_helper/filterArray'
const selectAuth = (state: RootState) => state.auth;

let programData: any = []

const sampleFilter = [
    "formID",
    "programName",
    "programType",
    "siteName",
    "createDate"
]

const IndividualProgramList = ({ selectedIndividual, setShowProgramsForm }: { selectedIndividual: any, setShowProgramsForm: any }) => {
    const [enrolledProgs, setEnrolledProgs] = useState<any[]>([])
    const [enrollableProgs, setEnrollableProgs] = useState<any[]>([])
    const [enrolledProgsStatic, setEnrolledProgsStatic] = useState<any[]>([])
    const [enrollableProgsStatic, setEnrollableProgsStatic] = useState<any[]>([])
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
        axios.get('programs/get/' + companyid)
            .then((res) => {
                programData = res.data
                let SingleIndividual: any = selectedIndividual
                let selected = []
                let notSelected = []
                for (const element of programData) {
                    if (element.individualsAdded.includes(SingleIndividual.formID)) {
                        selected.push(element)
                    } else {
                        notSelected.push(element)
                    }
                }
                setEnrolledProgs(selected)
                setEnrollableProgs(notSelected)
                setEnrolledProgsStatic(selected)
                setEnrollableProgsStatic(notSelected)
            })
    }, [])

    useEffect(() => {
        if (enrollKey) {
            let indObj = programData.find((element: { formID: string }) => element.formID === enrollKey);
            setEnrolledProgs([...enrolledProgs, indObj])
            setEnrollableProgs(prevState =>
                prevState.filter((ind) => ind.formID !== enrollKey)
            )

            let tempEneStatic = enrolledProgsStatic
            tempEneStatic.push(indObj)
            setEnrolledProgsStatic(tempEneStatic)

            let tempEndStatic = enrollableProgsStatic
            tempEndStatic = tempEndStatic.filter(ind => ind["formID" as keyof object] !== enrollKey)
            setEnrollableProgsStatic(tempEndStatic)
            setEnrollKey('')
        }
    }, [enrollKey])

    useEffect(() => {
        if (delistKey) {
            let indObj = programData.find((element: { formID: string }) => element.formID === delistKey);
            setEnrollableProgs([...enrollableProgs, indObj])
            setEnrolledProgs(prevState =>
                prevState.filter((ind) => ind.formID !== delistKey)
            )

            let tempEneStatic = enrollableProgsStatic
            tempEneStatic.push(indObj)
            setEnrollableProgsStatic(tempEneStatic)

            let tempEndStatic = enrolledProgsStatic
            tempEndStatic = tempEndStatic.filter(ind => ind["formID" as keyof object] !== delistKey)

            setEnrolledProgsStatic(tempEndStatic)
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
    }, [enrollableProgs])

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
    }, [enrolledProgs])

    const SavePrograms = () => {
        for (let i = 0; i < programData.length; i++) {
            for (let j = 0; j < enrolledProgs.length; j++) {
                if (programData[i].formID === enrolledProgs[j].formID) {
                    if (!programData[i].individualsAdded.includes(selectedIndividual.formID)) {
                        programData[i].individualsAdded.push(selectedIndividual.formID)
                    }
                }
            }
            for (let j = 0; j < enrollableProgs.length; j++) {
                if (programData[i].formID === enrollableProgs[j].formID) {
                    programData[i].individualsAdded = programData[i].individualsAdded.filter((x: any) => x !== selectedIndividual.formID)
                }
            }
        }
        // update db data
        axios.put('programs/updateAll', programData)
            .then(res => {
                console.log(res.data)
            })
    }

    const searchFilterClientsEnrollable = (value: string) => {
        const filteredArray = filterArray(enrollableProgsStatic, sampleFilter)
        let lowerCaseValue = value.toLowerCase()
        let temparr: any = []
        for (let i = 0; i < filteredArray.length; i++) {
            if (Object.values(filteredArray[i]).filter(item => typeof item === 'string' ? item.toLowerCase().includes(lowerCaseValue) : false).length > 0) {
                temparr.push(filteredArray[i])
            }
        }
        let tempstate = []
        for(let i = 0; i < enrollableProgsStatic.length; i++) {
            for(let j = 0; j < temparr.length; j++) {
                if(temparr[j].formID === enrollableProgsStatic[i].formID) {
                    tempstate.push(enrollableProgsStatic[i])
                }
            }
        }

        setEnrollableProgs(tempstate)
        setCurrentPageEnrollable(1)
    }

    const searchFilterClientsEnrolled = (value: string) => {
        const filteredArray = filterArray(enrolledProgsStatic, sampleFilter)
        let lowerCaseValue = value.toLowerCase()
        let temparr: any = []
        for (let i = 0; i < filteredArray.length; i++) {
            if (Object.values(filteredArray[i]).filter(item => typeof item === 'string' ? item.toLowerCase().includes(lowerCaseValue) : false).length > 0) {
                temparr.push(filteredArray[i])
            }
        }
        let tempstate = []
        for(let i = 0; i < enrolledProgsStatic.length; i++) {
            for(let j = 0; j < temparr.length; j++) {
                if(temparr[j].formID === enrolledProgsStatic[i].formID) {
                    tempstate.push(enrolledProgsStatic[i])
                }
            }
        }
        setEnrolledProgs(tempstate)
        setCurrentPageEnrolled(1)
    }

    const IndividualPaginationDataEnrollable = useMemo(() => {
        if (enrollableProgs.length <= PageSizeEnrollable) {
            setCurrentPageEnrollable(1)
        }
        let tempdata = enrollableProgs
        const firstPageIndex = (currentPageEnrollable - 1) * PageSizeEnrollable;
        const lastPageIndex = firstPageIndex + PageSizeEnrollable;
        return tempdata.slice(firstPageIndex, lastPageIndex);
    }, [currentPageEnrollable, enrollableProgs, PageSizeEnrollable, enrollableProgsStatic, sortedBy])

    const IndividualPaginationDataEnrolled = useMemo(() => {
        if (enrolledProgs.length <= PageSizeEnrolled) {
            setCurrentPageEnrolled(1)
        }
        let tempdata = enrolledProgs
        const firstPageIndex = (currentPageEnrolled - 1) * PageSizeEnrolled;
        const lastPageIndex = firstPageIndex + PageSizeEnrolled;
        return tempdata.slice(firstPageIndex, lastPageIndex);
    }, [currentPageEnrolled, enrolledProgs, PageSizeEnrolled, enrolledProgsStatic, sortByEnrolled])
console.log(selectedIndividual)
    return (
        <div>
            <div className="d-flex justify-content-center">
                <div className="card card-flush h-md-100 w-100">
                    <div className="mx-6 my-6">
                        <SubMenuSection individual={selectedIndividual} />
                    </div>
                    <div className='d-flex justify-content-between w-100'>
                        <div className="card-header w-75">
                            <div className="card-title">
                                <p className='text-gray-800 fs-2 fw-bolder'>Program Details</p>
                            </div>
                        </div>
                        <div className='mt-4'>
                            <div className="d-flex justify-content-center">
                                <button className='btn btn-primary btn-active-secondary mx-2' onClick={SavePrograms}>Save</button>
                                <button className='btn btn-secondary btn-active-primary mx-2'
                                    onClick={() => setShowProgramsForm(false)}>Back</button>
                            </div>
                        </div>
                    </div>

                    <div className="card-body py-1">
                        <div className="d-flex py-4">
                            <label className="w-50 fw-bolder form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">Individual Name:</label>
                            <label className="w-50 form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">{selectedIndividual?.firstName + ' ' + selectedIndividual.lastName}</label>
                        </div>
                        <div className="d-flex py-4">
                            <label className="w-50 fw-bolder form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">Birth Date:</label>
                            <label className="w-50 form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">{selectedIndividual.birthDate}</label>
                        </div>
                        <div className="d-flex py-4">
                            <label className="w-50 fw-bolder form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">Individual Satus:</label>
                            <label className="w-50 form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">{selectedIndividual.status}</label>
                        </div>
                        <div className="py-3">
                            <hr />
                            <div className='d-flex pt-6'>
                                <h6 className='fw-bolder py-3'>Enrollable Program(s)</h6>
                            </div>
                            <div className="d-flex justify-content-between">
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
                                <div className='d-flex'>
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
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table
                                    className='table table-light table-rounded table-striped border border-2 table-hover fs-6 gy-5'
                                    id='kt_programInd_table'>
                                    <thead>
                                        <tr className='text-start table-dark text-gray-400 table-rounded fw-bolder fs-7 text-uppercase gs-0'>
                                            <th className="px-3 min-w-50px" style={{ cursor: "pointer" }} onClick={() => {
                                                if (sortedBy !== "formID") {
                                                    let finalSort = enrollableProgs.sort(Sort_by('formID', false, (a: any) => a.toUpperCase()))
                                                    setEnrollableProgs(finalSort)
                                                    setSortedBy("formID")
                                                } else if (sortedBy === "formID") {
                                                    let finalSort = enrollableProgs.sort(Sort_by('formID', true, (a: any) => a.toUpperCase()))
                                                    setEnrollableProgs(finalSort)
                                                    setSortedBy("")
                                                }
                                            }}>
                                                Form ID
                                                <i className={sortedBy === "formID" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                            </th>
                                            <th className="min-w-100px" style={{ cursor: "pointer" }} onClick={() => {
                                                if (sortedBy !== "programName") {
                                                    let finalSort = enrollableProgs.sort(Sort_by('programName', false, (a: any) => a.toUpperCase()))
                                                    setEnrollableProgs(finalSort)
                                                    setSortedBy("programName")
                                                } else if (sortedBy === "programName") {
                                                    let finalSort = enrollableProgs.sort(Sort_by('programName', true, (a: any) => a.toUpperCase()))
                                                    setEnrollableProgs(finalSort)
                                                    setSortedBy('')
                                                }
                                            }}>
                                                Program Name
                                                <i className={sortedBy === "programName" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                            </th>
                                            <th className="min-w-100px" style={{ cursor: "pointer" }} onClick={() => {
                                                if (sortedBy !== "programType") {
                                                    let finalSort = enrollableProgs.sort(Sort_by('programType', false, (a: any) => a.toUpperCase()))
                                                    setEnrollableProgs(finalSort)
                                                    setSortedBy("programType")
                                                } else if (sortedBy === "programType") {
                                                    let finalSort = enrollableProgs.sort(Sort_by('programType', true, (a: any) => a.toUpperCase()))
                                                    setEnrollableProgs(finalSort)
                                                    setSortedBy("")
                                                }
                                            }}>
                                                Program Type
                                                <i className={sortedBy === "programType" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                            </th>
                                            <th className="min-w-100px" style={{ cursor: "pointer" }} onClick={() => {
                                                if (sortedBy !== "siteName") {
                                                    let finalSort = enrollableProgs.sort(Sort_by('siteName', false, (a: any) => a.toUpperCase()))
                                                    setEnrollableProgs(finalSort)
                                                    setSortedBy("siteName")
                                                } else if (sortedBy === "siteName") {
                                                    let finalSort = enrollableProgs.sort(Sort_by('siteName', true, (a: any) => a.toUpperCase()))
                                                    setEnrollableProgs(finalSort)
                                                    setSortedBy("")
                                                }
                                            }}>
                                                Site Name
                                                <i className={sortedBy === "siteName" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                            </th>
                                            <th className="min-w-100px" style={{ cursor: "pointer" }} onClick={() => {
                                                if (sortedBy !== "createDate") {
                                                    let finalSort = enrollableProgs.sort(Sort_by('createDate', false, (a: any) => a.toUpperCase()))
                                                    setEnrollableProgs(finalSort)
                                                    setSortedBy("createDate")
                                                } else if (sortedBy === "createDate") {
                                                    let finalSort = enrollableProgs.sort(Sort_by('createDate', true, (a: any) => a.toUpperCase()))
                                                    setEnrollableProgs(finalSort)
                                                    setSortedBy("")
                                                }
                                            }}>
                                                Created Date
                                                <i className={sortedBy === "createDate" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                            </th>
                                            <th className="min-w-100px">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            IndividualPaginationDataEnrollable.length > 0 ?
                                                IndividualPaginationDataEnrollable.map((program, index) => (
                                                    <Fragment key={index}>
                                                        <IRow program={program} setEnrollKey={setEnrollKey} />
                                                    </Fragment>
                                                ))
                                                :
                                                <tr>
                                                    <td align="center" colSpan={12}><span className='text-gray-600 fs-2 fw-bolder'>This Individual is already enrolled into all programs</span></td>
                                                </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="d-flex justify-content-center" ref={PaginationRefEnrollable}>
                                <Pagination
                                    className='pagination-bar'
                                    currentPage={currentPageEnrollable}
                                    totalCount={enrollableProgs.length}
                                    pageSize={PageSizeEnrollable}
                                    onPageChange={(page: React.SetStateAction<number>) => setCurrentPageEnrollable(page)}
                                />
                            </div>
                        </div>
                        <div className="py-6">
                            <hr />
                            <div className='d-flex justify-content-between pt-6'>
                                <h6 className='fw-bolder py-3'>Enrolled Program(s)</h6>
                            </div>
                            <div className="d-flex justify-content-between">
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
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="table-responsive">
                                <table
                                    className='table table-light table-rounded table-striped border border-2 table-hover fs-6 gy-5'
                                    id='kt_programInd_table'>
                                    <thead>
                                        <tr className='text-start table-dark text-gray-400 table-rounded fw-bolder fs-7 text-uppercase gs-0'>
                                            <th className="px-3 min-w-50px" style={{ cursor: "pointer" }} onClick={() => {
                                                if (sortByEnrolled !== "formID") {
                                                    let finalSort = enrolledProgs.sort(Sort_by('formID', false, (a: any) => a.toUpperCase()))
                                                    setEnrolledProgs(finalSort)
                                                    setSortByEnrolled("formID")
                                                } else if (sortByEnrolled === "formID") {
                                                    let finalSort = enrolledProgs.sort(Sort_by('formID', true, (a: any) => a.toUpperCase()))
                                                    setEnrolledProgs(finalSort)
                                                    setSortByEnrolled("")
                                                }
                                            }}>
                                                Form ID
                                                <i className={sortByEnrolled === "formID" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                            </th>
                                            <th className="min-w-100px" style={{ cursor: "pointer" }} onClick={() => {
                                                if (sortByEnrolled !== "programName") {
                                                    let finalSort = enrolledProgs.sort(Sort_by('programName', false, (a: any) => a.toUpperCase()))
                                                    setEnrolledProgs(finalSort)
                                                    setSortByEnrolled("programName")
                                                } else if (sortByEnrolled === "programName") {
                                                    let finalSort = enrolledProgs.sort(Sort_by('programName', true, (a: any) => a.toUpperCase()))
                                                    setEnrolledProgs(finalSort)
                                                    setSortByEnrolled("")
                                                }
                                            }}>
                                                Program Name
                                                <i className={sortByEnrolled === "programName" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                            </th>
                                            <th className="min-w-100px" style={{ cursor: "pointer" }} onClick={() => {
                                                if (sortByEnrolled !== "programType") {
                                                    let finalSort = enrolledProgs.sort(Sort_by('programType', false, (a: any) => a.toUpperCase()))
                                                    setEnrolledProgs(finalSort)
                                                    setSortByEnrolled("programType")
                                                } else if (sortByEnrolled === "programType") {
                                                    let finalSort = enrolledProgs.sort(Sort_by('programType', true, (a: any) => a.toUpperCase()))
                                                    setEnrolledProgs(finalSort)
                                                    setSortByEnrolled("")
                                                }
                                            }}>
                                                Program Type
                                                <i className={sortByEnrolled === "programType" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                            </th>
                                            <th className="min-w-100px" style={{ cursor: "pointer" }} onClick={() => {
                                                if (sortByEnrolled !== "siteName") {
                                                    let finalSort = enrolledProgs.sort(Sort_by('siteName', false, (a: any) => a.toUpperCase()))
                                                    setEnrolledProgs(finalSort)
                                                    setSortByEnrolled("siteName")
                                                } else if (sortByEnrolled === "siteName") {
                                                    let finalSort = enrolledProgs.sort(Sort_by('siteName', true, (a: any) => a.toUpperCase()))
                                                    setEnrolledProgs(finalSort)
                                                    setSortByEnrolled("")
                                                }
                                            }}>
                                                Site Name
                                                <i className={sortByEnrolled === "siteName" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                            </th>

                                            <th className="min-w-100px" style={{ cursor: "pointer" }} onClick={() => {
                                                if (sortByEnrolled !== "createDate") {
                                                    let finalSort = enrolledProgs.sort(Sort_by('createDate', false, (a: any) => a.toUpperCase()))
                                                    setEnrolledProgs(finalSort)
                                                    setSortByEnrolled("createDate")
                                                } else if (sortByEnrolled === "createDate") {
                                                    let finalSort = enrolledProgs.sort(Sort_by('createDate', true, (a: any) => a.toUpperCase()))
                                                    setEnrolledProgs(finalSort)
                                                    setSortByEnrolled("")
                                                }
                                            }}>
                                                Created Date
                                                <i className={sortByEnrolled === "createDate" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                            </th>
                                            <th className="min-w-100px">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            IndividualPaginationDataEnrolled.length > 0 ?
                                                IndividualPaginationDataEnrolled.map((program, index) => (
                                                    <Fragment key={index}>
                                                        <IEnRow program={program} setDelistKey={setDelistKey} />
                                                    </Fragment>
                                                ))
                                                :
                                                <tr>
                                                    <td align="center" colSpan={12}><span className='text-gray-600 fs-2 fw-bolder'>This Individual is enrolled into no programs</span></td>
                                                </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="d-flex justify-content-center" ref={PaginationRefEnrolled}>
                                <Pagination
                                    className='pagination-bar'
                                    currentPage={currentPageEnrolled}
                                    totalCount={enrolledProgs.length}
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

export default IndividualProgramList