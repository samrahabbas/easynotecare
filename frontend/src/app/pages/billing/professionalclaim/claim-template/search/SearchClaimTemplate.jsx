import React from 'react'
import { Form, Formik, Field, useField, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import SelectField from '../CustomSelect'

// const registrationSchema = Yup.object().shape({
//     individualSarch: Yup.string()
//         .required('First Name is required'),
// })


const SearchClaimTemplate = () => {

    const initialValues = {
        individualSearch: '',
        serviceDescription: '',
        serviceCode: '',
        templateID: '',
        tempGroupName: '',
        individualMedicaidNumber: '',
        billingNPINumber: '',
        providerOrganizationName: '',
        firstName: '',
        lastName: '',
        medicaidProviderNumber: '',
        status: '',

    }

    return (
        <Formik
            // validationSchema={registrationSchema}

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
                            <h1 className='mb-5'>Professional Claim Template Search</h1>
                            <div className='row'>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Template ID</label>
                                    <Field
                                        type='number'
                                        name='templateID'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Template ID'
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
                                    <label className=' fw-bold fs-6 mb-2'>Template Group Name</label>
                                    <Field type="text"
                                        data-kt-customer-table-filter="search"
                                        name='tempGroupName'
                                        className="form-control form-control-solid "
                                        placeholder="Template Group Name">
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
                                    <label className=' fw-bold fs-6 mb-2'>Billing Provider NPI Number</label>
                                    <Field
                                        type='number'
                                        name='billingNPINumber'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Billing Provider NPI Number'
                                        autoComplete='off'
                                    ></Field>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Billing Provider Organization Name</label>
                                    <Field
                                        type="text"
                                        name='providerOrganizationName'
                                        className="form-control form-control-solid "
                                        placeholder="Billing Provider Organization Name">
                                    </Field>
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
                                <div className=' mt-4'>
                                    <div className='col-col-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                        <h6>Active</h6>
                                    </div>
                                    <div className='mb-6'>
                                        <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20 mt-3'>
                                            Yes
                                            <Field
                                                name='status'
                                                value='Yes'
                                                type='radio'
                                                className='mx-2'
                                            />
                                        </label>
                                        <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20 mt-3'>
                                            No
                                            <Field
                                                name='status'
                                                type='radio'
                                                value='No'
                                                className='mx-2'
                                            />
                                        </label>
                                    </div>
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

export default SearchClaimTemplate