import {useEffect, useRef, useState} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import {addAgencyDocument} from '../../../store'
import {useDispatch} from 'react-redux'
import {type} from 'os'
import {toast} from 'react-toastify'

const registrationSchema = Yup.object().shape({
  type: Yup.string().required('Type is required'),
  receivedDate: Yup.string().required('Recieved Date is required'),
})
const initialValues = {
  type: '',
  receivedDate: '',
  validFrom: '',
  validTo: '',
  description: '',
  comment: '',
}

const DocumentStorageForm = () => {
  const dispatch = useDispatch()
  const ref = useRef()
  const [document, setDocument] = useState()

  const submitHandler = async (values, {resetForm}) => {
    var formdata = new FormData()
    if (document) {
      formdata.append('document', document, document.name)
    }
    for (const value in values) {
      formdata.append(value, values[value])
    }
    for (const pair of formdata.entries()) {
      console.log(`[formdata] ${pair[0]}, ${pair[1]}`)
    }
    // formdata.append('type', values.type)
    // formdata.append('receivedDate', values.recievedDate)
    const responce = await dispatch(addAgencyDocument(formdata))

    if (responce?.payload.success) {
      toast.success(responce?.payload?.message || 'success', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      resetForm()
      ref.current.value = ''
      // setDocument(null)
    } else {
      toast.error(responce?.payload?.response?.data?.message || responce?.payload?.message || 'Error', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }
  return (
    <div>
      <div className='fv-row mb-7 fv-plugins-icon-container p-5 card'>
        <div className='card-body'>
          <h1 className='mb-4'>Document Storage New</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={registrationSchema}
            onSubmit={submitHandler}
          >
            {({isSubmitting, resetForm}) => (
              <Form>
                <div className='row'>
                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                    <label className=' fw-bold fs-6 mb-2'>Type</label>
                    <Field
                      as='select'
                      name='type'
                      className='form-select form-select-lg mb-3'
                      aria-label='.form-select-lg example'
                    >
                      <option hidden>- Please Select -</option>
                      <option value='Behavior Assistant Certification'>
                        Behavior Assistant Certification
                      </option>
                      <option value='First Aid Certification'>First Aid Certification</option>
                      <option value='Direct Care Core Competencies Certification'>
                        Direct Care Core Competencies Certification
                      </option>
                      <option value='Good Moral Charecter Documentation'>
                        Good Moral Charecter Documentation
                      </option>
                      <option value='HIPAA Certification'>HIPAA Certification</option>
                      <option value='AIDS Certification'>AIDS Certification</option>
                      <option value='Level 2 Background Screening'>
                        Level 2 Background Screening
                      </option>
                      <option value='Medical Administration 65g-7'>
                        Medical Administration 65g-7
                      </option>
                      <option value='Oprating Guide Line'>Oprating Guide Line</option>
                      <option value='PCM Certification'>PCM Certification</option>
                      <option value='Training Material'>Training Material</option>
                    </Field>
                    <ErrorMessage name='type' component='div' className='text-danger' />
                  </div>
                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
                    <label className=' fw-bold fs-6 mb-2'>Received Date</label>
                    <Field
                      type='date'
                      name='receivedDate'
                      className='form-control form-control-solid mb-3 mb-lg-0'
                      placeholder=''
                      autoComplete='off'
                    ></Field>
                    <ErrorMessage name='receivedDate' component='div' className='text-danger' />
                  </div>
                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                    <label className=' fw-bold fs-6 mb-2'>Valid From</label>
                    <Field
                      type='date'
                      name='validFrom'
                      className='form-control form-control-solid mb-3 mb-lg-0'
                      placeholder=''
                      autoComplete='off'
                    ></Field>
                  </div>
                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                    <label className=' fw-bold fs-6 mb-2'>Valid To</label>
                    <Field
                      type='date'
                      name='validTo'
                      className='form-control form-control-solid mb-3 mb-lg-0'
                      placeholder=''
                      autoComplete='off'
                    ></Field>
                  </div>
                  <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                    <label className=' fw-bold fs-6 mb-2'>Description </label>
                    <Field
                      as='textarea'
                      name='description'
                      className='form-control form-control-solid mb-3 mb-lg-0'
                      placeholder=''
                      autoComplete='off'
                      rows={4}
                    ></Field>
                  </div>
                  <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                    <label className=' fw-bold fs-6 mb-2'>Comment</label>
                    <Field
                      as='textarea'
                      name='comment'
                      className='form-control form-control-solid mb-3 mb-lg-0'
                      placeholder=''
                      autoComplete='off'
                      rows={4}
                    ></Field>
                  </div>
                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                    <label className=' fw-bold fs-6 mb-2'>Document </label>
                    <input
                      type='file'
                      name='document'
                      className='form-control form-control-solid mb-3 mb-lg-0'
                      placeholder=''
                      accept='image/*, .pdf'
                      ref={ref}
                      onChange={(e) => {
                        setDocument(e.target.files[0])
                      }}
                    ></input>
                  </div>
                </div>
                <div className='my-4'>
                  <button
                    className='btn btn-primary btn-sm'
                    onClick={() => {
                      resetForm()
                      ref.current.value = ''
                    }}
                  >
                    Reset
                  </button>
                  <button type='submit' className='btn btn-primary btn-sm mx-5'>
                    Add
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default DocumentStorageForm
