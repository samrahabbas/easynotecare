import React, { useState, useEffect } from 'react'
import { Form, Formik, Field, useField, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import SelectField from '../CustomSelect'

const Status = [
    { label: 'In Prep', value: 'In Prep', },
    { label: 'Approved', value: 'Approved', },
    { label: 'Disconnected', value: 'Disconnected', },
    { label: 'Pending Approval', value: 'Pending Approval', },
    { label: 'Deleted', value: 'Deleted', }
]
const Data = [
    { label: 'Billing Data Input', value: 'Billing Data Input' },
    { label: 'Attendance', value: 'Attendance', },
    { label: 'ISP Data', value: 'ISP Data', },
    { label: 'Case Note', value: 'Case Note', }
]
const validationSchema =
    Yup.object()
        .shape({
            beginServiceDateTo: Yup.date()
                .min(Yup.ref('beginServiceDateFrom'))
                .max(new Date())
                .required(),
            beginServiceDateFrom: Yup.date()
                .min(new Date('01-01-1940'))
                .max(new Date())
                .required(),
            endServiceDateTo: Yup.date()
                .min(Yup.ref('endServiceDateFrom'))
                .max(new Date())
                .required(),
            endServiceDateFrom: Yup.date()
                .min(new Date('01-01-1940'))
                .max(new Date())
                .required(),

        })


const ServiceAuthorizationSearch = () => {
    const initialValues = {
        programSite: '',
        individualSearch: '',
        authorizationID: '',
        authorizationNumber: '',
        fundingSource: '',
        fundingProviderNumber: '',
        firstName: '',
        lastName: '',
        serviceCoordinatorNumber: '',
        serviceCoordinatorAgency: '',
        beginServiceDateFrom: '',
        beginServiceDateTo: '',
        endServiceDateFrom: '',
        endServiceDateTo: '',
        serviceCode: '',
        serviceDescription: '',
        ispProgramName: '',
        ispProgramID: '',
        status: [],
        dataCollection: [],
        insurance: '',
    }
    return (
        <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={
                initialValues
            }
            onSubmit={(values, { isSubmitting }) => {
                console.log(values)
            }}
        >
            {({ isSubmitting, resetForm }) => (
                <Form>
                    <div className='fv-row mb-7 fv-plugins-icon-container p-5 card'>
                        <div className='card-body'>
                            <h1 className='mb-5'>Claim Search</h1>
                            <div className='row'>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Program (Site)</label>
                                    <Field
                                        type='text'
                                        name='programSite'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Program Search'
                                        autoComplete='off'
                                    ></Field>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Individual</label>
                                    <Field type="text"
                                        data-kt-customer-table-filter="search"
                                        name='individualSearch'
                                        className="form-control form-control-solid "
                                        placeholder="Individual Search">
                                    </Field>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Authorization ID</label>
                                    <Field
                                        type='number'
                                        name='authorizationID'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='ID Number'
                                        autoComplete='off'
                                    ></Field>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Authorization Number</label>
                                    <Field
                                        type='number'
                                        name='authorizationNumber'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Authorization Number'
                                        autoComplete='off'
                                    ></Field>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Funding Source</label>
                                    <Field
                                        type="text"
                                        name='fundingSource'
                                        className="form-control form-control-solid "
                                        placeholder="Funding Source">
                                    </Field>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Funding Provider Number</label>
                                    <Field
                                        type='number'
                                        name='fundingProviderNumber'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Funding Provider Number'
                                        autoComplete='off'
                                    ></Field>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Service Coordinator First Name</label>
                                    <Field
                                        type="text"
                                        name='firstName'
                                        className="form-control form-control-solid "
                                        placeholder="First Name">
                                    </Field>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Last Name</label>
                                    <Field
                                        type="text"
                                        name='lastName'
                                        className="form-control form-control-solid "
                                        placeholder="Last Name">
                                    </Field>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Service Coordinator Number</label>
                                    <Field
                                        type='number'
                                        name='serviceCoordinatorNumber'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Service Coordinator Number'
                                        autoComplete='off'
                                    ></Field>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Service Coordinator Agency</label>
                                    <Field
                                        type='text'
                                        name='serviceCoordinatorAgency'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Service Coordinator Agency'
                                        autoComplete='off'
                                    ></Field>
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
                                    <label className='fw-bold fs-6 mb-2'>Service Authorization Begin Date From</label>
                                    <Field
                                        type='date'
                                        name='beginServiceDateFrom'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder=''
                                    ></Field>
                                    <ErrorMessage name='beginServiceDateFrom' component='div' className='text-danger' />

                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
                                    <label className='fw-bold fs-6 mb-2'>To</label>
                                    <Field
                                        type='date'
                                        name='beginServiceDateTo'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder=''
                                    ></Field>
                                    <ErrorMessage name='beginServiceDateTo' component='div' className='text-danger' />

                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
                                    <label className='fw-bold fs-6 mb-2'>Service Authorization End Date From</label>
                                    <Field
                                        type='date'
                                        name='endServiceDateFrom'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder=''
                                    ></Field>
                                    <ErrorMessage name='endServiceDateFrom' component='div' className='text-danger' />

                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
                                    <label className='fw-bold fs-6 mb-2'>To</label>
                                    <Field
                                        type='date'
                                        name='endServiceDateTo'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder=''
                                    ></Field>
                                    <ErrorMessage name='endServiceDateTo' component='div' className='text-danger' />

                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Service Code</label>
                                    <Field
                                        type='number'
                                        name='serviceCode'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Service Code'
                                        autoComplete='off'
                                    ></Field>
                                </div>

                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Service Description</label>
                                    <Field
                                        type='text'
                                        name='serviceDescription'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Service Description'
                                        autoComplete='off'
                                    ></Field>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>ISP Program Name </label>
                                    <Field
                                        type='text'
                                        name='ispProgramName'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='ISP Program Name'
                                        autoComplete='off'
                                    ></Field>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>ISP Program ID</label>
                                    <Field
                                        type='number'
                                        name='ispProgramID'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='ISP Program ID'
                                        autoComplete='off'
                                    ></Field>
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 ' >
                                    <label className='fw-bold fs-6 mb-2' >Select Status</label>
                                    <Field
                                        as='select'
                                        name='status'
                                        autoComplete='off'
                                        options={Status}
                                        component={SelectField}
                                        placeholder='Select Status'
                                    />
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 ' >
                                    <label className='fw-bold fs-6 mb-2' >Method of Data Collection </label>
                                    <Field
                                        as='select'
                                        name='dataCollection'
                                        autoComplete='off'
                                        options={Data}
                                        component={SelectField}
                                        placeholder='Select Status'
                                    />
                                </div>
                                <div className=' mt-4'>
                                    <div className='col-col-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                        <h6>Other Insurance Indicator</h6>
                                    </div>
                                    <div className='d-flex'>
                                        <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20 mt-3'>
                                            Yes
                                            <input
                                                name='insurance'
                                                type='radio'
                                                className='mx-2'
                                                value='yes'
                                            />
                                        </label>
                                        <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20 mt-3'>
                                            No
                                            <input
                                                name='insurance'
                                                type='radio'
                                                className='mx-2'
                                                value='no'
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className='col mt-10'>
                                <div>
                                    <button
                                        // to='/billing/professionalclaim'
                                        className='btn btn-primary btn-sm float-start'
                                    >
                                        Cancel
                                    </button>
                                </div>
                                <div>
                                    <button
                                        className='btn btn-sm btn-success float-end'
                                        type='submit'
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default ServiceAuthorizationSearch