import { useEffect, useState, useMemo, Fragment, SetStateAction, useRef } from 'react'
// import contactData from '../../contact-mock-data.json'
import { useHistory } from 'react-router-dom'
import ListContactRows from './ListContactRows'
import ExportCSV from '../../../../../../_helper/exportCSVHelper/ExportCSV'
import Pagination from '../../../../../../_helper/paginationHook/Pagination'
import '../../../../../../_helper/tableHeaderSticky/tableHeaderSticky.css'
import { Sort_by } from '../../../../../../_helper/objectSorter'
import SubMenuSection from '../../subMenuSection/SubMenuSection'
import axios from 'axios'
import EditContacts from './editContacts'
import { filterArray } from '../../../../../../_helper/filterArray'
import ContactNew from '../new/ContactNewForm'

const headers = [
    { label: "Contact ID", key: "contactID" },
    { label: "Contact Name", key: "name" },
    { label: "Contact Type", key: "relaiontoind" },
    { label: "Email", key: "email" },
    { label: "Agency", key: "agency" },
    { label: "Primary Phone", key: "primaryPhone" },
    { label: "Address", key: "address" },
    { label: "Mailing Address", key: "mailingaddress" },
    { label: "Comments", key: "comments" },
    { label: "Deleted", key: "deleted" },
]

let sampleFilter = [
    "formID",
    "firstName",
    "relaiontoind",
    "agency",
    "comments",
]

