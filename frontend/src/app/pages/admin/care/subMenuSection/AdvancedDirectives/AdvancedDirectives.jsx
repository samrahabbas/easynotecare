import { Formik, Form, Field } from "formik"
import { useState } from "react"
const AdvancedDirectives = ({ client }) => {
  const [showEditingForm, setShowEditingForm] = useState(true)
  const [directivesData, setDirectivesData] = useState({
    advancedDirectives: {
      date: '',
      files: ''
    },

    dnrOrder: {
      date: '',
      files: ''
    },

    healthCareAttr: {
      date: '',
      files: ''
    },

    livingWill: {
      date: '',
      files: ''
    },

    prefferedIntervention: {
      date: '',
      files: ''
    },

    comments: ''
  })
  return (
    <div>
      {
        showEditingForm ?
          <div>
            <div className="d-flex">
              <div>
                <button className='btn btn-primary btn-sm' onClick={() => setShowEditingForm(false)}>Edit</button>
              </div>
            </div>
            <div className="row my-7" style={{ border: "1px solid #80808045" }}>
              <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                <label className="fw-bold fs-6 mb-2 w-100">Advanced Directives</label>
                <label className="fs-7 mb-2 w-100">Date</label>
                <label className="fs-7 mb-2 w-100">{directivesData.advancedDirectives.date}</label>
                <label className="fs-7 mb-2 w-100">Files</label>
                <label className="fs-7 mb-2 w-100">{directivesData.advancedDirectives.files}</label>
              </div>
              <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                <label className="fw-bold fs-6 mb-2 w-100">DNR Order</label>
                <label className="fs-7 mb-2 w-100">Date</label>
                <label className="fs-7 mb-2 w-100">{directivesData.dnrOrder.date}</label>
                <label className="fs-7 mb-2 w-100">Files</label>
                <label className="fs-7 mb-2 w-100">{directivesData.dnrOrder.files}</label>
              </div>
              <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                <label className="fw-bold fs-6 mb-2 w-100">Attorney for Health Care</label>
                <label className="fs-7 mb-2 w-100">Date</label>
                <label className="fs-7 mb-2 w-100">{directivesData.healthCareAttr.date}</label>
                <label className="fs-7 mb-2 w-100">Files</label>
                <label className="fs-7 mb-2 w-100">{directivesData.healthCareAttr.files}</label>
              </div>
              <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                <label className="fw-bold fs-6 mb-2 w-100">Living Will</label>
                <label className="fs-7 mb-2 w-100">Date</label>
                <label className="fs-7 mb-2 w-100">{directivesData.livingWill.date}</label>
                <label className="fs-7 mb-2 w-100">Files</label>
                <label className="fs-7 mb-2 w-100">{directivesData.livingWill.files}</label>
              </div>
              <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                <label className="fw-bold fs-6 mb-2 w-100">Preferred Intervention for Known Condition</label>
                <label className="fs-7 mb-2 w-100">Date</label>
                <label className="fs-7 mb-2 w-100">{directivesData.prefferedIntervention.date}</label>
                <label className="fs-7 mb-2 w-100">Files</label>
                <label className="fs-7 mb-2 w-100">{directivesData.prefferedIntervention.files}</label>
              </div>
              <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                <label className="fw-bold fs-6 mb-2 w-100">Comments</label>
                <label className="fs-7 mb-2 w-100">{directivesData.comments}</label>
              </div>
            </div>
          </div>
          :
          <div>
            <Formik
              initialValues={{
                directivesDate: directivesData.advancedDirectives.date,
                directivesFiles: directivesData.advancedDirectives.files,
                dnrOrderDate: directivesData.dnrOrder.date,
                dnrOrderFiles: directivesData.dnrOrder.files,
                healthCareAttrDate: directivesData.healthCareAttr.date,
                healthCareAttrFiles: directivesData.healthCareAttr.files,
                livingWillDate: directivesData.livingWill.date,
                livingWillFiles: directivesData.livingWill.files,
                prefferedInterventionDate: directivesData.prefferedIntervention.date,
                prefferedInterventionFiles: directivesData.prefferedIntervention.files,
                comments: directivesData.comments
              }}
              onSubmit={(values, { setSubmitting }) => {
                console.log("values", values)
              }}>
              {({ isSubmitting, resetForm, values }) => (
                <Form>
                  <div className='d-flex'>
                    <div>
                      <button className='btn btn-primary btn-sm me-4' onClick={() => {
                        resetForm()
                        setShowEditingForm(true)
                      }}>Cancel</button>
                    </div>
                    <div>
                      <button type="submit" className='btn btn-primary btn-sm'>Save</button>
                    </div>
                  </div>
                  <div>
                    <div className="row">
                      <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                        <label className="fw-bold fs-6 mb-2 w-100">Advanced Directives</label>
                        <label className="fs-7 mb-2 w-100">Date</label>
                        <Field
                          type='date'
                          name='directivesDate'
                          className='form-control form-control-solid mb-3 mb-lg-0'
                          placeholder=''
                        ></Field>
                        <label className="fs-7 mb-2 w-100">Files</label>
                        <Field type="file" name="directivesFiles"
                          className='form-control form-control-solid mb-3 mb-lg-0'></Field>
                      </div>

                      <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                        <label className="fw-bold fs-6 mb-2 w-100">DNR Order</label>
                        <label className="fs-7 mb-2 w-100">Date</label>
                        <Field
                          type='date'
                          name='dnrOrderDate'
                          className='form-control form-control-solid mb-3 mb-lg-0'
                          placeholder=''
                        ></Field>
                        <label className="fs-7 mb-2 w-100">Files</label>
                        <Field type="file" name="dnrOrderFiles"
                          className='form-control form-control-solid mb-3 mb-lg-0'></Field>
                      </div>

                      <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                        <label className="fw-bold fs-6 mb-2 w-100">Attorney for Health Care</label>
                        <label className="fs-7 mb-2 w-100">Date</label>
                        <Field
                          type='date'
                          name='healthCareAttrDate'
                          className='form-control form-control-solid mb-3 mb-lg-0'
                          placeholder=''
                        ></Field>
                        <label className="fs-7 mb-2 w-100">Files</label>
                        <Field type="file" name="healthCareAttrFiles"
                          className='form-control form-control-solid mb-3 mb-lg-0'></Field>
                      </div>

                      <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                        <label className="fw-bold fs-6 mb-2 w-100">Living Will</label>
                        <label className="fs-7 mb-2 w-100">Date</label>
                        <Field
                          type='date'
                          name='livingWillDate'
                          className='form-control form-control-solid mb-3 mb-lg-0'
                          placeholder=''
                        ></Field>
                        <label className="fs-7 mb-2 w-100">Files</label>
                        <Field type="file" name="livingWillFiles"
                          className='form-control form-control-solid mb-3 mb-lg-0'></Field>
                      </div>

                      <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                        <label className="fw-bold fs-6 mb-2 w-100">Preferred Intervention for Known Condition</label>
                        <label className="fs-7 mb-2 w-100">Date</label>
                        <Field
                          type='date'
                          name='prefferedInterventionDate'
                          className='form-control form-control-solid mb-3 mb-lg-0'
                          placeholder=''
                        ></Field>
                        <label className="fs-7 mb-2 w-100">Files</label>
                        <Field type="file" name="prefferedInterventionFiles"
                          className='form-control form-control-solid mb-3 mb-lg-0'></Field>
                      </div>

                      <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                        <label className="fw-bold fs-6 mb-2 w-100">Comments</label>
                        <Field as="textarea" name="comments" rows="4"
                          className='form-control form-control-solid mb-3 mb-lg-0'></Field>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
      }
    </div>
  )
}

export default AdvancedDirectives