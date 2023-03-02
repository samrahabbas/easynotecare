import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import SubMenuSection from '../SubMenuSection'
import HealthProfileMenu from './HealthProfileMenu'
import AdvancedDirectives from '../AdvancedDirectives/AdvancedDirectives'
import AllergyList from '../AllergyProfile/AllergyList'
import DiagnosticsList from '../Diagnostics List/DiagnosticsList'
import AllergyTypeTable from '../AllergyProfile/AllergyType/AllergyTypeTable'
import DiagnosticsTypeTable from '../Diagnostics List/DiagnosticsType/DiagnosticsTypeTable'
import axios from 'axios'

const HealthBody = ({ location }) => {
  const [client, setClient] = useState({})
  const [mainHealth, setMainHealth] = useState(true)
  const [diagnosisSection, setDiagnosisSection] = useState(false)
  const [diagnosisTypeSection, setDiagnosisTypeSection] = useState(false)
  const [allergySection, setAllergySection] = useState(false)
  const [allergyTypeSection, setAllergyTypeSection] = useState(false)
  const [directivesSection, setDirectivesSection] = useState(false)
  const [editHealthProfile, setEditHealthProfile] = useState({
    heightFeet: '',
    heightInch: '',
    weightRangeFrom: '',
    weightRangeTo: '',
    temperatureFrom: '',
    temperatureTo: '',
    pulseFrom: '',
    pulseTo: '',
    oxygenSaturationFrom: '',
    oxygenSaturationTo: '',
    respirationFrom: '',
    respirationTo: '',
    bloodSystolicFrom: '',
    bloodSystolicTo: '',
    bloodDiastolicFrom: '',
    bloodDiastolicTo: '',
  })

  const history = useHistory()
  useEffect(() => {
    if (location.state !== undefined) {
      setClient(location.state)
    } else {
      history.push('/care/individual-intake/list')
    }
  }, [])
  
  return (
    <div>
      <HealthProfileMenu client={client} setMainHealth={setMainHealth} setDiagnosisSection={setDiagnosisSection}
        setAllergySection={setAllergySection} setDirectivesSection={setDirectivesSection} 
        setAllergyTypeSection={setAllergyTypeSection} setDiagnosisTypeSection={setDiagnosisTypeSection}/>
      <div className="card mb-5 col-mb-10" id="kt-content">
        <div className="post d-flex flex-column-fluid" id="kt_post">
          <div className="container-xxl" id="kt_content-container">
            <div className="mt-6 mx-6">
              <SubMenuSection individual={client} />
            </div>
            <div className="card-body">
              {
                diagnosisSection ? <DiagnosticsList client={client} /> :
                  allergySection ? <AllergyList client={client} /> :
                    directivesSection ? <AdvancedDirectives client={client} /> :
                    allergyTypeSection ? <AllergyTypeTable /> : 
                    diagnosisTypeSection ? <DiagnosticsTypeTable /> : 
                      <div>
                        <Formik
                          initialValues={editHealthProfile}
                          onSubmit={(values, { setSubmitting }) => {
                            let tempObj ={ 
                                clientID: client.formID,
                                healthInfo: values
                            }
                            axios.put("/health/updateHealthDetails", tempObj)
                          }}>
                          {({ isSubmitting, resetForm, values }) => (
                            <Form>
                              <div>
                                <div className="d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary btn-sm">
                                        Save
                                    </button>
                                </div>
                                <div className="row">
                                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Height (Feet)</label>
                                    <Field as="select" name="heightFeet" className='form-select form-select-lg mb-3' aria-label='.form-select-lg example'>
                                      <option hidden>Select Feet</option>
                                      <option value={0}>0</option>
                                      <option value={1}>1</option>
                                      <option value={2}>2</option>
                                      <option value={3}>3</option>
                                      <option value={4}>4</option>
                                      <option value={5}>5</option>
                                      <option value={6}>6</option>
                                      <option value={7}>7</option>
                                      <option value={8}>8</option>
                                      <option value={9}>9</option>
                                      <option value={10}>10</option>
                                      <option value={11}>11</option>
                                    </Field>
                                  </div>
                                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Height (Inches)</label>
                                    <Field as="select" name="heightInch" className='form-select form-select-lg mb-3' aria-label='.form-select-lg example'>
                                      <option hidden>Select Inches</option>
                                      <option value={0}>0</option>
                                      <option value={1}>1</option>
                                      <option value={2}>2</option>
                                      <option value={3}>3</option>
                                      <option value={4}>4</option>
                                      <option value={5}>5</option>
                                      <option value={6}>6</option>
                                      <option value={7}>7</option>
                                      <option value={8}>8</option>
                                      <option value={9}>9</option>
                                      <option value={10}>10</option>
                                      <option value={11}>11</option>
                                    </Field>
                                  </div>
                                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Weight Range From: (lbs)</label>
                                    <Field
                                      type='number'
                                      name='weightRangeFrom'
                                      className='form-control form-control-solid mb-3 mb-lg-0'
                                      placeholder='Weight From'
                                      autoComplete="off"
                                    ></Field>
                                  </div>
                                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Weight Range To: (lbs)</label>
                                    <Field
                                      type='number'
                                      name='weightRangeTo'
                                      className='form-control form-control-solid mb-3 mb-lg-0'
                                      placeholder='Weight To'
                                      autoComplete="off"
                                    ></Field>
                                  </div>
                                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Temperature From: (F)</label>
                                    <Field
                                      type='number'
                                      name='temperatureFrom'
                                      className='form-control form-control-solid mb-3 mb-lg-0'
                                      placeholder='Temperature From'
                                      autoComplete="off"
                                    ></Field>
                                  </div>
                                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Temperature To: (F)</label>
                                    <Field
                                      type='number'
                                      name='temperatureTo'
                                      className='form-control form-control-solid mb-3 mb-lg-0'
                                      placeholder='Temperature To'
                                      autoComplete="off"
                                    ></Field>
                                  </div>
                                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Pulse From: (BPM)</label>
                                    <Field
                                      type='number'
                                      name='pulseFrom'
                                      className='form-control form-control-solid mb-3 mb-lg-0'
                                      placeholder='Pulse From'
                                      autoComplete="off"
                                    ></Field>
                                  </div>
                                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Pulse To: (BPM)</label>
                                    <Field
                                      type='number'
                                      name='pulseTo'
                                      className='form-control form-control-solid mb-3 mb-lg-0'
                                      placeholder='Pulse To'
                                      autoComplete="off"
                                    ></Field>
                                  </div>
                                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Oxygen Saturation From: (%)</label>
                                    <Field
                                      type='number'
                                      name='oxygenSaturationFrom'
                                      className='form-control form-control-solid mb-3 mb-lg-0'
                                      placeholder='Oxygen Saturation From'
                                      autoComplete="off"
                                    ></Field>
                                  </div>
                                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Oxygen Saturation To: (%)</label>
                                    <Field
                                      type='number'
                                      name='oxygenSaturationTo'
                                      className='form-control form-control-solid mb-3 mb-lg-0'
                                      placeholder='Oxygen Saturation To'
                                      autoComplete="off"
                                    ></Field>
                                  </div>
                                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Respiration From: (BPM)</label>
                                    <Field
                                      type='number'
                                      name='respirationFrom'
                                      className='form-control form-control-solid mb-3 mb-lg-0'
                                      placeholder='Respiration From'
                                      autoComplete="off"
                                    ></Field>
                                  </div>
                                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Respiration To: (BPM)</label>
                                    <Field
                                      type='number'
                                      name='respirationTo'
                                      className='form-control form-control-solid mb-3 mb-lg-0'
                                      placeholder='Respiration To'
                                      autoComplete="off"
                                    ></Field>
                                  </div>
                                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Blood Pressure Systolic From: (mmHg)</label>
                                    <Field
                                      type='number'
                                      name='bloodSystolicFrom'
                                      className='form-control form-control-solid mb-3 mb-lg-0'
                                      placeholder='Blood Pressure Systolic From'
                                      autoComplete="off"
                                    ></Field>
                                  </div>
                                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Blood Pressure Systolic To: (mmHg)</label>
                                    <Field
                                      type='number'
                                      name='bloodSystolicTo'
                                      className='form-control form-control-solid mb-3 mb-lg-0'
                                      placeholder='Blood Pressure Systolic To'
                                      autoComplete="off"
                                    ></Field>
                                  </div>
                                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Blood Pressure Diastolic From: (mmHg)</label>
                                    <Field
                                      type='number'
                                      name='bloodDiastolicFrom'
                                      className='form-control form-control-solid mb-3 mb-lg-0'
                                      placeholder='Blood Pressure Diastolic From'
                                      autoComplete="off"
                                    ></Field>
                                  </div>
                                  <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Blood Pressure Diastolic To: (mmHg)</label>
                                    <Field
                                      type='number'
                                      name='bloodDiastolicTo'
                                      className='form-control form-control-solid mb-3 mb-lg-0'
                                      placeholder='Blood Pressure Diastolic To'
                                      autoComplete="off"
                                    ></Field>
                                  </div>
                                </div>
                              </div>
                              <div className='d-flex justify-content-end'>
                                <div>
                                  <button className='btn btn-primary btn-sm mx-3' onClick={() => resetForm()}>Reset</button>
                                  <button type="submit" className='btn btn-primary btn-sm'>Save</button>
                                </div>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </div>
              }
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default HealthBody