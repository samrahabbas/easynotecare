import {useEffect, useMemo, useState} from 'react'
import {Formik, Form, Field} from 'formik'
import DocumentStorageSearchTable from './DocumentStorageSearchTable'
import {useDispatch, useSelector} from 'react-redux'
import {getAgencyDocuments} from '../../../store'
import {getUsersNameList} from '../../../../users/store'
const queryInitialValue = {
  enteredBy: '',
  _id: '',
  name: '',
  type: '',
  recievedDateFrom: '',
  recievedDateTo: '',
  uploadDateFrom: '',
  uploadDateTo: '',
}
const DocumentStorageSearchForm = () => {
  const agencyStore = useSelector((state) => state.agency)
  const {nameList} = useSelector((state) => state.users)
  const [showResultsForm, setShowResultsForm] = useState(true)
  const [queryData, setQueryData] = useState({})
  const [perPage, setPerPage] = useState(50)
  const onPerPageChange = (e) => {
    setPerPage(e.target.value)
    dispatch(getAgencyDocuments({...queryData, perPage}))
  }

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUsersNameList())
  }, [])
  const enteredByOptions = useMemo(() => {
    return nameList.map((user) => <option value={user._id}>{user.full_name}</option>)
  }, [nameList.length])

  return (
    <div>
      <div className='fv-row mb-7 fv-plugins-icon-container p-5 card'>
        <div className='card-body'>
          {showResultsForm ? (
            <div>
              <h1 className='mb-4'>Document (Search)</h1>
              <Formik
                initialValues={Object.keys(queryData).length > 0 ? queryData : queryInitialValue}
                onSubmit={async (values) => {
                  // console.log(values)
                  console.log('values', values)
                  await dispatch(getAgencyDocuments({...values, perPage}))
                  setQueryData(values)
                  setShowResultsForm(false)

                  // let tempVar = Object.keys(values)
                  // for(let i = 0; i < tempVar.length; i++){
                  //   if(values[tempVar[i]] !== ''){
                  //     setSearchData(values)
                  //     setShowResultsForm(false)
                  //   }
                  // }
                }}
              >
                {({isSubmitting, resetForm}) => (
                  <Form>
                    <div className='my-4'>
                      <button
                        type='button'
                        className='btn btn-primary btn-sm'
                        onClick={() => {
                          resetForm()
                        }}
                      >
                        Reset
                      </button>
                      <button
                        type='submit'
                        className='btn btn-primary btn-sm mx-5'
                        disabled={agencyStore.isLoading}
                      >
                        Search
                      </button>
                    </div>
                    <div className='row'>
                      <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                        <label className=' fw-bold fs-6 mb-2'>Entered By</label>
                        {/* <Field
                          name='enteredBy'
                          className='form-control form-control-solid mb-3 mb-lg-0'
                          placeholder=''
                          autoComplete='off'
                        ></Field> */}
                        <Field
                          as='select'
                          name='enteredBy'
                          className='form-select form-select-lg mb-3'
                          aria-label='.form-select-lg example'
                        >
                          <option hidden>- Please Select -</option>
                          {enteredByOptions}
                        </Field>
                      </div>
                      <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                        <label className=' fw-bold fs-6 mb-2'>Document ID</label>
                        <Field
                          name='_id'
                          className='form-control form-control-solid mb-3 mb-lg-0'
                          placeholder='Document ID'
                          autoComplete='off'
                        ></Field>
                      </div>
                      <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
                        <label className=' fw-bold fs-6 mb-2'>File name</label>
                        <Field
                          name='name'
                          className='form-control form-control-solid mb-3 mb-lg-0'
                          placeholder='File Name'
                          autoComplete='off'
                        ></Field>
                      </div>
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
                      </div>
                      <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
                        <label className=' fw-bold fs-6 mb-2'>Recived Date From</label>
                        <Field
                          type='date'
                          name='recievedDateFrom'
                          className='form-control form-control-solid mb-3 mb-lg-0'
                          placeholder=''
                          autoComplete='off'
                        ></Field>
                      </div>
                      <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                        <label className=' fw-bold fs-6 mb-2'>Recived Date To</label>
                        <Field
                          type='date'
                          name='recievedDateTo'
                          className='form-control form-control-solid mb-3 mb-lg-0'
                          placeholder=''
                          autoComplete='off'
                        ></Field>
                      </div>
                      <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
                        <label className=' fw-bold fs-6 mb-2'>Upload Date From</label>
                        <Field
                          type='date'
                          name='uploadDateFrom'
                          className='form-control form-control-solid mb-3 mb-lg-0'
                          placeholder=''
                          autoComplete='off'
                        ></Field>
                      </div>
                      <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                        <label className=' fw-bold fs-6 mb-2'>Upload Date To</label>
                        <Field
                          type='date'
                          name='uploadDateTo'
                          className='form-control form-control-solid mb-3 mb-lg-0'
                          placeholder=''
                          autoComplete='off'
                        ></Field>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          ) : (
            <DocumentStorageSearchTable
              searchData={queryData}
              filesinfo={agencyStore}
              setShowResultsForm={setShowResultsForm}
              perPage={perPage}
              setPerPage={setPerPage}
              onPerPageChange={onPerPageChange}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default DocumentStorageSearchForm
