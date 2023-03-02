import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup'
import SearchData from './SearchData';
import { CurrentDate } from '../../../../../../_helper/currentDate';

const registrationSchema = Yup.object().shape({
    socialSecurityNumber: Yup.number()
        .typeError("Social Securtiy Number cannot have characters"),
    individualIDNumber: Yup.number()
        .typeError("Indvidual ID Number cannot have characters"),
    medicareNumber: Yup.number()
        .typeError("Medicare Number cannot have characters"),
    medicaidNumber: Yup.number()
        .typeError("Medicaid Number cannot have characters")
})

const SearchFields = () => {
    const [showForm, setShowForm] = useState(true)
    const [formData, setFormData] = useState({})
    // let currentDate = new Date().toISOString().slice(0, 10)
    const currentDate = CurrentDate()

    return (
        <div>
            {
                showForm ?
                    <div className='fv-row fv-plugins-icon-container px-5 card'>
                        <div className="card-body">
                            <h1 className='mb-5'>Search Clients Fields</h1>
                            <Formik
                                initialValues={{
                                    firstName: '',
                                    lastName: '',
                                    socialSecurityNumber: '',
                                    medicaidNumber: '',
                                    medicareNumber: '',
                                    formID: '',
                                    programSite: '',
                                    enteredBy: '',
                                    birthDateFrom: '',
                                    birthDateTo: currentDate,
                                    admissionDateFrom: '',
                                    admissionDateTo: currentDate,
                                    status: 'Select Status',
                                }}
                                validationSchema={registrationSchema}
                                onSubmit={(values, { setSubmitting }) => {
                                    let keys = Object.keys(values)
                                    let obj = values
                                    for (let i = 0; i < keys.length; i++) {
                                        if (obj[keys[i]] !== '' || obj[keys[i]] !== 'Select Status'
                                            || obj[keys[i]] !== 'Select Individual ID Type') {
                                            setFormData(obj)
                                            setShowForm(false)
                                        }
                                    }
                                    // obj.firstName = ''
                                    // obj.lastName = ''
                                    // for (let i = 0; i < keys.length; i++) {
                                    //     if (obj[keys[i]] === '' || obj[keys[i]] === 'Select Status'
                                    //         || obj[keys[i]] === 'Select Individual ID Type' || obj[keys[i]] === 'Select Case Status') {
                                    //     } else {
                                    //         if (keys[i] === "individual") {
                                    //             obj[keys[i]] = obj[keys[i]].split(" ")
                                    //             if (obj[keys[i]].length === 1) {
                                    //                 obj.firstName = obj[keys[i]][0]
                                    //                 obj.individual = ''
                                    //                 setFormData(obj)
                                    //                 setShowForm(false)
                                    //             } else if (obj[keys[i]].length === 2) {
                                    //                 obj.firstName = obj[keys[i]][0]
                                    //                 obj.lastName = obj[keys[i]][1]
                                    //                 obj.individual = '[]'
                                    //                 setFormData(obj)
                                    //                 setShowForm(false)
                                    //             } else if (obj[keys[i]].length > 2) {
                                    //                 for (let index = 0; index < obj[keys[i]].length; index++) {
                                    //                     if (index < obj[keys[i]].length - 1) {
                                    //                         obj.firstName = obj.firstName + obj[keys[i]][index] + " "
                                    //                     } else {
                                    //                         obj.lastName = obj[keys[i]][index]
                                    //                     }
                                    //                 }
                                    //                 obj.firstName = obj.firstName.trim()
                                    //                 obj.individual = ''
                                    //                 setFormData(obj)
                                    //                 setShowForm(false)
                                    //             }
                                    //         } else {
                                    //             setFormData(obj)
                                    //             setShowForm(false)
                                    //         }
                                    //     }
                                    // }
                                }}>
                                {({ isSubmitting, resetForm, values }) => (
                                    <Form className='row'>
                                        <div className='col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 my-3'>
                                            <label className='fw-bold fs-6 mb-2'>First Name</label>
                                            <Field
                                                name="firstName"
                                                className='form-control form-control-solid mb-3 mb-lg-0'
                                                placeholder='Enter First Name'
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className='col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 my-3'>
                                            <label className='fw-bold fs-6 mb-2'>Last Name</label>
                                            <Field
                                                name="lastName"
                                                className='form-control form-control-solid mb-3 mb-lg-0'
                                                placeholder='Enter Last Name'
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className='col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 my-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Form ID</label>
                                            <Field
                                                name="formID"
                                                className='form-control form-control-solid mb-3 mb-lg-0'
                                                placeholder='Enter Form ID'
                                                autoComplete="off" />
                                        </div>
                                        <div className='col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 my-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Social Security Number</label>
                                            <Field
                                                name="socialSecurityNumber"
                                                className='form-control form-control-solid mb-3 mb-lg-0'
                                                placeholder='Enter Social Security Number'
                                                autoComplete="off"
                                            />
                                            <ErrorMessage name="socialSecurityNumber" component="div"
                                                className='text-danger' />
                                        </div>
                                        {/* <div className='col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 my-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Individual ID Number</label>
                                            <Field
                                                name="individualIDNumber"
                                                className='form-control form-control-solid mb-3 mb-lg-0'
                                                placeholder='Enter Individual ID Number'
                                                autoComplete="off"
                                            />
                                            <ErrorMessage name="individualIDNumber" component="div"
                                                className='text-danger' />
                                        </div> */}
                                        <div className='col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 my-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Medicaid Number</label>
                                            <Field
                                                name="medicaidNumber"
                                                className='form-control form-control-solid mb-3 mb-lg-0'
                                                placeholder='Enter Medicaid Number'
                                                autoComplete="off"
                                            />
                                            <ErrorMessage name="medicaidNumber" component="div"
                                                className='text-danger' />
                                        </div>
                                        <div className='col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 my-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Medicare Number</label>
                                            <Field
                                                name="medicareNumber"
                                                className='form-control form-control-solid mb-3 mb-lg-0'
                                                placeholder='Enter Medicare Number'
                                                autoComplete="off"
                                            />
                                            <ErrorMessage name="medicareNumber" component="div"
                                                className='text-danger' />
                                        </div>
                                        <div className='col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 my-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Entered By</label>
                                            <Field
                                                name="enteredBy"
                                                className='form-control form-control-solid mb-3 mb-lg-0'
                                                placeholder='Enter Entered By'
                                                autoComplete="off"
                                            />
                                        </div>
                                        {/* <div className='col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 my-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Program Site</label>
                                            <Field
                                                name="programSite"
                                                className='form-control form-control-solid mb-3 mb-lg-0'
                                                placeholder='Enter Program Site By'
                                                autoComplete="off"
                                            />
                                        </div> */}
                                        {/* <div className='col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 my-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Individual ID Type</label>
                                            <Field
                                                name="individualIDType"
                                                className='form-control form-control-solid mb-3 mb-lg-0'
                                                placeholder='Enter Individual ID Type'
                                                autoComplete="off"
                                            />
                                        </div> */}
                                        <div className='col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 my-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Status</label>
                                            <Field
                                                as="select"
                                                name="status"
                                                className='form-select form-select-lg mb-3'
                                                aria-label='.form-select-lg example'>
                                                <option hidden>Select Status</option>
                                                <option value='Admitted'>Admitted</option>
                                                <option value='Pending Admission'>Pending Admission</option>
                                                <option value='Discharged'>Discharged</option>
                                                <option value='Deceased'>Deceased</option>
                                                <option value='Deleted'>Deleted</option>
                                            </Field>
                                        </div>
                                        {/* <div className='col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 my-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Case Status</label>
                                            <Field
                                                as="select"
                                                name="caseStatus"
                                                className='form-select form-select-lg mb-3'
                                                aria-label='.form-select-lg example'>
                                                <option hidden>Select Case Status</option>
                                                <option value='Active'>Active</option>
                                                <option value='Application Withdrawn'>Application Withdrawn</option>
                                                <option value='Awaiting Discharge'>Awaiting Discharge</option>
                                                <option value='Closed - Deceased'>Closed - Deceased</option>
                                                <option value='Closed - Individual Choice'>Closed - Individual Choice</option>
                                                <option value='Closed - Moved Out of State'>Closed - Moved Out of State</option>
                                                <option value='Closed - No Response'>Closed - No Response</option>
                                                <option value='DD Eligible/Waiver Ineligible'>DD Eligible/Waiver Ineligible</option>
                                                <option value='Home Health Only'>Home Health Only</option>
                                                <option value='Inactive'>Inactive</option>
                                                <option value='Leave of Absence'>Leave of Absence</option>
                                                <option value='Long Term Hospitalization'>Long Term Hospitalization</option>
                                                <option value='Not Eligible'>Not Eligible</option>
                                                <option value='PASRR'>PASRR</option>
                                            </Field>
                                        </div> */}
                                        <div className='col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 my-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Birth Date From</label>
                                            <Field
                                                type="date"
                                                name="birthDateFrom"
                                                className='form-control form-control-solid mb-3 mb-lg-0'
                                                aria-label='.form-select-lg example' />
                                        </div>
                                        <div className='col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 my-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Birth Date to</label>
                                            <Field
                                                type="date"
                                                name="birthDateTo"
                                                className='form-control form-control-solid mb-3 mb-lg-0'
                                                aria-label='.form-select-lg example' />
                                        </div>
                                        <div className='col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 my-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Admission Date from</label>
                                            <Field
                                                type="date"
                                                name="admissionDateFrom"
                                                className='form-control form-control-solid mb-3 mb-lg-0'
                                                aria-label='.form-select-lg example' />
                                        </div>
                                        <div className='col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 my-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Admission Date to</label>
                                            <Field
                                                type="date"
                                                name="admissionDateTo"
                                                className='form-control form-control-solid mb-3 mb-lg-0'
                                                aria-label='.form-select-lg example' />
                                        </div>
                                        <div className="d-flex justify-content-start">
                                            {/* 
                                                <p className='text-primary fw-bold fs-6 mb-2'
                                                    style={{"cursor": "pointer"}}
                                                    onClick={() => {
                                                        resetForm()
                                                    }}><u>Clear Selection</u>
                                                </p> 
                                            */}
                                        </div>
                                        <div className='d-flex justify-content-center'>
                                            <div>
                                                <button className='btn btn-primary me-4' onClick={() => {
                                                    resetForm()
                                                }}>Reset</button>
                                            </div>
                                            <div>
                                                <button type="submit" className='btn btn-primary'>Search</button>
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>

                        </div>
                    </div>
                    :
                    <SearchData formData={formData} setShowForm={setShowForm} />
            }

        </div>
    )
}

export default SearchFields