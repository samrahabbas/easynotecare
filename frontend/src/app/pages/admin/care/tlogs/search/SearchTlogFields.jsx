import { Formik, Form, Field, ErrorMessage } from "formik"
import { useState } from 'react'
import * as Yup from 'yup'
import { CurrentDate } from "../../../../../../_helper/currentDate"
import SearchTlogTable from "./SearchTlogTable"

const registrationSchema = Yup.object().shape({
    // reportDateTo: Yup.date()
    //     .min(Yup.ref('reportDateFrom'), ("Report Date To must be greater than Report Date From")),
    // reportDateFrom: Yup.date()
    //     .min(new Date('01-01-1940'))
})

const SearchTlogFields = () => {
    const [showForm, setShowForm] = useState(true)
    const [formData, setFormData] = useState({})

    return (
        <div>
            {
                showForm ?
                    <div className='fv-row fv-plugins-icon-container px-5 card'>
                        <div className="card-body mb-5">
                            <h1 className='mb-5'>Search T-Logs</h1>
                            <Formik
                                validationSchema={registrationSchema}
                                initialValues={{
                                    clientName: '',
                                    formID: '',
                                    reportDateFrom: '',
                                    reportDateTo: CurrentDate(),
                                    intensityLevel: '',
                                    type: '',
                                    summary: '',
                                    description: ''
                                }}
                                onSubmit={(values) => {
                                    let tempValues = values
                                    // if (tempValues.type !== "") {
                                    //     tempValues.type = tempValues.type.reduce((a, b) => a + ', ' + b)
                                    // }
                                    setFormData(tempValues)
                                    setShowForm(false)
                                    // console.log(values)
                                }}>
                                {({ resetForm }) => (
                                    <Form className="row">
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Form ID</label>
                                            <Field
                                                name="formID"
                                                className='form-control form-control-solid mb-3 mb-lg-0'
                                                placeholder='Enter Form ID'
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Client Name</label>
                                            <Field
                                                name="clientName"
                                                className='form-control form-control-solid mb-3 mb-lg-0'
                                                placeholder='Enter Client Name'
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Report Date From</label>
                                            <Field
                                                name="reportDateFrom"
                                                type="date"
                                                className='form-control form-control-solid mb-3 mb-lg-0'
                                            />
                                            <ErrorMessage name='reportDateFrom' component='div' className='text-danger' />
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Report Date To</label>
                                            <Field
                                                name="reportDateTo"
                                                type="date"
                                                className='form-control form-control-solid mb-3 mb-lg-0'
                                            />
                                            <ErrorMessage name='reportDateTo' component='div' className='text-danger' />
                                        </div>
                                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                            <div role="group" aria-labelledby="checkbox-group">
                                                <label className='fw-bold fs-6 me-7 mb-2'>
                                                    Intensity Level
                                                </label>
                                                <label className="fs-6 mb-2 mx-3">
                                                    <Field
                                                        type='checkbox'
                                                        name='intensityLevel'
                                                        value='Low'
                                                    />
                                                    <span className="mx-2">
                                                        Low
                                                    </span>
                                                </label>
                                                <label className="fs-6 mb-2 mx-3">
                                                    <Field
                                                        type='checkbox'
                                                        name='intensityLevel'
                                                        value='Medium'
                                                    />
                                                    <span className="mx-2">
                                                        Medium
                                                    </span>
                                                </label>
                                                <label className="fs-6 mb-2 mx-3">
                                                    <Field
                                                        type='checkbox'
                                                        name='intensityLevel'
                                                        value='High'
                                                    />
                                                    <span className="mx-2">
                                                        High
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                            <div role="group" aria-labelledby="checkbox-group">
                                                <label className='fw-bold fs-6 me-7 mb-2'>
                                                    Type:
                                                </label>
                                                <label className="fs-6 mb-2 mx-3">
                                                    <Field
                                                        type='checkbox'
                                                        name='type'
                                                        value='Health'
                                                    />
                                                    <span className="mx-2">
                                                        Health
                                                    </span>
                                                </label>
                                                <label className="fs-6 mb-2 mx-3">
                                                    <Field
                                                        type='checkbox'
                                                        name='type'
                                                        value='Notes'
                                                    />
                                                    <span className="mx-2">
                                                        Notes
                                                    </span>
                                                </label>
                                                <label className="fs-6 mb-2 mx-3">
                                                    <Field
                                                        type='checkbox'
                                                        name='type'
                                                        value='Follow-Up'
                                                    />
                                                    <span className="mx-2">
                                                        Follow-Up
                                                    </span>
                                                </label>
                                                <label className="fs-6 mb-2 mx-3">
                                                    <Field
                                                        type='checkbox'
                                                        name='type'
                                                        value='Behavior'
                                                    />
                                                    <span className="mx-2">
                                                        Behavior
                                                    </span>
                                                </label>
                                                <label className="fs-6 mb-2 mx-3">
                                                    <Field
                                                        type='checkbox'
                                                        name='type'
                                                        value='Contacts'
                                                    />
                                                    <span className="mx-2">
                                                        Contacts
                                                    </span>
                                                </label>
                                                <label className="fs-6 mb-2 mx-3">
                                                    <Field
                                                        type='checkbox'
                                                        name='type'
                                                        value='General'
                                                    />
                                                    <span className="mx-2">
                                                        General
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className="fw-bold fs-6 mb-2">
                                                Summary
                                            </label>
                                            <Field
                                                name="summary"
                                                className='form-control form-control-solid mb-3 mb-lg-0'
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className="fw-bold fs-6 mb-2">
                                                Description
                                            </label>
                                            <Field
                                                name="description"
                                                as="textarea"
                                                className='form-control form-control-solid mb-3 mb-lg-0'
                                                autoComplete="off"
                                                rows={4}
                                            />
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <button className="btn btn-sm btn-primary me-4" onClick={() => {
                                                resetForm()
                                            }}>
                                                Reset
                                            </button>
                                            <button className="btn btn-sm btn-primary" type="submit">
                                                Search
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                    : <SearchTlogTable formData={formData} setShowForm={setShowForm} />
            }
        </div>
    )
}

export default SearchTlogFields