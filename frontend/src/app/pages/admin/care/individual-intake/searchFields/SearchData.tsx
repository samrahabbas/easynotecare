import { useEffect, useState, useMemo, Fragment, SetStateAction, useRef } from 'react'
import IndividualRow from '../listIndividual/IndividualRow'
// import data from '../../individual-mock-data.json'
import Pagination from '../../../../../../_helper/paginationHook/Pagination'
import ExportCSV from '../../../../../../_helper/exportCSVHelper/ExportCSV'
import * as Yup from 'yup'
import { Sort_by } from '../../../../../../_helper/objectSorter'
import '../../../../../../_helper/tableHeaderSticky/tableHeaderSticky.css'
import axios from 'axios'
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
    { label: "Mailing Address", key: "mailingaddress" },
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
    { label: "Case Status", key: "caseStatus" },
    { label: "Address", key: "addrAddress" },
    { label: "City", key: "addrCountry" },
    { label: "Residential County", key: "residentialCounty" },
    { label: "Residential County State", key: "residentialCountyState" },
    { label: "Service County", key: "serviceCounty" },
    { label: "Service County State", key: "serviceCountyState" },
    { label: "Country", key: "addrCity" },
    { label: "Address Primary Phone", key: "addrPrimaryPhone" },
    { label: "Address Secondary Phone", key: "addrSecondaryPhone" },
    { label: "Address ZipCode", key: "addrZipCode" },
    { label: "Mailing Primary Phone", key: "mailingPrimaryPhone" },
    { label: "Mailing Secondary Phone", key: "mailingSecondaryPhone" },
    { label: "Mailing Address", key: "mailingaddress" },
    { label: "Mailing City", key: "mailingCity" },
    { label: "Mailing Country", key: "mailingCountry" },
    { label: "Mailing ZipCode", key: "mailingZipCode" },
    { label: "Entered By", key: "enteredBy" },
    { label: "Admitted By", key: "admittedBy" },
    { label: "Last Updated By", key: "lastUpdatedBy" },
    { label: "Admission Date", key: "admissionDate" },
]

