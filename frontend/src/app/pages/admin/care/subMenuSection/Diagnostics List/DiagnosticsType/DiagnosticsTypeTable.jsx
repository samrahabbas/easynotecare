import { useState, useEffect, useRef, useMemo, Fragment } from 'react'
import { Sort_by } from "../../../../../../../_helper/objectSorter"
import Pagination from "../../../../../../../_helper/paginationHook/Pagination"
import DiagnosticsTypeForm from "./DiagnosticsTypeForm"
import DiagnosticsTypeRow from "./DiagnosticsTypeRow"

const TypesData = [
    { formID: 1, name: "ICD-9", dateCreated: '2021-05-30' },
    { formID: 2, name: "ICD-10", dateCreated: '2020-09-01' },
]

const DiagnosticsTypeTable = () => {
    const [deleteType, setDeleteType] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const [sortedBy, setSortedBy] = useState('')
    const [PageSize, setPageSize] = useState(5)
    const [types, setTypes] = useState([])
    const [typeStatic, setTypeStatic] = useState([])
    const [newTypeForm, setNewTypeForm] = useState(false)

    useEffect(() => {
        setTypeStatic(TypesData)
        setTypes(TypesData)
    }, [])

    useEffect(() => {
        // consoles.log("data[4].code.slice(4, data[4].code.length-1)", data[4].code.slice(4, data[4].code.length-1))
        // console.log(data[4].code.slice(0,3) + "." + data[4].code.slice(4))
        // console.log(data.filter(entry => entry.code = entry.code.slice(0, 3) + "." + entry.code.slice(4, entry.length-1)))
        // console.log(data.filter((entry) => entry.desc.includes("Dependence")))
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
    }, [types])

    const onDeleteType = () => {
        setTypes(prevState =>
            prevState.filter(type => type.formID !== deleteType.formID)
        )
        setTypeStatic(prevState =>
            prevState.filter(type => type.formID !== deleteType.formID)
        )
    }

    const AddType = (newEntry) => {
        setTypeStatic([...typeStatic, newEntry])
        setTypes([...typeStatic, newEntry])
    }

    const filterArray = (dataProp) => {
        let arrayCopy = JSON.stringify(dataProp)
        arrayCopy = JSON.parse(arrayCopy)
        let filteredArray = []
        let sampleFilter = [
            "formID",
            "name",
            "dateCreated"
        ]
        for (let j = 0; j < arrayCopy.length; j++) {
            let allkeys = Object.keys(arrayCopy[j])

            let obj1 = {
                "formID": '',
                "name": '',
                "dateCreated": ''
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

    const searchFilterTypes = (value) => {
        let filteredArray = filterArray(typeStatic)
        let lowerCaseValue = value.toLowerCase()
        let temparr = []
        for (const element of filteredArray) {
            if (Object.values(element).filter(item => typeof item === 'string' ? item.toLowerCase().includes(lowerCaseValue) : false).length > 0) {
                temparr.push(element)
            }
        }
        setTypes(temparr)
        setCurrentPage(1)
    }

    const SharedTypes = useMemo(() => {
        if (types.length <= PageSize) {
            setCurrentPage(1)
        }
        let tempdata = types
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return tempdata.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, types, PageSize, sortedBy, typeStatic])

    return (
        <div>
            <div className='fv-row mb-7 fv-plugins-icon-container'>
                {
                    newTypeForm ? <DiagnosticsTypeForm setNewTypeForm={setNewTypeForm} AddType={AddType}
                    />
                        :
                        <div>
                            <div className="d-flex justify-content-between">
                                <h4 className='mb-5'>Diagnosis Types</h4>
                                <div>
                                    <button className="btn btn-primary btn-sm" onClick={() => {
                                        setNewTypeForm(true)
                                    }}>Add New Diagnosis Type</button>
                                </div>
                            </div>
                            <div className='post' id='kt_post'>
                                <div>
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
                                                        className='form-control form-control-solid w-300px ps-15'
                                                        onChange={(e) => searchFilterTypes(e.target.value)}
                                                        placeholder='Search Diagnosis Types'
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
                                            id='kt_contacts_table'
                                        >
                                            <thead>
                                                <tr className='text-start table-dark text-gray-400 table-rounded fw-bolder fs-7 text-uppercase gs-0'>
                                                    <th className='px-3' style={{ cursor: "pointer" }} onClick={() => {
                                                        if (sortedBy !== "formID") {
                                                            let finalSort = types.sort(Sort_by('formID', false, parseInt))
                                                            setTypes(finalSort)
                                                            setSortedBy("formID")
                                                        } else if (sortedBy === "formID") {
                                                            let finalSort = types.sort(Sort_by('formID', true, parseInt))
                                                            setTypes(finalSort)
                                                            setSortedBy('')
                                                        }
                                                    }}>
                                                        Form ID
                                                        <i className={sortedBy === "formID" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                    </th>

                                                    <th style={{ cursor: "pointer" }} onClick={() => {
                                                        if (sortedBy !== "name") {
                                                            let finalSort = types.sort(Sort_by('name', false, (a) => a.toUpperCase()))
                                                            setTypes(finalSort)
                                                            setSortedBy("name")
                                                        } else if (sortedBy === "name") {
                                                            let finalSort = types.sort(Sort_by('name', true, (a) => a.toUpperCase()))
                                                            setTypes(finalSort)
                                                            setSortedBy('')
                                                        }
                                                    }}>
                                                        Name
                                                        <i className={sortedBy === "name" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                    </th>

                                                    <th style={{ cursor: "pointer" }} onClick={() => {
                                                        if (sortedBy !== "dateCreated") {
                                                            let finalSort = types.sort(Sort_by('dateCreated', false, parseInt))
                                                            setTypes(finalSort)
                                                            setSortedBy("dateCreated")
                                                        } else if (sortedBy === "dateCreated") {
                                                            let finalSort = types.sort(Sort_by('dateCreated', true, parseInt))
                                                            setTypes(finalSort)
                                                            setSortedBy('')
                                                        }
                                                    }}>
                                                        Date Created
                                                        <i className={sortedBy === "dateCreated" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                    </th>

                                                    <th>
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {SharedTypes.length > 0 ? SharedTypes.map((type, index) => (
                                                    <Fragment key={index}>
                                                        <DiagnosticsTypeRow type={type} setDeleteType={setDeleteType}/>
                                                    </Fragment>
                                                )) :
                                                    <tr>
                                                        <td align="center" colSpan={12}><span className='text-gray-600 fs-2 fw-bolder'>No Shared Contact Types Found</span></td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className='mt-4'>
                                    <div className="d-flex justify-content-center" ref={PaginationRef}>
                                        <Pagination
                                            className='pagination-bar'
                                            currentPage={currentPage}
                                            totalCount={types.length}
                                            pageSize={PageSize}
                                            onPageChange={(page) => setCurrentPage(page)}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* MODAL FOR DELETING TYPE */}
                            <div className='modal fade' id="kt_modal_delete_type" tabIndex={-1} aria-hidden="true">
                                {/*begin::Modal dialog*/}
                                <div className="modal-dialog modal-dialog-centered mw-600px mh-100px">
                                    {/*begin::Modal content*/}
                                    <div className="modal-content">
                                        {/*begin::Modal header*/}
                                        <div className="modal-header d-flex justify-content-center">
                                            {/*begin::Modal title*/}
                                            <h2 className="fw-bolder">ARE YOU SURE YOU WANT TO DELETE THIS DIAGNOSIS TYPE?</h2>
                                            {/*end::Modal title*/}
                                        </div>
                                        {/*end::Modal header*/}
                                        {/*begin::Modal body*/}
                                        <div className='modal-body scroll-y mx-lg-5'>
                                            <div className='d-flex justify-content-center'>
                                                <button className='btn btn-danger me-3'
                                                    data-bs-dismiss="modal" aria-label="Close" onClick={onDeleteType}>Confirm
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
                }
            </div>
        </div>
    )
}

export default DiagnosticsTypeTable