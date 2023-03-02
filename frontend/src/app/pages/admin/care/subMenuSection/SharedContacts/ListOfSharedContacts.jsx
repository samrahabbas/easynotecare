import { useEffect, useState, useRef, Fragment, useMemo } from 'react';
import Pagination from '../../../../../../_helper/paginationHook/Pagination';
import { Sort_by } from '../../../../../../_helper/objectSorter';
import ListOfSharedContactsRow from './ListOfSharedContactsRow';
import { filterArray } from '../../../../../../_helper/filterArray';
import axios from 'axios';
import { useSelector } from 'react-redux';
const selectAuth = (state) => state.auth;

const ListOfSharedContacts = ({ setShowAddContactTable, selectedSharedContactStatic, client }) => {
    const [sharedContacts, setSharedContacts] = useState([])
    const [sharedContactStatic, setSharedContactStatic] = useState([])
    const [newSharedContact, setNewSharedContact] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const [sortedBy, setSortedBy] = useState('')
    const [PageSize, setPageSize] = useState(5)

    const auth = useSelector(selectAuth);

    const companyid = auth.user?.company_code

    useEffect(() => {
        axios.get("/shared/get/" + companyid)
            .then(res => {
                let tempallSelected = res.data
                for (let i = 0; i < tempallSelected.length; i++) {
                    tempallSelected[i].mailingaddress = tempallSelected[i].mailingInfo?.st1 + ' ' +
                        tempallSelected[i].mailingInfo?.st2 + ' ' +
                        tempallSelected[i].mailingInfo?.city + ' ' +
                        tempallSelected[i].mailingInfo?.state + ' ' +
                        tempallSelected[i].mailingInfo?.country
                    tempallSelected[i].primaryPhone = tempallSelected[i].addrInfo?.primaryPhone
                    for (let j = 0; j < selectedSharedContactStatic.length; j++) {
                        tempallSelected = tempallSelected.filter(item => item.formID !== selectedSharedContactStatic[j].formID)
                    }
                }
                if (tempallSelected.length > 0) {
                    setSharedContacts(tempallSelected)
                    setSharedContactStatic(tempallSelected)
                }
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
    }, [sharedContacts])

    const AddSharedContact = () => {
        axios.post("/shared/addSingleClient/" + client.formID, newSharedContact)
            .then(() => {
                setSharedContacts(prevState =>
                    prevState.filter(contact => contact.formID !== newSharedContact.formID)
                )
                setSharedContactStatic(prevState =>
                    prevState.filter(contact => contact.formID !== newSharedContact.formID)
                )
            })
    }

    const searchFilterContacts = (value) => {
        let sampleFilter = [
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
        let filteredArray = filterArray(sharedContactStatic, sampleFilter)
        let lowerCaseValue = value.toLowerCase()
        let temparr = []
        for (const element of filteredArray) {
            if (Object.values(element).filter(item => typeof item === 'string' ? item.toLowerCase().includes(lowerCaseValue) : false).length > 0) {
                temparr.push(element)
            }
        }
        setSharedContacts(temparr)
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
                <div className='card mb-5 col-mb-10' id='kt_content'>
                    <div className='post d-flex flex-column-fluid' id='kt_post'>
                        <div id='kt_content_container' className='container-xxl'>
                            <div className='card-body'>
                                <div>
                                    <button className="btn btn-primary btn-sm" onClick={() => setShowAddContactTable(true)}>Back</button>
                                </div>
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
                                            id='kt_individual_table'
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

                                                    <th className='min-w-50px'>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className='text-gray-600 fw-bold'>
                                                {
                                                    ContactsPaginationData.length ? ContactsPaginationData.map((contact, index) => (
                                                        <Fragment key={index}>
                                                            <ListOfSharedContactsRow contact={contact}
                                                                setNewSharedContact={setNewSharedContact}
                                                            />
                                                        </Fragment>
                                                    ))
                                                        :
                                                        <tr>
                                                            <td align="center" colSpan={12}><span className='text-gray-600 fs-2 fw-bolder'>No Shared Contacts Available To Be Added</span></td>
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
                            </div>
                        </div>
                    </div>
                    {/* MODAL FOR ADDING SHARED CONTACT */}
                    <div className='modal fade' id="kt_modal_add_shared_contact" tabIndex={-1} aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header d-flex justify-content-center">
                                    <h2 className="fw-bolder">ARE YOU SURE YOU WANT TO ADD THIS SHARED CONTACT?</h2>
                                </div>
                                <div className='modal-body scroll-y mx-lg-5'>
                                    <div className='d-flex justify-content-center'>
                                        <button className='btn btn-danger me-3'
                                            data-bs-dismiss="modal" aria-label="Close" onClick={AddSharedContact}>Confirm
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
        </div>
    )
}

export default ListOfSharedContacts