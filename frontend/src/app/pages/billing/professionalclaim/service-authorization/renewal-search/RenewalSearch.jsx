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


const validationSchema =
    Yup.object()
        .shape({
            beginServiceDateTo: Yup.date()
                .min(Yup.ref('beginServiceDateFrom')),
            beginServiceDateFrom: Yup.date()
                .min(new Date('01-01-1940')),
            endServiceDateTo: Yup.date()
                .min(Yup.ref('endServiceDateFrom')),
            endServiceDateFrom: Yup.date()
                .min(new Date('01-01-1940')),

        })

const RenewalSearch = () => {
    const initialValues = {
        programSite: '',
        individualSearch: '',
        fundingSource: '',
        serviceCode: '',
        serviceDescription: '',
        status: [],
        statusSecond: [],
        endServiceDateFrom: '',
        endServiceDateTo: '',
        beginServiceDateFrom: '',
        beginServiceDateTo: '',
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
                            <div className="mt-3 alert alert-success">
                                The search result will show Service Authorizations ending within the first date range but was not renewed within the second date range.
                                A Service Authorization is considered renewed if it ends within the first date range and a new Service Authorization for
                                the same individual and Program is created having the same Funding Source, Service Description Code and Procedure Modifiers
                                and starts within the second date range.
                            </div>
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
                                    <label className=' fw-bold fs-6 mb-2'>Funding Source</label>
                                    <Field
                                        type="text"
                                        name='fundingSource'
                                        className="form-control form-control-solid "
                                        placeholder="Funding Source">
                                    </Field>
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
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 ' >
                                    <label className='fw-bold fs-6 mb-2' >Status (First Range)</label>
                                    <Field
                                        as='select'
                                        name='status'
                                        autoComplete='off'
                                        options={Status}
                                        component={SelectField}
                                        placeholder='Select Status'
                                    />
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
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 ' >
                                    <label className='fw-bold fs-6 mb-2' >Status (Second Range)</label>
                                    <Field
                                        as='select'
                                        name='statusSecond'
                                        autoComplete='off'
                                        options={Status}
                                        component={SelectField}
                                        placeholder='Select Status'
                                    />
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
                            </div>
                            <div className='d-flex justify-content-start pb-6 mt-6'>
                                <div className='mx-3'>
                                    <button
                                        // to='/billing/professionalclaim'
                                        className='btn btn-primary btn-sm'
                                    >
                                        Cancel
                                    </button>
                                </div>
                                <div>
                                    <button
                                        className='btn btn-sm btn-success'
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

export default RenewalSearch