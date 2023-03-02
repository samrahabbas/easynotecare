import React from 'react'
import { Form, Formik, Field, useField, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import SelectField from './CustomSelect'

const registrationSchema = Yup.object().shape({
    clientSearch: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('First Name is required'),
    transactionID: Yup.string()
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

const Payer = [
    { label: 'FL MMIS: Florida Medicaid - 77027 (Prof.)', value: 'FL MMIS: Florida Medicaid - 77027 (Prof.)' },
    { label: 'THERAP-MANUAL: Manual Billing - 99 (Prof. & Inst.)', value: 'THERAP-MANUAL: Manual Billing - 99 (Prof. & Inst.)' },
]

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

const options = [
    { label: 'Medicaid Provider Number', value: 'Medicaid Provider Number' },
    { label: 'Program Cost Center Number', value: 'Program Cost Center Number' },
    { label: 'Program Name', value: 'Program Name' },
    { label: 'Service Date From', value: 'Service Date From' },
    { label: 'Service Date to', value: 'Service Date to' },
    { label: 'Total Amount', value: 'Total Amount' },
    { label: 'Site Name', value: 'Site Name' },
    { label: 'Site Cost Center Name', value: 'Site Cost Center Name' },
    { label: 'Status', value: 'Status' },
    { label: 'Individual', value: 'Individual' },
    { label: 'Individual ID', value: 'Individual ID' },
    { label: 'Additional ID Number', value: 'Additional ID Number' },
    { label: 'Individual Medicaid Number', value: 'Individual Medicaid Number' },
    { label: 'Service Code', value: 'Service Code' },
    { label: 'Service Description', value: 'Service Description' },
    { label: 'Funding Source', value: 'Funding Source' },
    { label: 'Funding Source Vendor ID', value: 'Funding Source Vendor ID' },
    { label: 'Billing Provider NPI Name', value: 'Billing Provider NPI Name' },
    { label: 'Billing Provider', value: 'Billing Provider' },
    { label: 'Authorization Number', value: 'Authorization Number' },
    { label: 'Procedure Modifier', value: 'Procedure Modifier' },
    { label: 'Description/Code Account Number', value: 'Description/Code Account Number' },
    { label: 'Claim Create Date', value: 'Claim Create Date' },
    { label: 'Unit Rate ($)', value: 'Unit Rate ($)' },
    { label: 'Units', value: 'Units' },
    { label: 'Claim ID', value: 'Claim ID' },
    { label: 'Transaction ID', value: 'Transaction ID' },
    { label: 'Claim Tracking ID', value: 'Claim Tracking ID' },
    { label: 'Place of  Service', value: 'Place of  Service' },
    { label: 'Rendering Provider', value: 'Rendering Provider' },
    { label: 'Rendering Provider Medicaid No', value: 'Rendering Provider Medicaid No' },
    { label: 'Rendering Provider NPI No', value: 'Rendering Provider NPI No' },
    { label: 'Referring Provider', value: 'Referring Provider' },
    { label: 'Referring Provider Medicaid No', value: 'Referring Provider Medicaid No' },
    { label: 'Referring Provider NPI No', value: 'Referring Provider NPI No' },
    { label: 'TCN/ICN #', value: 'TCN/ICN #' },
    { label: 'Payer', value: 'Payer' },
    { label: 'Status', value: 'Status' },
    { label: 'Sent Date', value: 'Sent Date' },
    { label: 'Check / EFT Issue Date', value: 'Check / EFT Issue Date' },
    { label: 'Check / EFT Number', value: 'Check / EFT Number' },
    { label: 'Claim Total Amount', value: 'Claim Total Amount' },
    { label: 'Patients Responsibility Amount ($)', value: 'Patients Responsibility Amount ($)' },
    { label: 'Claim Paid Amount ($)', value: 'Claim Paid Amount ($)' },
    { label: 'Player Charged Amount ($)', value: 'Player Charged Amount ($)' },
    { label: 'Player Paid  Amount ($)', value: 'Player Paid Amount ($)' },
    { label: 'Claim Frequency Type Code', value: 'Claim Frequency Type Code' },
    { label: 'Original TCN/ICN Number', value: 'Original TCN/ICN Number' }
]



const Reconciliation = () => {

    const initialValues = {
        clientSearch: '',
        serviceDescription: '',
        serviceCode: '',
        serviceDateFrom: '',
        serviceDateTo: '',
        ClaimDateFrom: '',
        ClaimDateTo: '',
        claimID: '',
        transactionID: '',
        claimTrackingID: '',
        billingProviderName: '',
        medicaidProviderNo: '',
        NPINumber: '',
        TCN_ICN: '',
        EFTNumber: '',
        payer: [],
        program: [],
        programCCNumber: '',
        individualMedNumber: '',
        fundingSource: '',
        sentDateFrom: '',
        sentDateTo: '',
        agingDate: '',
        billingProvider: '',
        queuedDateFrom: '',
        queuedDateTo: '',
        SubmittedClaim: '',
        status: [],
        EFTIssueDateFrom: '',
        EFTIssueDateTo: '',
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
                            <h1 className='mb-5'>Billing Reconciliation Report (Service Level)</h1>
                            <div className="mt-3 alert alert-success">
                                Either a Date Range or a full Form ID is required
                            </div>
                            <div className='row'>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Client</label>
                                    <Field type="text"
                                        data-kt-customer-table-filter="search"
                                        name=' clientSearch'
                                        className="form-control form-control-solid "
                                        placeholder="Individual Search">
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
                                <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Service Description</label>
                                    <Field
                                        as='textarea'
                                        name='serviceDescription'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Service Description'
                                        autoComplete='off'
                                    ></Field>
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
                                    <ErrorMessage name='claimDateFrom' component='div' className='text-danger' />
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
                                    <label className='fw-bold fs-6 mb-2'>Claim Create Date To</label>
                                    <Field
                                        type='date'
                                        name='ClaimDateTo'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder=''
                                    ></Field>
                                    <ErrorMessage name='claimDateTo' component='div' className='text-danger' />
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Claim ID</label>
                                    <Field
                                        type='number'
                                        name='claimID'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Service Code'
                                        autoComplete='off'
                                    ></Field>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Transaction ID</label>
                                    <Field
                                        type='number'
                                        name='transactionID'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Service Code'
                                        autoComplete='off'
                                    ></Field>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Claim Tracking ID</label>
                                    <Field
                                        type='number'
                                        name='claimTrackingID'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Service Code'
                                        autoComplete='off'
                                    ></Field>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Billing Provider Name</label>
                                    <Field
                                        type='text'
                                        name='billingProviderName'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Billing Provider Organization Name'
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
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>TCN/ICN #</label>
                                    <Field
                                        type='number'
                                        name='TCN_ICN'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Service Code'
                                        autoComplete='off'
                                    ></Field>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Check / EFT Number</label>
                                    <Field
                                        type='number'
                                        name='EFTNumber'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Service Code'
                                        autoComplete='off'
                                    ></Field>
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 ' >
                                    <label className='fw-bold fs-6 mb-2' >Select Payer</label>
                                    <Field
                                        as='select'
                                        name='payer'
                                        autoComplete='off'
                                        options={Payer}
                                        component={SelectField}
                                        placeholder='Select Payer'
                                    />
                                </div>
                                <div className=' mt-4'>
                                    <div className='col-col-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                        <h6>Latest Submitted Claims Only</h6>
                                    </div>
                                    <div className='d-flex'>
                                        <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20 mt-3'>
                                            Yes
                                            <input
                                                name='SubmittedClaim'
                                                type='radio'
                                                className='mx-2'
                                            />
                                        </label>
                                        <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20 mt-3'>
                                            No
                                            <input
                                                name='SubmittedClaim'
                                                type='radio'
                                                className='mx-2'
                                            />
                                        </label>
                                    </div>
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
                                    <label className='fw-bold fs-6 mb-2'>Check / EFT Issue Date From</label>
                                    <Field
                                        type='date'
                                        name='EFTIssueDateFrom'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder=''
                                    ></Field>
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
                                    <label className='fw-bold fs-6 mb-2'>Check / EFT Issue Date To</label>
                                    <Field
                                        type='date'
                                        name='EFTIssueDateTo'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder=''
                                    ></Field>
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

export default Reconciliation 