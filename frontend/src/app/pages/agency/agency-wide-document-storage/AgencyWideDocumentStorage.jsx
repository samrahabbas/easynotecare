import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {Graph2} from '../../../../_helper/partials/widgets'

// [maybe] this component is not used
function AgencyWideDocumentStorage() {
  const location = useLocation()
  // console.log("asdasd")
  return (
    <div>
      <div className='card mb-5 mb-xl-10'>
        <div className='card-body pt-9 pb-0'>
          <p className='text-gray-800 fs-2 fw-bolder'>Document Storage</p>
          <div className='d-flex overflow-auto h-55px'>
            <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
              <li className='nav-item'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === '/agency-wide-document-storage/document-storage/new' && 'active')
                  }
                  to='/agency-wide-document-storage/document-storage/new'
                >
                  News
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === '/agency-wide-document-storage/document-storage/search' && 'active')
                  }
                  to='/agency-wide-document-storage/document-storage/search'
                >
                  Search
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
  // return (
  //   <div>
  //        {/*begin::Mixed Widget 3*/}
  //        <div className="card card-xl-stretch mb-xl-8">
  //       {/*begin::Beader*/}
  //       <div className="card-header border-0 py-5">
  //         <h3 className="card-title align-items-start flex-column">
  //           <span className="card-label fw-bolder fs-3 mb-1">Document Storage</span>
  //           {/* <span className="text-muted fw-bold fs-7">Recent sales statistics</span> */}
  //         </h3>
         
  //       </div>
  //       {/*end::Header*/}
  //       {/*begin::Body*/}
  //       <div className="card-body p-0 d-flex flex-column">
  //         {/*begin::Stats*/}
  //         <div className="card-p pt-5 bg-body flex-grow-1">
  //           {/*begin::Row*/}
  //           <div className="row g-0">
             
  //     {/*begin::Row*/}
  //     <div className="row g-0">
  //       {/*begin::Col*/}
  //       <div className="col bg-light-success px-6 py-8 rounded-2 me-7 mb-7">
  //         {/*begin::Svg Icon | path: icons/duotune/general/gen032.svg*/}
  //         <span className="svg-icon svg-icon-3x svg-icon-success d-block my-2">
  //           <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
  //             <rect x={8} y={9} width={3} height={10} rx="1.5" fill="black" />
  //             <rect opacity="0.5" x={13} y={5} width={3} height={14} rx="1.5" fill="black" />
  //             <rect x={18} y={11} width={3} height={8} rx="1.5" fill="black" />
  //             <rect x={3} y={13} width={3} height={6} rx="1.5" fill="black" />
  //           </svg>
  //         </span>
  //         {/*end::Svg Icon*/}
  //         <Link className="text-success fw-bold fs-6" to="/agency-wide-document-storage/document-storage/new">News</Link>
  //       </div>
  //       {/*end::Col*/}
  //       {/*begin::Col*/}
  //       <div className="col bg-light-danger px-6 py-8 rounded-2 mb-7">
  //       <div className="symbol-label bg-light-danger text-danger mt-4">
  //               {/*begin::Svg Icon | path: icons/duotune/ecommerce/ecm010.svg*/}
  //               <svg width="30" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  //               <path d="M21.7 18.9L18.6 15.8C17.9 16.9 16.9 17.9 15.8 18.6L18.9 21.7C19.3 22.1 19.9 22.1 20.3 21.7L21.7 20.3C22.1 19.9 22.1 19.3 21.7 18.9Z" fill="black"/>
  //               <path opacity="0.3" d="M11 20C6 20 2 16 2 11C2 6 6 2 11 2C16 2 20 6 20 11C20 16 16 20 11 20ZM11 4C7.1 4 4 7.1 4 11C4 14.9 7.1 18 11 18C14.9 18 18 14.9 18 11C18 7.1 14.9 4 11 4ZM8 11C8 9.3 9.3 8 11 8C11.6 8 12 7.6 12 7C12 6.4 11.6 6 11 6C8.2 6 6 8.2 6 11C6 11.6 6.4 12 7 12C7.6 12 8 11.6 8 11Z" fill="black"/>
  //               </svg>
 
  //               {/*end::Svg Icon*/}
  //             </div>
  //         <Link to="/agency-wide-document-storage/document-storage/search" className="text-danger fw-bold fs-6">Search</Link>
  //       </div>
  //       {/*end::Col*/}
  //     </div>
  //     {/*end::Row*/}
             
            
            
  //           </div>

  //           {/*end::Row*/}
            
          
  //         </div>
  //         {/*end::Stats*/}
  //         {/*begin::Chart*/}
  //         <Graph2
  //         chartColor="success"
  //         chartHeight="150px"
  //         />
  //         {/*end::Chart*/}
  //       </div>
  //       {/*end::Body*/}
  //     </div>
  //     {/*end::Mixed Widget 3*/}



















  //   </div>











  // )
}

export default AgencyWideDocumentStorage
