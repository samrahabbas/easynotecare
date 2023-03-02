import React from 'react'
import {Link} from 'react-router-dom'

function View() {
  return (
    <div>
      <div className='fv-row mb-7 fv-plugins-icon-container p-5 card'>
        <div className='card-body'>
          <h1 className='mb-4'>Event Summaries (View)</h1>
          <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
            <label className=' fw-bold fs-6 mb-2'>Program Site</label>
            <input
              type='text'
              name='user_name'
              className='form-control form-control-solid mb-3 mb-lg-0'
              placeholder='Search'
            ></input>
          </div>
          <div className='row'>
            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
              <label className=' fw-bold fs-6 mb-2'>Event Date From</label>
              <input
                type='date'
                name='user_name'
                className='form-control form-control-solid mb-3 mb-lg-0'
                placeholder=''
              ></input>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
              <label className=' fw-bold fs-6 mb-2'>Event Date To</label>
              <input
                type='date'
                name='user_name'
                className='form-control form-control-solid mb-3 mb-lg-0'
                placeholder=''
              ></input>
            </div>
            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
              <label className=' fw-bold fs-6 mb-2'>Period</label>
              <div className='form-check mt-2 mb-4'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='exampleRadios'
                  id='exampleRadios1'
                  value='option1'
                />
                <label className='form-check-label' for='exampleRadios1'>
                  Daily
                </label>
              </div>
              <div className='form-check mt-2 mb-4'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='exampleRadios'
                  id='exampleRadios2'
                  value='option2'
                />
                <label className='form-check-label' for='exampleRadios2'>
                  Weekly
                </label>
              </div>
              <div className='form-check mt-2 mb-4'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='exampleRadios'
                  id='exampleRadios3'
                  value='option3'
                />
                <label className='form-check-label' for='exampleRadios2'>
                  Monthly
                </label>
              </div>
              <div className='form-check mt-2 mb-4'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='exampleRadios'
                  id='exampleRadios4'
                  value='option4'
                />
                <label className='form-check-label' for='exampleRadios2'>
                  Quarterly
                </label>
              </div>
              <div className='form-check mt-2 mb-4'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='exampleRadios'
                  id='exampleRadios5'
                  value='option5'
                />
                <label className='form-check-label' for='exampleRadios2'>
                  Annually
                </label>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
              <label className=' fw-bold fs-6 mb-2'>Status</label>
              <select className='form-select form-select-lg mb-3' aria-label='.form-select-lg example'>
                <option selected>Open this select menu</option>
                <option value='1'>In Prep</option>
                <option value='2'>Pending Approval</option>
                <option value='3'>Approved</option>
                <option value='3'>Returned</option>
              </select>
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

export default View