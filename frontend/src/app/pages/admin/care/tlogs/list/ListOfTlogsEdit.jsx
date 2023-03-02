import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup'
import axios from 'axios'

const registrationSchema = Yup.object().shape({
    type: Yup.array().min(1).of(Yup.string().required())
        .required("Select at least one type"),
    summary: Yup.string()
        .required("Summary is required")
})

const ListOfTlogsEdit = ({ selectedLog, setShowForm }) => {
    const [tlogData, setTlogData] = useState(selectedLog)
    const [showEditForm, setShowEditForm] = useState(true)

    return (
        <div className='p-5'>
            <div className='mx-3 card-title'>
                <div className='d-flex justify-content-between'>
                    <div>
                        <h1>
                            Edit T-Log
                        </h1>
                    </div>
                </div>
            </div>
            {
                showEditForm ?
                    <div className="card-body">
                        <div className="row">
                            <div className='d-flex justify-content-end'>
                                <button
                                    onClick={() => setShowForm(false)}
                                    className='btn btn-light btn-active-primary mx-3'
                                >
                                    Back
                                </button>
                                <button
                                    onClick={() => setShowEditForm(false)}
                                    className='btn btn-light btn-active-primary'
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                <label className="fw-bold fs-6 mb-2 me-7">Client Name:</label>
                                <label className="fs-6">{tlogData.clientName}</label>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                <label className="fw-bold fs-6 mb-2 me-7">Intensity Level:</label>
                                <label className="fs-6">{tlogData.intensityLevel}</label>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                <label className="fw-bold fs-6 mb-2 me-7">Type:</label>
                                <label className="fs-6">{tlogData.type.map(type => type + ", ")}</label>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                <label className="fw-bold fs-6 mb-2 me-7">Reported On:</label>
                                <label className="fs-6">{tlogData.reportedOn}</label>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                <label className="fw-bold fs-6 mb-2 me-7">Summary:</label>
                                <label className="fs-6">{tlogData.summary}</label>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                <label className="fw-bold fs-6 mb-2 me-7">Description:</label>
                                <label className="fs-6">{tlogData.description}</label>
                            </div>
                        </div>
                    </div>
                    :
                    <Formik
                        initialValues={tlogData}
                        validationSchema={registrationSchema}
                        onSubmit={(values) => {
                            // console.log(values)
                            axios.put('/tlogs/update', values)
                                .then(res => {
                                    setShowForm(false)
                                })
                        }}
                    >
                        {({ resetForm }) => (
                            <div className="card-body">
                                <Form className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'>
                                    <div className='row'>
                                        <label className='w-50 fs-3 '>Client Name</label>
                                        <label className='fs-6 mb-5 w-50'>{tlogData.clientName}</label>
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
                                                <option>- Select Intensity Level -</option>
                                                <option value="Low">Low</option>
                                                <option value="Medium">Medium</option>
                                                <option value="High">High</option>
                                            </Field>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <button className="btn btn-sm btn-primary" type="submit">Save</button>
                                        <button className="btn btn-sm btn-primary mx-3" onClick={() => resetForm()}>Cancel</button>
                                    </div>
                                </Form>
                            </div>
                        )}
                    </Formik>
            }
        </div>
    )
}

export default ListOfTlogsEdit