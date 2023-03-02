import { useHistory } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import { CurrentDate } from '../../../../../../_helper/currentDate'
import { randomID } from '../../../../../../_helper/randomID'
import { useSelector } from 'react-redux'
const selectAuth = (state) => state.auth

/**
 * Validator for adding contacts
 */
const registrationSchema = Yup.object().shape({
    programName: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Program Name is required'),
    programType: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Program Type is required'),
    siteName: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Site Name is required'),
    siteAddress: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(200, 'Maximum 200 symbols')
        .required('Site Address is required'),
})

const NewProgram = () => {
    const history = useHistory()
    const auth = useSelector(selectAuth)
    const companyid = auth.user?.company_code
    
    return (
        <div>
            <div className='fv-row mb-7 fv-plugins-icon-container p-5 card'>
                <div className='card-title'>
                    <div className='row d-flex mt-6'>
                        <h1 className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 mb-3 mx-8'>
                            Add New Program
                        </h1>
                        <div className='col'>
                            <Link
                                to={'/care/enrollment/by-program'}
                                className='btn btn-light btn-active-primary float-end'
                            >
                                Back
                            </Link>
                        </div>
                    </div>
                </div>
                <Formik
                    enableReinitialize
                    initialValues={{
                        company_code: companyid,
                        programName: '',
                        programType: '',
                        programCostCenterNumber: '',
                        siteAddress: '',
                        siteName: '',
                        individualsAdded: [],
                        createDate: CurrentDate(),
                        formID: "PROGRAM-" + randomID(),
                    }}
                    validationSchema={registrationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        axios.post('/programs/create', values)
                            .then(res => {
                                setSubmitting(false)
                                history.push('/care/enrollment/by-program')
                            })
                    }}
                >
                    {({ isSubmitting, resetForm }) => (
                        <div className='card-body'>
                            <Form className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'>
                                <div className="row">
                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                        <label className='fw-bold fs-6 mb-2'>Program Name</label>
                                        <Field
                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                            type='text'
                                            name='programName'
                                            autoComplete='off'
                                        />
                                        <ErrorMessage name='programName' component='div' className='text-danger' />
                                    </div>
                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                        <label className='fw-bold fs-6 mb-2'>Site Name</label>
                                        <Field
                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                            type='text'
                                            name='siteName'
                                            autoComplete='off'
                                        />
                                        <ErrorMessage name='siteName' component='div' className='text-danger' />
                                    </div>

                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                        <label className='fw-bold fs-6 mb-2'>Program Type</label>
                                        <Field
                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                            type='text'
                                            name='programType'
                                            autoComplete='off'
                                        />{' '}
                                        <ErrorMessage name='programType' component='div' className='text-danger' />
                                    </div>
                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                        <label className='fw-bold fs-6 mb-2'>Program Cost Center Number</label>
                                        <Field
                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                            type='number'
                                            name='programCostCenterNumber'
                                            autoComplete='off'
                                        />
                                        <ErrorMessage
                                            name='programCostCenterNumber'
                                            component='div'
                                            className='text-danger'
                                        />
                                    </div>
                                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                        <label className='fw-bold fs-6 mb-2'>Site Address</label>
                                        <Field
                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                            as='textarea'
                                            rows={5}
                                            name='siteAddress'
                                            autoComplete='off'
                                        />
                                        <ErrorMessage name='siteAddress' component='div' className='text-danger' />
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center mt-2'>
                                    <button
                                        type='submit'
                                        className='btn btn-primary btn-active-secondary mx-2'
                                        disabled={isSubmitting}
                                    >
                                        Add Program
                                    </button>
                                    <button
                                        type='reset'
                                        className='btn btn-primary btn-active-secondary'
                                        onClick={() => resetForm()}
                                    >
                                        Reset
                                    </button>
                                </div>
                            </Form>
                        </div>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default NewProgram
