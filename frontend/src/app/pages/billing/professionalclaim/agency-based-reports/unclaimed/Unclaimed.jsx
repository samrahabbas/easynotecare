import React from 'react'
import { Form, Formik, Field, useField, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const Unclaimed = () => {

  const initialValues = {
    serviceDateFrom: '',
    serviceDateTo: '',
  }
  return (
    <Formik
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
              <h1 className='mb-5'>Unclaimed Report</h1>
              <div className='row'>
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

export default Unclaimed