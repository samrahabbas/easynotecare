import { useState, useEffect, Fragment, useMemo, SetStateAction, useRef } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import ProgramRow from './ProgramRow'
import Pagination from '../../../../../../_helper/paginationHook/Pagination'
import ExportCSV from '../../../../../../_helper/exportCSVHelper/ExportCSV'
import ProgramIndividuals from '../programListing/programIndividuals'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../../setup'
const selectAuth = (state: RootState) => state.auth;

/**
 * Validator for adding contacts
 */
const registrationSchema = Yup.object().shape({
    programName: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required("Program Name is required"),
    siteName: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required("Site Name is required"),
    siteAddress: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 150 symbols')
        .required("Site Address is required"),
    programType: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required("Program Type is required"),
    programCostCenterNumber: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols'),
    createDate: Yup.string()
        .required("Create Date is required"),
})
//List Programs doesnt have sorting methodology
const ListPrograms = () => {
    const [deleteProgramId, setDeleteProgramId] = useState('')
    const [exportData, setExportData] = useState<object[]>([])
    const [exportDataDetail, setExportDataDetail] = useState<object[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [sortedBy, setSortedBy] = useState('')
    const [showIndividuals, setShowIndividuals] = useState(false)
    const [PageSize, setPageSize] = useState(50)
    const [programs, setPrograms] = useState<any[]>([])
    const [programStatic, setProgramStatic] = useState<any[]>([])
    const [editProgramData, setEditProgramData] = useState({
        programName: '',
        siteName: '',
        siteAddress: '',
        programType: '',
        programCostCenterNumber: '',
        createDate: '',
        formID: '',
    })
    const auth = useSelector(selectAuth);

    const companyid = auth.user?.company_code

    useEffect(() => {
        axios.get("/programs/get/" + companyid)
            .then((response) => {
                setPrograms(response.data)
                setProgramStatic(response.data)
            })
    }, [showIndividuals])

    const headers = [
        { label: "Form ID", key: "formID" },
        { label: "Program Name", key: "programName" },
        { label: "Site Name", key: "siteName" },
        { label: "Status", key: "status" },
        { label: "Create Date", key: "createDate" },
    ]

    const headersDetails = [
        { label: "Form ID", key: "formID" },
        { label: "Program Name", key: "programName" },
        { label: "Site Name", key: "siteName" },
        { label: "Program Type", key: "programType" },
        { label: "Program Cost Center Number", key: "programCostCenterNumber" },
        { label: "Status", key: "status" },
        { label: "Create Date", key: "createDate" },
        { label: "Time Zone", key: "timeZone" },
    ]

    useEffect(() => {
        let filteredIndividuals = filterArray(programs)
        setExportData(filteredIndividuals)
        setExportDataDetail(programs)
    }, [programs])

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
    }, [programs])

    const onDeleteProgram = () => {
        let tempObj = {
            deleteID: deleteProgramId
        }
        axios.delete('programs/delete', {
            data: tempObj
        })
            .then(() => {
                setProgramStatic((prevState) =>
                    prevState.filter((program) => program.formID !== deleteProgramId)
                )
                setPrograms((prevState) =>
                    prevState.filter((program) => program.formID !== deleteProgramId)
                );
            }).catch(err => {
                console.log((err))
            })
    }

    const filterArray = (dataProp: {}[]) => {
        let arrayCopy = JSON.stringify(dataProp)
        arrayCopy = JSON.parse(arrayCopy)
        let filteredArray = []
        let sampleFilter = [
            "formID",
            "programName",
            "siteName",
            "siteAddress",
            "createDate",
            "programType",
            "programCostCenterNumber",
        ]
        for (let j = 0; j < arrayCopy.length; j++) {
            let allkeys = Object.keys(arrayCopy[j])

            let obj1: any = {
                "formID": '',
                "programName": '',
                "siteName": '',
                "siteAddress": '',
                "createDate": '',
                "programType": '',
                "programCostCenterNumber": '',
            }
            for (let i = 0; i < allkeys.length; i++) {
                if (sampleFilter.includes(allkeys[i])) {
                    let tempvar1 = allkeys[i]
                    // obj1[tempvar2 as keyof object] = "apples"
                    obj1[tempvar1 as keyof object] = arrayCopy[j][tempvar1 as keyof object]
                }
            }
            filteredArray.push(obj1)
        }
        return filteredArray
    }

    const searchFilterClients = (value: string) => {
        let filteredArray = filterArray(programStatic)
        let lowerCaseValue = value.toLowerCase()
        let temparr = []
        for (const element of filteredArray) {
            if (Object.values(element).filter(item => typeof item === 'string' ? item.toLowerCase().includes(lowerCaseValue) : false).length > 0) {
                temparr.push(element)
            }
        }
        let tempstate = []
        for(let i = 0; i < programStatic.length; i++) {
            for(let j = 0; j < temparr.length; j++) {
                if(temparr[j].formID === programStatic[i].formID) {
                    tempstate.push(programStatic[i])
                }
            }
        }
        setPrograms(tempstate)
        setCurrentPage(1)
    }

    const ProgramsPaginationData = useMemo(() => {
        if (programs.length <= PageSize) {
            setCurrentPage(1)
        }
        let tempdata = programs
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return tempdata.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, programs, PageSize, sortedBy, programStatic])

    return (
        <div>
            {
                showIndividuals ? <ProgramIndividuals setShowIndividuals={setShowIndividuals} editProgramData={editProgramData}
                />
                    :
                    <div>
                        <div className='card mb-5 col-mb-10' id='kt_content'>
                            <div className='post d-flex flex-column-fluid' id='kt_post'>
                                <div id='kt_content_container' className='container-xxl'>
                                    <div className='card-header border-0 pt-6'>
                                        <h1 className='mt-6 mb-0'>Program Search</h1>
                                        <div className='w-100'>
                                            <div className="d-flex w-100 justify-content-between">
                                                <div>
                                                    <div className='d-flex align-items-between position-relative overflow-auto my-1'>
                                                        <span className='svg-icon svg-icon-1 position-absolute mt-4 ms-6'>
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
                                                            placeholder='Search Program'
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
                                    <div className='card-body table-responsive' style={{ padding: "0rem 2.25rem" }}>
                                        <table
                                            className='table table-light table-rounded table-striped border border-2 table-hover fs-6 gy-5'
                                            id='kt_program_table'
                                        >
                                            <thead>
                                                <tr className='text-start table-dark text-gray-400 table-rounded fw-bolder fs-7 text-uppercase gs-0'>
                                                    <th className="px-3 min-w-200px">Form ID</th>
                                                    <th className="min-w-200px">Program Name</th>
                                                    <th className="min-w-150px">Program Type</th>
                                                    <th className="min-w-100px">PCCN</th>
                                                    <th className="min-w-150px">Site Name</th>
                                                    <th className="min-w-250px">Site Address</th>
                                                    <th className="min-w-150px">Create Date</th>
                                                    <th className="min-w-100px">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    ProgramsPaginationData.length > 0 ?
                                                        ProgramsPaginationData.map((program, index) => (
                                                            <Fragment key={index}>
                                                                <ProgramRow program={program} setEditProgramData={setEditProgramData} setDeleteProgramId={setDeleteProgramId} 
                                                                setShowIndividuals={setShowIndividuals} />
                                                            </Fragment>
                                                        ))
                                                        :
                                                        <tr>
                                                            <td align="center" colSpan={12}><span className='text-gray-600 fs-2 fw-bolder'>No Programs Found</span></td>
                                                        </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="d-flex justify-content-center" ref={PaginationRef}>
                                        <Pagination
                                            className='pagination-bar'
                                            currentPage={currentPage}
                                            totalCount={programs.length}
                                            pageSize={PageSize}
                                            onPageChange={(page: SetStateAction<number>) => setCurrentPage(page)}
                                        />
                                    </div>
                                    <div className='d-flex justify-content-start'>
                                        <div className='mr-2'>
                                            <ExportCSV
                                                headerProp={headers} filename={"Programs_Details"} data={exportData} title={"Export to CSV"}
                                            />
                                        </div>
                                        <div className='mx-2'>
                                            <ExportCSV
                                                headerProp={headersDetails} filename={"Programs_Details"} data={exportDataDetail} title={"Export to CSV (detail)"}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*MODAL FOR DELETING PROGRAM*/}
                        <div className='modal fade' id="kt_modal_delete_program" tabIndex={-1} aria-hidden="true">
                            {/*begin::Modal dialog*/}
                            <div className="modal-dialog modal-dialog-centered mw-500px mh-100px">
                                {/*begin::Modal content*/}
                                <div className="modal-content">
                                    {/*begin::Modal header*/}
                                    <div className="modal-header d-flex justify-content-center">
                                        {/*begin::Modal title*/}
                                        <h2 className="fw-bolder">ARE YOU SURE YOU WANT TO DELETE THIS PROGRAM?</h2>
                                        {/*end::Modal title*/}
                                    </div>
                                    {/*end::Modal header*/}
                                    {/*begin::Modal body*/}
                                    <div className='modal-body scroll-y mx-lg-5 my-7'>
                                        <div className='d-flex justify-content-center'>
                                            <button className='btn btn-light me-3'
                                                data-bs-dismiss="modal" aria-label="Close" onClick={onDeleteProgram}>Confirm
                                            </button>
                                            <button className='btn btn-light me-3' data-bs-dismiss="modal"
                                                aria-label="Close">Discard
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*MODAL FOR EDITING PROGRAM*/}
                        <div className='modal fade' id="kt_modal_edit_program" tabIndex={-1} aria-hidden="true">
                            {/*begin::Modal dialog*/}
                            <div className="modal-dialog modal-dialog-centered mw-900px">
                                {/*begin::Modal content*/}
                                <div className="modal-content">
                                    {/*begin::Modal header*/}
                                    <div className="modal-header d-flex justify-content-between">
                                        {/*begin::Modal title*/}
                                        <h2 className="fw-bolder">Edit Program</h2>
                                        {/*end::Modal title*/}
                                        {/*begin::Close*/}
                                        <div className="btn btn-icon btn-sm btn-active-icon-primary" data-kt-program-modal-action="close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close">
                                            {/*begin::Svg Icon | path: icons/duotune/arrows/arr061.svg*/}
                                            <span className="svg-icon svg-icon-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                    <rect opacity="0.5" x={6} y="17.3137" width={16} height={2} rx={1} transform="rotate(-45 6 17.3137)" fill="black" />
                                                    <rect x="7.41422" y={6} width={16} height={2} rx={1} transform="rotate(45 7.41422 6)" fill="black" />
                                                </svg>
                                            </span>
                                            {/*end::Svg Icon*/}
                                        </div>
                                        {/*end::Close*/}
                                    </div>
                                    {/*end::Modal header*/}
                                    <Formik
                                        enableReinitialize
                                        initialValues={editProgramData}
                                        validationSchema={registrationSchema}
                                        onSubmit={(values, { setSubmitting }) => {
                                            axios.put("programs/update", values)
                                                .then(res => {
                                                    console.log(res.data);
                                                    // setPrograms(prevState =>
                                                    //         prevState.filter(p => p.formID === values.formID ?  values : p)
                                                    //     )
                                                    // setProgramStatic(prevState =>
                                                    //         prevState.filter(p => p.formID === values.formID ?  values : p)
                                                    //     )

                                                    setPrograms((prevState) =>
                                                        prevState.map((program) => program["formID" as keyof Object] === values["formID" as keyof Object] ? values : program)
                                                    )
                                                })
                                        }}
                                    >
                                        {({ isSubmitting, resetForm }) => (
                                            <div className="card-body d-flex justify-content-center pt-1">
                                                <Form className='form w-75 fv-plugins-bootstrap5 fv-plugins-framework'>
                                                    <div className='d-flex justify-content-center my-2'>
                                                        <label className="w-25 form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">Form ID</label>
                                                        <Field className='w-75 form-control form-control-lg form-control-solid' type="text" name="formID" autoComplete='off' disabled={true} />
                                                    </div>
                                                    <div className='d-flex justify-content-center my-1'>
                                                        <label className="w-25 form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">Program Name</label>
                                                        <Field className='w-75 form-control form-control-lg form-control-solid' type="text" name="programName" autoComplete='off' />
                                                    </div>
                                                    <div className='d-flex justify-content-end'>
                                                        <ErrorMessage name="programName" component="div" className='text-danger' />
                                                    </div>
                                                    <div className='d-flex justify-content-center my-1'>
                                                        <label className="w-25 form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">Program Type</label>
                                                        <Field className='w-75 form-control form-control-lg form-control-solid' type="text" name="programType" autoComplete='off' />
                                                    </div>
                                                    <div className='d-flex justify-content-end'>
                                                        <ErrorMessage name="programType" component="div" className='text-danger' />
                                                    </div>
                                                    <div className='d-flex justify-content-center my-1'>
                                                        <label className="w-25 form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">Program Cost Center Number</label>
                                                        <Field className='w-75 form-control form-control-lg form-control-solid' type="number" name="programCostCenterNumber" autoComplete='off' />
                                                    </div>
                                                    <div className='d-flex justify-content-end'>
                                                        <ErrorMessage name="programCostCenterNumber" component="div" className='text-danger' />
                                                    </div>
                                                    <div className='d-flex justify-content-center my-1'>
                                                        <label className="w-25 form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">Site Name</label>
                                                        <Field className='w-75 form-control form-control-lg form-control-solid' type="text" name="siteName" autoComplete='off' />
                                                    </div>
                                                    <div className='d-flex justify-content-end'>
                                                        <ErrorMessage name="siteName" component="div" className='text-danger' />
                                                    </div>
                                                    <div className='d-flex justify-content-center my-1'>
                                                        <label className="w-25 form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">Site Address</label>
                                                        <Field className='w-75 form-control form-control-lg form-control-solid' as="textarea" name="siteAddress" autoComplete='off' />
                                                    </div>
                                                    <div className='d-flex justify-content-end'>
                                                        <ErrorMessage name="siteAddress" component="div" className='text-danger' />
                                                    </div>
                                                    <div className="d-flex justify-content-center my-4 pb-5">
                                                        <button type="submit" className='btn btn-primary btn-active-secondary mx-2' data-bs-dismiss="modal" aria-label="Close"
                                                        >Update Program</button>
                                                        <button type="reset" className="btn btn-primary btn-active-secondary" onClick={() => resetForm()}>Reset</button>
                                                    </div>
                                                </Form>
                                            </div>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default ListPrograms;