import { Field, Form, Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { randomID } from '../../../../../../_helper/randomID'
import axios from 'axios'

//Add last updated functionality with created by etc

const registrationSchema = Yup.object().shape({
    allergy: Yup.string()
        .required("Allergy is required"),
    type: Yup.string()
        .required("Type is required")
})

const AddAllergyInfo = ({ setNewForm, client }) => {
    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{
                    formID: "ALLERGY-" + randomID(),
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
                }}
                validationSchema={registrationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    let tempObj = {
                        clientID: client.formID,
                        allergyInfo: values
                    }
                    axios.put("/health/addAllergy", tempObj)
                        .then(() => {
                            setNewForm(false)
                        })
                }}
            >
                {({ isSubmitting, resetForm }) => (
                    <Form>
                        <div className='my-4'>
                            <button className="btn btn-primary btn-sm" onClick={() => {
                                resetForm()
                                setNewForm(false)
                            }}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary btn-sm mx-5">Add</button>
                        </div>
                        <div className="row">
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                <span className='text-danger'>*</span><label className=' fw-bold fs-6 mb-2'>Allergy</label>
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
                                <span className='text-danger'>*</span><label className=' fw-bold fs-6 mb-2'>Type</label>
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
                                <label className=' fw-bold fs-6 mb-2'>Allergy State</label>
                                <Field as="select" name="allergyState" className='form-select form-select-lg mb-3' aria-label='.form-select-lg example'>
                                    <option hidden>- Select Allergy State -</option>
                                    <option value='Active'>Active</option>
                                    <option value='InActive'>InActive</option>
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
    )
}

export default AddAllergyInfo