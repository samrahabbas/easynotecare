/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link, useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import { toAbsoluteUrl } from '../../../../_metronic/helpers'
import { useUser } from '../../../../_helper/userHooks/userHook'
import axios from 'axios'
import { storeTokenInLocalStorage } from '../../../../_helper/userHooks/common'
// import {useDispatch} from 'react-redux'
// import * as auth from '../redux/AuthRedux'
// import {login} from '../redux/AuthCRUD'

const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Wrong email format')
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Email is required'),
    password: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Password is required'),
})

const initialValues = {
    email: 'syed@test.com',
    password: 'Dark!321',
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/
export function Login() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    
    const formik = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: (values, { setStatus, setSubmitting }) => {
            setLoading(true)
            const config = {
                header: {
                    "Content-Type": "application/json"
                }
            }
            axios.post("/users/login", values, config)
                .then((res) => {
                    if (!res?.data?.token) {
                        console.log('Something went wrong during signing in: ', res);
                        return
                    }
                    storeTokenInLocalStorage(res.data.token)
                    window.location.reload(); 
                    // history.push('/dashboard')
                })
                .catch((error) => {
                    console.log("error", error)
                    setError(error.response.data.message)
                    setLoading(false)
                    setSubmitting(false)
                    setStatus('The login detail is incorrect')
                })
                .finally(() => {
                    setLoading(false)
                })
        },
    })

    return (
        <form
            className='form w-100'
            onSubmit={formik.handleSubmit}
            noValidate
            id='kt_login_signin_form'
        >
            {/* begin::Heading */}
            <div className='text-center mb-10'>
                <h1 className='text-dark mb-3'>Sign In to Trumemo</h1>
                <div className='text-gray-400 fw-bold fs-4'>
                    New Here?{' '}
                    <Link to='/auth/registration' className='link-primary fw-bolder'>
                        Create an Account
                    </Link>
                </div>
            </div>
            {/* begin::Heading */}

            {formik.status ? (
                <div className='mb-lg-15 alert alert-danger'>
                    <div className='alert-text font-weight-bold'>*{formik.status}</div>
                    <div className='alert-text font-weight-bold'>*{error}</div>
                </div>
            ) : (
                <div className='mb-10 bg-light-info p-8 rounded'>
                    <div className='text-info'>
                        Use an account <strong>syed@test.com</strong> and Password is <strong>Dark!321</strong> to
                        continue as Sudo Admin.
                    </div>
                </div>
            )}

            {/* begin::Form group */}
            <div className='fv-row mb-10'>
                <label className='form-label fs-6 fw-bolder text-dark'>Email</label>
                <input
                    placeholder='Email'
                    {...formik.getFieldProps('email')}
                    className={clsx(
                        'form-control form-control-lg form-control-solid',
                        { 'is-invalid': formik.touched.email && formik.errors.email },
                        {
                            'is-valid': formik.touched.email && !formik.errors.email,
                        }
                    )}
                    type='email'
                    name='email'
                    autoComplete='off'
                />
                {formik.touched.email && formik.errors.email && (
                    <div className='fv-plugins-message-container'>
                        <span role='alert' className='text-danger'>{formik.errors.email}</span>
                    </div>
                )}
            </div>
            {/* end::Form group */}

            {/* begin::Form group */}
            <div className='fv-row mb-10'>
                <div className='d-flex justify-content-between mt-n5'>
                    <div className='d-flex flex-stack mb-2'>
                        {/* begin::Label */}
                        <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
                        {/* end::Label */}
                        {/* begin::Link */}
                        <Link
                            to='/auth/forgot-password'
                            className='link-primary fs-6 fw-bolder'
                            style={{ marginLeft: '5px' }}
                        >
                            Forgot Password ?
                        </Link>
                        {/* end::Link */}
                    </div>
                </div>
                <input
                    placeholder='Password'
                    type='password'
                    autoComplete='off'
                    {...formik.getFieldProps('password')}
                    className={clsx(
                        'form-control form-control-lg form-control-solid',
                        {
                            'is-invalid': formik.touched.password && formik.errors.password,
                        },
                        {
                            'is-valid': formik.touched.password && !formik.errors.password,
                        }
                    )}
                />
                {formik.touched.password && formik.errors.password && (
                    <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                            <span role='alert' className='text-danger'>{formik.errors.password}</span>
                        </div>
                    </div>
                )}
            </div>
            {/* end::Form group */}

            {/* begin::Action */}
            <div className='text-center'>
                <button
                    type='submit'
                    id='kt_sign_in_submit'
                    className='btn btn-lg btn-primary w-100 mb-5'
                    disabled={formik.isSubmitting || !formik.isValid}
                >
                    {!loading && <span className='indicator-label'>Sign In</span>}
                    {loading && (
                        <span className='indicator-progress' style={{ display: 'block' }}>
                            Please wait...
                            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                        </span>
                    )}
                </button>

                {/* begin::Separator */}
                <div className='text-center text-muted text-uppercase fw-bolder mb-5'>or</div>
                {/* end::Separator */}

                {/* begin::Google link */}
                <a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100 mb-5'>
                    <img
                        alt='Logo'
                        src={toAbsoluteUrl('/media/svg/brand-logos/google-icon.svg')}
                        className='h-20px me-3'
                    />
                    Continue with Google
                </a>
                {/* end::Google link */}

                {/* begin::Google link */}
                <a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100 mb-5'>
                    <img
                        alt='Logo'
                        src={toAbsoluteUrl('/media/svg/brand-logos/facebook-4.svg')}
                        className='h-20px me-3'
                    />
                    Continue with Facebook
                </a>
                {/* end::Google link */}

                {/* begin::Google link */}
                <a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100'>
                    <img
                        alt='Logo'
                        src={toAbsoluteUrl('/media/svg/brand-logos/apple-black.svg')}
                        className='h-20px me-3'
                    />
                    Continue with Apple
                </a>
                {/* end::Google link */}
            </div>
            {/* end::Action */}
        </form>
    )
}
