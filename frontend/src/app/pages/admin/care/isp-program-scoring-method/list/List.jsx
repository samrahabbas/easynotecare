/* eslint-disable */
import React from 'react'
import { Link } from 'react-router-dom'

function List() {
  return (
    <div>
      <h3 className='p-7'>Scoring Method (List)</h3>
      <div className='card'>
        <div className='card-body'>
          <h1 className='text-center p-7'>Nothing found to display</h1>
        </div>
      </div>

      <div className='fv-row mb-7 p-5 card'>
        <div className='d-flex justify-content-start'>
          <div>
            <Link to='#'>
              <div><b>Create New Scoring Method</b></div>
            </Link>
          </div>
        </div>
      </div>

      <div className='fv-row mb-7 p-5 card'>
        <div className='d-flex justify-content-start'>
          <div>
            <Link to='/care/isp-program-scoring-method'>
              <button className='btn btn-primary mt-4 me-4'>Cancel</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default List