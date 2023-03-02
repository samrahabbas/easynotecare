import { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import SubMenuSection from '../SubMenuSection'
import axios from 'axios'

const ClientDetailsForm = ({ location }) => {
    const [clientDataDetails, setClientDataDetails] = useState({})
    const [showEditingForm, setShowEditingForm] = useState(true)

    useEffect(() => {
        setClientDataDetails(location.state.clientdetails)
    }, [])

    return (
        <div>
            <div className='fv-row mb-7 fv-plugins-icon-container p-5 card'>
                <div className='card-body'>
                    <div className="mb-6">
                        <SubMenuSection individual={location.state} />
                    </div>
                    {
                        showEditingForm ?
                            <div>
                                <div className="d-flex">
                                    <button className='btn btn-primary btn-sm' onClick={() => { setShowEditingForm(false) }}>Edit</button>
                                    <button className="btn btn-primary btn-sm mx-4">Show PDF</button>
                                </div>
                                <div className='mt-7 p-4'>
                                    <h4>Detailed Form of: {location.state.firstName +' '+ location.state.lastName}</h4>
                                    <div className="row " style={{ border: "1px solid #80808045" }}>
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-25'>Image2</label>
                                            <label className='w-50'>Image2 to be shown here</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Photo2Date</label>
                                            <label className='w-50'>{clientDataDetails?.photo2Date}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Hair Color</label>
                                            <label className='w-50'>{clientDataDetails?.hairColor}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Eye Color</label>
                                            <label className='w-50'>{clientDataDetails?.eyeColor}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Interpreter Needed</label>
                                            <label className='w-50'>{clientDataDetails?.interpreterNeeded}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Primary Oral Language</label>
                                            <label className='w-50'>{clientDataDetails?.primaryOralLang}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Primary Written Language</label>
                                            <label className='w-50'>{clientDataDetails?.primaryWrittenLang}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Religion</label>
                                            <label className='w-50'>{clientDataDetails?.religion}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Citizenship</label>
                                            <label className='w-50'>{clientDataDetails?.citizenship}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Citizenship Status</label>
                                            <label className='w-50'>{clientDataDetails?.citizenshipStatus}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Marital Status</label>
                                            <label className='w-50'>{clientDataDetails?.maritialStatus}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Marital Status Date</label>
                                            <label className='w-50'>{clientDataDetails?.maritialStatusDate}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Discharge Date</label>
                                            <label className='w-50'>{clientDataDetails?.dischargeDate}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Death Date</label>
                                            <label className='w-50'>{clientDataDetails?.deathDate}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Client Dateime Zone</label>
                                            <label className='w-50'>{clientDataDetails?.clientTimezone}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Living Arrangement</label>
                                            <label className='w-50'>{clientDataDetails?.livingArrangement}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Guardian of Self</label>
                                            <label className='w-50'>{clientDataDetails?.guardianOfSelf}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Birth Place</label>
                                            <label className='w-50'>{clientDataDetails?.birthPlace}</label>
                                        </div>
                                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Characteristics</label>
                                            <label className='w-50'>{clientDataDetails?.characteristics}</label>
                                        </div>

                                        <div className='my-5'>ID numbers Section will be here</div>

                                        <h4 className='mt-4 text-primary'>Medical Information</h4>
                                        <hr />
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Development Disability</label>
                                            <label className='w-50'>{clientDataDetails?.developDisability}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Intellectual Disability</label>
                                            <label className='w-50'>{clientDataDetails?.intellDisability}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Blood Type</label>
                                            <label className='w-50'>{clientDataDetails?.bloodType}</label>
                                        </div>
                                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Primary Care Physician</label>
                                            <label className='w-50'>{clientDataDetails?.primaryPhysician}</label>
                                        </div>
                                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Other Medical Information</label>
                                            <label className='w-50'>{clientDataDetails?.othermedicalInfo}</label>
                                        </div>
                                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Emergency Orders</label>
                                            <label className='w-50'>{clientDataDetails?.emergencyOrders}</label>
                                        </div>
                                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Adaptive Equipment</label>
                                            <label className='w-50'>{clientDataDetails?.adaptiveEquipment}</label>
                                        </div>

                                        <h5 className='mt-4 text-primary'>Behavior Section</h5>
                                        <hr />

                                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Behavior Management</label>
                                            <label className='w-50'>{clientDataDetails?.behaviorManagement}</label>
                                        </div>

                                        <h5 className='mt-4 text-primary'>Guidelines Section</h5>
                                        <hr />
                                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Dietary Guidelines</label>
                                            <label className='w-50'>{clientDataDetails?.dietaryGuideline}</label>
                                        </div>
                                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Eating Guidelines</label>
                                            <label className='w-50'>{clientDataDetails?.eatingGuideline}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Communication Modality</label>
                                            <label className='w-50'>{clientDataDetails?.commModality}</label>
                                        </div>
                                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Communication Modality Other</label>
                                            <label className='w-50'>{clientDataDetails?.commModalityOther}</label>
                                        </div>
                                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Communication Comments</label>
                                            <label className='w-50'>{clientDataDetails?.commComments}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Mobility</label>
                                            <label className='w-50'>{clientDataDetails?.mobility}</label>
                                        </div>
                                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Mobility Comments</label>
                                            <label className='w-50'>{clientDataDetails?.mobilityComments}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Supervision</label>
                                            <label className='w-50'>{clientDataDetails?.supervision}</label>
                                        </div>
                                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Supervision Comments</label>
                                            <label className='w-50'>{clientDataDetails?.supervisionComments}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Food Texture</label>
                                            <label className='w-50'>{clientDataDetails?.foodTexture}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Liquid Consistency</label>
                                            <label className='w-50'>{clientDataDetails?.liquidConsistency}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Toileting Status</label>
                                            <label className='w-50'>{clientDataDetails?.toiletingStatus}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Bathing Status</label>
                                            <label className='w-50'>{clientDataDetails?.bathingStatus}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Mealtime Status</label>
                                            <label className='w-50'>{clientDataDetails?.mealTimeStatus}</label>
                                        </div>
                                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className='fw-bold fs-6 mb-2 w-50'>Refferal Source</label>
                                            <label className='w-50'>{clientDataDetails?.referralSource}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div>
                                <Formik
                                    initialValues={{
                                        photo2Date: '',
                                        hairColor: clientDataDetails.hairColor || '',
                                        eyeColor: clientDataDetails.eyeColor || '',
                                        interpreterNeeded: clientDataDetails.interpreterNeeded || '',
                                        primaryOralLang: clientDataDetails.primaryOralLang || '',
                                        primaryWrittenLang: clientDataDetails.primaryWrittenLang || '',
                                        religion: clientDataDetails.religion || '',
                                        citizenship: clientDataDetails.citizenship || '',
                                        citizenshipStatus: clientDataDetails.citizenshipStatus || '',
                                        maritialStatus: clientDataDetails.maritialStatus || '',
                                        maritialStatusDate: clientDataDetails.maritialStatusDate || '',
                                        dischargeDate: clientDataDetails.dischargeDate || '',
                                        deathDate: clientDataDetails.deathDate || '',
                                        clientTimezone: clientDataDetails.clientTimezone || '',
                                        livingArrangement: clientDataDetails.livingArrangement || '',
                                        birthPlace: clientDataDetails.birthPlace || '',
                                        characteristics: clientDataDetails.characteristics || '',
                                        guardianOfSelf: clientDataDetails.guardianOfSelf || '',
                                        developDisability: clientDataDetails.developDisability || '',
                                        intellDisability: clientDataDetails.intellDisability || '',
                                        bloodType: clientDataDetails.bloodType || '',
                                        primaryPhysician: clientDataDetails.primaryPhysician || '',
                                        othermedicalInfo: clientDataDetails.othermedicalInfo || '',
                                        emergencyOrders: clientDataDetails.emergencyOrders || '',
                                        adaptiveEquipment: clientDataDetails.adaptiveEquipment || '',
                                        behaviorManagement: clientDataDetails.behaviorManagement || '',
                                        dietaryGuideline: clientDataDetails.dietaryGuideline || '',
                                        eatingGuideline: clientDataDetails.eatingGuideline || '',
                                        commModality: clientDataDetails.commModality || '',
                                        commModalityOther: clientDataDetails.commModalityOther || '',
                                        commComments: clientDataDetails.commComments || '',
                                        mobility: clientDataDetails.mobility || '',
                                        mobilityComments: clientDataDetails.mobilityComments || '',
                                        supervision: clientDataDetails.supervision || '',
                                        supervisionComments: clientDataDetails.supervisionComments || '',
                                        foodTexture: clientDataDetails.foodTexture || '',
                                        liquidConsistency: clientDataDetails.liquidConsistency || '',
                                        toiletingStatus: clientDataDetails.toiletingStatus || '',
                                        bathingStatus: clientDataDetails.bathingStatus || '',
                                        mealTimeStatus: clientDataDetails.mealTimeStatus || '',
                                        referralSource: clientDataDetails.referralSource || '',
                                    }}
                                    onSubmit={(values, { setSubmitting, resetForm }) => {
                                        let tempobj = location.state
                                        tempobj.clientdetails = values
                                        axios.put('/clients/update', tempobj).then(res => {
                                            setClientDataDetails(tempobj.clientdetails)
                                            setShowEditingForm(true)

                                        })
                                    }}
                                >
                                    {({ isSubmitting, resetForm, values }) => (
                                        <Form>
                                            <div className='d-flex my-6'>
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
                                            <h1 className='mb-5'>Client Details</h1>
                                            <h4 className='text-primary'>Detailed Form of: {location.state.firstName + ' ' + location.state.lastName}</h4>
                                            <hr />
                                            <div className='row'>
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Photo 2</label>
                                                    <input
                                                        type='file'
                                                        name='user_name'
                                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                                        placeholder=''
                                                    ></input>
                                                </div>
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Photo 2 Date</label>
                                                    <Field
                                                        type='date'
                                                        name='photo2Date'
                                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                                        placeholder=''
                                                    />
                                                </div>
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Hair Color</label>
                                                    <Field as="select" name="hairColor" className='form-select form-select-lg mb-3'
                                                        aria-label='.form-select-lg example'>
                                                        <option hidden>- Select Please -</option>
                                                        <option value='Bald'>Bald</option>
                                                        <option value='Black'>Black</option>
                                                        <option value='Blonde'>Blonde</option>
                                                        <option value='Brown'>Brown</option>
                                                        <option value='Brown-dark'>Brown-dark</option>
                                                        <option value='Brown-light'>Brown-light</option>
                                                        <option value='Burnette'>Burnette</option>
                                                        <option value='Gray'>Gray</option>
                                                        <option value='Red'>Red</option>
                                                        <option value='White'>White</option>
                                                        <option value='Other'>Other</option>
                                                    </Field>
                                                </div>
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Eye Color</label>
                                                    <Field as="select" name="eyeColor" className='form-select form-select-lg mb-3'
                                                        aria-label='.form-select-lg example'>
                                                        <option hidden>- Select Please -</option>
                                                        <option value='Black'>Black</option>
                                                        <option value='Blue'>Blue</option>
                                                        <option value='Brown'>Brown</option>
                                                        <option value='Dischromatic'>Dischromatic</option>
                                                        <option value='Gray'>Gray</option>
                                                        <option value='Green'>Green</option>
                                                        <option value='Hazel'>Hazel</option>
                                                        <option value='Opaque'>Opaque</option>
                                                        <option value='Other'>Other</option>
                                                    </Field>
                                                </div>
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Interpreter Needed</label>
                                                    <Field as="select" name="interpreterNeeded" className='form-select form-select-lg mb-3'
                                                        aria-label='.form-select-lg example'>
                                                        <option hidden>- Select Please -</option>
                                                        <option value='Spoken'>Spoken</option>
                                                        <option value='Written'>Written</option>
                                                        <option value='Written and Spoken'>Written and Spoken</option>
                                                        <option value='No'>No</option>
                                                        <option value='Unknown'>Unknown</option>
                                                    </Field>
                                                </div>
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Primary Oral Languauge</label>
                                                    <Field as="select" name="primaryOralLang" className='form-select form-select-lg mb-3'
                                                        aria-label='.form-select-lg example'>
                                                        <option hidden>- Select Please -</option>
                                                        <option value='none'>Does not Read or Write</option>
                                                        <option value='English'>English</option>
                                                        <option value='French'>French</option>
                                                        <option value='Spanish'>Spanish</option>
                                                        <option value='Other'>Other</option>
                                                    </Field>
                                                </div>
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Primary Written Languauge</label>
                                                    <Field as="select" name="primaryWrittenLang" className='form-select form-select-lg mb-3'
                                                        aria-label='.form-select-lg example'>
                                                        <option hidden>- Select Please -</option>
                                                        <option value='American Sign Language'>American Sign Language</option>
                                                        <option value='English'>English</option>
                                                        <option value='French'>French</option>
                                                        <option value='Spanish'>Spanish</option>
                                                        <option value='Other'>Other</option>
                                                    </Field>
                                                </div>
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Religion</label>
                                                    <Field as="select" name="religion" className='form-select form-select-lg mb-3'
                                                        aria-label='.form-select-lg example'>
                                                        <option hidden>- Select Please -</option>
                                                        <option value='Baptish'>Baptish</option>
                                                        <option value='Catholic'>Catholic</option>
                                                        <option value='Christian'>Christian</option>
                                                        <option value='Eastern Orthodox'>Eastern Orthodox</option>
                                                        <option value='Greek Orthodox'>Greek Orthodox</option>
                                                        <option value='Hindu'>Hindu</option>
                                                        <option value="Jehovah's Witness">Jehovah's Witness</option>
                                                        <option value='Jewish'>Jewish</option>
                                                        <option value='Mormon'>Mormon</option>
                                                        <option value='Muslim'>Muslim</option>
                                                        <option value='None'>None</option>
                                                        <option value='Protestant'>Protestant</option>
                                                        <option value='Other'>Other</option>
                                                    </Field>
                                                </div>
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Citizenship</label>
                                                    <Field as="select" name="citizenship" className='form-select form-select-lg mb-3'
                                                        aria-label='.form-select-lg example'>
                                                        <option hidden>- Select Please -</option>
                                                        <option value='Bangladeshi'>Bangladeshi</option>
                                                        <option value='Canadian'>Canadian</option>
                                                        <option value='Indian'>Indian</option>
                                                        <option value='Thai'>Thai</option>
                                                        <option value='Mexican'>Mexican</option>
                                                        <option value='USA'>USA</option>
                                                        <option value='Other'>Other</option>
                                                    </Field>
                                                </div>
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Citizenship Status</label>
                                                    <Field as="select" name="citizenshipStatus" className='form-select form-select-lg mb-3'
                                                        aria-label='.form-select-lg example'>
                                                        <option hidden>- Select Please -</option>
                                                        <option value='Alien'>Alien</option>
                                                        <option value='Asylee'>Asylee</option>
                                                        <option value='Illegal Alien'>Illegal Alien</option>
                                                        <option value='Military/Fam Non-Citizen'>Military/Fam Non-Citizen</option>
                                                        <option value='Refugee'>Refugee</option>
                                                        <option value='U.S Citizen'>U.S Citizen</option>
                                                        <option value='Victims/Trafficking'>Victims/Trafficking</option>
                                                    </Field>
                                                </div>
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Marital Status</label>
                                                    <Field as="select" name="maritialStatus" className='form-select form-select-lg mb-3'
                                                        aria-label='.form-select-lg example'>
                                                        <option hidden>- Select Please -</option>
                                                        <option value='Divorced'>Divorced</option>
                                                        <option value='Married'>Married</option>
                                                        <option value='Separated'>Separated</option>
                                                        <option value='Single'>Single</option>
                                                        <option value='Unknown'>Unknown</option>
                                                        <option value='Widowed'>Widowed</option>
                                                    </Field>
                                                </div>
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Marital Status Date</label>
                                                    <Field
                                                        type='date'
                                                        name='maritialStatusDate'
                                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                                        placeholder=''
                                                    />
                                                </div>
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Discharge Date</label>
                                                    <Field
                                                        type='date'
                                                        name='dischargeDate'
                                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                                        placeholder=''
                                                    />
                                                </div>
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Death Date</label>
                                                    <Field
                                                        type='date'
                                                        name='deathDate'
                                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                                        placeholder=''
                                                    />
                                                </div>
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Client Time Zone</label>
                                                    <Field as="select" name="clientTimezone" className='form-select form-select-lg mb-3'
                                                        aria-label='.form-select-lg example'>
                                                        <option hidden>- Select Please -</option>
                                                        <option value='US/Eastern'>US/Eastern</option>
                                                        <option value='US/Central'>US/Central</option>
                                                        <option value='US/Western'>US/Western</option>
                                                    </Field>
                                                </div>
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Living Arrangement</label>
                                                    <Field as="select" name="livingArrangement" className='form-select form-select-lg mb-3'
                                                        aria-label='.form-select-lg example'>
                                                        <option hidden>- Select Please -</option>
                                                        <option value='Appartment or House'>Appartment or House</option>
                                                        <option value='Child Caring Agency'>Child Caring Agency</option>
                                                        <option value='Community'>Community</option>
                                                        <option value='Foster Care'>Foster Care</option>
                                                        <option value='Group Home'>Group Home</option>
                                                        <option value='Homeless Shelter'>Homeless Shelter</option>
                                                        <option value='IRA'>IRA</option>
                                                        <option value='Living with Guardian of Child'>Living with Guardian of Child</option>
                                                        <option value='Living with Parent'>Living with Parent</option>
                                                        <option value='Living with Relative'>Living with Relative</option>
                                                        <option value='Other'>Other</option>
                                                    </Field>
                                                </div>
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Guardian of Self</label>
                                                    <Field as="select" name="guardianOfSelf" className='form-select form-select-lg mb-3'
                                                        aria-label='.form-select-lg example'>
                                                        <option hidden>- Select Please -</option>
                                                        <option value='Yes'>Yes</option>
                                                        <option value='No'>No</option>
                                                        <option value='Unknown'>Unknown</option>
                                                    </Field>
                                                </div>
                                                <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Birth Place</label>
                                                    <Field
                                                        name='birthPlace'
                                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                                        placeholder=''
                                                    />
                                                </div>
                                                <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Characteristics</label>
                                                    <Field
                                                        as="textarea"
                                                        name='characteristics'
                                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                                        placeholder=''
                                                    />
                                                </div>

                                                <div className='my-5'>ID numbers Section will be here</div>
                                                {/* <hr /> */}

                                                <h4 className='mb-3 text-primary'>Medical Information</h4>
                                                <hr />
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Development Disability</label>
                                                    <Field as="select" name="developDisability" className='form-select form-select-lg mb-3'
                                                        aria-label='.form-select-lg example'>
                                                        <option hidden>- Select Please -</option>
                                                        <option value='Autism'>Autism</option>
                                                        <option value='Cerebral Pals'>Cerebral Palsy</option>
                                                        <option value='Epilepsy'>Epilepsy</option>
                                                        <option value='Neurological Impairment'>Neurological Impairment</option>
                                                        <option value='Other'>Other</option>
                                                    </Field>
                                                </div>
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Intellectual Disability</label>
                                                    <Field as="select" name="intellDisability" className='form-select form-select-lg mb-3'
                                                        aria-label='.form-select-lg example'>
                                                        <option hidden>- Select Please -</option>
                                                        <option value='Mild'>Mild</option>
                                                        <option value='Moderate'>Moderate</option>
                                                        <option value='Profound'>Profound</option>
                                                        <option value='Severe'>Severe</option>
                                                        <option value='Unspecified'>Unspecified</option>
                                                    </Field>
                                                </div>
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Blood Type</label>
                                                    <Field as="select" name="bloodType" className='form-select form-select-lg mb-3'
                                                        aria-label='.form-select-lg example'>
                                                        <option hidden>- Select Please -</option>
                                                        <option value='A+'>A+</option>
                                                        <option value='A-'>A-</option>
                                                        <option value='AB+'>AB+</option>
                                                        <option value='AB-'>AB-</option>
                                                        <option value='B+'>B+</option>
                                                        <option value='B-'>B-</option>
                                                        <option value='O+'>O+</option>
                                                        <option value='O-'>O-</option>
                                                        <option value='Unknown'>Unknown</option>
                                                    </Field>
                                                </div>
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Primary Care Physician</label>
                                                    <Field
                                                        name='primaryPhysician'
                                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                                        placeholder=''
                                                    />
                                                </div>

                                                <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Other Medical Information</label>
                                                    <Field
                                                        as="textarea"
                                                        name='othermedicalInfo'
                                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                                        placeholder=''
                                                    />
                                                </div>
                                                <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Emergency Orders</label>
                                                    <Field
                                                        as="textarea"
                                                        name='emergencyOrders'
                                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                                        placeholder=''
                                                    />
                                                </div>
                                                <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Adaptive Equipment</label>
                                                    <Field
                                                        as="textarea"
                                                        name='adaptiveEquipment'
                                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                                        placeholder=''
                                                    />
                                                </div>

                                                <h5 className='text-primary'>Behavior Section</h5>
                                                <hr />

                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Behavior Management</label>
                                                    <Field
                                                        as="textarea"
                                                        name='behaviorManagement'
                                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                                        placeholder=''
                                                    />
                                                </div>

                                                <h5 className='text-primary'>Guidelines Section</h5>
                                                <hr />

                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Dietary Guidelines</label>
                                                    <Field
                                                        as="textarea"
                                                        name='dietaryGuideline'
                                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                                        placeholder=''
                                                    />
                                                </div>

                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Eating Guidelines</label>
                                                    <Field
                                                        as="textarea"
                                                        name='eatingGuideline'
                                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                                        placeholder=''
                                                    />
                                                </div>

                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Communication Modality</label>
                                                    <Field as="select" name="commModality" className='form-select form-select-lg mb-3'
                                                        aria-label='.form-select-lg example'>
                                                        <option hidden>- Select Please -</option>
                                                        <option value='Communication Device'>Communication Device</option>
                                                        <option value='Non-Verbal'>Non-Verbal</option>
                                                        <option value='Partially Verbal'>Partially Verbal</option>
                                                        <option value='Sign'>Sign</option>
                                                        <option value='Verbal'>Verbal</option>
                                                        <option value='Other'>Other</option>
                                                    </Field>
                                                </div>

                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Communication Modality Other</label>
                                                    <Field
                                                        as="textarea"
                                                        name='commModalityOther'
                                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                                        placeholder=''
                                                    />
                                                </div>
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Communication Comments</label>
                                                    <Field
                                                        as="textarea"
                                                        name='commComments'
                                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                                        placeholder=''
                                                    />
                                                </div>

                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Mobility</label>
                                                    <Field as="select" name="mobility" className='form-select form-select-lg mb-3'
                                                        aria-label='.form-select-lg example'>
                                                        <option hidden>- Select Please -</option>
                                                        <option value='Uses a cane'>Uses a cane</option>
                                                        <option value='Uses Crutches'>Uses Crutches</option>
                                                        <option value='Uses Walker'>Uses Walker</option>
                                                        <option value='Walks on own'>Walks on own</option>
                                                        <option value='Wheelchair'>Wheelchair</option>
                                                        <option value='Other'>Other</option>
                                                    </Field>
                                                </div>

                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Mobility Comments</label>
                                                    <Field
                                                        as="textarea"
                                                        name='mobilityComments'
                                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                                        placeholder=''
                                                    />
                                                </div>

                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Supervision</label>
                                                    <Field as="select" name="supervision" className='form-select form-select-lg mb-3'
                                                        aria-label='.form-select-lg example'>
                                                        <option hidden>- Select Please -</option>
                                                        <option value='1:1'>1:1</option>
                                                        <option value="Arm's Length">Arm's Length</option>
                                                        <option value='Assistance for everything'>Assistance for everything</option>
                                                        <option value='Assistance for everything but eating'>Assistance for everything but eating</option>
                                                        <option value='Assistance for personal care'>Assistance for personal care</option>
                                                        <option value='Independent'>Independent</option>
                                                        <option value='Line of Sight'>Line of Sight</option>
                                                        <option value='Never unattened'>Never unattened</option>
                                                        <option value='No supervision'>No supervision</option>
                                                        <option value='Other'>Other</option>
                                                    </Field>
                                                </div>
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Supervision Comments</label>
                                                    <Field
                                                        as="textarea"
                                                        name='supervisionComments'
                                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                                        placeholder=''
                                                    />
                                                </div>

                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Food Texture</label>
                                                    <Field as="select" name="foodTexture" className='form-select form-select-lg mb-3'
                                                        aria-label='.form-select-lg example'>
                                                        <option hidden>- Select Please -</option>
                                                        <option value='1" Pieces Cut to Size'>1" Pieces Cut to Size</option>
                                                        <option value='1/2" Pieces Cut to Size'>1/2" Pieces Cut to Size</option>
                                                        <option value='1/4" Pieces Cut to Size'>1/4" Pieces Cut to Size</option>
                                                        <option value='Food consistency altered-Chopped'>Food consistency altered-Chopped</option>
                                                        <option value='Food consistency altered-Uses Thickener'>Food consistency altered-Uses Thickener</option>
                                                        <option value='Ground'>Ground</option>
                                                        <option value='Nothing by mouth-NPO'>Nothing by mouth-NPO</option>
                                                        <option value='Pureed'>Pureed</option>
                                                        <option value='Whole or Normal consistency'>Whole or Normal consistency</option>
                                                    </Field>
                                                </div>
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Liquid Consistency</label>
                                                    <Field as="select" name="liquidConsistency" className='form-select form-select-lg mb-3'
                                                        aria-label='.form-select-lg example'>
                                                        <option hidden>- Select Please -</option>
                                                        <option value='Honey'>Honey</option>
                                                        <option value='Nectar'>Nectar</option>
                                                        <option value='Nothing by Mouth- NPO'>Nothing by Mouth- NPO</option>
                                                        <option value='Pudding'>Pudding</option>
                                                        <option value='Regular'>Regular</option>
                                                        <option value='Thin'>Thin</option>
                                                    </Field>
                                                </div>
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Toileting Status</label>
                                                    <Field as="select" name="toiletingStatus" className='form-select form-select-lg mb-3'
                                                        aria-label='.form-select-lg example'>
                                                        <option hidden>- Select Please -</option>
                                                        <option value='Incontinent/Requires Disposable Briefs'>Incontinent/Requires Disposable Briefs</option>
                                                        <option value='Requires Assistance/Equipment'>Requires Assistance/Equipment</option>
                                                        <option value='Requires Prompts/Monitoring'>Requires Prompts/Monitoring</option>
                                                        <option value='Scheduled Bladder Program'>Scheduled Bladder Program</option>
                                                        <option value='Scheduled Bowel Program'>Scheduled Bowel Program</option>
                                                        <option value='Toilets Independently'>Toilets Independently</option>
                                                    </Field>
                                                </div>
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Bathing Status</label>
                                                    <Field as="select" name="bathingStatus" className='form-select form-select-lg mb-3'
                                                        aria-label='.form-select-lg example'>
                                                        <option hidden>- Select Please -</option>
                                                        <option value='Independent'>Independent</option>
                                                        <option value='Independent with Devices'>Independent with Devices</option>
                                                        <option value='Requires Support to Bath/Shower'>Requires Support to Bath/Shower</option>
                                                    </Field>
                                                </div>
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Mealtime Status</label>
                                                    <Field as="select" name="mealTimeStatus" className='form-select form-select-lg mb-3'
                                                        aria-label='.form-select-lg example'>
                                                        <option hidden>- Select Please -</option>
                                                        <option value='Eats Independently'>Eats Independently</option>
                                                        <option value='Requires Physical Assistance'>Requires Physical Assistance</option>
                                                        <option value='Requires Poistioning Equipment'>Requires Poistioning Equipment</option>
                                                        <option value='Requires Support to Eat'>Requires Support to Eat</option>
                                                    </Field>
                                                </div>

                                                <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Refferal Source</label>
                                                    <Field
                                                        as="textarea"
                                                        name='referralSource'
                                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                                        placeholder=''
                                                    />
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
    )
}

export default ClientDetailsForm