import { useEffect, useState, Fragment, useMemo, useRef } from 'react';
import Pagination from '../../../../../../_helper/paginationHook/Pagination';
import ExportCSV from '../../../../../../_helper/exportCSVHelper/ExportCSV';
import '../../../../../../_helper/tableHeaderSticky/tableHeaderSticky.css';
import { useHistory } from 'react-router-dom';
import SubMenuSection from '../SubMenuSection';
import { Sort_by } from '../../../../../../_helper/objectSorter';
import SharedContactsSubSectionRow from './SharedContactsSubSectionRow';
import ListOfSharedContacts from './ListOfSharedContacts';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { filterArray } from '../../../../../../_helper/filterArray';
const selectAuth = (state) => state.auth;

const headers = [
    { label: "Form ID", key: "formID" },
    { label: "Title", key: "title" },
    { label: "Name", key: "name" },
    { label: "Type", key: "type" },
    { label: "Organization Name", key: "organizationName" },
    { label: "Speciality", key: "speciality" },
    { label: "NPI Number", key: "npiNumber" },
    { label: "Mailing Address", key: "mail" },
    { label: "Primary Phone", key: "addrPrimaryPhone" },
]

const headersDetails = [
    { label: "Form ID", key: "formID" },
    { label: "Title", key: "title" },
    { label: "Name", key: "name" },
    { label: "Type", key: "type" },
    { label: "Organization Name", key: "organizationName" },
    { label: "Speciality", key: "speciality" },
    { label: "NPI Number", key: "npiNumber" },
    { label: "Address", key: "addrinCareOf" },
    { label: "Address Country", key: "addrCountry" },
    { label: "Primary In Care Of", key: "addrinCareOf" },
    { label: "Primary Phone Number", key: "addrPrimaryPhone" },
    { label: "Secondary Phone Number", key: "addrSecondaryPhone" },
    { label: "Additional Phone Number", key: "addrAdditionalPhone" },
    { label: "Primary Email", key: "addrEmail" },
    { label: "Primary Web Address", key: "addrWebAddress" },
    { label: "Primary Fax", key: "addrFax" },
    { label: "Mailing Address", key: "mail" },
    { label: "Mailing In Care Of", key: "mailinCareOf" },
    { label: "Mailing Country", key: "mailCountry" },
    { label: "Mailing Primary Phone", key: "mailPrimaryPhone" },
    { label: "Mailing Secondary Phone", key: "mailSecondaryPhone" },
    { label: "Mailing Additional Phone", key: "mailAdditionalPhone" },
    { label: "Mailing Fax", key: "mailFax" },
    { label: "Mailing Email", key: "mailEmail" },
]

const sampleFilter = [
    "formID",
    "firstName",
    "lastName",
    "type",
    "organizationName",
    "speciality",
    "npiNumber",
    "mailingaddress",
    "email",
    "primaryPhone",
]

