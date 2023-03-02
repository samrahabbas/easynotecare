/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable */
import React from "react"
import { Link } from "react-router-dom"
import { KTSVG } from "../../../../../../_metronic/helpers"
import { Graph2 } from "../../../../../../_helper/partials/widgets"
function ISPProgramCard() {
  return (
    <>
      {/* <div className="card card-flush h-md-100">
        <div className="card-header">
          <div className="card-title">
            <h2>ISP Program</h2>
          </div>
        </div>
        <div className="card-body pt-1">
          <div className="d-flex flex-column text-gray-600">
            <div className="d-flex align-items-center text-hover-primary py-2">
              <span className="bullet bg-primary me-3" />
              <Link style={{color: "inherit"}} to="/care/isp-program/new">
                New
              </Link>
            </div>
            <div className="d-flex align-items-center text-hover-primary py-2">
              <span className="bullet bg-primary me-3" />
              <Link style={{color: "inherit"}} to="/care/isp-program/search">
                Search
              </Link>
            </div>
          </div>
        </div>
      </div> */}


      {/*begin::Mixed Widget 3*/}
      <div className="card card-stretch-75 mb-xl-8">
        {/*begin::Beader*/}
        <div className="card-header border-0 py-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bolder fs-3 mb-1">ISP Program</span>
            {/* <span className="text-muted fw-bold fs-7">Recent sales statistics</span> */}
          </h3>

        </div>
        {/*end::Header*/}
        {/*begin::Body*/}
        <div className="card-body p-0 d-flex flex-column">
          {/*begin::Stats*/}
          <div className="card-p pt-5 bg-body flex-grow-1">
            {/*begin::Row*/}
            <div className="row g-0">

              {/*begin::Row*/}
              <div className="row g-0">
                {/*begin::Col*/}
                <div className="col bg-light-success px-6 py-8 rounded-2 me-7 mb-7">
                  {/*begin::Svg Icon | path: icons/duotune/general/gen032.svg*/}
                  <span className="svg-icon svg-icon-3x svg-icon-success d-block my-2">
                    <KTSVG path="/media/icons/duotune/files/fil013.svg" />
                  </span>
                  {/*end::Svg Icon*/}
                  <Link className="text-success fw-bold fs-6" to="/care/isp-program/new">New</Link>
                </div>
                {/*end::Col*/}
                {/*begin::Col*/}
                <div className="col bg-light-danger px-6 py-8 rounded-2 mb-7">
                  {/*begin::Svg Icon | path: icons/duotune/finance/fin006.svg*/}
                  <span className="svg-icon svg-icon-3x svg-icon-danger d-block my-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.7 18.9L18.6 15.8C17.9 16.9 16.9 17.9 15.8 18.6L18.9 21.7C19.3 22.1 19.9 22.1 20.3 21.7L21.7 20.3C22.1 19.9 22.1 19.3 21.7 18.9Z" fill="black" />
                      <path opacity="0.3" d="M11 20C6 20 2 16 2 11C2 6 6 2 11 2C16 2 20 6 20 11C20 16 16 20 11 20ZM11 4C7.1 4 4 7.1 4 11C4 14.9 7.1 18 11 18C14.9 18 18 14.9 18 11C18 7.1 14.9 4 11 4ZM8 11C8 9.3 9.3 8 11 8C11.6 8 12 7.6 12 7C12 6.4 11.6 6 11 6C8.2 6 6 8.2 6 11C6 11.6 6.4 12 7 12C7.6 12 8 11.6 8 11Z" fill="black" />
                    </svg>
                  </span>
                  {/*end::Svg Icon*/}
                  <Link to="/care/isp-program/search" className="text-danger fw-bold fs-6">Search</Link>
                </div>
                {/*end::Col*/}
              </div>
              {/*end::Row*/}
            </div>
            {/*end::Row*/}
          </div>
          {/*end::Stats*/}
          {/*begin::Chart*/}
          {/* <Graph2
            chartColor="success"
            chartHeight="150px"
          /> */}
          {/*end::Chart*/}
        </div>
        {/*end::Body*/}
      </div>
      {/*end::Mixed Widget 3*/}






    </>
  )
}

export default ISPProgramCard
