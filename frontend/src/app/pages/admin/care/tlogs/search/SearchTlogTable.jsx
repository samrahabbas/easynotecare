import { useState, useEffect, useMemo, Fragment, useRef } from 'react'
// import Tlogdata from '../tlogs-mock-data.json'
// import IndividualData from '../../individual-mock-data.json'
import Pagination from '../../../../../../_helper/paginationHook/Pagination'
import { Sort_by } from '../../../../../../_helper/objectSorter'
import { filterArray } from '../../../../../../_helper/filterArray'
import SearchTlogForm from './SearchTlogForm'
import SearchTlogRow from './SearchTlogRow'
import axios from 'axios'
import { useSelector } from 'react-redux'
const selectAuth = (state) => state.auth;

const SearchTlogTable = ({ formData, setShowForm }) => {
    const [tlogs, setTlogs] = useState([])
    const [tlogStatic, setTlogStatic] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedLog, setSelectedLog] = useState({})
    const [sortedBy, setSortedBy] = useState('')
    const [PageSize, setPageSize] = useState(50)
    const [show, setShow] = useState(false)
    const [deleteTlogID, setDeleteTlogID] = useState(null)

    const auth = useSelector(selectAuth);

	const companyid = auth.user?.company_code

    useEffect(() => {
        axios.all([
            axios.get('/clients/get/' + companyid),
            axios.get('/tlogs/get/' + companyid)
        ])
            .then(axios.spread((clients, tlogs) => {
                let tempDataInd = clients.data
                let tempDataTlog = tlogs.data
                let indData = {}
                for (let i = 0; i < tempDataTlog.length; i++) {
                    indData = tempDataInd.find(ind => ind.formID === tempDataTlog[i].clientID)
                    tempDataTlog[i].clientName = indData.firstName + ' ' + indData.lastName
                }

                let tempData = tempDataTlog

                let formUpdatedData = {}

                let objectKeysArray = Object.keys(formData)
                for (const element of objectKeysArray) {
                    if (formData[element] !== '') {
                        formUpdatedData[element] = formData[element]
                    }
                }

                let formDataKeys = Object.keys(formUpdatedData)
                let selectedData = {}

                if (formDataKeys.includes("reportDateTo") && formDataKeys.includes("reportDateFrom")) {
                    tempData = tempData.filter(log => log.reportedOn >= formUpdatedData.reportDateFrom && log.reportedOn <= formUpdatedData.reportDateTo)
                } else if (formDataKeys.includes("reportDateTo") && !formDataKeys.includes("reportDateFrom")) {
                    tempData = tempData.filter(log => log.reportedOn <= formUpdatedData.reportDateTo)
                } else if (!formDataKeys.includes("reportDateTo") && formDataKeys.includes("reportDateFrom")) {
                    tempData = tempData.filter(log => log.reportedOn >= formUpdatedData.reportDateFrom)
                }

                if (formDataKeys.length > 0) {
                    let tempArr = []
                    if (formDataKeys.includes("type")) {
                        for (let i = 0; i < formUpdatedData.type.length; i++) {
                            for (let j = 0; j < tempData.length; j++) {
                                if (tempData[j].type.includes(formUpdatedData.type[i])) {
                                    let formIDs = tempArr.map(arr => arr.formID)
                                    if (!formIDs.includes(tempData[j].formID)) {
                                        tempArr.push(tempData[j])
                                    }
                                }
                            }
                        }
                        tempData = tempArr
                    }
                    let tempArr1 = []
                    if (formDataKeys.includes("intensityLevel")) {
                        for (let i = 0; i < formUpdatedData.intensityLevel.length; i++) {
                            for (let j = 0; j < tempData.length; j++) {
                                if (tempData[j].intensityLevel.includes(formUpdatedData.intensityLevel[i])) {
                                    tempArr1.push(tempData[j])
                                }
                            }
                        }
                        tempData = tempArr1
                    }

                }

                formDataKeys = formDataKeys.filter(key =>
                    key !== "reportDateTo" && key !== "reportDateFrom" && key !== "type" && key !== "intensityLevel"
                )

                let tempFinalArray = []
                if (formDataKeys.length > 0) {
                    for (const element of formDataKeys) {
                        if (element === "clientName" || element === 'formID' || element === "description"
                            || element === 'summary'
                        ) {
                            let lowerCaseLetter = formUpdatedData[element].toLowerCase()
                            formUpdatedData[element] = lowerCaseLetter
                        }
                    }
                    for (let i = 0; i < tempData.length; i++) {
                        if (selectedData[tempData[i]._id] === "deleted") {
                            continue
                        }
                        for (const element of formDataKeys) {
                            if (element === "clientName" || element === 'formID' || element === 'summary'
                                || element === 'description'
                            ) {
                                let lowerCaseLetter = tempData[i][element].toLowerCase()
                                if (lowerCaseLetter.includes(formUpdatedData[element])) {
                                    selectedData[tempData[i].formID] = tempData[i]
                                }
                            } else {
                                if (tempData[i][element] === formUpdatedData[element]) {
                                    selectedData[tempData[i].formID] = tempData[i]
                                } else {
                                    selectedData[tempData[i].formID] = "deleted"
                                    break
                                }
                            }
                        }
                    }

                    let selectedDataKeys = Object.keys(selectedData)

                    for (const element of selectedDataKeys) {
                        if (selectedData[element] !== 'deleted') {
                            tempFinalArray.push(selectedData[element])
                        }
                    }
                } else {
                    tempFinalArray = tempData
                }
                // console.log(tempFinalArray)
                setTlogs(tempFinalArray)
                setTlogStatic(tempFinalArray)
            }))
    }, [show])

    const deleteTlogIDHandler = () => {
        let tempObj = {
            deleteID: deleteTlogID
        }
        axios.delete('/tlogs/delete', {
            data: tempObj
        })
            .then(res => {
                console.log(res.data)
                setTlogs(prevState => prevState.filter(tlog => tlog.formID !== deleteTlogID))
                setTlogStatic(prevState => prevState.filter(tlog => tlog.formID !== deleteTlogID))
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setDeleteTlogID(null)
            })
    }    

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
    }, [tlogs])

    const searchFilterTlogs = (value) => {
        let sampleFilter = [
            "formID",
            "summary",
            "description",
            "reportedOn",
            "clientID",
            "intensityLevel",
            "type",
            "clientName"
        ]
        let filteredArray = filterArray(tlogStatic, sampleFilter)
        let lowerCaseValue = value.toLowerCase()
        let temparr = []
        for (let i = 0; i < filteredArray.length; i++) {
            if (Object.values(filteredArray[i]).filter(item => typeof item === 'string' ? item.toLowerCase().includes(lowerCaseValue) : false).length > 0) {
                temparr.push(filteredArray[i])
            }
        }
        setTlogs(temparr)
        setCurrentPage(1)
    }

    const TlogPaginationData = useMemo(() => {
        if (tlogs.length <= PageSize) {
            setCurrentPage(1)
        }
        let tempdata = tlogs
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return tempdata.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, tlogs, PageSize, sortedBy, tlogStatic])

    return (
        <div>
            <div className='card mb-5 col-mb-10' id='kt_content'>
                <div className="d-flex justify-content-end p-5">
                    <button className="btn btn-sm btn-primary" onClick={() => {
                        setShowForm(true)
                    }}>
                        Back
                    </button>
                </div>
                {
                    show ? <SearchTlogForm selectedLog={selectedLog} setShow={setShow} />
                        :
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
                                                        onChange={(e) => searchFilterTlogs(e.target.value)}
                                                        placeholder='Search TLogs'
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
                                <div className='card-body table-responsive mt-4' style={{ padding: "0rem 2.25rem" }}>
                                    <table
                                        className='table table-light table-rounded table-striped border border-2 table-hover fs-6 gy-5'
                                        id='kt_tlogs_table'
                                    >
                                        <thead>
                                            <tr className='text-start table-dark text-gray-400 table-rounded fw-bolder fs-7 text-uppercase gs-0'>
                                                <th className="px-3 min-w-100px" style={{ cursor: "pointer" }} onClick={() => {
                                                    if (sortedBy !== "formID") {
                                                        let finalSort = tlogs.sort(Sort_by('formID', false, (a) => a.toUpperCase()))
                                                        setTlogs(finalSort)
                                                        setSortedBy("formID")
                                                    } else if (sortedBy === "formID") {
                                                        let finalSort = tlogs.sort(Sort_by('formID', true, (a) => a.toUpperCase()))
                                                        setTlogs(finalSort)
                                                        setSortedBy('')
                                                    }
                                                }}>
                                                    Form ID
                                                    <i className={sortedBy === "formID" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                </th>

                                                <th className="min-w-150px" style={{ cursor: "pointer" }} onClick={() => {
                                                    if (sortedBy !== "intensityLevel") {
                                                        let finalSort = tlogs.sort(Sort_by('intensityLevel', false, (a) => a.toUpperCase()))
                                                        setTlogs(finalSort)
                                                        setSortedBy("intensityLevel")
                                                    } else if (sortedBy === "intensityLevel") {
                                                        let finalSort = tlogs.sort(Sort_by('intensityLevel', true, (a) => a.toUpperCase()))
                                                        setTlogs(finalSort)
                                                        setSortedBy('')
                                                    }
                                                }}>
                                                    Intensity Level
                                                    <i className={sortedBy === "intensityLevel" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                </th>

                                                <th className="min-w-150px" style={{ cursor: "pointer" }} onClick={() => {
                                                    if (sortedBy !== "clientName") {
                                                        let finalSort = tlogs.sort(Sort_by('clientName', false, (a) => a.toUpperCase()))
                                                        setTlogs(finalSort)
                                                        setSortedBy("clientName")
                                                    } else if (sortedBy === "clientName") {
                                                        let finalSort = tlogs.sort(Sort_by('clientName', true, (a) => a.toUpperCase()))
                                                        setTlogs(finalSort)
                                                        setSortedBy('')
                                                    }
                                                }}>
                                                    Client Name
                                                    <i className={sortedBy === "clientName" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                </th>

                                                <th className="min-w-150px" style={{ cursor: "pointer" }} onClick={() => {
                                                    if (sortedBy !== "type") {
                                                        let finalSort = tlogs.sort(Sort_by('type', false, (a) => a.toUpperCase()))
                                                        setTlogs(finalSort)
                                                        setSortedBy("type")
                                                    } else if (sortedBy === "type") {
                                                        let finalSort = tlogs.sort(Sort_by('type', true, (a) => a.toUpperCase()))
                                                        setTlogs(finalSort)
                                                        setSortedBy('')
                                                    }
                                                }}>
                                                    Type
                                                    <i className={sortedBy === "type" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                </th>

                                                <th className="min-w-150px" style={{ cursor: "pointer" }} onClick={() => {
                                                    if (sortedBy !== "summary") {
                                                        let finalSort = tlogs.sort(Sort_by('summary', false, (a) => a.toUpperCase()))
                                                        setTlogs(finalSort)
                                                        setSortedBy("summary")
                                                    } else if (sortedBy === "summary") {
                                                        let finalSort = tlogs.sort(Sort_by('summary', true, (a) => a.toUpperCase()))
                                                        setTlogs(finalSort)
                                                        setSortedBy('')
                                                    }
                                                }}>
                                                    Summary
                                                    <i className={sortedBy === "summary" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                </th>

                                                <th className="min-w-150px" style={{ cursor: "pointer" }} onClick={() => {
                                                    if (sortedBy !== "description") {
                                                        let finalSort = tlogs.sort(Sort_by('description', false, (a) => a.toUpperCase()))
                                                        setTlogs(finalSort)
                                                        setSortedBy("description")
                                                    } else if (sortedBy === "description") {
                                                        let finalSort = tlogs.sort(Sort_by('description', true, (a) => a.toUpperCase()))
                                                        setTlogs(finalSort)
                                                        setSortedBy('')
                                                    }
                                                }}>
                                                    Description
                                                    <i className={sortedBy === "description" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                </th>

                                                <th className="min-w-150px" style={{ cursor: "pointer" }} onClick={() => {
                                                    if (sortedBy !== "reportedOn") {
                                                        let finalSort = tlogs.sort(Sort_by('reportedOn', false, parseInt))
                                                        setTlogs(finalSort)
                                                        setSortedBy("reportedOn")
                                                    } else if (sortedBy === "reportedOn") {
                                                        let finalSort = tlogs.sort(Sort_by('reportedOn', true, parseInt))
                                                        setTlogs(finalSort)
                                                        setSortedBy('')
                                                    }
                                                }}>
                                                    Reported On
                                                    <i className={sortedBy === "reportedOn" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                </th>

                                                <th className='min-w-100px'>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {TlogPaginationData.length > 0 ? TlogPaginationData.map((log, index) => (
                                                <Fragment key={index}>
                                                    <SearchTlogRow log={log} setSelectedLog={setSelectedLog} setShow={setShow} setDeleteTlogID={setDeleteTlogID} />
                                                </Fragment>
                                            )) :
                                                <tr>
                                                    <td align="center" colSpan={12}><span className='text-gray-600 fs-2 fw-bolder'>No T-Logs Found</span></td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                    <div className="d-flex justify-content-center" ref={PaginationRef}>
                                        <Pagination
                                            className="pagination-bar"
                                            currentPage={currentPage}
                                            totalCount={tlogs.length}
                                            pageSize={PageSize}
                                            onPageChange={(page) => setCurrentPage(page)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                }
                {/* MODAL FOR DELETING TLOG */}
                <div className='modal fade' id="kt_modal_delete_tlog" tabIndex={-1} aria-hidden="true">
                    {/*begin::Modal dialog*/}
                    <div className="modal-dialog modal-dialog-centered mw-600px mh-100px">
                        {/*begin::Modal content*/}
                        <div className="modal-content">
                            {/*begin::Modal header*/}
                            <div className="modal-header d-flex justify-content-center">
                                {/*begin::Modal title*/}
                                <h2 className="fw-bolder">ARE YOU SURE YOU WANT TO DELETE THIS TLOG?</h2>
                                {/*end::Modal title*/}
                            </div>
                            {/*end::Modal header*/}
                            {/*begin::Modal body*/}
                            <div className='modal-body scroll-y mx-lg-5'>
                                <div className='d-flex justify-content-center'>
                                    <button className='btn btn-danger me-3'
                                        data-bs-dismiss="modal" aria-label="Close" onClick={deleteTlogIDHandler}>Confirm
                                    </button>
                                    <button className='btn btn-light me-3' data-bs-dismiss="modal"
                                        aria-label="Close">Discard
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchTlogTable