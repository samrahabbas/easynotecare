import React from 'react'
import { Form, Formik, Field, useField, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import SelectField from './CustomSelect'


const registrationSchema = Yup.object().shape({
    clientSearch: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('First Name is required'),
    claimID: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Last Name is required'),
    ClaimDateTo: Yup.date()
        .min(Yup.ref('ClaimDateFrom')),
    ClaimDateFrom: Yup.date()
        .min(new Date('01-01-1940')),
    serviceDateTo: Yup.date()
        .min(Yup.ref('serviceDateFrom')),
    serviceDateFrom: Yup.date()
        .min(new Date('01-01-1940')),
    submissionFailedDateTo: Yup.date()
        .min(Yup.ref('submissionFailedDateFrom')),
    submissionFailedDateFrom: Yup.date()
        .min(new Date('01-01-1940')),
})


const Status = [
    { label: 'Billable', value: 'Billable', },
    { label: 'Queued', value: 'Queued', },
    { label: 'Sent', value: 'Sent', },
    { label: 'Pending', value: 'Pending', },
    { label: 'Denied', value: 'Denied', },
    { label: 'Paid', value: 'Paid', },
    { label: 'Paid Adjusted', value: 'Paid Adjusted', },
    { label: 'Voided', value: 'Voided', },
    { label: 'Rejected', value: 'Rejected', },
    { label: 'Deleted', value: 'Deleted', }
]
const Payer = [
    { label: 'FL MMIS: Florida Medicaid - 77027 (Prof.)', value: 'FL MMIS: Florida Medicaid - 77027 (Prof.)' },
    { label: 'THERAP-MANUAL: Manual Billing - 99 (Prof. & Inst.)', value: 'THERAP-MANUAL: Manual Billing - 99 (Prof. & Inst.)' },
]

const SubmissionErrors = () => {

    const initialValues = {
        claimID: '',
        clientSearch: '',
        payer: [],
        serviceDateFrom: '',
        serviceDateTo: '',
        ClaimDateFrom: '',
        ClaimDateTo: '',
        submissionFailedDateFrom: '',
        submissionFailedDateTo: '',
        status: []
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
                            <h1 className='mb-5'>Professional Claim Submission Error Search</h1>
                            <div className='row'>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Claim ID</label>
                                    <Field
                                        type='number'
                                        name='claimID'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='ID Number'
                                        autoComplete='off'
                                    ></Field>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Client</label>
                                    <Field type="text"
                                        data-kt-customer-table-filter="search"
                                        name=' clientSearch'
                                        className="form-control form-control-solid "
                                        placeholder="Individual Search">
                                    </Field>
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 ' >
                                    <label className='fw-bold fs-6 mb-2' >Payer</label>
                                    <Field
                                        as='select'
                                        name='payer'
                                        autoComplete='off'
                                        options={Payer}
                                        component={SelectField}
                                        placeholder='Select Payer'
                                    />
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 ' >
                                    <label className='fw-bold fs-6 mb-2' >Current Claim Status</label>
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
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
                                    <label className='fw-bold fs-6 mb-2'>Claim Create Date From</label>
                                    <Field
                                        type='date'
                                        name='ClaimDateFrom'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder=''
                                    ></Field>
                                    <ErrorMessage name='ClaimDateFrom' component='div' className='text-danger' />
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
                                    <label className='fw-bold fs-6 mb-2'>Claim Create Date To</label>
                                    <Field
                                        type='date'
                                        name='ClaimDateTo'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder=''
                                    ></Field>
                                    <ErrorMessage name='ClaimDateTo' component='div' className='text-danger' />
                                </div>

                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
                                    <label className='fw-bold fs-6 mb-2'>Submission Failed Date From</label>
                                    <Field
                                        type='date'
                                        name='submissionFailedDateFrom'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder=''
                                    ></Field>
                                    <ErrorMessage name='submissionFailedDateFrom' component='div' className='text-danger' />
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
                                    <label className='fw-bold fs-6 mb-2'>Submission Failed Date To</label>
                                    <Field
                                        type='date'
                                        name='submissionFailedDateTo'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder=''
                                    ></Field>
                                    <ErrorMessage name='submissionFailedDateTo' component='div' className='text-danger' />
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

export default SubmissionErrors