import React from 'react'
import { Form, Formik, Field, useField, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import SelectField from '../CustomSelect'

const registrationSchema = Yup.object().shape({
  programSite: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Last Name is required'),
})

const options = [
  { label: 'Medicaid Provider Number', value: 'Medicaid Provider Number' },
  { label: 'Program Cost Center Number', value: 'Program Cost Center Number' },]

const ISPBillingUnitCalculation = () => {

  const initialValues = {
    serviceDescription: [],
    programSite: '',
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
              <h1 className='mb-5'>ISP Billing Search</h1>
              <div className="mt-3 alert alert-success">
                You have agency wide ISP Billing Conversion Role
              </div>
              <div className='row'>
                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 ' >
                  <label className='fw-bold fs-6 mb-2' >Service Description (Code)</label>
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
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                  <label className=' fw-bold fs-6 mb-2'>Program (Site)</label>
                  <Field
                    type='text'
                    name='programSite'
                    className='form-control form-control-solid mb-3 mb-lg-0'
                    placeholder='Program Search'
                    autoComplete='off'

                  ></Field>
                  <ErrorMessage name='programSite' component='div' className='text-danger' />
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

export default ISPBillingUnitCalculation












