/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint no-unused-vars: "error" */
/* eslint-disable */
import React from 'react'
import { Link } from 'react-router-dom'
import { KTSVG } from '../../../../../../_metronic/helpers'
import { Graph2 } from '../../../../../../_helper/partials/widgets'


function GERRCard() {
  return (
    <>
      <div className={`card card-stretch-100 mb-xl-8`}>
        {/* begin::Body */}
        <div className='card-body p-0'>
          {/* begin::Header */}
          <div className={`px-9 pt-7 card-rounded  w-100`}>
            {/* begin::Heading */}
            <div className='d-flex flex-stack'>
              <h3 className='m-0 fw-bolder fs-3'>GER Resolution</h3>
            </div>
            {/* end::Heading */}
          </div>
          {/* end::Header */}
          <div className="card-body p-0">
            <div className="mixed-widget-2-chart card-rounded-bottom bg-white" data-kt-color="white" style={{ height: '100px' }} />
            {/* <Graph2
              chartColor='success'
              chartHeight='200px'
            /> */}
          </div>
          {/* begin::Items */}
          <div
            className='shadow-xs card-rounded mx-9 mb-9 px-6 py-9 position-relative z-index-1 bg-white'
            style={{ marginTop: '-70px' }}
          >
            {/* begin::Item */}
            <div className='d-flex align-items-center mb-6'>
              {/* begin::Symbol */}
              <div className='symbol symbol-45px w-40px me-5'>
                <div className="symbol-label bg-light-success">
                  {/*begin::Svg Icon | path: icons/duotune/ecommerce/ecm002.svg*/}
                  <span className="svg-icon svg-icon-1 svg-icon-success">
                    <KTSVG path="/media/icons/duotune/files/fil013.svg" />
                  </span>
                  {/*end::Svg Icon*/}
                </div>
              </div>
              {/* end::Symbol */}
              {/* begin::Description */}
              <div className='d-flex align-items-center flex-wrap w-100'>
                {/* begin::Title */}
                <div className='mb-1 pe-3 flex-grow-1'>
                  <div className='fs-5 text-gray-800 text-hover-success fw-bolder'>
                    <Link style={{ color: "inherit" }} to="/care/ger-resolution/new" >New</Link>
                  </div>
                </div>
                {/* end::Title */}
              </div>
              {/* end::Description */}
            </div>
            {/* end::Item */}
            {/* begin::Item */}
            <div className='d-flex align-items-center mb-6'>
              {/* begin::Symbol */}
              <div className='symbol symbol-45px w-40px me-5'>
                <div className="symbol-label bg-light-primary">
                  {/*begin::Svg Icon | path: icons/duotune/ecommerce/ecm010.svg*/}
                  <span className="svg-icon svg-icon-1 svg-icon-primary">
                  <KTSVG path="/media/icons/duotune/text/txt009.svg" />
                  </span>
                  {/*end::Svg Icon*/}
                </div>
              </div>
              {/* end::Symbol */}
              {/* begin::Description */}
              <div className='d-flex align-items-center flex-wrap w-100'>
                {/* begin::Title */}
                <div className='mb-1 pe-3 flex-grow-1'>
                  <div className='fs-5 text-gray-800 text-hover-primary fw-bolder'>
                    <Link style={{ color: "inherit" }} to="/care/ger-resolution/unaddressed-gers" >Unaddressed GERs</Link>
                  </div>
                </div>
                {/* end::Title */}

              </div>
              {/* end::Description */}
            </div>
            {/* end::Item */}
            {/* begin::Item */}
            <div className='d-flex align-items-center mb-6'>
              {/* begin::Symbol */}
              <div className='symbol symbol-45px w-40px me-5'>
                <div className="symbol-label bg-light-info">
                  {/*begin::Svg Icon | path: icons/duotune/ecommerce/ecm010.svg*/}
                  <span className="svg-icon svg-icon-1 svg-icon-info">
                    <KTSVG path="/media/icons/duotune/text/txt009.svg" />
                  </span>
                  {/*end::Svg Icon*/}
                </div>
              </div>
              {/* end::Symbol */}
              {/* begin::Description */}
              <div className='d-flex align-items-center flex-wrap w-100'>
                {/* begin::Title */}
                <div className='mb-1 pe-3 flex-grow-1'>
                  <div className='fs-5 text-gray-800 text-hover-info fw-bolder'>
                    <Link style={{ color: "inherit" }} to="/care/ger-resolution/open-resolution" >Open Resolutions</Link>
                  </div>
                </div>
                {/* end::Title */}

              </div>
              {/* end::Description */}
            </div>
            {/* end::Item */}
            {/* begin::Item */}
            <div className='d-flex align-items-center mb-6'>
              {/* begin::Symbol */}
              <div className="symbol symbol-50px me-3">
                <div className="symbol-label bg-light-danger">
                  {/*begin::Svg Icon | path: icons/duotune/ecommerce/ecm002.svg*/}
                  <span className="svg-icon svg-icon-1 svg-icon-danger">
                    <KTSVG path="/media/icons/duotune/text/txt009.svg" />
                  </span>
                  {/*end::Svg Icon*/}
                </div>
              </div>
              {/* end::Symbol */}
              {/* begin::Description */}
              <div className='d-flex align-items-center flex-wrap w-100'>
                {/* begin::Title */}
                <div className='mb-1 pe-3 flex-grow-1'>
                  <div className='fs-5 text-gray-800 text-hover-danger fw-bolder'>
                    <Link style={{ color: "inherit" }} to="/care/ger-resolution/open-investigation" >Open Investigations</Link>
                  </div>
                </div>
                {/* end::Title */}

              </div>
              {/* end::Description */}
            </div>
            {/* end::Item */}
            {/* begin::Item */}
            <div className='d-flex align-items-center'>
              {/* begin::Symbol */}
              <div className="symbol symbol-50px me-3">
                <div className="symbol-label bg-light-info">
                  {/*begin::Svg Icon | path: icons/duotune/ecommerce/ecm010.svg*/}
                  <span className="svg-icon svg-icon-1 svg-icon-warning">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.7 18.9L18.6 15.8C17.9 16.9 16.9 17.9 15.8 18.6L18.9 21.7C19.3 22.1 19.9 22.1 20.3 21.7L21.7 20.3C22.1 19.9 22.1 19.3 21.7 18.9Z" fill="black" />
                      <path opacity="0.3" d="M11 20C6 20 2 16 2 11C2 6 6 2 11 2C16 2 20 6 20 11C20 16 16 20 11 20ZM11 4C7.1 4 4 7.1 4 11C4 14.9 7.1 18 11 18C14.9 18 18 14.9 18 11C18 7.1 14.9 4 11 4ZM8 11C8 9.3 9.3 8 11 8C11.6 8 12 7.6 12 7C12 6.4 11.6 6 11 6C8.2 6 6 8.2 6 11C6 11.6 6.4 12 7 12C7.6 12 8 11.6 8 11Z" fill="black" />
                    </svg>
                  </span>
                  {/*end::Svg Icon*/}
                </div>
              </div>
              {/* end::Symbol */}
              {/* begin::Description */}
              <div className='d-flex align-items-center flex-wrap w-100'>
                {/* begin::Title */}
                <div className='mb-1 pe-3 flex-grow-1'>
                  <div className='fs-5 text-gray-800 text-hover-warning fw-bolder'>
                    <Link style={{ color: "inherit" }} to="/care/ger-resolution/search" >Search</Link>
                  </div>
                </div>
                {/* end::Title */}

              </div>
              {/* end::Description */}
            </div>
            {/* end::Item */}
          </div>
          {/* end::Items */}
        </div>
        {/* end::Body */}
      </div>











    </>
  )
}

export default GERRCard