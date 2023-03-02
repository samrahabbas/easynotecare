import React, {Fragment, useEffect, useMemo, useRef, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Sort_by} from '../../../../../../_helper/objectSorter'
import Pagination from '../../../../../../_helper/paginationHook/Pagination'
import '../../../../../../_helper/tableHeaderSticky/tableHeaderSticky.css'
// import { getAgencyDocuments } from '../../../store'
import DocumentStorageSearchTableRow from './DocumentStorageSearchTableRow'
// data file where to get fetch data from api
import data from './files.json'
import axios from 'axios'
const DocumentStorageSearchTable = ({
  searchData,
  setShowResultsForm,
  filesinfo,
  perPage,
  setPerPage,
  onPerPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [files, setFiles] = useState([])
  const [filesStatic, setFilesStatic] = useState([])
  const [deleteFileId, setDeleteFileId] = useState('')
  const [sortedBy, setSortedBy] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(getAgencyDocuments())
    let tempData = data

    let objectKeysArray = Object.keys(searchData)
    let formUpdatedData = {}

    for (const element of objectKeysArray) {
      if (searchData[element] !== '') {
        formUpdatedData[element] = searchData[element]
      }
    }

    let selectedData = {}
    let searchDataKeys = Object.keys(formUpdatedData)

    if (searchDataKeys.includes('recievedDateTo') && searchDataKeys.includes('recievedDateFrom')) {
      tempData = tempData.filter(
        (ind) =>
          ind.recievedDate >= formUpdatedData.recievedDateFrom &&
          ind.recievedDate <= formUpdatedData.recievedDateTo
      )
    } else if (
      searchDataKeys.includes('recievedDateTo') &&
      !searchDataKeys.includes('recievedDateFrom')
    ) {
      tempData = tempData.filter((ind) => ind.recievedDate <= formUpdatedData.recievedDateTo)
    } else if (
      !searchDataKeys.includes('recievedDateTo') &&
      searchDataKeys.includes('recievedDateFrom')
    ) {
      tempData = tempData.filter((ind) => ind.recievedDate >= formUpdatedData.recievedDateFrom)
    }

    if (searchDataKeys.includes('uploadDateTo') && searchDataKeys.includes('uploadDateFrom')) {
      tempData = tempData.filter(
        (ind) =>
          ind.uploadDate >= formUpdatedData.uploadDateFrom &&
          ind.uploadDate <= formUpdatedData.uploadDateTo
      )
    } else if (
      searchDataKeys.includes('uploadDateTo') &&
      !searchDataKeys.includes('uploadDateFrom')
    ) {
      tempData = tempData.filter((ind) => ind.uploadDate <= formUpdatedData.uploadDateTo)
    } else if (
      !searchDataKeys.includes('uploadDateTo') &&
      searchDataKeys.includes('uploadDateFrom')
    ) {
      tempData = tempData.filter((ind) => ind.uploadDate >= formUpdatedData.uploadDateFrom)
    }

    searchDataKeys = searchDataKeys.filter(
      (key) =>
        key !== 'recievedDateTo' &&
        key !== 'recievedDateFrom' &&
        key !== 'uploadDateTo' &&
        key !== 'uploadDateFrom'
    )

    let tempFinalArray = []
    if (searchDataKeys.length > 0) {
      for (const element of searchDataKeys) {
        if (
          element === 'enteredBy' ||
          element === 'fileName' ||
          element === 'type' ||
          element === 'formID'
        ) {
          let lowerCaseLetter = formUpdatedData[element].toLowerCase()
          formUpdatedData[element] = lowerCaseLetter
        }
      }
      for (let i = 0; i < tempData.length; i++) {
        if (selectedData[tempData[i]._id] === 'deleted') {
          continue
        }
        for (const element of searchDataKeys) {
          if (
            element === 'enteredBy' ||
            element === 'fileName' ||
            element === 'type' ||
            element === 'formID'
          ) {
            let lowerCaseLetter = tempData[i][element].toLowerCase()
            if (lowerCaseLetter.includes(formUpdatedData[element])) {
              selectedData[tempData[i]._id] = tempData[i]
            }
          } else {
            if (tempData[i][element] === formUpdatedData[element]) {
              selectedData[tempData[i]._id] = tempData[i]
            } else {
              selectedData[tempData[i]._id] = 'deleted'
              break
            }
          }
        }
      }
      let selectedDataKeys = Object.keys(selectedData)

      for (const element of selectedDataKeys) {
        if (selectedData[element] !== 'deleted') {
          tempFinalArray.push(selectedData[element])
        }
      }
    } else {
      tempFinalArray = tempData
    }
    setFiles(tempFinalArray)
    setFilesStatic(tempFinalArray)
  }, [])

  const PaginationRef = useRef(null)

  useEffect(() => {
    let PaginationElement = PaginationRef.current
    if (PaginationElement !== null) {
      let numberOfPages = PaginationElement.getElementsByTagName('li').length - 2
      if (numberOfPages > 0) {
        if (numberOfPages < currentPage) {
          let tempPage = currentPage - 1
          setCurrentPage(tempPage)
        }
      }
    }
  }, [files])

  const onDeleteFile = () => {
    setFilesStatic((prevState) => prevState.filter((file) => file.formID !== deleteFileId))
    setFiles((prevState) => prevState.filter((file) => file.formID !== deleteFileId))
  }

  const filterArray = (dataProp) => {
    let arrayCopy = JSON.stringify(dataProp)
    arrayCopy = JSON.parse(arrayCopy)
    let filteredArray = []
    let sampleFilter = ['formID', 'fileName', 'type', 'enteredBy', 'recievedDate', 'uploadDate']
    for (let j = 0; j < arrayCopy.length; j++) {
      let allkeys = Object.keys(arrayCopy[j])
      let obj1 = {
        formID: '',
        fileName: '',
        type: '',
        enteredBy: '',
        recievedDate: '',
        uploadDate: '',
      }

      for (let i = 0; i < allkeys.length; i++) {
        if (sampleFilter.includes(allkeys[i])) {
          let tempvar1 = allkeys[i]
          obj1[tempvar1] = arrayCopy[j][tempvar1]
        }
      }
      filteredArray.push(obj1)
    }
    return filteredArray
  }

  const searchFilterFiles = (value) => {
    let filteredArray = filterArray(filesStatic)
    let lowerCaseValue = value.toLowerCase()
    let temparr = []
    for (let i = 0; i < filteredArray.length; i++) {
      if (
        Object.values(filteredArray[i]).filter((item) =>
          typeof item === 'string' ? item.toLowerCase().includes(lowerCaseValue) : false
        ).length > 0
      ) {
        temparr.push(filteredArray[i])
      }
    }
    setFiles(temparr)
    setCurrentPage(1)
  }

  const FilePaginationData = useMemo(() => {
    if (files.length <= perPage) {
      setCurrentPage(1)
    }
    let tempdata = files
    const firstPageIndex = (currentPage - 1) * perPage
    const lastPageIndex = firstPageIndex + perPage
    return tempdata.slice(firstPageIndex, lastPageIndex)
  }, [currentPage, files, perPage, filesStatic, sortedBy])

  return (
    <div>
      <div>
        <button className='btn btn-sm btn-primary' onClick={() => setShowResultsForm(true)}>
          Back
        </button>
        <div className='w-100'>
          <div className='d-flex w-100 justify-content-between mt-3'>
            <div>
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
                  className='form-control form-control-solid w-250px ps-15'
                  onChange={(e) => searchFilterFiles(e.target.value)}
                  placeholder='Search Files'
                />
              </div>
            </div>
            <div className='d-flex'>
              <div>
                <p style={{margin: 'revert'}}>Items Per Page</p>
              </div>
              <div>
                <select
                  className='form-control form-control-solid form-select'
                  onChange={onPerPageChange}
                >
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                  <option value={150}>150</option>
                  <option value={200}>200</option>
                  <option value={300}>300</option>
                </select>
              </div>
            </div>
          </div>
          <div className='mt-4'>
            <div className='stickyHeaderTable table-responsive' style={{padding: '0rem 0rem'}}>
              <table
                className='table table-light table-rounded table-striped border border-2 table-hover mt-4 fs-6 gy-5'
                id='kt_files_table'
              >
                <thead>
                  <tr className='text-start table-dark text-gray-400 table-rounded fw-bolder fs-7 text-uppercase gs-0'>
                    <th
                      className='px-3 min-w-150px'
                      style={{cursor: 'pointer'}}
                      onClick={() => {
                        if (sortedBy !== 'formID') {
                          let finalSort = files.sort(
                            Sort_by('formID', false, (a) => a.toUpperCase())
                          )
                          setFiles(finalSort)
                          setSortedBy('formID')
                        } else if (sortedBy === 'formID') {
                          let finalSort = files.sort(
                            Sort_by('formID', true, (a) => a.toUpperCase())
                          )
                          setFiles(finalSort)
                          setSortedBy('')
                        }
                      }}
                    >
                      ID
                      <i
                        className={
                          sortedBy === 'formID' ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'
                        }
                      />
                    </th>
                    <th
                      className='min-w-150px'
                      style={{cursor: 'pointer'}}
                      onClick={() => {
                        if (sortedBy !== 'fileName') {
                          let finalSort = files.sort(
                            Sort_by('fileName', false, (a) => a.toUpperCase())
                          )
                          setFiles(finalSort)
                          setSortedBy('fileName')
                        } else if (sortedBy === 'fileName') {
                          let finalSort = files.sort(
                            Sort_by('fileName', true, (a) => a.toUpperCase())
                          )
                          setFiles(finalSort)
                          setSortedBy('')
                        }
                      }}
                    >
                      File Name
                      <i
                        className={
                          sortedBy === 'fileName' ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'
                        }
                      />
                    </th>
                    <th
                      className='min-w-150px'
                      style={{cursor: 'pointer'}}
                      onClick={() => {
                        if (sortedBy !== 'enteredBy') {
                          let finalSort = files.sort(
                            Sort_by('enteredBy', false, (a) => a.toUpperCase())
                          )
                          setFiles(finalSort)
                          setSortedBy('enteredBy')
                        } else if (sortedBy === 'enteredBy') {
                          let finalSort = files.sort(
                            Sort_by('enteredBy', true, (a) => a.toUpperCase())
                          )
                          setFiles(finalSort)
                          setSortedBy('')
                        }
                      }}
                    >
                      Entered By
                      <i
                        className={
                          sortedBy === 'enteredBy' ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'
                        }
                      />
                    </th>
                    <th
                      className='min-w-150px'
                      style={{cursor: 'pointer'}}
                      onClick={() => {
                        if (sortedBy !== 'type') {
                          let finalSort = files.sort(Sort_by('type', false, (a) => a.toUpperCase()))
                          setFiles(finalSort)
                          setSortedBy('type')
                        } else if (sortedBy === 'type') {
                          let finalSort = files.sort(Sort_by('type', true, (a) => a.toUpperCase()))
                          setFiles(finalSort)
                          setSortedBy('')
                        }
                      }}
                    >
                      Type
                      <i
                        className={
                          sortedBy === 'type' ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'
                        }
                      />
                    </th>
                    <th
                      className='px-3 min-w-150px'
                      style={{cursor: 'pointer'}}
                      //   onClick={() => {
                      //     if (sortedBy !== 'formID') {
                      //       let finalSort = files.sort(
                      //         Sort_by('formID', false, (a) => a.toUpperCase())
                      //       )
                      //       setFiles(finalSort)
                      //       setSortedBy('formID')
                      //     } else if (sortedBy === 'formID') {
                      //       let finalSort = files.sort(
                      //         Sort_by('formID', true, (a) => a.toUpperCase())
                      //       )
                      //       setFiles(finalSort)
                      //       setSortedBy('')
                      //     }
                      //   }}
                    >
                      mimetype
                    </th>
                    <th
                      className='min-w-100px'
                      style={{cursor: 'pointer'}}
                      onClick={() => {
                        if (sortedBy !== 'recievedDate') {
                          let finalSort = files.sort(Sort_by('recievedDate', false, parseInt))
                          setFiles(finalSort)
                          setSortedBy('recievedDate')
                        } else if (sortedBy === 'recievedDate') {
                          let finalSort = files.sort(Sort_by('recievedDate', true, parseInt))
                          setFiles(finalSort)
                          setSortedBy('')
                        }
                      }}
                    >
                      Recieved Date
                      <i
                        className={
                          sortedBy === 'recievedDate'
                            ? 'bi bi-caret-up-fill'
                            : 'bi bi-caret-down-fill'
                        }
                      />
                    </th>
                    <th
                      className='min-w-100px'
                      style={{cursor: 'pointer'}}
                      onClick={() => {
                        if (sortedBy !== 'uploadDate') {
                          let finalSort = files.sort(Sort_by('uploadDate', false, parseInt))
                          setFiles(finalSort)
                          setSortedBy('uploadDate')
                        } else if (sortedBy === 'uploadDate') {
                          let finalSort = files.sort(Sort_by('uploadDate', true, parseInt))
                          setFiles(finalSort)
                          setSortedBy('')
                        }
                      }}
                    >
                      Upload Date
                      <i
                        className={
                          sortedBy === 'uploadDate'
                            ? 'bi bi-caret-up-fill'
                            : 'bi bi-caret-down-fill'
                        }
                      />
                    </th>
                    <th className='min-w-50'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filesinfo.data.length > 0 ? (
                    filesinfo.data.map((file, index) => {
                      console.log(file)
                      return (
                        <Fragment key={index}>
                          <DocumentStorageSearchTableRow
                            file={file}
                            setDeleteFileId={setDeleteFileId}
                            dispatch={dispatch}
                            
                          />
                        </Fragment>
                      )
                    })
                  ) : (
                    <tr>
                      <td align='center' colSpan={12}>
                        <span className='text-gray-600 fs-2 fw-bolder'>
                          No Matching Files Found
                        </span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className='my-4'>
              <div className='d-flex justify-content-center' ref={PaginationRef}>
                <Pagination
                  className='pagination-bar'
                  currentPage={currentPage}
                  totalCount={files.length}
                  pageSize={perPage}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className='modal fade' id='kt_modal_delete_file' tabIndex={-1} aria-hidden='true'>
        <div className='modal-dialog modal-dialog-centered mw-600px mh-100px'>
          <div className='modal-content'>
            <div className='modal-header d-flex justify-content-center'>
              <h2 className='fw-bolder'>ARE YOU SURE YOU WANT TO DELETE THIS FILE?</h2>

            </div>

            <div className='modal-body scroll-y mx-lg-5'>
              <div className='d-flex justify-content-center'>
                <button
                  className='btn btn-danger me-3'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                  onClick={onDeleteFile}
                >
                  Confirm
                </button>
                <button className='btn btn-light me-3' data-bs-dismiss='modal' aria-label='Close'>
                  Discard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default DocumentStorageSearchTable