const ListContacts = ({ location }: { location: { state: any } }) => {
    const [contactsList, setContactsList] = useState<any[]>([])
    const [contactStaticList, setContactStaticList] = useState<any[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [deleteContactId, setDeleteContactId] = useState('')
    const [PageSize, setPageSize] = useState(50)
    const [sortedBy, setSortedBy] = useState('')
    const [exportData, setExportData] = useState<object[]>([])
    const [showEditingForm, setShowEditingForm] = useState(true)
    const [selectedContact, setSelectedContact] = useState<any>({})
    const [showNewForm, setShowNewForm] = useState(false)

    useEffect(() => {
        let filteredContacts = filterArray(contactsList, sampleFilter)
        setExportData(filteredContacts)
    }, [contactsList])

    const history = useHistory()

    useEffect(() => {
        if (location.state === undefined) {
            history.push('/care/contact/list')
        } else {
            axios.get('/contacts/get')
                .then(res => {
                    let conData = res.data.filter((contact: { individualID: any }) => contact.individualID === location.state.formID)
                    setContactStaticList(conData)
                    setContactsList(conData)
                })
        }
    }, [])

    const PaginationRef = useRef(null)

    useEffect(() => {
        let PaginationElement: any = PaginationRef.current
        if (PaginationElement !== null) {
            let numberOfPages = PaginationElement.getElementsByTagName("li").length - 2
            if (numberOfPages > 0) {
                if (numberOfPages < currentPage) {
                    let tempPage = currentPage - 1
                    setCurrentPage(tempPage)
                }
            }
        }
    }, [contactsList])

    const onDeleteContact = () => {
        setContactStaticList((prevState) =>
            prevState.filter(contact => contact._id !== deleteContactId)
        )
        setContactsList((prevState) =>
            prevState.filter(contact => contact._id !== deleteContactId)
        )
    }

    const searchFilterContacts = (value: string) => {

        let filteredArray = filterArray(contactStaticList, sampleFilter)
        let lowerCaseValue = value.toLowerCase()
        let temparr = []
        for (let i = 0; i < filteredArray.length; i++) {
            if (Object.values(filteredArray[i]).filter(item => typeof item === 'string' ? item.toLowerCase().includes(lowerCaseValue) : false).length > 0) {
                temparr.push(filteredArray[i])
            }
        }
        setContactsList(temparr)
        setCurrentPage(1)

    }

    const ContactPaginationData = useMemo(() => {
        if (contactsList.length <= PageSize) {
            setCurrentPage(1)
        }
        let tempdata = contactsList
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return tempdata.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, contactsList, PageSize, sortedBy, contactStaticList])

    return (
        <>
            <div className='card mb-5 col-mb-10' id='kt_content'>
                <div className="mt-6 mx-6">
                    <SubMenuSection individual={location.state} />
                </div>
                {
                    showNewForm === true && showEditingForm === false ? <ContactNew setShowEditingForm={setShowEditingForm} setShowNewForm={setShowNewForm} clientInfo={location.state} /> :
                        showNewForm === false && showEditingForm === false ? <EditContacts setShowEditingForm={setShowEditingForm} selectedContact={selectedContact} /> :
                            showNewForm === false && showEditingForm === true ?
                                <div>
                                    <div className="px-7 pt-7">
                                        <h3 className="fw-bolder">List of Contacts under: {location.state.firstName} {location.state.lastName}</h3>
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
                                                                        onChange={(e) => searchFilterContacts(e.target.value)}
                                                                        placeholder='Search Contacts'
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
                                                    <div className="card-body stickyHeaderTable table-responsive" style={{ padding: "0rem 2.25rem" }}>
                                                        <table
                                                            className='table table-light table-rounded table-striped border border-2 table-hover fs-6 gy-5'
                                                            id='kt_contacts_table'
                                                        >
                                                            <thead>
                                                                <tr className='text-start table-dark text-gray-400 table-rounded fw-bolder fs-7 text-uppercase gs-0'>

                                                                    <th className="px-3 min-w-100px" style={{ cursor: "pointer" }} onClick={() => {
                                                                        if (sortedBy !== "formID") {
                                                                            let finalSort = contactsList.sort(Sort_by('formID', false, (a: any) => a.toUpperCase()))
                                                                            setContactsList(finalSort)
                                                                            setSortedBy("formID")
                                                                        } else if (sortedBy === "formID") {
                                                                            let finalSort = contactsList.sort(Sort_by('formID', true, (a: any) => a.toUpperCase()))
                                                                            setContactsList(finalSort)
                                                                            setSortedBy('')
                                                                        }
                                                                    }}>
                                                                        Form ID
                                                                        <i className={sortedBy === "formID" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                                    </th>
                                                                    <th className="min-w-100px" style={{ cursor: "pointer" }} onClick={() => {
                                                                        if (sortedBy !== "firstName") {
                                                                            let finalSort = contactsList.sort(Sort_by('firstName', false, (a: any) => a.toUpperCase()))
                                                                            setContactsList(finalSort)
                                                                            setSortedBy("firstName")
                                                                        } else if (sortedBy === "firstName") {
                                                                            let finalSort = contactsList.sort(Sort_by('firstName', true, (a: any) => a.toUpperCase()))
                                                                            setContactsList(finalSort)
                                                                            setSortedBy('')
                                                                        }
                                                                    }}>
                                                                        Contact Name
                                                                        <i className={sortedBy === "firstName" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                                    </th>

                                                                    <th className="min-w-100px" style={{ cursor: "pointer" }} onClick={() => {
                                                                        if (sortedBy !== "relaiontoind") {
                                                                            let finalSort = contactsList.sort(Sort_by('relaiontoind', false, (a: any) => a.toUpperCase()))
                                                                            setContactsList(finalSort)
                                                                            setSortedBy("relaiontoind")
                                                                        } else if (sortedBy === "relaiontoind") {
                                                                            let finalSort = contactsList.sort(Sort_by('relaiontoind', true, (a: any) => a.toUpperCase()))
                                                                            setContactsList(finalSort)
                                                                            setSortedBy('')
                                                                        }
                                                                    }}>
                                                                        Contact Type
                                                                        <i className={sortedBy === "relaiontoind" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                                    </th>


                                                                    {/* <th className="min-w-100px" style={{ cursor: "pointer" }} onClick={() => {
                                                if (sortedBy !== "email") {
                                                    let finalSort = contactsList.sort(Sort_by('email', false, (a: any) => a.toUpperCase()))
                                                    setContactsList(finalSort)
                                                    setSortedBy("email")
                                                } else if (sortedBy === "email") {
                                                    let finalSort = contactsList.sort(Sort_by('email', true, (a: any) => a.toUpperCase()))
                                                    setContactsList(finalSort)
                                                    setSortedBy('')
                                                }
                                            }}>
                                                Email
                                                <i className={sortedBy === "email" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                            </th> */}

                                                                    <th className="min-w-100px" style={{ cursor: "pointer" }} onClick={() => {
                                                                        if (sortedBy !== "agency") {
                                                                            let finalSort = contactsList.sort(Sort_by('agency', false, (a: any) => a.toUpperCase()))
                                                                            setContactsList(finalSort)
                                                                            setSortedBy("agency")
                                                                        } else if (sortedBy === "agency") {
                                                                            let finalSort = contactsList.sort(Sort_by('agency', true, (a: any) => a.toUpperCase()))
                                                                            setContactsList(finalSort)
                                                                            setSortedBy('')
                                                                        }
                                                                    }}>
                                                                        Agency
                                                                        <i className={sortedBy === "agency" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                                    </th>

                                                                    <th className="min-w-200px" style={{ cursor: "pointer" }} onClick={() => {
                                                                        if (sortedBy !== "comments") {
                                                                            let finalSort = contactsList.sort(Sort_by('comments', false, (a: any) => a.toUpperCase()))
                                                                            setContactsList(finalSort)
                                                                            setSortedBy("comments")
                                                                        } else if (sortedBy === "comments") {
                                                                            let finalSort = contactsList.sort(Sort_by('comments', true, (a: any) => a.toUpperCase()))
                                                                            setContactsList(finalSort)
                                                                            setSortedBy('')
                                                                        }
                                                                    }}>
                                                                        Comments
                                                                        <i className={sortedBy === "comments" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                                    </th>

                                                                    <th className="min-w-100px">
                                                                        Actions
                                                                    </th>

                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {ContactPaginationData.length > 0 ? ContactPaginationData.map((contact, index) => (
                                                                    <Fragment key={index}>
                                                                        <ListContactRows contact={contact} setDeleteContactId={setDeleteContactId} setShowEditingForm={setShowEditingForm} setSelectedContact={setSelectedContact} />
                                                                    </Fragment>
                                                                )) :
                                                                    <tr>
                                                                        <td align="center" colSpan={12}><span className='text-gray-600 fs-2 fw-bolder'>No Contacts Found</span></td>
                                                                    </tr>
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div className='my-4'>
                                                    <div className="d-flex justify-content-center" ref={PaginationRef}>
                                                        <Pagination
                                                            className='pagination-bar'
                                                            currentPage={currentPage}
                                                            totalCount={contactsList.length}
                                                            pageSize={PageSize}
                                                            onPageChange={(page: SetStateAction<number>) => setCurrentPage(page)}
                                                        />
                                                    </div>
                                                    <div className='d-flex justify-content-start'>
                                                        <div className="mx-2">
                                                            <button className="btn btn-sm btn-primary" onClick={() => {
                                                                setShowEditingForm(false)
                                                                setShowNewForm(true)
                                                            }}>Add New Contact</button>
                                                        </div>
                                                        <div className='mx-2'>
                                                            <ExportCSV
                                                                headerProp={headers} filename={"Contact_Details"} data={exportData} title={"Export to CSV"}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : null
                }
                {/* MODAL FOR DELETING CONTACT */}
                <div className='modal fade' id="kt_modal_delete_contact" tabIndex={-1} aria-hidden="true">
                    {/*begin::Modal dialog*/}
                    <div className="modal-dialog modal-dialog-centered mw-600px mh-100px">
                        {/*begin::Modal content*/}
                        <div className="modal-content">
                            {/*begin::Modal header*/}
                            <div className="modal-header d-flex justify-content-center">
                                {/*begin::Modal title*/}
                                <h2 className="fw-bolder">ARE YOU SURE YOU WANT TO DELETE THIS CONTACT?</h2>
                                {/*end::Modal title*/}
                            </div>
                            {/*end::Modal header*/}
                            {/*begin::Modal body*/}
                            <div className='modal-body scroll-y mx-lg-5'>
                                <div className='d-flex justify-content-center'>
                                    <button className='btn btn-danger'
                                        data-bs-dismiss="modal" aria-label="Close" onClick={onDeleteContact}>Confirm
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
        </>
    )
}

export default ListContacts