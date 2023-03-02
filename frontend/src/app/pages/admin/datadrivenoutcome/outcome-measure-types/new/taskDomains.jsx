import React from 'react'
import { Form, Formik, Field, useField, ErrorMessage, FieldArray } from 'formik'

const taskDomains = () => {
    const initialValues = {
        taskDomain: []
    }

    return (
        <div>
            <Formik
                initialValues={
                    initialValues
                }
                onSubmit={(values, { isSubmitting }) => {
                    console.log(values)
                }}
            >
                {(formik) => (
                    <Form>
                        <div className="col-col-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3 ">
                            <FieldArray
                                name='taskDomain'
                                render={(arrayHelpers) => {
                                    return (
                                        <div>
                                            {
                                                formik.values.taskDomain.map((domain, index) => (

                                                    <div className="mt-2 " key={index}>

                                                        <label className=' fw-bold fs-6 mb-2' htmlFor={`Task Domains ${index}.Domain`}>{`Task Domains ${index+1}`}</label>
                                                        <Field
                                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                                            name={`Task Domain ${index}.Domain`}
                                                            id={`Task Domain ${index}`}
                                                            placeholder='Task Domain...'
                                                            type='text'
                                                        />
                                                    </div>


                                                ))
                                            }
                                            <div className="form-group float-end mt-2">
                                                <button type='button' className='btn btn-success' onClick={() => arrayHelpers.insert(formik.values.taskDomain.length + 1, {})} >Add Task Domain</button>
                                            </div>
                                        </div>
                                    )
                                }}
                            />
                        </div>

                    </Form>
                )}
            </Formik>

        </div>
    )
}

export default taskDomains