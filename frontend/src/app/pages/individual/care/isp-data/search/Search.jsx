import React from 'react'
import {Link} from 'react-router-dom'

function Search() {
  return (
    <div>
      <div className='fv-row mb-7 fv-plugins-icon-container p-5 card'>
        <div className='card-body'>
        <h1 className='mb-4'>ISP Data (Search)</h1>
          <div className='row'>
            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
              <label className=' fw-bold fs-6 mb-2'>Program (Site)</label>
              <input
                type='text'
                name='user_name'
                className='form-control form-control-solid mb-3 mb-lg-0'
                placeholder='Program (Site)'
              ></input>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
              <label className=' fw-bold fs-6 mb-2'>Individual</label>
              <input
                type='text'
                name='user_name'
                className='form-control form-control-solid mb-3 mb-lg-0'
                placeholder=''
              ></input>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
              <label className=' fw-bold fs-6 mb-2'>Enterd By</label>
              <input
                type='text'
                name='user_name'
                className='form-control form-control-solid mb-3 mb-lg-0'
                placeholder=''
              ></input>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
              <label className=' fw-bold fs-6 mb-2'>Form Id</label>
              <input
                type='text'
                name='user_name'
                className='form-control form-control-solid mb-3 mb-lg-0'
                placeholder=''
              ></input>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
              <label className=' fw-bold fs-6 mb-2'>ISP Program Name</label>
              <input
                type='text'
                name='user_name'
                className='form-control form-control-solid mb-3 mb-lg-0'
                placeholder=''
              ></input>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
              <label className=' fw-bold fs-6 mb-2'>Status</label>
              <select className='form-select form-select-lg mb-3' aria-label='.form-select-lg example'>
                <option selected>Open this select menu</option>
                <option value='1'>Submitted</option>
                <option value='2'> Deleted</option>
              </select>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
              <label className=' fw-bold fs-6 mb-2'>Data Collected Date From</label>
              <input
                type='date'
                name='user_name'
                className='form-control form-control-solid mb-3 mb-lg-0'
                placeholder=''
              ></input>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
              <label className=' fw-bold fs-6 mb-2'>Data Collected Date To</label>
              <input
                type='date'
                name='user_name'
                className='form-control form-control-solid mb-3 mb-lg-0'
                placeholder=''
              ></input>
            </div>
          </div>
          <div className='d-flex flex-stack'>
            <div>
              <Link to='/individual/care'>
                <button className='btn btn-primary mt-4'>Cancel</button>
              </Link>
            </div>
            <div>
              <button className='btn btn-primary mt-4 me-4'>Search</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search