import { useHistory } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup'
import { useState, useEffect } from 'react'
import { randomID } from "../../../../../../_helper/randomID"
import { CurrentDate } from "../../../../../../_helper/currentDate"
import axios from "axios"

const registrationSchema = Yup.object().shape({
    type: Yup.array().min(1).of(Yup.string().required())
        .required("Select at least one type"),
    summary: Yup.string()
        .required("Summary is required")
})

const AddTlogForm = ({ selectedIndividual, setShowNewForm }) => {
    
    useEffect(() => {
        if (!selectedIndividual) {
            setShowNewForm(false)
        }
    }, [])

    return (
        <div>
            <div className='fv-row mb-7 fv-plugins-icon-container p-5 card'>
                <div className='mx-3 card-title'>
                    <div className='d-flex justify-content-between'>
                        <div>
                            <h4>
                                Add New T-Log
                            </h4>
                        </div>
                        <div>
                            <button
                                onClick={() => setShowNewForm(false)}
                                className='btn btn-light btn-active-primary'
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </div>

                <Formik
                    initialValues={{
                        formID: `TLOG-${randomID()}`,
                        type: '',
                        summary: '',
                        description: '',
                        reportedOn: CurrentDate(),
                        intensityLevel: 'Low',
                        clientID: selectedIndividual.formID
                    }}
                    validationSchema={registrationSchema}
                    onSubmit={(values) => {
                        axios.post('tlogs/create', values)
                            .then(res => {
                                console.log(res.data)
                                setShowNewForm(false)
                            })
                            .catch(err => {
                                console.log(err.response.data.message)
                            })
                    }}
                >
                    {({ resetForm }) => (
                        <div className="card-body">
                            <Form className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'>
                                <div className='row'>
                                    <label className='w-50 fs-3 '>Client Name</label>
                                    <label className='fs-6 mb-5 w-50'>{selectedIndividual.firstName} {selectedIndividual.lastName}</label>
                                </div>
                                <div className="row">
                                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                        <div role="group" aria-labelledby="checkbox-group">
                                            <label className='fw-bold fs-6 me-7 mb-2'>
                                                <span style={{ color: "red" }}>* </span> Type:
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
                                                Contacts
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
                                        <ErrorMessage name='type' component='div' className='text-danger' />
                                    </div>

                                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                        <label className="fw-bold fs-6 mb-2">
                                            <span style={{ color: "red" }}>* </span> Summary
                                        </label>
                                        <Field
                                            name="summary"
                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                            autoComplete="off"
                                        />
                                        <ErrorMessage name="summary" component='div' className='text-danger' />
                                    </div>
                                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                        <label className="fw-bold fs-6 mb-2">Description</label>
                                        <Field
                                            as="textarea"
                                            rows={4}
                                            name="description"
                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                        <label className="fw-bold fs-6 mb-2">Reported On</label>
                                        <Field
                                            type="date"
                                            name="reportedOn"
                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                        <label className="fw-bold fs-6 mb-2">Intensity Level</label>
                                        <Field
                                            as="select"
                                            name="intensityLevel"
                                            className='form-select form-select-lg mb-3'
                                            aria-label='.form-select-lg example'
                                        >
                                            {/* <option>- Select Intensity Level -</option> */}
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                        </Field>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <button className="btn btn-sm btn-primary" type="submit">Save</button>
                                    <button className="btn btn-sm btn-primary mx-3" onClick={() => setShowNewForm(false)}>Cancel</button>
                                </div>
                            </Form>
                        </div>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default AddTlogForm