import React from 'react'
import { Form, Formik, Field, useField, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import SelectField from './CustomSelect'


const registrationSchema = Yup.object().shape({
    clientSearch: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('First Name is required'),
    programSite: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Last Name is required'),
    serviceDateTo: Yup.date()
        .min(Yup.ref('serviceDateFrom')),
    serviceDateFrom: Yup.date()
        .min(new Date('01-01-1940')),
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
const Cost = []

const Utilization = () => {


    const initialValues = {
        duration: '',
        clientSearch: '',
        programSite: '',
        serviceDescription: [],
        cost: [],
        serviceDateFrom: '',
        serviceDateTo: '',

    }

    return (
        <Formik
            validationSchema={registrationSchema}
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
                            <h1 className='mb-5'>Agency Based Utilization Report</h1>
                            <div className="mt-3 alert alert-success">
                                Please select any of the following fields - Individual, Program (Site),
                                Service Description/Code or Cost Center.
                            </div>
                            <div className='row'>
                                <div className=' mt-4'>
                                    <div className='col-col-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                        <h6>Duration</h6>
                                    </div>
                                    <div className='mb-6'>
                                        <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20 mt-3'>
                                            Monthly
                                            <Field
                                                name='duration'
                                                value='monthly'
                                                type='radio'
                                                className='mx-2'
                                            />
                                        </label>
                                        <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20 mt-3'>
                                            Date Range
                                            <Field
                                                name='duration'
                                                type='radio'
                                                value='dateRange'
                                                className='mx-2'
                                            />
                                        </label>
                                        <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20 mt-3'>
                                            Weekly
                                            <Field
                                                name='duration'
                                                type='radio'
                                                value='Weekly'
                                                className='mx-2'
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Client</label>
                                    <Field type="text"
                                        data-kt-customer-table-filter="search"
                                        name='clientSearch'
                                        className="form-control form-control-solid "
                                        placeholder="Individual Search">
                                    </Field>
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
                                    {/* <ErrorMessage name='program' component='div' className='text-danger' /> */}
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
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 ' >
                                    <label className='fw-bold fs-6 mb-2' >Cost Center</label>
                                    <Field
                                        as='select'
                                        name='cost'
                                        autoComplete='off'
                                        options={Cost}
                                        component={SelectField}
                                        placeholder='Select Cost Center'
                                    />
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
                                    <label className='fw-bold fs-6 mb-2'>Service Date From</label>
                                    <Field
                                        type='date'
                                        name='serviceDateFrom'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder=''
                                    ></Field>
                                    <ErrorMessage name='serviceDateFrom' component='div' className='text-danger' />
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
                                    <label className='fw-bold fs-6 mb-2'>Service Date To</label>
                                    <Field
                                        type='date'
                                        name='serviceDateTo'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder=''
                                    ></Field>
                                    <ErrorMessage name='serviceDateTo' component='div' className='text-danger' />
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

export default Utilization