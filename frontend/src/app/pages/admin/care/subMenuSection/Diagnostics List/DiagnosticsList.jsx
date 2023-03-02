import { Fragment, useEffect, useState } from 'react'
import DiagnosticsListRow from './DiagnosticsListRow'
import NewDiagnostics from './NewDiagnostics'
import { Form, Formik, Field } from 'formik'
import * as Yup from "yup"
import axios from 'axios'

const registrationSchema = Yup.object().shape({
    diagnosisCodeType: Yup.string()
        .required("Diagnosis Code Type is Required"),
    diagnosisName: Yup.string()
        .required("Diagnosis Code is Required"),
    description: Yup.string()
        .required("Diagnosis Description is Required")
})

const DiagnosticsList = ({ client }) => {
    const [diagnosticsList, setDiagnosticsList] = useState([])
    const [deleteDiagnosisId, setDeleteDiagnosisId] = useState('')
    const [newForm, setNewForm] = useState(false)
    const [editDiagnosisData, setEditDiagnosisData] = useState({
        formID: '',
        diagnosisCodeType: "",
        diagnosisName: "",
        description: "",
        diagnosisDate: "",
        diagnosedBy: '',
        enteredBy: "",
    })

    useEffect(() => {
        axios.get("health/get/" + client.formID)
            .then(res => {
                let tempobj = res.data;
                if (tempobj.length > 0) {
                    tempobj = tempobj.filter(item => item.clientID === client.formID)
                    setDiagnosticsList(tempobj[0].diagnosticsInfo)
                }
            })
    }, [newForm])

    const onDeleteDiagnosis = () => {
        if (deleteDiagnosisId) {
            let tempobj = {
                clientID: client.formID,
                deleteID: deleteDiagnosisId
            }
            axios.put("/health/deleteDiagnosis", tempobj)
                .then(res => {
                    setDiagnosticsList((prevState) =>
                        prevState.filter((entry) => entry.formID !== deleteDiagnosisId)
                    )
                    setDeleteDiagnosisId('')
                })
        }
    }

    return (
        <div>
            {
                newForm ? <NewDiagnostics setNewForm={setNewForm} client={client} />
                    :
                    <div>
                        <div className="table-responsive mt-4">
                            <table
                                className='table table-light table-rounded table-striped border border-2 table-hover fs-6 gy-5'
                                id='kt_diagnostics_table'
                            >
                                <thead>
                                    <tr className='text-start table-dark text-gray-400 table-rounded fw-bolder fs-7 text-uppercase gs-0'>
                                        <th className='px-3 min-w-150px'>
                                            Form ID
                                        </th>
                                        <th className='px-3 min-w-100px'>
                                            Diagnosis Coding Type
                                        </th>
                                        <th className='min-w-250px'>
                                            Diagnosis Name
                                        </th>
                                        <th className='min-w-100px'>
                                            Diagnosis Date
                                        </th>
                                        <th className='min-w-200px'>
                                            Description
                                        </th>
                                        <th className='min-w-100px'>
                                            Diagnosed By
                                        </th>
                                        <th className='min-w-100px'>
                                            Entered By
                                        </th>
                                        <th className='min-w-100px'>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        diagnosticsList.length > 0 ? diagnosticsList.map((entry, index) => (
                                            <Fragment key={index}>
                                                <DiagnosticsListRow diagnosis={entry} setEditDiagnosisData={setEditDiagnosisData} setDeleteDiagnosisId={setDeleteDiagnosisId} />
                                            </Fragment>
                                        ))
                                            :
                                            <tr>
                                                <td align="center" colSpan={12}><span className='text-gray-600 fs-2 fw-bolder'>No Diagnostics History</span></td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className='mt-5'>
                            <button className="btn btn-primary btn-sm" onClick={() => setNewForm(true)}>Create New</button>
                        </div>
                    </div>
            }
            {/*MODAL FOR DELETING DIAGNOSIS */}
            <div className="modal fade" id="kt_modal_delete_diagnosis" tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered mw-600px mh-100px">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-center">
                            <h4 className='fw-bolder'>Delete Diagnosis Form</h4>
                        </div>
                        <div className="modal-body scroll-y mx-lg-5">
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-danger me-3"
                                    data-bs-dismiss="modal" aria-label="Close" onClick={onDeleteDiagnosis}>
                                    Confirm
                                </button>
                                <button className='btn btn-light me-3' data-bs-dismiss="modal"
                                    aria-label="Close">Discard
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*MODAL FOR EDITING DIAGNOSIS */}
            <div className="modal fade" id="kt_modal_edit_diagnosis" tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered mw-900px mh-800px">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-center">
                            <h4 className='fw-bolder'>Edit Diagnosis Form</h4>
                        </div>
                        <Formik
                            enableReinitialize
                            initialValues={editDiagnosisData}
                            validationSchema={registrationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                let tempObj = {
                                    clientID: client.formID,
                                    diagnosticsInfo: values
                                }
                                axios.put("/health/updateDiagnosis", tempObj)
                                    .then(() => {
                                        setDiagnosticsList((prevState) =>
                                            prevState.map((entry) => entry._id === values._id ? values : entry)
                                        )
                                    })
                            }}>
                            {({ isSubmitting, resetForm }) => (
                                <Form className='px-7'>
                                    <div className='my-4'>
                                        <button className="btn btn-primary btn-sm" data-bs-dismiss="modal"
                                            aria-label="Close" onClick={() => resetForm()}>
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-primary btn-sm mx-5" data-bs-dismiss="modal"
                                            aria-label="Close">Save</button>
                                    </div>
                                    <div className="row">
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Diagnosis Code Type</label>
                                            <Field as="select" name="diagnosisCodeType" className='form-select form-select-lg mb-3' aria-label='.form-select-lg example'>
                                                <option hidden>- Select Code Type -</option>
                                                <option value='ICD-9'>ICD-9</option>
                                                <option value='ICD-10'>ICD-10</option>
                                            </Field>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Diagnosis Name</label>
                                            <Field
                                                type='text'
                                                name='diagnosisName'
                                                className='form-control form-control-solid mb-3 mb-lg-0'
                                                placeholder='Diagnosis Code'
                                                autoComplete="off"
                                            ></Field>
                                        </div>
                                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Description</label>
                                            <Field
                                                as='textarea'
                                                name='description'
                                                className='form-control form-control-solid mb-3 mb-lg-0'
                                                autoComplete="off"
                                                rows={4}
                                            ></Field>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Diagnosis Date</label>
                                            <Field
                                                type='date'
                                                name='diagnosisDate'
                                                className='form-control form-control-solid mb-3 mb-lg-0'
                                                autoComplete="off"
                                            ></Field>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Diagnosed By</label>
                                            <Field
                                                type='text'
                                                name='diagnosedBy'
                                                className='form-control form-control-solid mb-3 mb-lg-0'
                                                autoComplete="off"
                                            ></Field>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiagnosticsList