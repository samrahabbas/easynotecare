import React, { useState, useEffect } from 'react'
import { Form, Formik, Field, useField, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import SelectField from '../CustomSelect'
import Select from 'react-select'


const registrationSchema = Yup.object().shape({
    payer: Yup.string()
        .required('Individual Name is required'),
    note: Yup.string()
        .required('Individual Name is required')
        .max(100, 'Maximum 100 letters required'),

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
const templateGroup = [
]

const NewTemplateForm = () => {
    const initialValues = {
        serviceDescription: [],
        group: '',
        tempGroupName: '',
        serviceDateFrom: '',
        serviceDateTo: '',
        claimServiceLine: '',
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
                            <h1 className='mb-5'>Professional Claim Generator</h1>
                            <div className='row'>
                                <div className='col-col-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3 ' >
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
                                <div className=' mt-4'>
                                    <div className='col-col-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                        <h6>Template Group</h6>
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
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 ' >
                                    <label className='fw-bold fs-6 mb-2' >Template Group Name</label>
                                    <Field
                                        as='select'
                                        name='tempGroupName'
                                        autoComplete='off'
                                        options={templateGroup}
                                        component={SelectField}
                                        placeholder='Select Template Group Name'
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
                                <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-0 mt-6'>
                                    <label className='fw-bold fs-6 mb-0'>
                                        Add one Service Line per Claim
                                        <Field
                                            type='checkbox'
                                            name='claimServiceLine'
                                            value='Use Rendering Provider in Service Line'
                                            className='mx-5'
                                        />
                                    </label>
                                </div>

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
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default NewTemplateForm