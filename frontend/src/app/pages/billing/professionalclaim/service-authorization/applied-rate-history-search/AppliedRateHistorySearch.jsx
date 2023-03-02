import React, { useState, useEffect } from 'react'
import { Form, Formik, Field, useField, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import SelectField from '../CustomSelect'

const validationSchema =
    Yup.object()
        .shape({
            updateDateTo: Yup.date()
                .min(Yup.ref('updateDateFrom'))
                .max(new Date())
                .required(),
            updateDateFrom: Yup.date()
                .min(new Date('01-01-1940'))
                .max(new Date())
                .required(),
            ServiceDateTo: Yup.date()
                .min(Yup.ref('ServiceDateFrom'))
                .max(new Date())
                .required(),
            ServiceDateFrom: Yup.date()
                .min(new Date('01-01-1940'))
                .max(new Date())
                .required(),

        })

const options = [
    { label: '(A Supportive Hand) LSD3 ADT - Transportation (Ambulatory) (T2003)', value: '(A Supportive Hand) LSD3 ADT - Transportation (Ambulatory) (T2003)' },
    { label: '(A Supportive Hand) LSD3 ADT - Transportation (Non-Ambulatory) (T2003)', value: '(A Supportive Hand) LSD3 ADT - Transportation (Non-Ambulatory) (T2003)' },
    { label: 'CDC - 	LSD3 ADT - Transportation (Ambulatory) (T2003)', value: 'CDC - 	LSD3 ADT - Transportation (Ambulatory) (T2003)' },
    { label: 'CDC - 	LSD3 ADT - Transportation (Non-Ambulatory) (T2003)', value: 'CDC - 	LSD3 ADT - Transportation (Non-Ambulatory) (T2003)' },
    { label: 'CDC - LSD3 - Supported Employment (T2021)', value: 'CDC - LSD3 - Supported Employment (T2021)' },
    { label: 'CDC - LSD3 ADT - 1:1 (S5102)', value: 'CDC - LSD3 ADT - 1:1 (S5102)' },
    { label: 'CDC - LSD3 ADT - 1:10 (S5102)', value: 'CDC - LSD3 ADT - 1:10 (S5102)' },
    { label: 'CDC - LSD3 ADT - 1:3 (S5102)', value: 'CDC - LSD3 ADT - 1:3 (S5102)' },
    { label: 'CDC - LSD3 ADT - 1:5 (S5102)', value: 'CDC - LSD3 ADT - 1:5 (S5102)' },
    { label: 'CDC - LSD3 ADT - 1:6 (S5102)', value: 'CDC - LSD3 ADT - 1:6 (S5102)' },
    { label: 'CDC - LSD3 ADT - Transportation (Ambulatory) $20 Only (T2003)', value: 'CDC - LSD3 ADT - Transportation (Ambulatory) $20 Only (T2003)' },
    { label: 'GENERAL REVENUE - LSD3 ADT - 1:1 (S5102)', value: 'GENERAL REVENUE - LSD3 ADT - 1:1 (S5102)' },
    { label: 'GENERAL REVENUE - LSD3 ADT - 1:10 (S5102)', value: 'GENERAL REVENUE - LSD3 ADT - 1:10 (S5102)' },
    { label: 'GENERAL REVENUE - LSD3 ADT - 1:3 (S5102)', value: 'GENERAL REVENUE - LSD3 ADT - 1:3 (S5102)' },
    { label: 'GENERAL REVENUE - LSD3 ADT - 1:5 (S5102) ', value: 'GENERAL REVENUE - LSD3 ADT - 1:5 (S5102) ' },
    { label: 'GENERAL REVENUE - LSD3 ADT - 1:6 (S5102) ', value: 'GENERAL REVENUE - LSD3 ADT - 1:6 (S5102) ' },
    { label: 'GENERAL REVENUE - LSD3 ADT - Transportation (Ambulatory) (T2003) ', value: 'GENERAL REVENUE - LSD3 ADT - Transportation (Ambulatory) (T2003) ' },
    { label: 'GENERAL REVENUE - LSD3 ADT - Transportation (Non-Ambulatory) (T2003) ', value: 'GENERAL REVENUE - LSD3 ADT - Transportation (Non-Ambulatory) (T2003) ' },
    { label: 'GENERAL REVENUE - Transportation (Ambulatory) $20 Only (T2003) ', value: 'GENERAL REVENUE - Transportation (Ambulatory) $20 Only (T2003) ' },
    { label: 'LSD3 - Supported Employment (T2021) ', value: 'LSD3 - Supported Employment (T2021) ' },
    { label: 'LSD3 ADT - 1:1 (S5102) ', value: 'LSD3 ADT - 1:1 (S5102) ' },
    { label: 'LSD3 ADT - 1:10 (S5102) ', value: 'LSD3 ADT - 1:10 (S5102) ' },
    { label: 'LSD3 ADT - 1:3 (S5102) ', value: 'LSD3 ADT - 1:3 (S5102)' },
    { label: 'LSD3 ADT - 1:5 (S5102) ', value: 'LSD3 ADT - 1:5 (S5102) ' },
    { label: 'LSD3 ADT - 1:6 (S5102) ', value: 'LSD3 ADT - 1:6 (S5102) ' },
    { label: 'LSD3 ADT - Transportation (Ambulatory) (T2003) ', value: 'LSD3 ADT - Transportation (Ambulatory) (T2003) ' },
    { label: 'LSD3 ADT - Transportation (Ambulatory) $20 Only (T2003) ', value: 'LSD3 ADT - Transportation (Ambulatory) $20 Only (T2003) ' },
    { label: 'LSD3 ADT - Transportation (Non-Ambulatory) (T2003) ', value: 'LSD3 ADT - Transportation (Non-Ambulatory) (T2003) ' },
    { label: 'PRIVATE - 	LSD3 ADT - Transportation (Non-Ambulatory) (T2003) ', value: 'PRIVATE - 	LSD3 ADT - Transportation (Non-Ambulatory) (T2003) ' },
    { label: 'PRIVATE - LSD3 ADT - 1:1 (S5102) ', value: 'PRIVATE - LSD3 ADT - 1:1 (S5102) ' },
    { label: 'PRIVATE - LSD3 ADT - 1:10 (S5102) ', value: 'PRIVATE - LSD3 ADT - 1:10 (S5102) ' },
    { label: 'PRIVATE - LSD3 ADT - 1:3 (S5102) ', value: 'PRIVATE - LSD3 ADT - 1:3 (S5102) ' },
    { label: 'PRIVATE - LSD3 ADT - 1:5 (S5102) ', value: 'PRIVATE - LSD3 ADT - 1:5 (S5102) ' },
    { label: 'PRIVATE - LSD3 ADT - 1:6 (S5102) ', value: 'PRIVATE - LSD3 ADT - 1:6 (S5102) ' },
    { label: 'PRIVATE - LSD3 ADT - ADVANCED (S5102) ', value: 'PRIVATE - LSD3 ADT - ADVANCED (S5102) ' },
    { label: 'PRIVATE - LSD3 ADT - MINIMAL (S5102) ', value: 'PRIVATE - LSD3 ADT - MINIMAL (S5102) ' },
    { label: 'PRIVATE - LSD3 ADT - MODERATE (S5102) ', value: 'PRIVATE - LSD3 ADT - MODERATE (S5102) ' },
    { label: 'PRIVATE - LSD3 ADT - Transportation (Ambulatory) (T2003) ', value: 'PRIVATE - LSD3 ADT - Transportation (Ambulatory) (T2003) ' },
    { label: 'PRIVATE - LSD3 ADT - Transportation (Ambulatory) $20 Only (T2003) ', value: 'PRIVATE - LSD3 ADT - Transportation (Ambulatory) $20 Only (T2003) ' },
    { label: 'Special Enrollment - LSD3 ADT - 1:1 (S5102) ', value: 'Special Enrollment - LSD3 ADT - 1:1 (S5102) ' },
    { label: 'Special Enrollment - LSD3 ADT - 1:10 (S5102) ', value: 'Special Enrollment - LSD3 ADT - 1:10 (S5102) ' },
    { label: 'Special Enrollment - LSD3 ADT - 1:3 (S5102) ', value: 'Special Enrollment - LSD3 ADT - 1:3 (S5102) ' },
    { label: 'Special Enrollment - LSD3 ADT - 1:5 (S5102) ', value: 'Special Enrollment - LSD3 ADT - 1:5 (S5102) ' },
    { label: 'Special Enrollment - LSD3 ADT - 1:6 (S5102) ', value: 'Special Enrollment - LSD3 ADT - 1:6 (S5102) ' },
    { label: 'Summer Enrollment (S5102) ', value: 'Summer Enrollment (S5102) ' },
]

const AppliedRateHistorySearch = () => {
    const initialValues = {
        billingID: '',
        programSite: '',
        updateDateFrom: '',
        updateDateTo: '',
        updatedBy: '',
        serviceDescription: [],
        individualSearch: '',
        authorizationID: '',
        ServiceDateFrom: '',
        ServiceDateTo: '',
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
                            <h1 className='mb-5'>Applied Rate History Search</h1>
                            <div className='row'>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Billing Data ID</label>
                                    <Field
                                        type='number'
                                        name='billingID'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder="Billing Data ID"
                                        autoComplete='off'
                                    ></Field>
                                </div>
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
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 ' >
                                    <label className='fw-bold fs-6 mb-2' >Service Description/Code</label>
                                    <Field
                                        as='select'
                                        name='serviceDescription'
                                        autoComplete='off'
                                        options={options}
                                        component={SelectField}
                                        placeholder='Select Service Description'
                                    />
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
                                    <label className='fw-bold fs-6 mb-2'>Update Date From</label>
                                    <Field
                                        type='date'
                                        name='updateDateFrom'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder=''
                                    ></Field>
                                    <ErrorMessage name='updateDateFrom' component='div' className='text-danger' />

                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
                                    <label className='fw-bold fs-6 mb-2'>To</label>
                                    <Field
                                        type='date'
                                        name='updateDateTo'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder=''
                                    ></Field>
                                    <ErrorMessage name='updateDateTo' component='div' className='text-danger' />
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Updated By</label>
                                    <Field
                                        type="text"
                                        name='updatedBy'
                                        className="form-control form-control-solid "
                                        placeholder="Updated By">
                                    </Field>
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
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
                                    <label className='fw-bold fs-6 mb-2'>Service Date From</label>
                                    <Field
                                        type='date'
                                        name='ServiceDateFrom'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder=''
                                    ></Field>
                                    <ErrorMessage name='ServiceDateFrom' component='div' className='text-danger' />
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
                                    <label className='fw-bold fs-6 mb-2'>To</label>
                                    <Field
                                        type='date'
                                        name='ServiceDateTo'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder=''
                                    ></Field>
                                    <ErrorMessage name='ServiceDateTo' component='div' className='text-danger' />

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

export default AppliedRateHistorySearch