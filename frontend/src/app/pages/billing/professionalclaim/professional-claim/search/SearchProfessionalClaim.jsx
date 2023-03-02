import React, { useState, useEffect } from 'react'
import { Form, Formik, Field, useField, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import SelectField from '../CustomSelect'
import Select from 'react-select'

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
const FrequencyTypeOptions = [
    { label: '1-Original (Admit thru Discharge Claim)', value: '1-Original (Admit thru Discharge Claim)' },
    { label: '2-Interim - First Claim', value: '2-Interim - First Claim' },
    { label: '3-Interim - Continuing Claim', value: '3-Interim - Continuing Claim' },
    { label: '4-Interim - Last Claim', value: '4-Interim - Last Claim' },
    { label: '6-Corrected (Adjustment of Prior Claim)', value: '6-Corrected (Adjustment of Prior Claim)' },
    { label: '7-Replacement (Replacement of Prior Claim)', value: '7-Replacement (Replacement of Prior Claim)' },
    { label: '8-Void (Void/Cancel of Prior Claim)', value: '8-Void (Void/Cancel of Prior Claim)' },

]

const SearchProfessionalClaim = () => {
    const initialValues = {
        individualSearch: '',
        enteredBy: '',
        individualMedicaidNumber: '',
        authorizationID: '',
        fundingSource: '',
        serviceDescription: '',
        billingData: '',
        claimID: '',
        NPINumber: '',
        billingProviderName: '',
        billingProviderOrganization: '',
        firstName: '',
        lastName: '',
        medicaidProviderNumber: '',
        serviceDateFrom: '',
        serviceDateTo: '',
        ClaimDateFrom: '',
        ClaimDateTo: '',
        payer: [],
        status: [],
        claimFrequencyTypeCode: [],
        group: '',
    }
    return (
        <Formik
            // validationSchema={registrationSchema}
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
                                    <label className=' fw-bold fs-6 mb-2'>Individual</label>
                                    <Field type="text"
                                        data-kt-customer-table-filter="search"
                                        name='individualSearch'
                                        className="form-control form-control-solid "
                                        placeholder="Individual Search">
                                    </Field>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Entered By</label>
                                    <Field
                                        type="text"
                                        name='enteredBy'
                                        className="form-control form-control-solid "
                                        placeholder="Entered By">
                                    </Field>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Individual Medicaid Number</label>
                                    <Field
                                        type='number'
                                        name='individualMedicaidNumber'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Individual Medicaid Number'
                                        autoComplete='off'
                                    ></Field>
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
                                    <label className=' fw-bold fs-6 mb-2'>Funding Source</label>
                                    <Field
                                        type="text"
                                        name='fundingSource'
                                        className="form-control form-control-solid "
                                        placeholder="Funding Source">
                                    </Field>
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
                                    <label className=' fw-bold fs-6 mb-2'>Billing Date ID</label>
                                    <Field
                                        type='number'
                                        name='billingData'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Billing Data ID'
                                        autoComplete='off'
                                    ></Field>
                                </div>
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
                                    <label className=' fw-bold fs-6 mb-2'>Billing Provider Orgianization Name</label>
                                    <Field
                                        type='text'
                                        name='billingProviderOrganization'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Billing Provider Organization Name'
                                        autoComplete='off'
                                    ></Field>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>First Name</label>
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
                                    <label className=' fw-bold fs-6 mb-2'>Medicaid Provider Number</label>
                                    <Field
                                        type='number'
                                        name='medicaidProviderNumber'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Medicaid Provider Number'
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
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
                                    <label className='fw-bold fs-6 mb-2'>Service Date To</label>
                                    <Field
                                        type='date'
                                        name='serviceDateTo'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder=''
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
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
                                    <label className='fw-bold fs-6 mb-2'>Claim Create Date To</label>
                                    <Field
                                        type='date'
                                        name='ClaimDateTo'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder=''
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
                                    <label className='fw-bold fs-6 mb-2' >Claim Frequency Type Code</label>
                                    <Field
                                        as='select'
                                        name='claimFrequencyTypeCode'
                                        autoComplete='off'
                                        options={FrequencyTypeOptions}
                                        component={SelectField}
                                        placeholder='Select Claim Frequency Type Code'
                                    />
                                </div>
                                <div className='mb-6 '>
                                    <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20 mt-3'>
                                        Yes
                                        <Field
                                            name='group'
                                            value='Yes'
                                            type='radio'
                                            className='mx-2'
                                        />
                                    </label>
                                    <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20 mt-3'>
                                        No
                                        <Field
                                            name='group'
                                            type='radio'
                                            value='No'
                                            className='mx-2'
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className='col mt-6'>
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

export default SearchProfessionalClaim