import React from 'react'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const registrationSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('First Name is required'),
    lastName: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Last Name is required'),
    serviceDateTo: Yup.date()
        .min(Yup.ref('serviceDateFrom')),
    serviceDateFrom: Yup.date()
        .min(new Date('01-01-1940')),
    queuedDateTo: Yup.date()
        .min(Yup.ref('queuedDateFrom')),
    queuedDateFrom: Yup.date()
        .min(new Date('01-01-1940')),
})
const DeniedClaim = () => {



    return (
        <Formik
            validationSchema={registrationSchema}
            initialValues={
                {
                    firstName: '',
                    lastName: '',
                    billingProvider: '',
                    medicaidProviderNumber: '',
                    NPINumber: '',
                    serviceDateFrom: '',
                    serviceDateTo: '',
                    queuedDateFrom: '',
                    queuedDateTo: '',
                }
            }
            onSubmit={(values, { isSubmitting }) => {
                console.log(values)
            }}
        >

            {({ isSubmitting, resetForm }) => (
                <Form>
                    <div className='fv-row mb-7 fv-plugins-icon-container p-5 card'>
                        <div className='card-body'>

                            <h1 className='mb-5'>Denied Claim Report</h1>
                            <div className="mt-3 alert alert-success">
                                Note: This report only contains denied claims that were submitted electronically.
                            </div>
                            <h4 className='mb-1 text-primary'>Client Name</h4>
                            <div className='row'>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>First Name</label>
                                    <Field
                                        type='text'
                                        name='firstName'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='First Name'
                                        autoComplete='off'
                                        required
                                    ></Field>
                                    <ErrorMessage name='firstName' component='div' className='text-danger' />
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Last Name</label>
                                    <Field
                                        type='text'
                                        name='lastName'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Last Name'
                                        autoComplete='off'
                                    ></Field>
                                    <ErrorMessage name='lastName' component='div' className='text-danger' />
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Billing Provider</label>
                                    <Field
                                        type='text'
                                        name='billingProvider'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Billing Provider'
                                        autoComplete='off'
                                    ></Field>
                                    <ErrorMessage name='billingProvider' component='div' className='text-danger' />
                                </div>

                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Billing Provider NPI Number</label>
                                    <Field
                                        type='text'
                                        name='NPINumber'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Billing Provider NPI Number'
                                        autoComplete='off'
                                    ></Field>
                                    <ErrorMessage name='NPINumber' component='div' className='text-danger' />
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
                                    <label className='fw-bold fs-6 mb-2'>Service Date From</label>
                                    <Field
                                        type='date'
                                        name='serviceDateFrom'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Service Date From'
                                    ></Field>
                                </div>
                                <ErrorMessage name='serviceDateFrom' component='div' className='text-danger' />

                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
                                    <label className='fw-bold fs-6 mb-2'>Service Date To</label>
                                    <Field
                                        type='date'
                                        name='serviceDateTo'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Service Date To'
                                    ></Field>
                                    <ErrorMessage name='serviceDateTo' component='div' className='text-danger' />

                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
                                    <label className='fw-bold fs-6 mb-2'>Queued Date From</label>
                                    <Field
                                        type='date'
                                        name='queuedDateFrom'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Queued Date From'
                                    ></Field>
                                    <ErrorMessage name='queuedDateFrom' component='div' className='text-danger' />
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
                                    <label className='fw-bold fs-6 mb-2'>Queued Date To</label>
                                    <Field
                                        type='date'
                                        name='queuedDateTo'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Queued Date To'
                                    ></Field>
                                    <ErrorMessage name='queuedDateTo' component='div' className='text-danger' />
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Medicaid Provider Number</label>
                                    <Field
                                        type='text'
                                        name='medicaidProviderNumber'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Medicaid Provider Number'
                                        autoComplete='off'
                                    ></Field>
                                    <ErrorMessage name='medicaidProviderNumber' component='div' className='text-danger' />
                                </div>
                            </div>
                            <div className='d-flex justify-content-start pb-6 mt-6'>
                                <div className='mx-3'>
                                    <button
                                        // to='/billing/professionalclaim'
                                        className='btn btn-primary btn-sm'
                                    >
                                        Back
                                    </button></div>
                                <div>
                                    <button
                                        className='btn btn-sm btn-success '
                                        type='submit'
                                    >Generate Excel Report</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </Form>
            )}

        </Formik >
    )
}

export default DeniedClaim