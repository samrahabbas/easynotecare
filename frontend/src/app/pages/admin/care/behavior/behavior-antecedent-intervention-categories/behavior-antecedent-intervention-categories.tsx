import { useState, useEffect, useMemo, useRef, Fragment } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Pagination from '../../../../../../_helper/paginationHook/Pagination'
import data from './BAICData.json'
import BEditing from './forms/BEditing'
import IEditing from './forms/IEditing'
import AEditing from './forms/AEditing'
import BRow from './rows/BRow'
import IRow from './rows/IRow'
import ARow from './rows/ARow'
import { useDispatch, useSelector } from 'react-redux'
import { createBehaviorCategory, deleteBehaviorCategory, getAllBehaviorCategories } from './store/actions'
import { RootState } from '../../../../../../setup'
const registrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required("Name is required"),
  type: Yup.string()
    .required("Type is required"),
})

const BehaviorAntecedentInterventionCategories = () => {
  const behavior = useSelector((state: RootState) => state.behavior.behaviorCategories)
  const dispatch=useDispatch()
  const [behaviorList, setBehaviorList] = useState<any[]>([])
  const [behaviorListStatic, setBehaviorListStatic] = useState<any[]>([])
  const [antecedentList, setAntecedentList] = useState<any[]>([])
  const [antecedentListStatic, setAntecedentListStatic] = useState<any[]>([])
  const [interventionList, setInterventionList] = useState<any[]>([])
  const [interventionListStatic, setInterventionListStatic] = useState<any[]>([])
  const [deleteEntryData, setDeleteEntryData] = useState<{}>({})
  const [currentPageB, setCurrentPageB] = useState(1)
  const [currentPageA, setCurrentPageA] = useState(1)
  const [currentPageI, setCurrentPageI] = useState(1)
  const [showEditingFormB, setShowEditingFormB] = useState(true)
  const [showEditingFormA, setShowEditingFormA] = useState(true)
  const [showEditingFormI, setShowEditingFormI] = useState(true)
  const [PageSizeB, setPageSizeB] = useState(5)
  const [PageSizeA, setPageSizeA] = useState(5)
  const [PageSizeI, setPageSizeI] = useState(5)
  const [editEntryDataB, setEditEntryDataB] = useState({})
  const [editEntryDataA, setEditEntryDataA] = useState({})
  const [editEntryDataI, setEditEntryDataI] = useState({})
  const [deleteEntryDataB, setDeleteEntryDataB] = useState({
    name: '',
    type: ''
  })
  const [deleteEntryDataA, setDeleteEntryDataA] = useState({
    name: '',
    type: ''
  })
  const [deleteEntryDataI, setDeleteEntryDataI] = useState({
    name: '',
    type: ''
  })

  useEffect(() => {
    let tempBehavior = []
    let tempAntecedent = []
    let tempIntervention = []
    for (const element of data) {
      if (element.type === "Behavior") {
        tempBehavior.push(element)
      } else if (element.type === "Antecedent") {
        tempAntecedent.push(element)
      } else if (element.type === "Intervention") {
        tempIntervention.push(element)
      }
    }
    setBehaviorList(tempBehavior)
    setBehaviorListStatic(tempBehavior)
    setAntecedentList(tempAntecedent)
    setAntecedentListStatic(tempAntecedent)
    setInterventionList(tempIntervention)
    setInterventionListStatic(tempIntervention)
  }, [])

  const PaginationRefB = useRef(null)
  const PaginationRefA = useRef(null)
  const PaginationRefI = useRef(null)

  useEffect(() => {
    let PaginationElement: any = PaginationRefB.current
    if (PaginationElement !== null) {
      let numberOfPages = PaginationElement.getElementsByTagName("li").length - 2
      if (numberOfPages > 0) {
        if (numberOfPages < currentPageB) {
          let tempPage = currentPageB - 1
          setCurrentPageB(tempPage)
        }
      }
    }
  }, [behaviorList])

  useEffect(() => {
    let PaginationElement: any = PaginationRefA.current
    if (PaginationElement !== null) {
      let numberOfPages = PaginationElement.getElementsByTagName("li").length - 2
      if (numberOfPages > 0) {
        if (numberOfPages < currentPageA) {
          let tempPage = currentPageA - 1
          setCurrentPageA(tempPage)
        }
      }
    }
  }, [antecedentList])

  useEffect(() => {
    let PaginationElement: any = PaginationRefI.current
    if (PaginationElement !== null) {
      let numberOfPages = PaginationElement.getElementsByTagName("li").length - 2
      if (numberOfPages > 0) {
        if (numberOfPages < currentPageI) {
          let tempPage = currentPageI - 1
          setCurrentPageI(tempPage)
        }
      }
    }
  }, [interventionList])

  const onDeleteBehavior = () => {
    //   // let tempObj = {
    //   //     deleteID: deleteIndividualId
    //   // }
    //   // axios.delete('contacts/deleteContact', {
    //   //     data: tempObj
    //   // })
    //   // .then(() => {
    setBehaviorList(prevState =>
      prevState.filter((behavior) => behavior.name !== deleteEntryDataB.name)
    )
    setBehaviorListStatic(prevState =>
      prevState.filter((behavior) => behavior.name !== deleteEntryDataB.name)
    )
    //   // }).catch(err => {
    //   //     console.log((err))
    //   // })
    // dispatch(deleteBehaviorCategory(deleteEntryDataB))
  }

  const onDeleteAntecedent = () => {
    //   // let tempObj = {
    //   //     deleteID: deleteIndividualId
    //   // }
    //   // axios.delete('contacts/deleteContact', {
    //   //     data: tempObj
    //   // })
    //   // .then(() => {
    setAntecedentList(prevState =>
      prevState.filter((antecedent) => antecedent.name !== deleteEntryDataA.name)
    )
    setAntecedentListStatic(prevState =>
      prevState.filter((antecedent) => antecedent.name !== deleteEntryDataA.name)
    )
    //   // }).catch(err => {
    //   //     console.log((err))
    //   // })
    // dispatch(deleteBehaviorCategory(deleteEntryDataA))

  }

  const onDeleteIntervention = () => {
    // let tempObj = {
    //     deleteID: deleteIndividualId
    // }
    // axios.delete('contacts/deleteContact', {
    //     data: tempObj
    // })
    // .then(() => {
    setInterventionList(prevState =>
      prevState.filter((intervention) => intervention.name !== deleteEntryDataI.name)
    )
    setInterventionListStatic(prevState =>
      prevState.filter((intervention) => intervention.name !== deleteEntryDataI.name)
    )
    // }).catch(err => {
    //     console.log((err))
    // })
    // dispatch(deleteBehaviorCategory(deleteEntryDataI))

  }

  const updateBehavior = (params: any) => {
    setBehaviorList(prevState =>
      prevState.map(entry => entry.id === params.id ? params : entry)
    )
    setBehaviorListStatic(prevState =>
      prevState.map(entry => entry.id === params.id ? params : entry)
    )
  }

  const updateAntecedent = (params: any) => {
    setAntecedentList(prevState =>
      prevState.map(entry => entry.id === params.id ? params : entry)
    )
    setAntecedentListStatic(prevState =>
      prevState.map(entry => entry.id === params.id ? params : entry)
    )
  }

  const updateIntervention = (params: any) => {
    setInterventionList(prevState =>
      prevState.map(entry => entry.id === params.id ? params : entry)
    )
    setInterventionListStatic(prevState =>
      prevState.map(entry => entry.id === params.id ? params : entry)
    )
  }

  const filterArray = (dataProp: {}[]) => {
    let arrayCopy = JSON.stringify(dataProp)
    arrayCopy = JSON.parse(arrayCopy)
    let filteredArray = []
    let sampleFilter = [
      "id",
      "name",
      "lastUpdatedBy",
      "enteredBy",
    ]
    for (let j = 0; j < arrayCopy.length; j++) {
      let allkeys = Object.keys(arrayCopy[j])

      type typeobj1 = {
        "id": string;
        "name": string;
        "lastUpdatedBy": string;
        "enteredBy": string;
      }
      let obj1: typeobj1 = {
        "id": '',
        "name": '',
        "lastUpdatedBy": '',
        "enteredBy": '',
      }
      for (let i = 0; i < allkeys.length; i++) {
        if (sampleFilter.includes(allkeys[i])) {
          let tempvar1 = allkeys[i]
          obj1[tempvar1 as keyof typeobj1] = arrayCopy[j][tempvar1 as keyof object]
        }
      }
      filteredArray.push(obj1)
    }
    return filteredArray
  }

  const searchFilterBehavior = (value: string) => {
    let filteredArray = filterArray(behaviorListStatic)
    let lowerCaseValue = value.toLowerCase()
    let temparr = []
    for (let i = 0; i < filteredArray.length; i++) {
      if (Object.values(filteredArray[i]).filter(item => typeof item === 'string' ? item.toLowerCase().includes(lowerCaseValue) : false).length > 0) {
        temparr.push(filteredArray[i])
      }
    }
    setBehaviorList(temparr)
    setCurrentPageB(1)
  }

  const searchFilterAntecedent = (value: string) => {
    let filteredArray = filterArray(antecedentListStatic)
    let lowerCaseValue = value.toLowerCase()
    let temparr = []
    for (let i = 0; i < filteredArray.length; i++) {
      if (Object.values(filteredArray[i]).filter(item => typeof item === 'string' ? item.toLowerCase().includes(lowerCaseValue) : false).length > 0) {
        temparr.push(filteredArray[i])
      }
    }
    setAntecedentList(temparr)
    setCurrentPageA(1)
  }

  const searchFilterIntervention = (value: string) => {
    let filteredArray = filterArray(interventionListStatic)
    let lowerCaseValue = value.toLowerCase()
    let temparr = []
    for (let i = 0; i < filteredArray.length; i++) {
      if (Object.values(filteredArray[i]).filter(item => typeof item === 'string' ? item.toLowerCase().includes(lowerCaseValue) : false).length > 0) {
        temparr.push(filteredArray[i])
      }
    }
    setInterventionList(temparr)
    setCurrentPageI(1)
  }
useEffect(()=>{
  dispatch(getAllBehaviorCategories())
},[])
  const currentTableDataBehavior = useMemo(() => {
    // let behaviorListFromBackend=behavior.filter(b=>b.type==='Behavior')
    // if (behaviorListFromBackend.length <= PageSizeB) {
    //   setCurrentPageB(1)
    // }
    // let tempdata = behaviorListFromBackend
    // const firstPageIndex = (currentPageB - 1) * PageSizeB;
    // const lastPageIndex = firstPageIndex + PageSizeB;
    // return tempdata.slice(firstPageIndex, lastPageIndex);
    return []
  }, [currentPageB, PageSizeB,behavior, behaviorListStatic]);

  const currentTableDataAntecedent = useMemo(() => {
    // let antecedentsFromBackend = behavior.filter((b) => b.type === 'Antecedents')
    // if (antecedentsFromBackend.length <= PageSizeA) {
    //   setCurrentPageA(1)
    // }
    // let tempdata = antecedentsFromBackend
    // const firstPageIndex = (currentPageA - 1) * PageSizeA;
    // const lastPageIndex = firstPageIndex + PageSizeA;
    // return tempdata.slice(firstPageIndex, lastPageIndex);
    return []
  }, [currentPageA, behavior, PageSizeA, antecedentListStatic])

  const currentTableDataIntervention = useMemo(() => {
    // let interventionFromBackend = behavior.filter((b) => b.type === 'Intervention')
    // if (interventionFromBackend.length <= PageSizeI) {
    //   setCurrentPageI(1)
    // }
    // let tempdata = interventionFromBackend
    // const firstPageIndex = (currentPageI - 1) * PageSizeI;
    // const lastPageIndex = firstPageIndex + PageSizeI;
    // return tempdata.slice(firstPageIndex, lastPageIndex);
    return []
  }, [currentPageI, behavior, PageSizeI, interventionListStatic])
  return (
    <div>
      <div className='d-flex justify-content-center'>
        <div className='card card-flush h-md-100 w-100'>
          <div className='fv-row fv-plugins-icon-container px-5 card'>
            <Formik
              initialValues={{
                name: '',
                type: '',
                enteredBy: 'EasyNoteCare System Admin',
                lastUpdatedBy: 'EasyNoteCare System Admin on 2021-12-30',
                id: Math.floor(Math.random() * 9000),
              }}
              validationSchema={registrationSchema}
              onSubmit={(values, {setSubmitting, resetForm}) => {
                if (values.type === 'Behavior') {
                  setBehaviorList([...behaviorList, values])
                  setBehaviorListStatic([...behaviorListStatic, values])
                } else if (values.type === 'Intervention') {
                  setInterventionList([...interventionList, values])
                  setInterventionListStatic([...interventionListStatic, values])
                } else if (values.type === 'Antecedents') {
                  setAntecedentList([...antecedentList, values])
                  setAntecedentListStatic([...antecedentListStatic, values])
                }
                // dispatch(createBehaviorCategory(values))
                resetForm()
                setSubmitting(false)
              }}
            >
              {({resetForm}) => (
                <div className='card-body'>
                  <p className='text-gray-800 fs-2 fw-bolder'>Add New Category</p>
                  <div className='row'>
                    <Form>
                      <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3'>
                        <label className=' fw-bold fs-6 mb-2'>Name</label>
                        <Field
                          name='name'
                          className='form-control form-control-solid mb-3 mb-lg-0'
                          placeholder='Name'
                          autoComplete='off'
                        />
                      </div>
                      <ErrorMessage name='name' component='div' className='text-danger' />
                      <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3'>
                        <label className=' fw-bold fs-6 mb-2'>Type</label>
                        <Field
                          as='select'
                          className='form-select form-select-lg mb-3'
                          name='type'
                          aria-label='.form-select-lg example'
                        >
                          <option hidden>Select Type</option>
                          <option value='Behavior'>Behavior</option>
                          <option value='Antecedents'>Antecedents</option>
                          <option value='Intervention'>Intervention</option>
                        </Field>
                        <ErrorMessage name='type' component='div' className='text-danger' />
                      </div>
                      <div className='d-flex d-flex justify-content-end'>
                        <div>
                          <button className='btn btn-primary mt-4' type='submit'>
                            Add
                          </button>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
              )}
            </Formik>
          </div>
        </div>
      </div>

      {showEditingFormB ? (
        <div>
          <div className='d-flex justify-content-center mt-6'>
            <div className='card card-flush h-md-100 w-100'>
              <div className='fv-row mb-7 fv-plugins-icon-container px-5 card'>
                <div className='card-body'>
                  <p className='text-gray-800 fs-2 fw-bolder'>Behavior List</p>
                  <div className='row'>
                    <div className='d-flex w-100 justify-content-between'>
                      <div className='d-flex align-items-center position-relative overflow-auto my-1'>
                        <span className='svg-icon svg-icon-1 position-absolute ms-6'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width={24}
                            height={24}
                            viewBox='0 0 24 24'
                            fill='none'
                          >
                            <rect
                              opacity='0.5'
                              x='17.0365'
                              y='15.1223'
                              width='8.15546'
                              height={2}
                              rx={1}
                              transform='rotate(45 17.0365 15.1223)'
                              fill='black'
                            />
                            <path
                              d='M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z'
                              fill='black'
                            />
                          </svg>
                        </span>
                        <input
                          type='text'
                          data-kt-customer-table-filter='search'
                          onChange={(e) => searchFilterBehavior(e.target.value)}
                          className='form-control form-control-solid w-250px ps-15'
                          placeholder='Search Behavior'
                        />
                      </div>
                      <div className='d-flex'>
                        <div>
                          <p style={{margin: 'revert'}}>Items Per Page</p>
                        </div>
                        <div>
                          <select
                            className='form-control form-control-solid form-select'
                            onChange={(e) => setPageSizeB(parseInt(e.target.value))}
                          >
                            <option value={5}>5</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                            <option value={150}>150</option>
                            <option value={200}>200</option>
                            <option value={300}>300</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='table-responsive pt-0'>
                    <table
                      className='table table-light table-rounded table-striped border border-2 table-hover fs-6 gy-5 mt-5'
                      id='kt_behavior_table'
                    >
                      <thead>
                        <tr className='text-start table-dark text-gray-400 table-rounded fw-bolder fs-7 text-uppercase gs-0'>
                          <th className='px-3 min-w-150px'>Name</th>
                          <th className='min-w-200px'>Entered By</th>
                          <th className='min-w-200px'>Last Updated By</th>
                          <th className='min-w-100px'>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentTableDataBehavior.length > 0 ? (
                          currentTableDataBehavior.map((behavior, index) => (
                            <Fragment key={index}>
                              <BRow
                                behavior={behavior}
                                setEditEntryDataB={setEditEntryDataB}
                                setDeleteEntryDataB={setDeleteEntryDataB}
                                setShowEditingFormB={setShowEditingFormB}
                              />
                            </Fragment>
                          ))
                        ) : (
                          <tr>
                            <td align='center' colSpan={12}>
                              <span className='text-gray-600 fs-2 fw-bolder'>
                                No Behavior History Found
                              </span>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className='d-flex justify-content-center' ref={PaginationRefB}>
                    <Pagination
                      className='pagination-bar'
                      currentPage={currentPageB}
                      totalCount={behaviorList.length}
                      pageSize={PageSizeB}
                      onPageChange={(page: React.SetStateAction<number>) => setCurrentPageB(page)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* MODAL FOR DELETING BEHAVIOR */}
          <div
            className='modal fade'
            id='kt_modal_delete_behavior'
            tabIndex={-1}
            aria-hidden='true'
          >
            {/*begin::Modal dialog*/}
            <div className='modal-dialog modal-dialog-centered mw-600px mh-100px'>
              {/*begin::Modal content*/}
              <div className='modal-content'>
                {/*begin::Modal header*/}
                <div className='modal-header d-flex justify-content-center'>
                  {/*begin::Modal title*/}
                  <h2 className='fw-bolder'>ARE YOU SURE YOU WANT TO DELETE THIS BEHAVIOR?</h2>
                  {/*end::Modal title*/}
                </div>
                {/*end::Modal header*/}
                {/*begin::Modal body*/}
                <div className='modal-body scroll-y mx-lg-5'>
                  <div className='d-flex justify-content-center'>
                    <button
                      className='btn btn-danger me-3'
                      data-bs-dismiss='modal'
                      aria-label='Close'
                      onClick={onDeleteBehavior}
                    >
                      Confirm
                    </button>
                    <button
                      className='btn btn-light me-3'
                      data-bs-dismiss='modal'
                      aria-label='Close'
                    >
                      Discard
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <BEditing
          setEditEntryDataB={setEditEntryDataB}
          setShowEditingFormB={setShowEditingFormB}
          editEntryDataB={editEntryDataB}
          updateBehavior={updateBehavior}
        />
      )}

      {/* ANTECEDENT LIST */}
      {showEditingFormA ? (
        <div>
          <div className='d-flex justify-content-center mt-6'>
            <div className='card card-flush h-md-100 w-100'>
              <div className='fv-row mb-7 fv-plugins-icon-container px-5 card'>
                <div className='card-body'>
                  <p className='text-gray-800 fs-2 fw-bolder'>Antecedent List</p>
                  <div className='row'>
                    <div className='d-flex w-100 justify-content-between'>
                      <div className='d-flex align-items-center position-relative overflow-auto my-1'>
                        <span className='svg-icon svg-icon-1 position-absolute ms-6'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width={24}
                            height={24}
                            viewBox='0 0 24 24'
                            fill='none'
                          >
                            <rect
                              opacity='0.5'
                              x='17.0365'
                              y='15.1223'
                              width='8.15546'
                              height={2}
                              rx={1}
                              transform='rotate(45 17.0365 15.1223)'
                              fill='black'
                            />
                            <path
                              d='M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z'
                              fill='black'
                            />
                          </svg>
                        </span>
                        <input
                          type='text'
                          data-kt-customer-table-filter='search'
                          onChange={(e) => searchFilterAntecedent(e.target.value)}
                          className='form-control form-control-solid w-250px ps-15'
                          placeholder='Search Antecedent'
                        />
                      </div>
                      <div className='d-flex'>
                        <div>
                          <p style={{margin: 'revert'}}>Items Per Page</p>
                        </div>
                        <div>
                          <select
                            className='form-control form-control-solid form-select'
                            onChange={(e) => setPageSizeA(parseInt(e.target.value))}
                          >
                            <option value={5}>5</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                            <option value={150}>150</option>
                            <option value={200}>200</option>
                            <option value={300}>300</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='table-responsive pt-0'>
                    <table
                      className='table table-light table-rounded table-striped border border-2 table-hover fs-6 gy-5 mt-5'
                      id='kt_antecedent_table'
                    >
                      <thead>
                        <tr className='text-start table-dark text-gray-400 table-rounded fw-bolder fs-7 text-uppercase gs-0'>
                          <th className='px-3 min-w-150px'>Name</th>
                          <th className='min-w-200px'>Entered By</th>
                          <th className='min-w-200px'>Last Updated By</th>
                          <th className='min-w-100px'>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentTableDataAntecedent.length > 0 ? (
                          currentTableDataAntecedent.map((antecedent, index) => (
                            <Fragment key={index}>
                              <ARow
                                antecedent={antecedent}
                                setEditEntryDataA={setEditEntryDataA}
                                setDeleteEntryDataA={setDeleteEntryDataA}
                                setShowEditingFormA={setShowEditingFormA}
                              />
                            </Fragment>
                          ))
                        ) : (
                          <tr>
                            <td align='center' colSpan={12}>
                              <span className='text-gray-600 fs-2 fw-bolder'>
                                No Antecedent History Found
                              </span>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className='d-flex justify-content-center' ref={PaginationRefA}>
                    <Pagination
                      className='pagination-bar'
                      currentPage={currentPageA}
                      totalCount={antecedentList.length}
                      pageSize={PageSizeA}
                      onPageChange={(page: React.SetStateAction<number>) => setCurrentPageA(page)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* MODAL FOR DELETING ANTECEDENT */}
          <div
            className='modal fade'
            id='kt_modal_delete_antecedent'
            tabIndex={-1}
            aria-hidden='true'
          >
            {/*begin::Modal dialog*/}
            <div className='modal-dialog modal-dialog-centered mw-600px mh-100px'>
              {/*begin::Modal content*/}
              <div className='modal-content'>
                {/*begin::Modal header*/}
                <div className='modal-header d-flex justify-content-center'>
                  {/*begin::Modal title*/}
                  <h2 className='fw-bolder'>ARE YOU SURE YOU WANT TO DELETE THIS ANTECEDENT?</h2>
                  {/*end::Modal title*/}
                </div>
                {/*end::Modal header*/}
                {/*begin::Modal body*/}
                <div className='modal-body scroll-y mx-lg-5'>
                  <div className='d-flex justify-content-center'>
                    <button
                      className='btn btn-danger me-3'
                      data-bs-dismiss='modal'
                      aria-label='Close'
                      onClick={onDeleteAntecedent}
                    >
                      Confirm
                    </button>
                    <button
                      className='btn btn-light me-3'
                      data-bs-dismiss='modal'
                      aria-label='Close'
                    >
                      Discard
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <AEditing
          setEditEntryDataA={setEditEntryDataA}
          setShowEditingFormA={setShowEditingFormA}
          editEntryDataA={editEntryDataA}
          updateAntecedent={updateAntecedent}
        />
      )}

      {/* INTERVENTION LIST */}
      {showEditingFormI ? (
        <div>
          <div className='d-flex justify-content-center mt-6'>
            <div className='card card-flush h-md-100 w-100'>
              <div className='fv-row mb-7 fv-plugins-icon-container px-5 card'>
                <div className='card-body'>
                  <p className='text-gray-800 fs-2 fw-bolder'>Intervention List</p>
                  <div className='row'>
                    <div className='d-flex w-100 justify-content-between'>
                      <div className='d-flex align-items-center position-relative overflow-auto my-1'>
                        <span className='svg-icon svg-icon-1 position-absolute ms-6'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width={24}
                            height={24}
                            viewBox='0 0 24 24'
                            fill='none'
                          >
                            <rect
                              opacity='0.5'
                              x='17.0365'
                              y='15.1223'
                              width='8.15546'
                              height={2}
                              rx={1}
                              transform='rotate(45 17.0365 15.1223)'
                              fill='black'
                            />
                            <path
                              d='M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z'
                              fill='black'
                            />
                          </svg>
                        </span>
                        <input
                          type='text'
                          data-kt-customer-table-filter='search'
                          onChange={(e) => searchFilterIntervention(e.target.value)}
                          className='form-control form-control-solid w-250px ps-15'
                          placeholder='Search Behavior'
                        />
                      </div>
                      <div className='d-flex'>
                        <div>
                          <p style={{margin: 'revert'}}>Items Per Page</p>
                        </div>
                        <div>
                          <select
                            className='form-control form-control-solid form-select'
                            onChange={(e) => setPageSizeI(parseInt(e.target.value))}
                          >
                            <option value={5}>5</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                            <option value={150}>150</option>
                            <option value={200}>200</option>
                            <option value={300}>300</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='table-responsive pt-0'>
                    <table
                      className='table table-light table-rounded table-striped border border-2 table-hover fs-6 gy-5 mt-5'
                      id='kt_intervention_table'
                    >
                      <thead>
                        <tr className='text-start table-dark text-gray-400 table-rounded fw-bolder fs-7 text-uppercase gs-0'>
                          <th className='px-3 min-w-150px'>Name</th>
                          <th className='min-w-200px'>Entered By</th>
                          <th className='min-w-200px'>Last Updated By</th>
                          <th className='min-w-100px'>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentTableDataIntervention.length > 0 ? (
                          currentTableDataIntervention.map((intervention, index) => (
                            <Fragment key={index}>
                              <IRow
                                intervention={intervention}
                                setEditEntryDataI={setEditEntryDataI}
                                setDeleteEntryDataI={setDeleteEntryDataI}
                                setShowEditingFormI={setShowEditingFormI}
                              />
                            </Fragment>
                          ))
                        ) : (
                          <tr>
                            <td align='center' colSpan={12}>
                              <span className='text-gray-600 fs-2 fw-bolder'>
                                No Intervention History Found
                              </span>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className='d-flex justify-content-center' ref={PaginationRefI}>
                    <Pagination
                      className='pagination-bar'
                      currentPage={currentPageI}
                      totalCount={interventionList.length}
                      pageSize={PageSizeI}
                      onPageChange={(page: React.SetStateAction<number>) => setCurrentPageI(page)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MODAL FOR DELETING INTERVENTION */}
          <div
            className='modal fade'
            id='kt_modal_delete_intervention'
            tabIndex={-1}
            aria-hidden='true'
          >
            {/*begin::Modal dialog*/}
            <div className='modal-dialog modal-dialog-centered mw-600px mh-100px'>
              {/*begin::Modal content*/}
              <div className='modal-content'>
                {/*begin::Modal header*/}
                <div className='modal-header d-flex justify-content-center'>
                  {/*begin::Modal title*/}
                  <h2 className='fw-bolder'>ARE YOU SURE YOU WANT TO DELETE THIS INTERVENTION?</h2>
                  {/*end::Modal title*/}
                </div>
                {/*end::Modal header*/}
                {/*begin::Modal body*/}
                <div className='modal-body scroll-y mx-lg-5'>
                  <div className='d-flex justify-content-center'>
                    <button
                      className='btn btn-danger me-3'
                      data-bs-dismiss='modal'
                      aria-label='Close'
                      onClick={onDeleteIntervention}
                    >
                      Confirm
                    </button>
                    <button
                      className='btn btn-light me-3'
                      data-bs-dismiss='modal'
                      aria-label='Close'
                    >
                      Discard
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <IEditing
          setEditEntryDataI={setEditEntryDataI}
          setShowEditingFormI={setShowEditingFormI}
          editEntryDataI={editEntryDataI}
          updateIntervention={updateIntervention}
        />
      )}
    </div>
  )
}

export default BehaviorAntecedentInterventionCategories