import { Fragment, useEffect, useState, useMemo, SetStateAction, useRef } from 'react'
import axios from 'axios'
import IndividualRow from './IndividualRow'
import { Sort_by } from '../../../../../../_helper/objectSorter'
import Pagination from '../../../../../../_helper/paginationHook/Pagination'
import ExportCSV from '../../../../../../_helper/exportCSVHelper/ExportCSV'
import '../../../../../../_helper/tableHeaderSticky/tableHeaderSticky.css'
import { filterArray } from '../../../../../../_helper/filterArray'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../../setup'
const selectAuth = (state: RootState) => state.auth;

const headers = [
    { label: "Form ID", key: "formID" },
    { label: "Client Name", key: "individual" },
    { label: "Social Security Number", key: "socialSecurityNumber" },
    { label: "Medicaid Number", key: "medicaidNumber" },
    { label: "Status", key: "status" },
    { label: "Entered By", key: "enteredBy" },
    { label: "Admitted By", key: "admittedBy" },
    { label: "Admission Date", key: "admissionDate" },
    { label: "Birth Date", key: "birthDate" },
    { label: "Last Updated By", key: "lastUpdatedBy" },
    // { label: "Mailing Address", key: "mailingaddress" },
]

const headersDetails = [
    { label: "Form ID", key: "formID" },
    { label: "Client Name", key: "individual" },
    { label: "Social Security Number", key: "socialSecurityNumber" },
    { label: "Medicaid Number", key: "medicaidNumber" },
    { label: "Medicare Number", key: "medicareNumber" },
    { label: "Birth Date", key: "birthDate" },
    { label: "Gender", key: "gender" },
    { label: "Email", key: "email" },
    { label: "Ethnicity", key: "ethnicity" },
    { label: "Race", key: "race" },
    { label: "Phone Number", key: "phoneNumber" },
    { label: "In Care Of", key: "inCareOf" },
    { label: "Status", key: "status" },
    // { label: "Case Status", key: "caseStatus" },
    // { label: "Address", key: "addrAddress" },
    // { label: "City", key: "addrCountry" },
    // { label: "Residential County", key: "residentialCounty" },
    // { label: "Residential County State", key: "residentialCountyState" },
    // { label: "Service County", key: "serviceCounty" },
    // { label: "Service County State", key: "serviceCountyState" },
    // { label: "Country", key: "addrCity" },
    // { label: "Address Primary Phone", key: "addrPrimaryPhone" },
    // { label: "Address Secondary Phone", key: "addrSecondaryPhone" },
    // { label: "Address ZipCode", key: "addrZipCode" },
    // { label: "Mailing Primary Phone", key: "mailingPrimaryPhone" },
    // { label: "Mailing Secondary Phone", key: "mailingSecondaryPhone" },
    // { label: "Mailing Address", key: "mailingaddress" },
    // { label: "Mailing City", key: "mailingCity" },
    // { label: "Mailing Country", key: "mailingCountry" },
    // { label: "Mailing ZipCode", key: "mailingZipCode" },
    { label: "Entered By", key: "enteredBy" },
    { label: "Admitted By", key: "admittedBy" },
    { label: "Last Updated By", key: "lastUpdatedBy" },
    { label: "Admission Date", key: "admissionDate" },
]