const SharedContactsSubSection = ({ location }) => {
    const [deleteSharedContact, setDeleteSharedContact] = useState('')
    const [sharedContacts, setSharedContacts] = useState([])
    const [sharedContactStatic, setSharedContactStatic] = useState([])
    const [exportData, setExportData] = useState([])
    const [exportDataDetail, setExportDataDetail] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [sortedBy, setSortedBy] = useState('')
    const [PageSize, setPageSize] = useState(5)
    const [showAddContactTable, setShowAddContactTable] = useState(true)

    const history = useHistory()
    const auth = useSelector(selectAuth);

    const companyid = auth.user?.company_code
    useEffect(() => {
        if (location.state !== undefined) {
            axios.get("/shared/get/" + companyid)
                .then(res => {
                    let temparr = res.data.filter(contact => contact.individualsAdded.includes(location.state.formID))
                    for (let i = 0; i < temparr.length; i++) {
                        temparr[i].mailingaddress = temparr[i].mailingInfo?.st1 + ' ' +
                            temparr[i].mailingInfo?.st2 + ' ' +
                            temparr[i].mailingInfo?.city + ' ' +
                            temparr[i].mailingInfo?.state + ' ' +
                            temparr[i].mailingInfo?.country
                        temparr[i].primaryPhone = temparr[i].addrInfo?.primaryPhone
                    }
                    setSharedContactStatic(temparr)
                    setSharedContacts(temparr)
                })
        } else {
            history.push('/care/individual-intake/list')
        }
    }, [showAddContactTable])

    useEffect(() => {
        let filteredContacts = filterArray(sharedContacts, sampleFilter)
        setExportData(filteredContacts)
        setExportDataDetail(sharedContacts)
    }, [sharedContacts])

    const PaginationRef = useRef(null)

    useEffect(() => {
        if (showAddContactTable === true) {
            let PaginationElement = PaginationRef.current
            if (PaginationElement !== null) {
                if (PaginationElement.getElementsByTagName("li").length > 0) {
                    let numberOfPages = PaginationElement.getElementsByTagName("li").length - 2
                    if (numberOfPages > 0) {
                        if (numberOfPages < currentPage) {
                            let tempPage = currentPage - 1
                            setCurrentPage(tempPage)
                        }
                    }
                }
            }
        }
    }, [sharedContacts])

    const onDeleteSharedContact = () => {
        let tempobj = {
            deleteSharedContact,
        }
        axios.post("/shared/deleteClient/" + location.state.formID, tempobj)
            .then(() => {
                setSharedContacts((prevState) =>
                    prevState.filter((contact) => contact.formID !== deleteSharedContact)
                )
                setSharedContactStatic((prevState) =>
                    prevState.filter((contact) => contact.formID !== deleteSharedContact)
                );
            })
    }


    const searchFilterContacts = (value) => {
        let filteredArray = filterArray(sharedContactStatic, sampleFilter)
        let lowerCaseValue = value.toLowerCase()
        let temparr = []
        for (const element of filteredArray) {
            if (Object.values(element).filter(item => typeof item === 'string' ? item.toLowerCase().includes(lowerCaseValue) : false).length > 0) {
                temparr.push(element)
            }
        }
        let tempstate = []
        for (let i = 0; i < sharedContactStatic.length; i++) {
            for (let j = 0; j < temparr.length; j++) {
                if (temparr[j].formID === sharedContactStatic[i].formID) {
                    tempstate.push(sharedContactStatic[i])
                }
            }
        }
        setSharedContacts(tempstate)
        setCurrentPage(1)
    }

    const ContactsPaginationData = useMemo(() => {
        if (sharedContacts.length <= PageSize) {
            setCurrentPage(1)
        }
        let tempdata = sharedContacts
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return tempdata.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, sharedContacts, PageSize, sortedBy, sharedContactStatic])

    return (
        <div>
            <div>
                <div>
                    <div className="card mb-5 col-mb-10" id="kt-content">
                        <div className="post d-flex flex-column-fluid" id="kt_post">
                            <div className="container-xxl" id="kt_content-container">
                                <div className="mt-6 mx-6">
                                    <SubMenuSection individual={location.state} />
                                </div>
                                {
                                    showAddContactTable ?
                                        <div>
                                            <div className="mx-9 mt-3">
                                                <div className="w-100">
                                                    <h3 className="fw-bolder">List of Shared Contacts under: {location.state.firstName} {location.state.lastName}</h3>
                                                </div>
                                            </div>
                                            <div className='card-body'>
                                                <div className=''>
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
                                                                        onChange={(e) => searchFilterContacts(e.target.value)}
                                                                        placeholder='Search Shared Contacts..'
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
                                                            id='kt_sharedContacts_table'
                                                        >
                                                            <thead>
                                                                <tr className='text-start table-dark text-gray-400 table-rounded fw-bolder fs-7 text-uppercase gs-0'>
                                                                    <th className="px-3 min-w-200px" style={{ cursor: "pointer" }} onClick={() => {
                                                                        if (sortedBy !== "formID") {
                                                                            let finalSort = sharedContacts.sort(Sort_by('formID', false, a => a.toUpperCase()))
                                                                            setSharedContacts(finalSort)
                                                                            setSortedBy("formID")
                                                                        } else if (sortedBy === "formID") {
                                                                            let finalSort = sharedContacts.sort(Sort_by('formID', true, a => a.toUpperCase()))
                                                                            setSharedContacts(finalSort)
                                                                            setSortedBy('')
                                                                        }
                                                                    }}>
                                                                        Form ID
                                                                        <i className={sortedBy === "formID" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                                    </th>

                                                                    <th className="min-w-150px" style={{ cursor: "pointer" }} onClick={() => {
                                                                        if (sortedBy !== "firstName") {
                                                                            let finalSort = sharedContacts.sort(Sort_by('firstName', false, a => a.toUpperCase()))
                                                                            setSharedContacts(finalSort)
                                                                            setSortedBy("firstName")
                                                                        } else if (sortedBy === "firstName") {
                                                                            let finalSort = sharedContacts.sort(Sort_by('firstName', true, a => a.toUpperCase()))
                                                                            setSharedContacts(finalSort)
                                                                            setSortedBy('')
                                                                        }
                                                                    }}>
                                                                        Name
                                                                        <i className={sortedBy === "firstName" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                                    </th>

                                                                    <th className="min-w-150px" style={{ cursor: "pointer" }} onClick={() => {
                                                                        if (sortedBy !== "type") {
                                                                            let finalSort = sharedContacts.sort(Sort_by('type', false, a => a.toUpperCase()))
                                                                            setSharedContacts(finalSort)
                                                                            setSortedBy("type")
                                                                        } else if (sortedBy === "type") {
                                                                            let finalSort = sharedContacts.sort(Sort_by('type', true, a => a.toUpperCase()))
                                                                            setSharedContacts(finalSort)
                                                                            setSortedBy('')
                                                                        }
                                                                    }}>
                                                                        Type
                                                                        <i className={sortedBy === "type" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                                    </th>

                                                                    <th className="min-w-150px" style={{ cursor: "pointer" }} onClick={() => {
                                                                        if (sortedBy !== "organizationName") {
                                                                            let finalSort = sharedContacts.sort(Sort_by('organizationName', false, a => a.toUpperCase()))
                                                                            setSharedContacts(finalSort)
                                                                            setSortedBy("organizationName")
                                                                        } else if (sortedBy === "organizationName") {
                                                                            let finalSort = sharedContacts.sort(Sort_by('organizationName', true, a => a.toUpperCase()))
                                                                            setSharedContacts(finalSort)
                                                                            setSortedBy('')
                                                                        }
                                                                    }}>
                                                                        Organization Name
                                                                        <i className={sortedBy === "organizationName" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                                    </th>

                                                                    <th className="min-w-150px" style={{ cursor: "pointer" }} onClick={() => {
                                                                        if (sortedBy !== "speciality") {
                                                                            let finalSort = sharedContacts.sort(Sort_by('speciality', false, a => a.toUpperCase()))
                                                                            setSharedContacts(finalSort)
                                                                            setSortedBy("speciality")
                                                                        } else if (sortedBy === "speciality") {
                                                                            let finalSort = sharedContacts.sort(Sort_by('speciality', true, a => a.toUpperCase()))
                                                                            setSharedContacts(finalSort)
                                                                            setSortedBy('')
                                                                        }
                                                                    }}>
                                                                        Speciality
                                                                        <i className={sortedBy === "speciality" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                                    </th>

                                                                    <th className="min-w-150px" style={{ cursor: "pointer" }} onClick={() => {
                                                                        if (sortedBy !== "npiNumber") {
                                                                            let finalSort = sharedContacts.sort(Sort_by('npiNumber', false, parseInt))
                                                                            setSharedContacts(finalSort)
                                                                            setSortedBy("npiNumber")
                                                                        } else if (sortedBy === "npiNumber") {
                                                                            let finalSort = sharedContacts.sort(Sort_by('npiNumber', true, parseInt))
                                                                            setSharedContacts(finalSort)
                                                                            setSortedBy('')
                                                                        }
                                                                    }}>
                                                                        NPI Number
                                                                        <i className={sortedBy === "npiNumber" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                                    </th>

                                                                    <th className="min-w-250px" style={{ cursor: "pointer" }} onClick={() => {
                                                                        if (sortedBy !== "mailingaddress") {
                                                                            let finalSort = sharedContacts.sort(Sort_by('mailingaddress', false, a => a.toUpperCase()))
                                                                            setSharedContacts(finalSort)
                                                                            setSortedBy("mailingaddress")
                                                                        } else if (sortedBy === "mailingaddress") {
                                                                            let finalSort = sharedContacts.sort(Sort_by('mailingaddress', true, a => a.toUpperCase()))
                                                                            setSharedContacts(finalSort)
                                                                            setSortedBy('')
                                                                        }
                                                                    }}>
                                                                        Mailing Address
                                                                        <i className={sortedBy === "mailingaddress" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                                    </th>

                                                                    <th className="min-w-150px" style={{ cursor: "pointer" }} onClick={() => {
                                                                        if (sortedBy !== "primaryPhone") {
                                                                            let finalSort = sharedContacts.sort(Sort_by('primaryPhone', false, parseInt))
                                                                            setSharedContacts(finalSort)
                                                                            setSortedBy("primaryPhone")
                                                                        } else if (sortedBy === "primaryPhone") {
                                                                            let finalSort = sharedContacts.sort(Sort_by('primaryPhone', true, parseInt))
                                                                            setSharedContacts(finalSort)
                                                                            setSortedBy('')
                                                                        }
                                                                    }}>
                                                                        Primary Phone
                                                                        <i className={sortedBy === "primaryPhone" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                                    </th>

                                                                    <th className="min-w-150px" style={{ cursor: "pointer" }} onClick={() => {
                                                                        if (sortedBy !== "email") {
                                                                            let finalSort = sharedContacts.sort(Sort_by('email', false, a => a.toUpperCase()))
                                                                            setSharedContacts(finalSort)
                                                                            setSortedBy("email")
                                                                        } else if (sortedBy === "email") {
                                                                            let finalSort = sharedContacts.sort(Sort_by('email', true, a => a.toUpperCase()))
                                                                            setSharedContacts(finalSort)
                                                                            setSortedBy('')
                                                                        }
                                                                    }}>
                                                                        Email
                                                                        <i className={sortedBy === "email" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                                    </th>

                                                                    <th className='min-w-100px'>Actions</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className='text-gray-600 fw-bold'>
                                                                {
                                                                    ContactsPaginationData.length ? ContactsPaginationData.map((contact, index) => (
                                                                        <Fragment key={index}>
                                                                            <SharedContactsSubSectionRow contact={contact}
                                                                                setDeleteSharedContact={setDeleteSharedContact} />
                                                                        </Fragment>
                                                                    ))
                                                                        :
                                                                        <tr>
                                                                            <td align="center" colSpan={12}><span className='text-gray-600 fs-2 fw-bolder'>No Matching Contact Found</span></td>
                                                                        </tr>
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-center my-4" ref={PaginationRef}>
                                                    <Pagination
                                                        className='pagination-bar'
                                                        currentPage={currentPage}
                                                        totalCount={sharedContacts.length}
                                                        pageSize={PageSize}
                                                        onPageChange={(page) => setCurrentPage(page)}
                                                    />
                                                </div>
                                                <div className='d-flex justify-content-start pb-6'>
                                                    <div className='mx-2'>
                                                        <button className='btn btn-primary btn-sm' onClick={() => { setShowAddContactTable(false) }}>Add Shared Contact</button>
                                                    </div>
                                                    <div className='mr-2'>
                                                        <ExportCSV
                                                            headerProp={headers} filename={"Shared_Contacts_Details"} data={exportData} title={"Export to CSV"}
                                                        />
                                                    </div>
                                                    <div className='mx-2'>
                                                        <ExportCSV
                                                            headerProp={headersDetails} filename={"Shared_Contacts_Complete_Details"} data={exportDataDetail} title={"Export to CSV (detail)"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <ListOfSharedContacts setShowAddContactTable={setShowAddContactTable} client={location.state}
                                            selectedSharedContactStatic={sharedContactStatic} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* MODAL FOR DELETING SHARED CONTACT */}
                <div className='modal fade' id="kt_modal_delete_contact" tabIndex={-1} aria-hidden="true">
                    {/*begin::Modal dialog*/}
                    <div className="modal-dialog modal-dialog-centered mw-650px mh-100px">
                        {/*begin::Modal content*/}
                        <div className="modal-content">
                            {/*begin::Modal header*/}
                            <div className="modal-header d-flex justify-content-center">
                                {/*begin::Modal title*/}
                                <h3 className="fw-bolder">ARE YOU SURE YOU WANT TO REMOVE THIS SHARED CONTACT?</h3>
                                {/*end::Modal title*/}
                            </div>
                            {/*end::Modal header*/}
                            {/*begin::Modal body*/}
                            <div className='modal-body scroll-y mx-lg-5'>
                                <div className='d-flex justify-content-center'>
                                    <button className='btn btn-sm btn-danger me-3'
                                        data-bs-dismiss="modal" aria-label="Close" onClick={onDeleteSharedContact}>Confirm
                                    </button>
                                    <button className='btn btn-sm btn-light me-3' data-bs-dismiss="modal"
                                        aria-label="Close">Discard
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SharedContactsSubSection