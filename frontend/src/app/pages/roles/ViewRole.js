import { useEffect, useState } from 'react'
import { useHistory, Link } from "react-router-dom";

const ViewRole = ({ location }) => {
  const [roleObj, setRoleObj] = useState({})
  const [objToggle, setObjToggle] = useState(false)
  const history = useHistory();
  useEffect(() => {
    if (!location || !location.roledata) {
      history.push('/roles')
    } else {
      setObjToggle(true)
      setRoleObj(location.roledata)
    }
  }, [])
  return (
    <>
      <div className='d-flex justify-content-center'>
        {objToggle === true ?
          <div className="card card-flush h-md-100 w-75">
            {/*begin::Card header*/}
            <div className="card-header">
              {/*begin::Card title*/}
              <div className="card-title">
                <h2 className="fw-bolder">{roleObj.role.roleName}</h2>
              </div>
              <div className="btn btn-icon btn-sm btn-active-icon-primary mt-6">
                <Link to={'/roles'} className="btn btn-light btn-active-primary my-1 me-2" >Back</Link>
              </div>
            </div>
            <div className="card-body pt-1">
              <div className="d-flex flex-column scroll-y" id="kt_modal_update_role_scroll" data-kt-scroll="true" 
              data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" 
              data-kt-scroll-dependencies="#kt_modal_update_role_header" 
              data-kt-scroll-wrappers="#kt_modal_update_role_scroll" data-kt-scroll-offset="250px">
                {/*begin::Input group*/}
                {/*begin::Permissions*/}
                <div className="fv-row">
                  {/*begin::Label*/}
                  <label className="fs-5 fw-bolder form-label mb-2">Role Permissions</label>
                  {/*end::Label*/}
                  {/*begin::Table wrapper*/}
                  <div className="table-responsive">
                    {/*begin::Table*/}
                    <table className="table align-middle table-row-dashed fs-6 gy-5">
                      {/*begin::Table body*/}
                      <tbody className="text-gray-600 fw-bold">
                        {/*begin::Table row*/}
                        {roleObj.rolesProperties.map((prop, index) => (
                          <tr key={index}>
                            <td className='text-gray-800'>{prop}</td>
                            <td>
                              {/*begin::Wrapper*/}
                              <div className="d-flex">
                                <label className="form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">
                                  <input className="form-check-input" type="checkbox" defaultChecked={roleObj.role[prop]["read"]} property='read' name={prop} />
                                  <span className="form-check-label">Read</span>
                                </label>
                                {/*end::Checkbox*/}
                                {/*begin::Checkbox*/}
                                <label className="form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">
                                  <input className="form-check-input" type="checkbox" defaultChecked={roleObj.role[prop]["write"]} property='write' name={prop} />
                                  <span className="form-check-label">Write</span>
                                </label>
                                {/*end::Checkbox*/}
                                {/*begin::Checkbox*/}
                                <label className="form-check form-check-sm form-check-custom form-check-solid">
                                  <input className="form-check-input" type="checkbox" defaultChecked={roleObj.role[prop]["create"]} property='create' name={prop} />
                                  <span className="form-check-label">Create</span>
                                </label>
                                {/*end::Checkbox*/}
                              </div>
                              {/*end::Wrapper*/}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          :
          <div className='card py-6 px-6 w-75 d-flex justify-content-center'>
            <div>
              <h2 className='pt-5'>No Role Found</h2>
              <div className="d-flex justify-content-center">
                <Link to={'/roles'} className="btn btn-light btn-active-primary my-1 me-2" >Back</Link>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default ViewRole