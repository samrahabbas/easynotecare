import axios from 'axios'
import moment from 'moment'
import {agencyDocumentDelete} from '../../../store'

const DocumentStorageSearchTableRow = ({file, setDeleteFileId, dispatch}) => {
  return (
    <tr>
      <td className='px-3'>
        <span className='text-gray-800 text-hover-primary mb-1' style={{cursor: 'pointer'}}>
          {file._id}
        </span>
      </td>
      <td>
        <span className='text-gray-800 text-hover-primary mb-1' style={{cursor: 'pointer'}}>
          {file.name}
        </span>
      </td>
      <td>
        <span className='text-gray-800 text-hover-primary mb-1' style={{cursor: 'pointer'}}>
          {`${file.enteredBy?.firstName} ${file.enteredBy?.lastName}`}
        </span>
      </td>
      <td>
        <span className='text-gray-800 text-hover-primary mb-1' style={{cursor: 'pointer'}}>
          {file.type}
        </span>
      </td>
      <td>
        <span className='text-gray-800 text-hover-primary mb-1' style={{cursor: 'pointer'}}>
          {file.mimetype}
        </span>
      </td>
      <td>
        <span className='text-gray-800 text-hover-primary mb-1' style={{cursor: 'pointer'}}>
          {moment(file.receivedDate).calendar()}
        </span>
      </td>
      <td>
        <span className='text-gray-800 text-hover-primary mb-1' style={{cursor: 'pointer'}}>
          {moment(file.createdAt).calendar()}
        </span>
      </td>
      <td className='text-gray-800 mb-1 justify-content-between'>
        <div className='d-flex justify-content-between'>
          <button
            className='btn btn-icon btn-icon-primary btn-sm me-1'
            onClick={async () => {
              const response = await axios.get('/agency/download/63ea340b13c254896a3525c5', {
                responseType: 'blob',
              })
              if (response.data.error) {
                console.error(response.data.error)
              }

              const fileURL = window.URL.createObjectURL(new Blob([response.data]))
              const fileLink = document.createElement('a')
              fileLink.href = fileURL
              //   const fileName = response.headers['content-disposition']
              const fileName = response.headers['content-disposition']
                .split('filename=')[1]
                .replace(/'/g, '')
              //   const [, fileName] = response.headers['content-disposition'].split('filename=');
              fileLink.setAttribute('download', fileName)
              fileLink.setAttribute('target', '_blank')
              document.body.appendChild(fileLink)
              fileLink.click()
              fileLink.remove()
            }}
          >
            <span className='svg-icon svg-icon-3'>
              <i className='bi bi-download'></i>
            </span>
          </button>

          <button
            data-bs-toggle='modal'
            // data-bs-target='#kt_modal_delete_file'
            data-bs-target={`#kt_modal_delete_file_${file._id}`}
            className='btn btn-icon btn-icon-danger btn-sm me-1'
            onClick={() => {
              setDeleteFileId(file.formID)
            }}
          >
            <span className='svg-icon svg-icon-3'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width={24}
                height={24}
                viewBox='0 0 24 24'
                fill='none'
              >
                <path
                  d='M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z'
                  fill='black'
                />
                <path
                  opacity='0.5'
                  d='M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z'
                  fill='black'
                />
                <path
                  opacity='0.5'
                  d='M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z'
                  fill='black'
                />
              </svg>
            </span>
          </button>

          {/* MODAL FOR DELETING FILES */}
          <div
            className='modal fade'
            id={`kt_modal_delete_file_${file._id}`}
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
                  <h2 className='fw-bolder'>ARE YOU SURE YOU WANT TO DELETE THIS FILE?</h2>
                  {/* <h3 className='fw-bolder'>File Name: {file.name}</h3> */}
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
                      onClick={async () => {
                        const response = await dispatch(agencyDocumentDelete(file._id))
                      }}
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
      </td>
    </tr>
  )
}

export default DocumentStorageSearchTableRow