const sampleFilter = [
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

const IndividualList = ({ location }: {
    location: {
        state: SetStateAction<{
            formID: string,
            title: string,
            gender: string,
            firstName: string,
            lastName: string,
            birthDate: string,
            socialSecurityNumber: string,
            medicaidNumber: string,
            status: string,
            email: string,
            phoneNumber: string,
            race: string,
            ethnicity: string,
            enteredDate: string,
            enteredBy: string,
            admittedBy: string,
            lastUpdatedBy: string,
            admissionDate: string,
            addrInCareOf: string,
            residentialAddr: boolean,
            mailingAddr: boolean,
            addrInfo: {
                st1: string,
                st2: string,
                city: string,
                state: string,
                zipCode: string,
                country: string,
                primaryPhone: string,
                secondaryPhone: string,
                additionalPhone: string,
            },
            mailingInfo: {
                st1: string,
                st2: string,
                city: string,
                state: string,
                country: string,
                zipCode: string,
                primaryPhone: string,
                secondaryPhone: string,
                additionalPhone: string,
            },
            insuranceInfo:{
                medicareNumber: string,
                medicareDate: string,
                medPlanDId: string,
                medPlanDName: string,
                medPlanDIssuer: string,
                medPlanDRxBin: string,
                medPlanDRxPcn: string,
                medPlanDRxGrp: string,
                otherBenefits: string,
                insuranceCompany: string,
                insuranceGroup: string,
                insurancePolicyNumber: string,
                insurancePolicyHolder: string,
                files: string,
            }
        }>
    }
}) => {
    const [deleteIndividualId, setDeleteIndividualId] = useState('')
    const [showResAddr, setShowResAddr] = useState<boolean>(false)
    const [showMailingAddr, setShowMailingAddr] = useState<boolean>(false)
    const [sameAsPrimary, setSameAsPrimary] = useState(false)
    const [showSubMenu, setShowSubMenu] = useState(false)
    const [exportData, setExportData] = useState<object[]>([])
    const [exportDataDetail, setExportDataDetail] = useState<object[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [sortedBy, setSortedBy] = useState('')
    const [PageSize, setPageSize] = useState(5)
    const [showEditForm, setShowEditForm] = useState(true)
    const [individuals, setIndividuals] = useState<any[]>([])
    const [individualStatic, setIndividualStatic] = useState<any[]>([])
    const [editIndividualData, setEditIndividualData] = useState({
        formID: '',
        title: '',
        gender: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        socialSecurityNumber: '',
        medicaidNumber: '',
        status: '',
        email: '',
        phoneNumber: '',
        race: '',
        ethnicity: '',
        enteredDate: '',
        enteredBy: '',
        admittedBy: '',
        lastUpdatedBy: '',
        admissionDate: '',
        addrInCareOf: '',
        residentialAddr: false,
        mailingAddr: false,
        addrInfo: {
            st1: '',
            st2: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
            primaryPhone: '',
            secondaryPhone: '',
            additionalPhone: '',
        },
        mailingInfo: {
            st1: '',
            st2: '',
            city: '',
            state: '',
            country: '',
            zipCode: '',
            primaryPhone: '',
            secondaryPhone: '',
            additionalPhone: '',
        },
        insuranceInfo:{
            medicareNumber: '',
            medicareDate: '',
            medPlanDId: '',
            medPlanDName: '',
            medPlanDIssuer: '',
            medPlanDRxBin: '',
            medPlanDRxPcn: '',
            medPlanDRxGrp: '',
            otherBenefits: '',
            insuranceCompany: '',
            insuranceGroup: '',
            insurancePolicyNumber: '',
            insurancePolicyHolder: '',
            files: ''
        }
    })

    useEffect(() => {
        if (location.state !== undefined) {
            setEditIndividualData(location.state)
            setShowEditForm(false)
        }
    }, [])

    const auth = useSelector(selectAuth);

    useEffect(() => {
        const source = axios.CancelToken.source();
        const companyid = auth.user?.company_code
        axios.get('/clients/get/'+companyid)
            .then(res => {
                // console.log(res.data)
                let tempvar = res.data
                for (let i = 0; i < tempvar.length; i++) {
                    tempvar[i].mailingaddress = res.data[i].mailingInfo?.st1 + ' ' +
                        res.data[i].mailingInfo?.st2 + ' ' +
                        res.data[i].mailingInfo?.city + ' ' +
                        res.data[i].mailingInfo?.state + ' ' +
                        res.data[i].mailingInfo?.country
                }
                setIndividualStatic(tempvar)
                setIndividuals(tempvar)
            })
        return () => {
            source.cancel('Component unmounted');
        };
    }, [])

    useEffect(() => {
        let filteredIndividuals = filterArray(individuals, sampleFilter)
        setExportData(filteredIndividuals)
        setExportDataDetail(individuals)
    }, [individuals])

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
    }, [individuals])

    useEffect(() => {
        setShowResAddr(editIndividualData.residentialAddr)
        setShowMailingAddr(editIndividualData.mailingAddr)
    }, [editIndividualData])

    const onDeleteIndividual = () => {
        let tempObj = {
            deleteID: deleteIndividualId
        }
        axios.delete('/clients/delete', {
            data: tempObj
        })
            .then((res) => {
                console.log(res.data)
                setIndividualStatic((prevState) =>
                    prevState.filter((ind) => ind.formID !== deleteIndividualId)
                )
                setIndividuals((prevState) =>
                    prevState.filter((ind) => ind.formID !== deleteIndividualId)
                );
            }).catch(err => {
                console.log((err))
            })
    }

    const searchFilterClients = (value: string) => {
        let filteredArray = filterArray(individualStatic, sampleFilter)
        let lowerCaseValue = value.toLowerCase()
        let temparr: any = []
        for (const element of filteredArray) {
            if (Object.values(element).filter(item => typeof item === 'string' ? item.toLowerCase().includes(lowerCaseValue) : false).length > 0) {
                temparr.push(element)
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
            <div>
                <div className='card mb-5 col-mb-10' id='kt_content'>
                    {/* <PDFViewer width="1000" height="600">
                        <Document>
                            <Page size="A4">
                                <View style={styles.table}>
                                    <View style={[styles.row, styles.bold, styles.header]}>
                                        <Text style={styles.marginGiven}>Name</Text>
                                        <Text style={styles.marginGiven}>Birth Date</Text>
                                        <Text style={styles.marginGiven}>socialSecurityNumber</Text>
                                        <Text style={styles.marginGiven}>Entered By</Text>
                                        <Text style={styles.marginGiven}>Gender</Text>
                                    </View>
                                    {IndividualPaginationData.map((row) => (
                                        <View style={styles.row} key={row.formID}>
                                            <Text style={styles.marginGiven}>{row.individual}</Text>
                                            <Text style={styles.marginGiven}>{row.firstName}</Text>
                                            <Text style={styles.marginGiven}>{row.socialSecurityNumber}</Text>
                                            <Text style={styles.marginGiven}>{row.enteredBy}</Text>
                                            <Text style={styles.marginGiven}>{row.gender}</Text>
                                        </View>
                                    ))}
                                </View>
                            </Page>
                        </Document>
                    </PDFViewer> */}
                    <div className='post d-flex flex-column-fluid' id='kt_post'>
                        <div id='kt_content_container' className='container-xxl'>
                            <div className='mt-4'>
                                <div className='card-body'>
                                    <h1 className='mt-5'>Client Intake List</h1>
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
                                                            let finalSort = individuals.sort(Sort_by('firstName', false, (a: any) => a.toUpperCase()))
                                                            setIndividuals(finalSort)
                                                            setSortedBy("firstName")
                                                        } else if (sortedBy === "firstName") {
                                                            let finalSort = individuals.sort(Sort_by('firstName', true, (a: any) => a.toUpperCase()))
                                                            setIndividuals(finalSort)
                                                            setSortedBy('')
                                                        }
                                                    }}>
                                                        Client Name
                                                        <i className={sortedBy === "firstName" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
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

                                                    <th className='min-w-300px' style={{ cursor: "pointer" }} onClick={() => {
                                                        if (sortedBy !== "mailingaddress") {
                                                            let finalSort = individuals.sort(Sort_by('mailingaddress', false, (a: any) => a.toUpperCase()))
                                                            setIndividuals(finalSort)
                                                            setSortedBy("mailingaddress")
                                                        } else if (sortedBy === "mailingaddress") {
                                                            let finalSort = individuals.sort(Sort_by('mailingaddress', true, (a: any) => a.toUpperCase()))
                                                            setIndividuals(finalSort)
                                                            setSortedBy('')
                                                        }
                                                    }}>
                                                        Mailing Address
                                                        <i className={sortedBy === "mailingaddress" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
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
                                                            let finalSort = individuals.sort(Sort_by('status', false, (a: any) => a.toUpperCase()))
                                                            setIndividuals(finalSort)
                                                            setSortedBy("status")
                                                        } else if (sortedBy === "status") {
                                                            let finalSort = individuals.sort(Sort_by('status', true, (a: any) => a.toUpperCase()))
                                                            setIndividuals(finalSort)
                                                            setSortedBy('')
                                                        }
                                                    }}>
                                                        Status
                                                        <i className={sortedBy === "status" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                    </th>

                                                    <th className='min-w-150px' style={{ cursor: "pointer" }} onClick={() => {
                                                        if (sortedBy !== "enteredBy") {
                                                            let finalSort = individuals.sort(Sort_by('enteredBy', false, (a: any) => a.toUpperCase()))
                                                            setIndividuals(finalSort)
                                                            setSortedBy("enteredBy")
                                                        } else if (sortedBy === "enteredBy") {
                                                            let finalSort = individuals.sort(Sort_by('enteredBy', true, (a: any) => a.toUpperCase()))
                                                            setIndividuals(finalSort)
                                                            setSortedBy('')
                                                        }
                                                    }}>
                                                        Entered By
                                                        <i className={sortedBy === "enteredBy" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                    </th>

                                                    <th className='min-w-100px' style={{ cursor: "pointer" }} onClick={() => {
                                                        if (sortedBy !== "admittedBy") {
                                                            let finalSort = individuals.sort(Sort_by('admittedBy', false, (a: any) => a.toUpperCase()))
                                                            setIndividuals(finalSort)
                                                            setSortedBy("admittedBy")
                                                        } else if (sortedBy === "admittedBy") {
                                                            let finalSort = individuals.sort(Sort_by('admittedBy', true, (a: any) => a.toUpperCase()))
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

                                                    <th className='min-w-150px' style={{ cursor: "pointer" }} onClick={() => {
                                                        if (sortedBy !== "lastUpdatedBy") {
                                                            let finalSort = individuals.sort(Sort_by('lastUpdatedBy', false, (a: any) => a.toUpperCase()))
                                                            setIndividuals(finalSort)
                                                            setSortedBy("lastUpdatedBy")
                                                        } else if (sortedBy === "lastUpdatedBy") {
                                                            let finalSort = individuals.sort(Sort_by('lastUpdatedBy', true, (a: any) => a.toUpperCase()))
                                                            setIndividuals(finalSort)
                                                            setSortedBy('')
                                                        }
                                                    }}>
                                                        Last Updated By
                                                        <i className={sortedBy === "lastUpdatedBy" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                                    </th>

                                                    <th className='min-w-100px'>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {IndividualPaginationData.length > 0 ? IndividualPaginationData.map((individual, index) => (
                                                    <Fragment key={index}>
                                                        <IndividualRow individual={individual} setShowResAddr={setShowResAddr} setShowMailingAddr={setShowMailingAddr}
                                                            setEditIndividualData={setEditIndividualData} setDeleteIndividualId={setDeleteIndividualId}
                                                            setShowEditForm={setShowEditForm} />
                                                    </Fragment>
                                                )) :
                                                    <tr>
                                                        <td align="center" colSpan={12}><span className='text-gray-600 fs-2 fw-bolder'>No Matching Client Found</span></td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className='my-4'>
                                <div className="d-flex justify-content-center" ref={PaginationRef}>
                                    <Pagination
                                        className='pagination-bar'
                                        currentPage={currentPage}
                                        totalCount={individuals.length}
                                        pageSize={PageSize}
                                        onPageChange={(page: SetStateAction<number>) => setCurrentPage(page)}
                                    />
                                </div>
                                <div className='d-flex justify-content-start pb-6'>
                                    <div className='mr-2'>
                                        <ExportCSV
                                            headerProp={headers} filename={"Clients_Details"} data={exportData} title={"Export to CSV"}
                                        />
                                    </div>
                                    <div className='mx-2'>
                                        <ExportCSV
                                            headerProp={headersDetails} filename={"Clients_Complete_Details"} data={exportDataDetail} title={"Export to CSV (detail)"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* MODAL FOR DELETING INDIVIDUAL */}
                <div className='modal fade' id="kt_modal_delete_individual" tabIndex={-1} aria-hidden="true">
                    {/*begin::Modal dialog*/}
                    <div className="modal-dialog modal-dialog-centered mw-600px mh-100px">
                        {/*begin::Modal content*/}
                        <div className="modal-content">
                            {/*begin::Modal header*/}
                            <div className="modal-header d-flex justify-content-center">
                                {/*begin::Modal title*/}
                                <h2 className="fw-bolder">ARE YOU SURE YOU WANT TO DELETE THIS CLIENT?</h2>
                                {/*end::Modal title*/}
                            </div>
                            {/*end::Modal header*/}
                            {/*begin::Modal body*/}
                            <div className='modal-body scroll-y mx-lg-5'>
                                <div className='d-flex justify-content-center'>
                                    <button className='btn btn-danger me-3'
                                        data-bs-dismiss="modal" aria-label="Close" onClick={onDeleteIndividual}>Confirm
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
        </div >
    )
}

export default IndividualList