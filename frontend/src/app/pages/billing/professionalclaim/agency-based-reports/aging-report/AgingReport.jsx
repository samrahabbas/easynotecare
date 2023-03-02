import React from 'react'
import { Form, Formik, Field, useField, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import SelectField from './CustomSelect'


const registrationSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('First Name is required'),
    lastName: Yup.string()
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
    queuedDateTo: Yup.date()
        .min(Yup.ref('queuedDateFrom')),
    queuedDateFrom: Yup.date()
        .min(new Date('01-01-1940')),
    sentDateTo: Yup.date()
        .min(Yup.ref('sentDateFrom')),
    sentDateFrom: Yup.date()
        .min(new Date('01-01-1940')),
})


const options = [
    { label: 'Medicaid Provider Number', value: 'Medicaid Provider Number' },
    { label: 'Program Cost Center Number', value: 'Program Cost Center Number' },
    { label: 'Service Date From', value: 'Service Date From' },
    { label: 'Service Date to', value: 'Service Date to' },
    { label: 'Total Amount', value: 'Total Amount' },
    { label: 'Paid Amount ($)', value: 'Paid Amount ($)' },
    { label: 'AR Balance', value: 'AR Balance' },
    { label: 'Claim Status', value: 'Claim Status' },
    { label: 'Individual', value: 'Individual' },
    { label: 'Individual Medicaid Number', value: 'Individual Medicaid Number' },
    { label: 'Service Code', value: 'Service Code' },
    { label: 'Service Description', value: 'Service Description' },
    { label: 'Funding Source Name', value: 'Funding Source Name' },
    { label: 'Billing Provider NPI Name', value: 'Billing Provider NPI Name' },
    { label: 'Billing Provider', value: 'Billing Provider' }
]



const AgingReport = () => {

    const initialValues = {
        firstName: '',
        programSite: '',
        lastName: '',
        program: [],
        programCCNumber: '',
        individualSearch: '',
        individualMedNumber: '',
        fundingSource: '',
        serviceCode: '',
        serviceDescription: '',
        billingProviderOrg: '',
        medicaidProviderNo: '',
        ClaimDateFrom: '',
        ClaimDateTo: '',
        sentDateFrom: '',
        sentDateTo: '',
        agingDate: '',
        billingProvider: '',
        NPINumber: '',
        serviceDateFrom: '',
        serviceDateTo: '',
        queuedDateFrom: '',
        queuedDateTo: ''
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
                            <h1 className='mb-5'>Professional Claim Aging Report Search</h1>
                            <div className="mt-3 alert alert-success">
                                Please select exactly one of the following date range -
                                Claim Create Date, Queued Date, Sent Date, Service Date.
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
                                    {/* <ErrorMessage name='program' component='div' className='text-danger' /> */}
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Program Cost Center Number</label>
                                    <Field
                                        type='number'
                                        name='programCCNumber'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Program Cost Center Number'
                                        autoComplete='off'
                                    ></Field>
                                    {/* <ErrorMessage name='programCCNumber' component='div' className='text-danger' /> */}
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Client</label>
                                    <Field type="text"
                                        data-kt-customer-table-filter="search"
                                        name='individualSearch'
                                        className="form-control form-control-solid "
                                        placeholder="Individual Search">
                                    </Field>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Individual Medicaid Number</label>
                                    <Field
                                        type='number'
                                        name='individualMedNumber'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='individual Medicaid Number'
                                        autoComplete='off'
                                    ></Field>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Funding Source</label>
                                    <Field
                                        type='text'
                                        name='fundingSource'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Funding Source'
                                        autoComplete='off'
                                    ></Field>
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
                                        type='textarea'
                                        length='12'
                                        name='serviceDescription'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Service Description'
                                        autoComplete='off'
                                    ></Field>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Billing Provider Organization Name</label>
                                    <Field
                                        type='text'
                                        name='billingProviderOrg'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Billing Provider Organization Name'
                                        autoComplete='off'
                                    ></Field>
                                </div><div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>First Name</label>
                                    <Field
                                        type='text'
                                        name='firstName'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='First Name'
                                        autoComplete='off'
                                    ></Field>
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
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Medicaid Provider Number</label>
                                    <Field
                                        type='number'
                                        name='medicaidProviderNo'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Service Code'
                                        autoComplete='off'
                                    ></Field>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Billing Provider NPI Number</label>
                                    <Field
                                        type='number'
                                        name='NPINumber'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Service Code'
                                        autoComplete='off'
                                    ></Field>
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
                                    <label className='fw-bold fs-6 mb-2'>Claim Create Date From</label>
                                    <Field
                                        type='date'
                                        name='ClaimDateFrom'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Service Date From'
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
                                    <label className='fw-bold fs-6 mb-2'>Queued Date From</label>
                                    <Field
                                        type='date'
                                        name='queuedDateFrom'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder=''
                                    ></Field>
                                    <ErrorMessage name='queuedDateFrom' component='div' className='text-danger' />
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
                                    <label className='fw-bold fs-6 mb-2'>Queued Date To</label>
                                    <Field
                                        type='date'
                                        name='queuedDateTo'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder=''
                                    ></Field>
                                    <ErrorMessage name='queuedDateTo' component='div' className='text-danger' />
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
                                    <label className='fw-bold fs-6 mb-2'>Sent Date From</label>
                                    <Field
                                        type='date'
                                        name='sentDateFrom'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder=''
                                    ></Field>
                                    <ErrorMessage name='sentDateFrom' component='div' className='text-danger' />
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
                                    <label className='fw-bold fs-6 mb-2'>Sent Date To</label>
                                    <Field
                                        type='date'
                                        name='sentDateTo'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder=''
                                    ></Field>
                                    <ErrorMessage name='sentDateTo' component='div' className='text-danger' />
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
                                    <label className='fw-bold fs-6 mb-2'>Service Date From</label>
                                    <Field
                                        type='date'
                                        name='serviceDateFrom'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder=''
                                    ></Field>
                                </div>
                                <ErrorMessage name='serviceDateFrom' component='div' className='text-danger' />
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
                                    <label className='fw-bold fs-6 mb-2'>Aging Date</label>
                                    <Field
                                        type='date'
                                        name='agingDate'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder=''
                                    ></Field>
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 ' >
                                    <label className='fw-bold fs-6 mb-2' >Select Programs</label>
                                    <Field
                                        as='select'
                                        name='program'
                                        autoComplete='off'
                                        options={options}
                                        component={SelectField}
                                        placeholder='Select program '
                                    />


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
                                        className='btn btn-sm btn-success '
                                        type='submit'
                                    >Search
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

export default AgingReport