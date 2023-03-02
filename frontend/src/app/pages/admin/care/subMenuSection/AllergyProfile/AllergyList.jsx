import { useState, useEffect, Fragment } from 'react'
import AddAllergyInfo from './AddAllergyInfo'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import AllergyRow from './AllergyRow'
import axios from 'axios'

const registrationSchema = Yup.object().shape({
    allergy: Yup.string()
        .required("Allergy is required"),
    type: Yup.string()
        .required("Type is required")
})

const AllergyList = ({ client }) => {
    const [newForm, setNewForm] = useState(false)
    const [allergyList, setAllergyList] = useState([])
    const [deleteAllergyId, setDeleteAllergyId] = useState('')
    const [editAllergyData, setEditAllergyData] = useState({
        formID: "",
        allergy: "",
        codeType: "",
        code: "",
        allergyState: "",
        description: "",
        type: "",
        severity: "",
        identificationDate: "",
        reaction: "",
        diagnosedBy: ""
    })

    useEffect(() => {
        axios.get("health/get/" + client.formID)
            .then(res => {
                let tempobj = res.data;
                if (tempobj.length > 0) {
                    tempobj = tempobj.filter(item => item.clientID === client.formID)
                    setAllergyList(tempobj[0].allergyInfo)
                }
            })
    }, [newForm])

    const onDeleteAllergy = () => {
        if (deleteAllergyId) {
            let tempobj = {
                clientID: client.formID,
                deleteID: deleteAllergyId
            }
            axios.put("/health/deleteAllergy", tempobj)
                .then(res => {
                    setAllergyList(prevState =>
                        prevState.filter(entry => entry.formID !== deleteAllergyId)
                    )
                    setDeleteAllergyId('')
                })
        }
    }

    return (
        <div>
            {
                newForm ? <AddAllergyInfo setNewForm={setNewForm} client={client} /> :
                    <div>
                        <div className="table-responsive mt-4">
                            <table
                                className='table table-light table-rounded table-striped border border-2 table-hover fs-6 gy-5'
                                id='kt_allergy_table'
                            >
                                <thead>
                                    <tr className='text-start table-dark text-gray-400 table-rounded fw-bolder fs-7 text-uppercase gs-0'>
                                        <th className='px-3 min-w-100px'>
                                            Form ID
                                        </th>
                                        <th className='min-w-150px'>
                                            Allergy
                                        </th>
                                        <th className='min-w-150px'>
                                            Code Type
                                        </th>
                                        <th className='min-w-100px'>
                                            Allergy Status
                                        </th>
                                        <th className='min-w-100px'>
                                            Severity
                                        </th>
                                        <th className='min-w-200px'>
                                            Reaction
                                        </th>
                                        <th className='min-w-150px'>
                                            Identification Date
                                        </th>
                                        <th className='min-w-150px'>
                                            Description
                                        </th>
                                        <th className='min-w-150px'>
                                            Reaction
                                        </th>
                                        <th className='min-w-100px'>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allergyList.length > 0 ? allergyList.map((entry, index) => (
                                            <Fragment key={index}>
                                                <AllergyRow allergy={entry} setEditAllergyData={setEditAllergyData} setDeleteAllergyId={setDeleteAllergyId} />
                                            </Fragment>
                                        ))
                                            :
                                            <tr>
                                                <td align="center" colSpan={12}><span className='text-gray-600 fs-2 fw-bolder'>No Allergy History</span></td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <button className='btn btn-primary btn-sm' onClick={() => setNewForm(true)}>Add Allergy Information</button>
                        </div>
                    </div>
            }
            {/*MODAL FOR DELETING ALLERGY */}
            <div className="modal fade" id="kt_modal_delete_allergy" tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered mw-600px mh-100px">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-center">
                            <h4 className='fw-bolder'>Delete the Allergy</h4>
                        </div>
                        <div className="modal-body scroll-y mx-lg-5">
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-danger me-3"
                                    data-bs-dismiss="modal" aria-label="Close" onClick={onDeleteAllergy}>
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

            {/*MODAL FOR EDITING ALLERGY */}
            <div className="modal fade" id="kt_modal_edit_allergy" tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered mw-900px mh-800px">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-center">
                            <h4 className='fw-bolder'>Edit Allergy Form</h4>
                        </div>
                        <Formik
                            enableReinitialize
                            initialValues={editAllergyData}
                            validationSchema={registrationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                let tempObj = {
                                    clientID: client.formID,
                                    allergyInfo: values
                                }
                                axios.put("/health/updateAllergy", tempObj)
                                    .then(() => {
                                        setAllergyList((prevState) =>
                                            prevState.map((entry) => entry.formID === values.formID ? values : entry)
                                        )
                                    })
                            }}
                        >
                            {({ isSubmitting, resetForm }) => (
                                <Form className='px-7'>
                                    <div className='my-4'>
                                        <button className="btn btn-primary btn-sm" data-bs-dismiss="modal"
                                            aria-label="Close" onClick={() => resetForm()}>
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-primary btn-sm mx-5"
                                            data-bs-dismiss="modal" aria-label="Close"
                                        >Save</button>
                                    </div>
                                    <div className="row">
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Allergy</label>
                                            <Field
                                                type='text'
                                                name='allergy'
                                                className='form-control form-control-solid mb-3 mb-lg-0'
                                                placeholder='Enter your Allergy name'
                                                autoComplete="off"
                                            ></Field>
                                            <ErrorMessage name="allergy" component="div" className='text-danger' />
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Coding System</label>
                                            <Field as="select" name="codeType" className='form-select form-select-lg mb-3' aria-label='.form-select-lg example'>
                                                <option hidden>- Select Code Type -</option>
                                                <option value='ICD-9'>ICD-9</option>
                                                <option value='ICD-10'>ICD-10</option>
                                                {/* <option value='SNOMED'>SNOMED</option> */}
                                            </Field>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Code</label>
                                            <Field
                                                type='text'
                                                name='code'
                                                className='form-control form-control-solid mb-3 mb-lg-0'
                                                placeholder='Enter your code'
                                                autoComplete="off"
                                            ></Field>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Allergy State</label>
                                            <Field as="select" name="allergyState" className='form-select form-select-lg mb-3' aria-label='.form-select-lg example'>
                                                <option hidden>- Select Allergy State -</option>
                                                <option value='Active'>Active</option>
                                                <option value='InActive'>InActive</option>
                                            </Field>
                                        </div>
                                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Description</label>
                                            <Field
                                                as='textarea'
                                                name='description'
                                                className='form-control form-control-solid mb-3 mb-lg-0'
                                                autoComplete="off"
                                            ></Field>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Type</label>
                                            <Field as="select" name="type" className='form-select form-select-lg mb-3' aria-label='.form-select-lg example'>
                                                <option hidden>- Please Select -</option>
                                                <option value="Adverse Allergy">Adverse Allergy</option>
                                                <option value="Animal Allergy">Animal Allergy</option>
                                                <option value="Drug Allergy">Drug Allergy</option>
                                                <option value="Environment Allergy">Environment Allergy</option>
                                                <option value="Food Allergy">Food Allergy</option>
                                                <option value="Miscellaneous Allergy">Miscellaneous Allergy</option>
                                                <option value="Plant Allergy">Plant Allergy</option>
                                                <option value="Pollen Allergy">Pollen Allergy</option>
                                            </Field>
                                            <ErrorMessage name="type" component="div" className='text-danger' />
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Severity</label>
                                            <Field as="select" name="severity" className='form-select form-select-lg mb-3' aria-label='.form-select-lg example'>
                                                <option hidden>- Please Select -</option>
                                                <option value="Severe">Severe</option>
                                                <option value="Moderate">Moderate</option>
                                                <option value="Mild">Mild</option>
                                                <option value="Unknown">Unknown</option>
                                            </Field>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Identification Date</label>
                                            <Field
                                                type='date'
                                                name='identificationDate'
                                                className='form-control form-control-solid mb-3 mb-lg-0'
                                                autoComplete="off"
                                            >
                                            </Field>
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
                                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Reaction</label>
                                            <Field
                                                as='textarea'
                                                name='reaction'
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

export default AllergyList