const SearchData = ({ formData, setShowForm }: any) => {
    const [deleteIndividualId, setDeleteIndividualId] = useState('')
    const [showResAddr, setShowResAddr] = useState<boolean>(false)
    const [showMailingAddr, setShowMailingAddr] = useState<boolean>(false)
    const [exportData, setExportData] = useState<object[]>([])
    const [exportDataDetail, setExportDataDetail] = useState<object[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [sortedBy, setSortedBy] = useState('')
    const [PageSize, setPageSize] = useState(50)
    const [showEditForm, setShowEditForm] = useState(true)
    const [individuals, setIndividuals] = useState<any[]>([])
    const [individualStatic, setIndividualStatic] = useState<any[]>([])
    const [editIndividualData, setEditIndividualData] = useState({
        individual: '',
        title: '',
        gender: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        goesby: '',
        socialSecurityNumber: '',
        medicaidNumber: '',
        caseStatus: '',
        status: '',
        email: '',
        phoneNumber: '',
        formID: '',
        race: '',
        ethnicity: '',
        classMemebership: '',
        inCareOf: '',
        addrAddress: '',
        addrCity: '',
        addrState: '',
        addrZipCode: '',
        addrCountry: '',
        addrLocation: '',
        addrPrimaryPhone: '',
        addrSecondaryPhone: '',
        addrAdditionalPhone: '',
        residentialCountyState: '',
        residentialCounty: '',
        serviceCountyState: '',
        serviceCounty: '',
        mailingInCareOf: '',
        mailingaddress: '',
        mailingCity: '',
        mailingState: '',
        mailingCountry: '',
        mailingZipCode: '',
        mailingPrimaryPhone: '',
        mailingSecondaryPhone: '',
        mailingAdditionalPhone: '',
        residentialAddr: false,
        mailingAddr: false
    })
    const auth = useSelector(selectAuth);

	const companyid = auth.user?.company_code
    useEffect(() => {
        axios.get('/clients/get/' + companyid)
            .then(res => {
                let tempData: any[] = res.data

                let formUpdatedData: any = {}

                let objectKeysArray = Object.keys(formData)

                for (const element of objectKeysArray) {
                    if (formData[element] !== '' && formData[element] !== 'Select Status'
                        && formData[element] !== 'Select Individual ID Type' && formData[element] !== 'Select Case Status') {
                        formUpdatedData[element as keyof object] = formData[element as keyof object]
                    }
                }

                let formDataKeys = Object.keys(formUpdatedData)
                let selectedData: any = {}

                if (formDataKeys.includes("birthDateTo") && formDataKeys.includes("birthDateFrom")) {
                    tempData = tempData.filter(ind => ind.birthDate >= formUpdatedData.birthDateFrom && ind.birthDate <= formUpdatedData.birthDateTo)
                } else if (formDataKeys.includes("birthDateTo") && !formDataKeys.includes("birthDateFrom")) {
                    tempData = tempData.filter(ind => ind.birthDate <= formUpdatedData.birthDateTo)
                } else if (!formDataKeys.includes("birthDateTo") && formDataKeys.includes("birthDateFrom")) {
                    tempData = tempData.filter(ind => ind.birthDate >= formUpdatedData.birthDateFrom)
                }

                if (formDataKeys.includes("admissionDateTo") && formDataKeys.includes("admissionDateFrom")) {
                    tempData = tempData.filter(ind => ind.admissionDate >= formUpdatedData.admissionDateFrom && ind.admissionDate <= formUpdatedData.admissionDateTo)
                } else if (formDataKeys.includes("admissionDateTo") && !formDataKeys.includes("admissionDateFrom")) {
                    tempData = tempData.filter(ind => ind.admissionDate <= formUpdatedData.admissionDateTo)
                } else if (!formDataKeys.includes("admissionDateTo") && formDataKeys.includes("admissionDateFrom")) {
                    tempData = tempData.filter(ind => ind.admissionDate >= formUpdatedData.admissionDateFrom)
                }

                formDataKeys = formDataKeys.filter(key =>
                    key !== "birthDateTo" && key !== "birthDateFrom" && key !== "admissionDateTo" && key !== "admissionDateFrom"
                )

                let tempFinalArray: any = []
                if (formDataKeys.length > 0) {
                    for (const element of formDataKeys) {
                        if (element === "firstName" || element === "lastName" || element === "socialSecurityNumber" ||
                            element === "medicaidNumber" || element === "medicareNumber" || element === "formID" ||
                            element === "individualIDNumber" || element === "enteredBy" || element === "status" ||
                            element === "individualIDType" || element === "caseStatus"
                        ) {
                            let lowerCaseLetter = formUpdatedData[element].toLowerCase()
                            formUpdatedData[element as keyof object] = lowerCaseLetter
                        }
                    }
                    for (let i = 0; i < tempData.length; i++) {
                        if (selectedData[tempData[i].formID as keyof object] === "deleted") {
                            continue
                        }
                        for (const element of formDataKeys) {
                            if (element === "firstName" || element === "lastName" || element === "socialSecurityNumber" ||
                                element === "medicaidNumber" || element === "medicareNumber" || element === "formID" ||
                                element === "individualIDNumber" || element === "enteredBy" || element === "status" ||
                                element === "individualIDType" || element === "caseStatus"
                            ) {
                                let lowerCaseLetter = tempData[i][element as keyof object].toLowerCase()
                                if (lowerCaseLetter.includes(formUpdatedData[element as keyof object])) {
                                    selectedData[tempData[i].formID as keyof object] = tempData[i]
                                }
                            } else {
                                if (tempData[i][element as keyof object] === formUpdatedData[element as keyof object]) {
                                    selectedData[tempData[i].formID as keyof object] = tempData[i]
                                } else {
                                    selectedData[tempData[i].formID as keyof object] = "deleted"
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
                for (let i = 0; i < tempFinalArray.length; i++) {
                    tempFinalArray[i].mailingaddress = tempFinalArray[i].mailingInfo?.st1 + ' ' +
                        tempFinalArray[i].mailingInfo?.st2 + ' ' +
                        tempFinalArray[i].mailingInfo?.city + ' ' +
                        tempFinalArray[i].mailingInfo?.state + ' ' +
                        tempFinalArray[i].mailingInfo?.country
                }
                setIndividualStatic(tempFinalArray)
                setIndividuals(tempFinalArray)
            })
    }, [])

    useEffect(() => {
        let filteredIndividuals = filterArray(individuals)
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

    const onDeleteIndividual = () => {
        // let tempObj = {
        //     deleteID: deleteIndividualId
        // }
        // axios.delete('contacts/deleteContact', {
        //     data: tempObj
        // })
        // .then(() => {
        setIndividualStatic((prevState) =>
            prevState.filter((ind) => ind.formID !== deleteIndividualId)
        )
        setIndividuals((prevState) =>
            prevState.filter((ind) => ind.formID !== deleteIndividualId)
        );
        // }).catch(err => {
        //     console.log((err))
        // })
    }

    const filterArray = (dataProp: {}[]) => {
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
            "enteredBy",
            "admittedBy",
            "lastUpdatedBy",
            "admissionDate",
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
                "enteredBy": '',
                "admittedBy": '',
                "lastUpdatedBy": '',
                "admissionDate": '',
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

    const searchFilterClients = (value: string) => {
        let filteredArray = filterArray(individualStatic)
        let lowerCaseValue = value.toLowerCase()
        let temparr = []
        for (let i = 0; i < filteredArray.length; i++) {
            if (Object.values(filteredArray[i]).filter(item => typeof item === 'string'
                ? item.toLowerCase().includes(lowerCaseValue) : false).length > 0) {
                temparr.push(filteredArray[i])
            }
        }
        let tempstate = []
        for (let i = 0; i < individuals.length; i++) {
            for (let j = 0; j < temparr.length; j++) {
                if (temparr[j].formID === individuals[i].formID) {
                    tempstate.push(individuals[i])
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
            <div className='card mb-5 col-mb-10' id='kt_content'>
                <div className='post d-flex flex-column-fluid' id='kt_post'>
                    <div id='kt_content_container' className='container-xxl'>
                        <div className=''>
                            <div className="d-flex justify-content-end  p-5">
                                <button className="btn btn-sm btn-primary" onClick={() => setShowForm(true)}>
                                    Back
                                </button>
                            </div>
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
                            <div className="mt-4">
                                <div className='card-body stickhyHeaderTable table-responsive' style={{ padding: "0rem 2.25rem" }}>
                                    <table
                                        className='table table-light table-rounded table-striped border border-2 table-hover mt-4 fs-6 gy-5'
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
    )
}

export default SearchData