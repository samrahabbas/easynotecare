import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { Form, Formik, Field, useField, ErrorMessage, FieldArray } from 'formik'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { randomID } from '../../../../../../_helper/randomID'
import { useHistory } from 'react-router-dom'
const selectAuth = (state) => state.auth;


const registrationSchema = Yup.object().shape({
    comment: Yup.string()
        .max(3000, 'Maximum 3000 letters required'),

})

function New() {
    const auth = useSelector(selectAuth);
    const companyid = auth.user?.company_code
    console.log(companyid)
    const [formField, setFormField] = useState([
        {
            scoreLabel1: '',
            scoreLabel2: '',
            scoreLabel3: ''
        }
    ])

    const initialValues = {
        formID: "OMT-" + randomID(),
        outcomeMeasureType: "",
        description: "",
        comment: "",
        taskDomain: [],
        scoreLabel: [],
        company_code: companyid,

    }



    const handleFormChange = (e, index) => {
        let data = [...formField]
        data[index][e.target.name] = e.target.value
        setFormField(data)
    }

    const handleFormSubmit = (e, index) => {
        e.preventDefault()
        console.log(formField)
    }
    const addFields = (e) => {
        e.preventDefault()
        let object = {
            scoreLabel: ''
        }
        setFormField([...formField, object])
    }
    const handleRemove = (index) => {
        let data = [...formField]
        data.splice(index, 1)
        setFormField(data)
    }
    const history = useHistory()

    return (
        <Formik
            validationSchema={registrationSchema}
            enableReinitialize
            initialValues={
                initialValues
            }
            onSubmit={(values, { isSubmitting }) => {
                console.log(values)
                // axios.post("/ddo/create")
                //     .then(res => {
                //         history.push("/datadrivenoutcome/outcome-measure-types/list")
                //     })
            }}
        >
            {(formik) => (
                <>
                    <Form>
                        <div className='fv-row mb-7 fv-plugins-icon-container p-5 card'>
                            <div className='card-body'>
                                <h1 className='mb-5'>Outcome Measure Details</h1>
                                <div className='row'>
                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                        <label className=' fw-bold fs-6 mb-2'>OutCome Measure Type</label>
                                        <Field
                                            type='test'
                                            name='outcomeMeasureType'
                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                            placeholder='OutCome Measure Type'
                                            autoComplete='off'
                                        ></Field>
                                    </div>
                                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                        <label className='fw-bold fs-6 mb-2'>Description</label>
                                        <Field
                                            as='textarea'
                                            name='description'
                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                            placeholder='Description'
                                            autoComplete='off'
                                        ></Field>
                                    </div>
                                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                        <label className=' fw-bold fs-6 mb-2'>Comment / Instruction</label>
                                        <Field
                                            as="textarea"
                                            name='comment'
                                            rows="5"
                                            className="form-control form-control-solid "
                                            placeholder="Comment here...">
                                        </Field>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='fv-row mb-7 fv-plugins-icon-container p-5 card'>
                            <div className='card-body'>
                                <h1 className='mb-5'>Task Domains</h1>
                                <div className="row">
                                    <div className='col-col-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3 ' >
                                        <label className=' fw-bold fs-6 mb-2'>Number of Task Domains</label>
                                        <div className="col-col-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3 ">
                                            <FieldArray
                                                name='taskDomain'
                                                render={(arrayHelpers) => {
                                                    return (
                                                        <>
                                                            <div>
                                                                {
                                                                    formik.values.taskDomain.map((domain, index) => (
                                                                        <>
                                                                            <div key={index}>

                                                                                <label className=' fw-bold fs-6 mb-2' htmlFor={`taskDomain.${index + 1}.Domain`}>{`task Domains ${index + 1}`}</label>
                                                                                <Field
                                                                                    className='form-control form-control-solid mb-3 mb-lg-0'
                                                                                    name={`taskDomain.${index}.Domain`}
                                                                                    id={`taskDomain.${index}`}
                                                                                    placeholder='Task Domain...'
                                                                                    type='text'

                                                                                />
                                                                                <div className="form-group float-end ">
                                                                                    <button type='button' className='btn btn-danger' onClick={() => arrayHelpers.remove(index)} >Remove</button>
                                                                                </div>
                                                                            </div>
                                                                            <br />
                                                                            <br />
                                                                            <br />
                                                                        </>
                                                                    ))
                                                                }
                                                                <div className="form-group float-end">
                                                                    <button type='button' className='btn btn-success' onClick={() => arrayHelpers.insert(formik.values.taskDomain.length + 1, {})} >Add Task Domain</button>
                                                                </div>
                                                            </div>

                                                        </>
                                                    )
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='fv-row mb-7 fv-plugins-icon-container p-5 card'>
                            <div className='card-body'>
                                <h1 className='mb-5'>Score Labels</h1>
                                <label className=' fw-bold fs-6 mb-2'>Number of Score Labels</label>
                                <div className="col-col-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3 ">
                                            <FieldArray
                                                name='scoreLabel'
                                                render={(arrayHelpers) => {
                                                    return (
                                                        <>
                                                            <div>
                                                                {
                                                                    formik.values.scoreLabel.map((domain, index) => (
                                                                        <>
                                                                            <div key={index}>

                                                                                <label className=' fw-bold fs-6 mb-2' htmlFor={`scoreLabel.${index + 1}.Score`}>{`Score Label ${index + 1}`}</label>
                                                                                <Field
                                                                                    className='form-control form-control-solid mb-3 mb-lg-0'
                                                                                    name={`scoreLabel.${index}.Score`}
                                                                                    id={`scoreLabel.${index}`}
                                                                                    placeholder='Score Label...'
                                                                                    type='text'

                                                                                />
                                                                                <div className="form-group float-end ">
                                                                                    <button type='button' className='btn btn-danger' onClick={() => arrayHelpers.remove(index)} >Remove</button>
                                                                                </div>
                                                                            </div>
                                                                            <br />
                                                                            <br />
                                                                            <br />
                                                                        </>
                                                                    ))
                                                                }
                                                                <div className="form-group float-end">
                                                                    <button type='button' className='btn btn-success' onClick={() => arrayHelpers.insert(formik.values.scoreLabel.length + 1, {})} >Add Score Label</button>
                                                                </div>
                                                            </div>

                                                        </>
                                                    )
                                                }}
                                            />
                                        </div>

                                <div className='card-body mt-12 stickhyHeaderTable table-responsive' style={{ padding: "0rem 2.25rem" }}>

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
                                    Submit
                                </button>
                            </div>
                        </div>
                    </Form>
                </>

            )}
        </Formik>
    )
}

export default New