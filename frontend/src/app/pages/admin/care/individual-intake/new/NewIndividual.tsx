import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { randomID } from '../../../../../../_helper/randomID'
import { CurrentDate } from '../../../../../../_helper/currentDate'
import DiagnosticsSearching from './DiagnosticsSearching'
import SharedContactSearching from './SharedContactSearching'
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../setup'
const selectAuth = (state: RootState) => state.auth;


const registrationSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('First Name is required'),
    lastName: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Last Name is required'),
    gender: Yup.string().required('Gender is required'),
    addrInfo: Yup.object().shape({
        primaryPhone: Yup.string()
            .max(10, 'Maximum 10 Numbers')
            .matches(
                /^(\([0-9]{3}\) |[0-9]{3})[0-9]{3}[0-9]{4}$/,
                'Invalid Phone Number'
            ),
        secondaryPhone: Yup.string()
            .max(10, 'Maximum 10 Numbers')
            .matches(
                /^(\([0-9]{3}\) |[0-9]{3})[0-9]{3}[0-9]{4}$/,
                'Invalid Phone Number'
            ),
        additionalPhone: Yup.string()
            .max(10, 'Maximum 10 Numbers')
            .matches(
                /^(\([0-9]{3}\) |[0-9]{3})[0-9]{3}[0-9]{4}$/,
                'Invalid Phone Number'
            ),
    }),
    mailingInfo: Yup.object().shape({
        primaryPhone: Yup.string()
            .max(10, 'Maximum 10 Numbers')
            .matches(
                /^(\([0-9]{3}\) |[0-9]{3})[0-9]{3}[0-9]{4}$/,
                'Invalid Phone Number'
            ),
        secondaryPhone: Yup.string()
            .max(10, 'Maximum 10 Numbers')
            .matches(
                /^(\([0-9]{3}\) |[0-9]{3})[0-9]{3}[0-9]{4}$/,
                'Invalid Phone Number'
            ),
        additionalPhone: Yup.string()
            .max(10, 'Maximum 10 Numbers')
            .matches(
                /^(\([0-9]{3}\) |[0-9]{3})[0-9]{3}[0-9]{4}$/,
                'Invalid Phone Number'
            ),
    }),
    socialSecurityNumber: Yup.string()
        .max(9, 'Maximum 9 Numbers')
        .matches(/^(?!000|666)[0-8][0-9]{2}(?!00)[0-9]{2}(?!0000)[0-9]{4}$/, 'Invalid SSN Number')
        .required('Social Security Number is required'),
    phoneNumber: Yup.string()
        .max(10, 'Maximum 10 Numbers')
        .matches(
            /^(\([0-9]{3}\) |[0-9]{3})[0-9]{3}[0-9]{4}$/,
            'Invalid Phone Number'
        ),
    email: Yup.string()
        .email('Wrong email format')
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
})

const NewIndividual = () => {
    const [showResAddr, setShowResAddr] = useState(false)
    const [showMailingAddr, setShowMailingAddr] = useState(false)
    const [showProgram, setShowProgram] = useState(false)
    const [showAllergy, setShowAllergy] = useState(false)
    const [showInsurance, setShowInsurance] = useState(false)
    const [showGuardian, setShowGuardian] = useState(false)
    const [showSharedContact, setShowSharedContact] = useState(false)
    const [sharedContact, setSharedContact] = useState([])
    const [program, setProgram] = useState<any[]>([])
    const [diagnosis, setDiagnosis] = useState(false)
    const [codeType, setCodeType] = useState('')
    const [diagnosisForm, setDiagnosisForm] = useState({
        formID: "DIAGNOSIS-" + randomID(),
        diagnosisCodeType: "",
        diagnosisName: "",
        description: "",
        diagnosisDate: '',
        diagnosedBy: "",
        enteredBy: "",
    })

    /**
        NEW IMAGES WILL BE RENDERED USING THIS CODE AS SOON AS THEY ARE UPLOADED
          const [images, setImages] = useState([])
          const [imageURLs, setImageURLs] = useState([])
  
          useEffect(() => {
              if(images.length < 1) return;
              const newImageUrls = []
              images.forEach(image => newImageUrls.push(
              URL.createObjectURL(image)
              ))
              setImageURLs(newImageUrls)
          }, [images])
  
          function onImageChange(e) {
              setImages([...e.target.files]);
          }
  
          <input type="file" multiple accept="image/*"
          onChange={onImageChange} />
          {
              imageURLs.map(imageSrc => <img src={imageSrc} />)
          }
       */

    useEffect(() => {
        const source = axios.CancelToken.source();
        axios.get("/programs/get/" + companyid)
            .then(res => {
                setProgram(res.data)
            })
        return () => {
            source.cancel('Component unmounted');
        };
    }, [])

    const history = useHistory()

    const auth = useSelector(selectAuth);

    const companyid = auth.user?.company_code

    return (
        <div>
            <Formik
                initialValues={{
                    formID: "CLIENT-" + randomID(),
                    company_code: companyid,
                    allergyName: '',
                    allergyType: '',
                    insuranceCompany: '',
                    insurancePlanNumber: '',
                    guardianFirstName: '',
                    guardianLastName: '',
                    guardianType: '',
                    guardianPrimaryPhone: '',
                    guardianEmail: '',
                    programID: "",
                    title: '',
                    image: '',
                    gender: '',
                    firstName: '',
                    lastName: '',
                    birthDate: '',
                    socialSecurityNumber: '',
                    medicaidNumber: '',
                    email: '',
                    phoneNumber: '',
                    race: '',
                    ethnicity: '',
                    residentialAddr: false,
                    mailingAddr: false,
                    addrInfo: {
                        primaryPhone: '',
                        secondaryPhone: '',
                        additionalPhone: '',
                        country: '',
                        st1: '',
                        st2: '',
                        city: '',
                        state: '',
                        zipCode: ''
                    },
                    mailingInfo: {
                        st1: '',
                        st2: '',
                        city: '',
                        state: '',
                        zipCode: '',
                        country: '',
                        primaryPhone: '',
                        secondaryPhone: '',
                        additionalPhone: '',
                    },
                    insuranceInfo: {
                        medicareNumber: "",
                        medicareDate: "",
                        medPlanDId: "",
                        medPlanDName: "",
                        medPlanDIssuer: "",
                        medPlanDRxBin: "",
                        medPlanDRxPcn: "",
                        medPlanDRxGrp: "",
                        otherBenefits: "",
                        insuranceCompany: "",
                        insuranceGroup: "",
                        insurancePolicyNumber: "",
                        insurancePolicyHolder: "",
                        files: ""
                    }
                }}
                validationSchema={registrationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    let tempObj: any = {}
                    tempObj = values
                    if (showMailingAddr === false && showResAddr === true) {
                        tempObj.mailingInfo['st1'] = values.addrInfo.st1
                        tempObj.mailingInfo['st2'] = values.addrInfo.st2
                        tempObj.mailingInfo['city'] = values.addrInfo.city
                        tempObj.mailingInfo['state'] = values.addrInfo.state
                        tempObj.mailingInfo['zipCode'] = values.addrInfo.zipCode
                        tempObj.mailingInfo['country'] = values.addrInfo.country
                        tempObj.mailingInfo['primaryPhone'] = values.addrInfo.primaryPhone
                        tempObj.mailingInfo['secondaryPhone'] = values.addrInfo.secondaryPhone
                        tempObj.mailingInfo['additionalPhone'] = values.addrInfo.additionalPhone
                        tempObj.residentialAddr = true
                        tempObj.mailingAddr = true
                    }
                    if (showMailingAddr === false && showResAddr === false) {
                        tempObj.mailingInfo['st1'] = ''
                        tempObj.mailingInfo['st2'] = ''
                        tempObj.mailingInfo['city'] = ''
                        tempObj.mailingInfo['state'] = ''
                        tempObj.mailingInfo['zipCode'] = ''
                        tempObj.mailingInfo['country'] = ''
                        tempObj.mailingInfo['primaryPhone'] = ''
                        tempObj.mailingInfo['secondaryPhone'] = ''
                        tempObj.mailingInfo['additionalPhone'] = ''
                        tempObj.addrInfo['st1'] = ''
                        tempObj.addrInfo['st2'] = ''
                        tempObj.addrInfo['city'] = ''
                        tempObj.addrInfo['state'] = ''
                        tempObj.addrInfo['zipCode'] = ''
                        tempObj.addrInfo['country'] = ''
                        tempObj.addrInfo['primaryPhone'] = ''
                        tempObj.addrInfo['secondaryPhone'] = ''
                        tempObj.addrInfo['additionalPhone'] = ''
                        tempObj.residentialAddr = false
                        tempObj.mailingAddr = false
                    }
                    if (!showResAddr) {
                        tempObj.mailingInfo['st1'] = ''
                        tempObj.mailingInfo['st2'] = ''
                        tempObj.mailingInfo['city'] = ''
                        tempObj.mailingInfo['state'] = ''
                        tempObj.mailingInfo['zipCode'] = ''
                        tempObj.mailingInfo['country'] = ''
                        tempObj.mailingInfo['primaryPhone'] = ''
                        tempObj.mailingInfo['secondaryPhone'] = ''
                        tempObj.mailingInfo['additionalPhone'] = ''
                        tempObj.addrInfo['st1'] = ''
                        tempObj.addrInfo['st2'] = ''
                        tempObj.addrInfo['city'] = ''
                        tempObj.addrInfo['state'] = ''
                        tempObj.addrInfo['zipCode'] = ''
                        tempObj.addrInfo['country'] = ''
                        tempObj.addrInfo['primaryPhone'] = ''
                        tempObj.addrInfo['secondaryPhone'] = ''
                        tempObj.addrInfo['additionalPhone'] = ''
                        tempObj.residentialAddr = false
                        tempObj.mailingAddr = false
                    }
                    if (showResAddr) {
                        tempObj.residentialAddr = true
                    }
                    tempObj["enteredDate"] = CurrentDate()
                    tempObj["admissionDate"] = CurrentDate()

                    if (tempObj.allergyName && tempObj.allergyType) {
                        let temp = {
                            clientID: tempObj.formID,
                            allergyInfo: {
                                allergy: tempObj.allergyName,
                                type: tempObj.allergyType,
                                formID: "ALLERGY-" + randomID(),
                                codeType: "",
                                code: "",
                                allergyState: "",
                                description: "",
                                severity: "",
                                identificationDate: "",
                                reaction: "",
                                diagnosedBy: ""
                            }
                        }
                        axios.put("/health/addAllergy", temp)
                            .then(() => {
                                if (codeType && diagnosisForm.diagnosisCodeType) {
                                    let obj = diagnosisForm
                                    obj.diagnosisCodeType = codeType
                                    let temp = {
                                        clientID: tempObj.formID,
                                        diagnosticsInfo: obj
                                    }
                                    axios.put("/health/addDiagnostics", temp)
                                }
                            })
                    }

                    if (!tempObj.allergyName || !tempObj.allergyType) {
                        if (codeType && diagnosisForm.diagnosisCodeType) {
                            let obj = diagnosisForm
                            obj.diagnosisCodeType = codeType
                            let temp = {
                                clientID: tempObj.formID,
                                diagnosticsInfo: obj
                            }
                            axios.put("/health/addDiagnostics", temp)
                        }
                    }

                    if (tempObj.programID) {
                        let temp = {
                            programID: tempObj.programID,
                            clientID: tempObj.formID,
                        }
                        axios.put("programs/updateClient", temp)
                    }

                    if (sharedContact.length > 0) {
                        axios.post("/shared/addClient/" + tempObj.formID, sharedContact)
                        .then(() =>{
                            // console.log("success")
                        })
                    }

                    if (tempObj.guardianFirstName && tempObj.guardianLastName && tempObj.guardianType) {
                        let temp = {
                            individualID: tempObj.formID,
                            firstName: tempObj.guardianFirstName,
                            lastName: tempObj.guardianLastName,
                            formID: "CONTACT" + "-" + randomID(),
                            isGuardian: true,
                            guardianInfo: {
                                guardianAuthority: "",
                                guardianState: "",
                                guardianEstablishDate: "",
                                guardianEstablishEndDate: "",
                                guardianType: tempObj.guardianType
                            },
                            addressInfo: {
                                st1: "",
                                st2: "",
                                primaryPhone: tempObj.guardianPrimaryPhone,
                                secondaryPhone: "",
                                additionalPhone: "",
                                faxNumber: "",
                                email: tempObj.guardianEmail,
                                webaddress: "",
                                zipCode: "",
                                country: "",
                                state: "",
                                city: ""
                            }
                        }
                        axios.post("/contacts/create", temp)
                    }
                    axios.post('/clients/create', tempObj).then((res) => {
                        console.log(res)
                    })
                    history.push('/care/individual-intake/list')
                }}
            >
                <Form>
                    <div className='fv-row mb-7 fv-plugins-icon-container p-5 card'>
                        <div className='card-body'>
                            <h1 className='mb-5'>Client Intake Form (CIF) (New)</h1>
                            <div className='row'>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Image</label>
                                    <input
                                        type='file'
                                        name='image'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder=''
                                    ></input>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Title</label>
                                    <Field
                                        as='select'
                                        name='title'
                                        className='form-select form-select-lg mb-3'
                                        aria-label='.form-select-lg example'
                                    >
                                        <option hidden>Select Title</option>
                                        <option value='Mr'>Mr</option>
                                        <option value='Miss'>Miss</option>
                                        <option value='Mrs'>Mrs</option>
                                        <option value='Ms'>Ms</option>
                                        <option value='MX'>Mx</option>
                                    </Field>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className='text-danger'>* </label>
                                    <label className=' fw-bold fs-6 mb-2'>Gender</label>
                                    <Field
                                        as='select'
                                        name='gender'
                                        className='form-select form-select-lg mb-3'
                                        aria-label='.form-select-lg example'
                                    >
                                        <option hidden>- Select Gender -</option>
                                        <option value='Male'>Male</option>
                                        <option value='Female'>Female</option>
                                        <option value='Unknown'>Unknown</option>
                                    </Field>
                                    <ErrorMessage name='gender' component='div' className='text-danger' />
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className='text-danger'>* </label>
                                    <label className=' fw-bold fs-6 mb-2'>First Name</label>
                                    <Field
                                        type='text'
                                        name='firstName'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='First Name'
                                        autoComplete='off'
                                        required
                                    ></Field>
                                    <ErrorMessage name='firstName' component='div' className='text-danger' />
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className='text-danger'>* </label>
                                    <label className=' fw-bold fs-6 mb-2'>Last Name</label>
                                    <Field
                                        type='text'
                                        name='lastName'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Last Name'
                                        autoComplete='off'
                                    ></Field>
                                    <ErrorMessage name='lastName' component='div' className='text-danger' />
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
                                    <label className='fw-bold fs-6 mb-2'>Birth Date</label>
                                    <Field
                                        type='date'
                                        name='birthDate'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder=''
                                    ></Field>
                                </div>

                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className='text-danger'>* </label>
                                    <label className=' fw-bold fs-6 mb-2'>Social Security Number</label>
                                    <Field
                                        type='number'
                                        name='socialSecurityNumber'
                                        className='form-control ssn-number form-control-solid mb-3 mb-lg-0'
                                        placeholder='xxxxxxxxx'
                                        autoComplete='off'
                                    ></Field>
                                    <ErrorMessage name='socialSecurityNumber' component='div' className='text-danger' />
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Medicaid Number</label>
                                    <Field
                                        type='text'
                                        name='medicaidNumber'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Medicaid Number'
                                        autoComplete='off'
                                    ></Field>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Email</label>
                                    <Field
                                        type='email'
                                        name='email'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Email'
                                        autoComplete='off'
                                    ></Field>
                                    <ErrorMessage name='email' component='div' className='text-danger' />
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Phone Number</label>
                                    <Field
                                        type='number'
                                        name='phoneNumber'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Phone Number'
                                        autoComplete='off'
                                    ></Field>
                                    <ErrorMessage name='phoneNumber' component='div' className='text-danger' />
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Race</label>
                                    <Field
                                        as='select'
                                        name='race'
                                        className='form-select form-select-lg mb-3'
                                        aria-label='.form-select-lg example'
                                    >
                                        <option hidden>Select Race</option>
                                        <option value='American Indian/Alaskan Native'>
                                            American Indian/Alaskan Native
                                        </option>
                                        <option value='Asian'>Asian</option>
                                        <option value='Asian Indian'>Asian Indian</option>
                                        <option value='Black/African American'>Black/African American</option>
                                        <option value='Chinese'>Chinese</option>
                                        <option value='Declined'>Declined</option>
                                        <option value='Filipino'>Filipino</option>
                                        <option value='Guamanian or chamorro'>Guamanian or chamorro</option>
                                        <option value='Japanese'>Japanese</option>
                                        <option value='Korean'>Korean</option>
                                        <option value='Multiracial'>Multiracial</option>
                                        <option value='Native Hawaiian/Other Pacific Islander'>
                                            Native Hawaiian/Other Pacific Islander
                                        </option>
                                        <option value='Samoan'>Samoan</option>
                                        <option value='Undetermined'>Undetermined</option>
                                        <option value='Unknown'>Unknown</option>
                                        <option value='Vietnamese'>Vietnamese</option>
                                        <option value='White'>White</option>
                                        <option value='Other'>Other</option>
                                    </Field>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                    <label className=' fw-bold fs-6 mb-2'>Ethnicity / Hispanic Origin</label>
                                    <Field
                                        as='select'
                                        name='ethnicity'
                                        className='form-select form-select-lg mb-3'
                                        aria-label='.form-select-lg example'
                                    >
                                        <option hidden>Select Ethnicity / Hispanic Origin</option>
                                        <option value='Bengali'>Bengali</option>
                                        <option value='Central American'>Central American</option>
                                        <option value='Chakma'>Chakma</option>
                                        <option value='Chinese'>Chinese</option>
                                        <option value='Cuban'>Cuban</option>
                                        <option value='Hispanic'>Hispanic</option>
                                        <option value='Indian'>Indian</option>
                                        <option value='Magar'>Magar</option>
                                        <option value='Malays'>Malays</option>
                                        <option value='Marma'>Marma</option>
                                        <option value='Mexican'>Mexican</option>
                                        <option value='Moor'>Moor</option>
                                        <option value='Newar'>Newar</option>
                                        <option value='Not Hispanic or Latino'>Not Hispanic or Latino</option>
                                        <option value='Other Spanish Origin'>Other Spanish Origin</option>
                                        <option value='Puerto Rican'>Puerto Rican</option>
                                        <option value='Sinhalese'>Sinhalese</option>
                                        <option value='South American'>South American</option>
                                        <option value='Tamang'>Tamang</option>
                                        <option value='Tamil'>Tamil</option>
                                        <option value='Tharu'>Tharu</option>
                                        <option value='Unable to determine'>Unable to determine</option>
                                    </Field>
                                </div>
                                <div className="row">
                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                        <label className='fw-bold fs-6 mb-0'>
                                            Residential Address
                                            <input
                                                type='checkbox'
                                                name='residentialAddr'
                                                className='mx-2'
                                                onChange={() => {
                                                    if (showResAddr) {
                                                        setShowMailingAddr(false)
                                                        setShowResAddr(false)
                                                    } else {
                                                        setShowResAddr(true)
                                                    }
                                                }}
                                            />
                                        </label>
                                    </div>
                                    {showResAddr ? (
                                        <div className='row'>
                                            <h3 className='mt-5 mb-5 text-primary display-7'>Residential Address</h3>
                                            <div className='row'>
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Street 1</label>
                                                    <Field
                                                        type='text'
                                                        name='addrInfo.st1'
                                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                                        placeholder='Enter Street 1 here'
                                                        autoComplete='off'
                                                    ></Field>
                                                </div>
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className=' fw-bold fs-6 mb-2'>Street 2</label>
                                                    <Field
                                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                                        type='text'
                                                        autoComplete='off'
                                                        placeholder='Enter Street 2 here...'
                                                        name='addrInfo.st2'
                                                    />
                                                </div>
                                                <div className='row'>
                                                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 my-3'>
                                                        <label className=' fw-bold fs-6 mb-2'>City</label>
                                                        <Field
                                                            type='text'
                                                            name='addrInfo.city'
                                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                                            placeholder='City'
                                                            autoComplete='off'
                                                        ></Field>
                                                    </div>
                                                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 my-3'>
                                                        <label className=' fw-bold fs-6 mb-2'>State</label>
                                                        <Field
                                                            className='form-select form-select-lg mb-3'
                                                            autoComplete='off'
                                                            as='select'
                                                            placeholder='Enter State here...'
                                                            name='addrInfo.state'
                                                        >
                                                            <option value='' hidden>
                                                                - Select State -
                                                            </option>
                                                            <option value='Alabama'>Alabama</option>
                                                            <option value='Alaska'>Alaska</option>
                                                            <option value='Arizona'>Arizona</option>
                                                            <option value='Arkansas'>Arkansas</option>
                                                            <option value='California'>California</option>
                                                            <option value='Colorado'>Colorado</option>
                                                            <option value='Connecticut'>Connecticut</option>
                                                            <option value='Delaware'>Delaware</option>
                                                            <option value='District Of Columbia'>District Of Columbia</option>
                                                            <option value='Florida'>Florida</option>
                                                            <option value='Georgia'>Georgia</option>
                                                            <option value='Hawaii'>Hawaii</option>
                                                            <option value='Idaho'>Idaho</option>
                                                            <option value='Illinois'>Illinois</option>
                                                            <option value='Indiana'>Indiana</option>
                                                            <option value='Iowa'>Iowa</option>
                                                            <option value='Kansas'>Kansas</option>
                                                            <option value='Kentucky'>Kentucky</option>
                                                            <option value='Louisiana'>Louisiana</option>
                                                            <option value='Maine'>Maine</option>
                                                            <option value='Maryland'>Maryland</option>
                                                            <option value='Massachusetts'>Massachusetts</option>
                                                            <option value='Michigan'>Michigan</option>
                                                            <option value='Minnesota'>Minnesota</option>
                                                            <option value='Mississippi'>Mississippi</option>
                                                            <option value='Missouri'>Missouri</option>
                                                            <option value='Montana'>Montana</option>
                                                            <option value='Nebraska'>Nebraska</option>
                                                            <option value='Nevada'>Nevada</option>
                                                            <option value='New Hampshire'>New Hampshire</option>
                                                            <option value='New Jersey'>New Jersey</option>
                                                            <option value='New Mexico'>New Mexico</option>
                                                            <option value='New York'>New York</option>
                                                            <option value='North Carolina'>North Carolina</option>
                                                            <option value='North Dakota'>North Dakota</option>
                                                            <option value='Ohio'>Ohio</option>
                                                            <option value='Oklahoma'>Oklahoma</option>
                                                            <option value='Oregon'>Oregon</option>
                                                            <option value='Pennsylvania'>Pennsylvania</option>
                                                            <option value='Rhode Island'>Rhode Island</option>
                                                            <option value='South Carolina'>South Carolina</option>
                                                            <option value='South Dakota'>South Dakota</option>
                                                            <option value='Tennessee'>Tennessee</option>
                                                            <option value='Texas'>Texas</option>
                                                            <option value='Utah'>Utah</option>
                                                            <option value='Vermont'>Vermont</option>
                                                            <option value='Virginia'>Virginia</option>
                                                            <option value='Washington'>Washington</option>
                                                            <option value='West Virginia'>West Virginia</option>
                                                            <option value='Wisconsin'>Wisconsin</option>
                                                            <option value='Wyoming'>Wyoming</option>
                                                        </Field>
                                                    </div>
                                                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 my-3'>
                                                        <label className=' fw-bold fs-6 mb-2'>Zip Code</label>
                                                        <Field
                                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                                            type='number'
                                                            name='addrInfo.zipCode'
                                                            autoComplete='off'
                                                            placeholder='Enter Zip Code here...'
                                                        />
                                                    </div>

                                                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 my-3'>
                                                        <label className=' fw-bold fs-6 mb-2'>Country</label>
                                                        <Field
                                                            className='form-select form-select-lg mb-3'
                                                            as='select'
                                                            autoComplete='off'
                                                            placeholder='Enter Country here...'
                                                            name='addrInfo.country'
                                                        >
                                                            <option>- Select Country -</option>
                                                            <option value='Afghanistan'>Afghanistan</option>
                                                            <option value='Aland Islands'>Aland Islands</option>
                                                            <option value='Albania'>Albania</option>
                                                            <option value='Algeria'>Algeria</option>
                                                            <option value='American Samoa'>American Samoa</option>
                                                            <option value='Andorra'>Andorra</option>
                                                            <option value='Angola'>Angola</option>
                                                            <option value='Anguilla'>Anguilla</option>
                                                            <option value='Antarctica'>Antarctica</option>
                                                            <option value='Antigua and Barbuda'>Antigua and Barbuda</option>
                                                            <option value='Argentina'>Argentina</option>
                                                            <option value='Armenia'>Armenia</option>
                                                            <option value='Aruba'>Aruba</option>
                                                            <option value='Australia'>Australia</option>
                                                            <option value='Austria'>Austria</option>
                                                            <option value='Azerbaijan'>Azerbaijan</option>
                                                            <option value='Bahamas'>Bahamas</option>
                                                            <option value='Bahrain'>Bahrain</option>
                                                            <option value='Bangladesh'>Bangladesh</option>
                                                            <option value='Barbados'>Barbados</option>
                                                            <option value='Belarus'>Belarus</option>
                                                            <option value='Belgium'>Belgium</option>
                                                            <option value='Belize'>Belize</option>
                                                            <option value='Benin'>Benin</option>
                                                            <option value='Bermuda'>Bermuda</option>
                                                            <option value='Bhutan'>Bhutan</option>
                                                            <option value='Bolivia'>Bolivia</option>
                                                            <option value='Bonaire, Sint Eustatius and Saba'>Bonaire, Sint Eustatius and Saba</option>
                                                            <option value='Bosnia and Herzegovina'>Bosnia and Herzegovina</option>
                                                            <option value='Botswana'>Botswana</option>
                                                            <option value='Bouvet Island'>Bouvet Island</option>
                                                            <option value='Brazil'>Brazil</option>
                                                            <option value='British Indian Ocean Territory'>British Indian Ocean Territory</option>
                                                            <option value='Brunei Darussalam'>Brunei Darussalam</option>
                                                            <option value='Bulgaria'>Bulgaria</option>
                                                            <option value='Burkina Faso'>Burkina Faso</option>
                                                            <option value='Burundi'>Burundi</option>
                                                            <option value='Cambodia'>Cambodia</option>
                                                            <option value='Cameroon'>Cameroon</option>
                                                            <option value='Canada'>Canada</option>
                                                            <option value='Cape Verde'>Cape Verde</option>
                                                            <option value='Cayman Islands'>Cayman Islands</option>
                                                            <option value='Central African Republic'>Central African Republic</option>
                                                            <option value='Chad'>Chad</option>
                                                            <option value='Chile'>Chile</option>
                                                            <option value='China'>China</option>
                                                            <option value='Christmas Island'>Christmas Island</option>
                                                            <option value='Cocos (Keeling) Islands'>Cocos (Keeling) Islands</option>
                                                            <option value='Colombia'>Colombia</option>
                                                            <option value='Comoros'>Comoros</option>
                                                            <option value='Congo'>Congo</option>
                                                            <option value='Congo, Democratic Republic of the Congo'>Congo, Democratic Republic of the Congo</option>
                                                            <option value='Cook Islands'>Cook Islands</option>
                                                            <option value='Costa Rica'>Costa Rica</option>
                                                            <option value='Croatia'>Croatia</option>
                                                            <option value='Cuba'>Cuba</option>
                                                            <option value='Curacao'>Curacao</option>
                                                            <option value='Cyprus'>Cyprus</option>
                                                            <option value='Czech Republic'>Czech Republic</option>
                                                            <option value='Denmark'>Denmark</option>
                                                            <option value='Djibouti'>Djibouti</option>
                                                            <option value='Dominica'>Dominica</option>
                                                            <option value='Dominican Republic'>Dominican Republic</option>
                                                            <option value='Ecuador'>Ecuador</option>
                                                            <option value='Egypt'>Egypt</option>
                                                            <option value='El Salvador'>El Salvador</option>
                                                            <option value='Equatorial Guinea'>Equatorial Guinea</option>
                                                            <option value='Eritrea'>Eritrea</option>
                                                            <option value='Estonia'>Estonia</option>
                                                            <option value='Ethiopia'>Ethiopia</option>
                                                            <option value='Falkland Islands (Malvinas)'>Falkland Islands (Malvinas)</option>
                                                            <option value='Faroe Islands'>Faroe Islands</option>
                                                            <option value='Fiji'>Fiji</option>
                                                            <option value='Finland'>Finland</option>
                                                            <option value='France'>France</option>
                                                            <option value='French Guiana'>French Guiana</option>
                                                            <option value='French Polynesia'>French Polynesia</option>
                                                            <option value='French Southern Territories'>French Southern Territories</option>
                                                            <option value='Gabon'>Gabon</option>
                                                            <option value='Gambia'>Gambia</option>
                                                            <option value='Georgia'>Georgia</option>
                                                            <option value='Germany'>Germany</option>
                                                            <option value='Ghana'>Ghana</option>
                                                            <option value='Gibraltar'>Gibraltar</option>
                                                            <option value='Greece'>Greece</option>
                                                            <option value='Greenland'>Greenland</option>
                                                            <option value='Grenada'>Grenada</option>
                                                            <option value='Guadeloupe'>Guadeloupe</option>
                                                            <option value='Guam'>Guam</option>
                                                            <option value='Guatemala'>Guatemala</option>
                                                            <option value='Guernsey'>Guernsey</option>
                                                            <option value='Guinea'>Guinea</option>
                                                            <option value='Guinea-Bissau'>Guinea-Bissau</option>
                                                            <option value='Guyana'>Guyana</option>
                                                            <option value='Haiti'>Haiti</option>
                                                            <option value='Heard Island and Mcdonald Islands'>Heard Island and Mcdonald Islands</option>
                                                            <option value='Holy See (Vatican City State)'>Holy See (Vatican City State)</option>
                                                            <option value='Honduras'>Honduras</option>
                                                            <option value='Hong Kong'>Hong Kong</option>
                                                            <option value='Hungary'>Hungary</option>
                                                            <option value='Iceland'>Iceland</option>
                                                            <option value='India'>India</option>
                                                            <option value='Indonesia'>Indonesia</option>
                                                            <option value='Iran, Islamic Republic of'>Iran, Islamic Republic of</option>
                                                            <option value='Iraq'>Iraq</option>
                                                            <option value='Ireland'>Ireland</option>
                                                            <option value='Isle of Man'>Isle of Man</option>
                                                            <option value='Israel'>Israel</option>
                                                            <option value='Italy'>Italy</option>
                                                            <option value='Jamaica'>Jamaica</option>
                                                            <option value='Japan'>Japan</option>
                                                            <option value='Jersey'>Jersey</option>
                                                            <option value='Jordan'>Jordan</option>
                                                            <option value='Kazakhstan'>Kazakhstan</option>
                                                            <option value='Kenya'>Kenya</option>
                                                            <option value='Kiribati'>Kiribati</option>
                                                            <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                                                            <option value='Korea, Republic of'>Korea, Republic of</option>
                                                            <option value='Kosovo'>Kosovo</option>
                                                            <option value='Kuwait'>Kuwait</option>
                                                            <option value='Kyrgyzstan'>Kyrgyzstan</option>
                                                            <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                                                            <option value='Latvia'>Latvia</option>
                                                            <option value='Lebanon'>Lebanon</option>
                                                            <option value='Lesotho'>Lesotho</option>
                                                            <option value='Liberia'>Liberia</option>
                                                            <option value='Libyan Arab Jamahiriya'>Libyan Arab Jamahiriya</option>
                                                            <option value='Liechtenstein'>Liechtenstein</option>
                                                            <option value='Lithuania'>Lithuania</option>
                                                            <option value='Luxembourg'>Luxembourg</option>
                                                            <option value='Macao'>Macao</option>
                                                            <option value='Macedonia, the Former Yugoslav Republic of'>Macedonia, the Former Yugoslav Republic of</option>
                                                            <option value='Madagascar'>Madagascar</option>
                                                            <option value='Malawi'>Malawi</option>
                                                            <option value='Malaysia'>Malaysia</option>
                                                            <option value='Maldives'>Maldives</option>
                                                            <option value='Mali'>Mali</option>
                                                            <option value='Malta'>Malta</option>
                                                            <option value='Marshall Islands'>Marshall Islands</option>
                                                            <option value='Martinique'>Martinique</option>
                                                            <option value='Mauritania'>Mauritania</option>
                                                            <option value='Mauritius'>Mauritius</option>
                                                            <option value='Mayotte'>Mayotte</option>
                                                            <option value='Mexico'>Mexico</option>
                                                            <option value='Micronesia, Federated States of'>Micronesia, Federated States of</option>
                                                            <option value='Moldova, Republic of'>Moldova, Republic of</option>
                                                            <option value='Monaco'>Monaco</option>
                                                            <option value='Mongolia'>Mongolia</option>
                                                            <option value='Montenegro'>Montenegro</option>
                                                            <option value='Montserrat'>Montserrat</option>
                                                            <option value='Morocco'>Morocco</option>
                                                            <option value='Mozambique'>Mozambique</option>
                                                            <option value='Myanmar'>Myanmar</option>
                                                            <option value='Namibia'>Namibia</option>
                                                            <option value='Nauru'>Nauru</option>
                                                            <option value='Nepal'>Nepal</option>
                                                            <option value='Netherlands'>Netherlands</option>
                                                            <option value='Netherlands Antilles'>Netherlands Antilles</option>
                                                            <option value='New Caledonia'>New Caledonia</option>
                                                            <option value='New Zealand'>New Zealand</option>
                                                            <option value='Nicaragua'>Nicaragua</option>
                                                            <option value='Niger'>Niger</option>
                                                            <option value='Nigeria'>Nigeria</option>
                                                            <option value='Niue'>Niue</option>
                                                            <option value='Norfolk Island'>Norfolk Island</option>
                                                            <option value='Northern Mariana Islands'>Northern Mariana Islands</option>
                                                            <option value='Norway'>Norway</option>
                                                            <option value='Oman'>Oman</option>
                                                            <option value='Pakistan'>Pakistan</option>
                                                            <option value='Palau'>Palau</option>
                                                            <option value='Palestinian Territory, Occupied'>Palestinian Territory, Occupied</option>
                                                            <option value='Panama'>Panama</option>
                                                            <option value='Papua New Guinea'>Papua New Guinea</option>
                                                            <option value='Paraguay'>Paraguay</option>
                                                            <option value='Peru'>Peru</option>
                                                            <option value='Philippines'>Philippines</option>
                                                            <option value='Pitcairn'>Pitcairn</option>
                                                            <option value='Poland'>Poland</option>
                                                            <option value='Portugal'>Portugal</option>
                                                            <option value='Puerto Rico'>Puerto Rico</option>
                                                            <option value='Qatar'>Qatar</option>
                                                            <option value='Reunion'>Reunion</option>
                                                            <option value='Romania'>Romania</option>
                                                            <option value='Russian Federation'>Russian Federation</option>
                                                            <option value='Rwanda'>Rwanda</option>
                                                            <option value='Saint Barthelemy'>Saint Barthelemy</option>
                                                            <option value='Saint Helena'>Saint Helena</option>
                                                            <option value='Saint Kitts and Nevis'>Saint Kitts and Nevis</option>
                                                            <option value='Saint Lucia'>Saint Lucia</option>
                                                            <option value='Saint Martin'>Saint Martin</option>
                                                            <option value='Saint Pierre and Miquelon'>Saint Pierre and Miquelon</option>
                                                            <option value='Saint Vincent and the Grenadines'>Saint Vincent and the Grenadines</option>
                                                            <option value='WS'>Samoa</option>
                                                            <option value='>San Marino'>San Marino</option>
                                                            <option value='Sao Tome and Principe'>Sao Tome and Principe</option>
                                                            <option value='Saudi Arabia'>Saudi Arabia</option>
                                                            <option value='Senegal'>Senegal</option>
                                                            <option value='Serbia'>Serbia</option>
                                                            <option value='Serbia and Montenegro'>Serbia and Montenegro</option>
                                                            <option value='Seychelles'>Seychelles</option>
                                                            <option value='Sierra Leone'>Sierra Leone</option>
                                                            <option value='Singapore'>Singapore</option>
                                                            <option value='Sint Maarten'>Sint Maarten</option>
                                                            <option value='Slovakia'>Slovakia</option>
                                                            <option value='Slovenia'>Slovenia</option>
                                                            <option value='Solomon Islands'>Solomon Islands</option>
                                                            <option value='Somalia'>Somalia</option>
                                                            <option value='South Africa'>South Africa</option>
                                                            <option value='South Georgia and the South Sandwich Islands'>South Georgia and the South Sandwich Islands</option>
                                                            <option value='South Sudan'>South Sudan</option>
                                                            <option value='Spain'>Spain</option>
                                                            <option value='Sri Lanka'>Sri Lanka</option>
                                                            <option value='Sudan'>Sudan</option>
                                                            <option value='Suriname'>Suriname</option>
                                                            <option value='Svalbard and Jan Mayen'>Svalbard and Jan Mayen</option>
                                                            <option value='Swaziland'>Swaziland</option>
                                                            <option value='Sweden'>Sweden</option>
                                                            <option value='Switzerland'>Switzerland</option>
                                                            <option value='Syrian Arab Republic'>Syrian Arab Republic</option>
                                                            <option value='Taiwan, Province of China'>Taiwan, Province of China</option>
                                                            <option value='Tajikistan'>Tajikistan</option>
                                                            <option value='Tanzania, United Republic of'>Tanzania, United Republic of</option>
                                                            <option value='Thailand'>Thailand</option>
                                                            <option value='Timor-Leste'>Timor-Leste</option>
                                                            <option value='Togo'>Togo</option>
                                                            <option value='Tokelau'>Tokelau</option>
                                                            <option value='Tonga'>Tonga</option>
                                                            <option value='Trinidad and Tobago'>Trinidad and Tobago</option>
                                                            <option value='Tunisia'>Tunisia</option>
                                                            <option value='Turkey'>Turkey</option>
                                                            <option value='Turkmenistan'>Turkmenistan</option>
                                                            <option value='Turks and Caicos Islands'>Turks and Caicos Islands</option>
                                                            <option value='Tuvalu'>Tuvalu</option>
                                                            <option value='Uganda'>Uganda</option>
                                                            <option value='Ukraine'>Ukraine</option>
                                                            <option value='United Arab Emirates'>United Arab Emirates</option>
                                                            <option value='United Kingdom'>United Kingdom</option>
                                                            <option value='United States'>United States</option>
                                                            <option value='United States Minor Outlying Islands'>United States Minor Outlying Islands</option>
                                                            <option value='Uruguay'>Uruguay</option>
                                                            <option value='Uzbekistan'>Uzbekistan</option>
                                                            <option value='Vanuatu'>Vanuatu</option>
                                                            <option value='Venezuela'>Venezuela</option>
                                                            <option value='Viet Nam'>Viet Nam</option>
                                                            <option value='Virgin Islands, British'>Virgin Islands, British</option>
                                                            <option value='Virgin Islands, U.s.'>Virgin Islands, U.s.</option>
                                                            <option value='Wallis and Futuna'>Wallis and Futuna</option>
                                                            <option value='Western Sahara'>Western Sahara</option>
                                                            <option value='Yemen'>Yemen</option>
                                                            <option value='Zambia'>Zambia</option>
                                                            <option value='Zimbabwe'>Zimbabwe</option>
                                                        </Field>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                        <label className='fw-bold fs-6 mb-2'>Primary Phone</label>
                                                        <Field
                                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                                            type='number'
                                                            name='addrInfo.primaryPhone'
                                                            autoComplete='off'
                                                        />
                                                        <ErrorMessage name='addrInfo.primaryPhone' component='div' className='text-danger' />
                                                    </div>

                                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                        <label className='fw-bold fs-6 mb-2'>Secondary Phone</label>
                                                        <Field
                                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                                            type='number'
                                                            name='addrInfo.secondaryPhone'
                                                            autoComplete='off'
                                                        />
                                                        <ErrorMessage
                                                            name='addrInfo.secondaryPhone'
                                                            component='div'
                                                            className='text-danger'
                                                        />
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                        <label className='fw-bold fs-6 mb-2'>Additional Phone</label>
                                                        <Field
                                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                                            type='number'
                                                            name='addrInfo.additionalPhone'
                                                            autoComplete='off'
                                                        />
                                                        <ErrorMessage
                                                            name='addrInfo.additionalPhone'
                                                            component='div'
                                                            className='text-danger'
                                                        />
                                                    </div>
                                                </div>
                                                <div className=' mt-4'>
                                                    <div className='w-50'>
                                                        <h6>Is Mailing Address the same as Residential?</h6>
                                                    </div>
                                                    <div className='d-flex'>
                                                        <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20 mt-3'>
                                                            Yes
                                                            <input
                                                                name='mailingInCareOf'
                                                                type='radio'
                                                                className='mx-2'
                                                                onChange={() => {
                                                                    setShowMailingAddr(false)
                                                                }}
                                                            />
                                                        </label>
                                                        <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20 mt-3'>
                                                            No
                                                            <input
                                                                name='mailingInCareOf'
                                                                type='radio'
                                                                className='mx-2'
                                                                onChange={() => {
                                                                    setShowMailingAddr(true)
                                                                }}
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null}
                                    {showMailingAddr ? (
                                        <div className='row mx-5'>
                                            <h3 className='mt-5 mb-5 text-primary display-7'>Mailing Address</h3>
                                            <div className='row'>
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className='fw-bold fs-6 mb-2'>Street 1</label>
                                                    <Field
                                                        type='text'
                                                        name='mailingInfo.st1'
                                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                                        placeholder='Enter Street 1 here'
                                                        autoComplete='off'
                                                    ></Field>
                                                </div>
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                    <label className='fw-bold fs-6 mb-2'>Street 2</label>
                                                    <Field
                                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                                        type='text'
                                                        autoComplete='off'
                                                        placeholder='Enter Street 2 here...'
                                                        name='mailingInfo.st2'
                                                    />
                                                </div>
                                                <div className='row'>
                                                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 my-3'>
                                                        <label className='fw-bold fs-6 mb-2'>City</label>
                                                        <Field
                                                            type='text'
                                                            name='mailingInfo.city'
                                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                                            placeholder='City'
                                                            autoComplete='off'
                                                        ></Field>
                                                    </div>
                                                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 my-3'>
                                                        <label className='fw-bold fs-6 mb-2'>State</label>
                                                        <Field
                                                            className='form-select form-select-lg mb-3'
                                                            autoComplete='off'
                                                            as='select'
                                                            placeholder='Enter State here...'
                                                            name='mailingInfo.state'
                                                        >
                                                            <option value='' hidden>
                                                                - Select State -
                                                            </option>
                                                            <option value='Alabama'>Alabama</option>
                                                            <option value='Alaska'>Alaska</option>
                                                            <option value='Arizona'>Arizona</option>
                                                            <option value='Arkansas'>Arkansas</option>
                                                            <option value='California'>California</option>
                                                            <option value='Colorado'>Colorado</option>
                                                            <option value='Connecticut'>Connecticut</option>
                                                            <option value='Delaware'>Delaware</option>
                                                            <option value='District Of Columbia'>District Of Columbia</option>
                                                            <option value='Florida'>Florida</option>
                                                            <option value='Georgia'>Georgia</option>
                                                            <option value='Hawaii'>Hawaii</option>
                                                            <option value='Idaho'>Idaho</option>
                                                            <option value='Illinois'>Illinois</option>
                                                            <option value='Indiana'>Indiana</option>
                                                            <option value='Iowa'>Iowa</option>
                                                            <option value='Kansas'>Kansas</option>
                                                            <option value='Kentucky'>Kentucky</option>
                                                            <option value='Louisiana'>Louisiana</option>
                                                            <option value='Maine'>Maine</option>
                                                            <option value='Maryland'>Maryland</option>
                                                            <option value='Massachusetts'>Massachusetts</option>
                                                            <option value='Michigan'>Michigan</option>
                                                            <option value='Minnesota'>Minnesota</option>
                                                            <option value='Mississippi'>Mississippi</option>
                                                            <option value='Missouri'>Missouri</option>
                                                            <option value='Montana'>Montana</option>
                                                            <option value='Nebraska'>Nebraska</option>
                                                            <option value='Nevada'>Nevada</option>
                                                            <option value='New Hampshire'>New Hampshire</option>
                                                            <option value='New Jersey'>New Jersey</option>
                                                            <option value='New Mexico'>New Mexico</option>
                                                            <option value='New York'>New York</option>
                                                            <option value='North Carolina'>North Carolina</option>
                                                            <option value='North Dakota'>North Dakota</option>
                                                            <option value='Ohio'>Ohio</option>
                                                            <option value='Oklahoma'>Oklahoma</option>
                                                            <option value='Oregon'>Oregon</option>
                                                            <option value='Pennsylvania'>Pennsylvania</option>
                                                            <option value='Rhode Island'>Rhode Island</option>
                                                            <option value='South Carolina'>South Carolina</option>
                                                            <option value='South Dakota'>South Dakota</option>
                                                            <option value='Tennessee'>Tennessee</option>
                                                            <option value='Texas'>Texas</option>
                                                            <option value='Utah'>Utah</option>
                                                            <option value='Vermont'>Vermont</option>
                                                            <option value='Virginia'>Virginia</option>
                                                            <option value='Washington'>Washington</option>
                                                            <option value='West Virginia'>West Virginia</option>
                                                            <option value='Wisconsin'>Wisconsin</option>
                                                            <option value='Wyoming'>Wyoming</option>
                                                        </Field>
                                                    </div>
                                                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 my-3'>
                                                        <label className='fw-bold fs-6 mb-2'>Zip Code</label>
                                                        <Field
                                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                                            type='number'
                                                            name='mailingInfo.zipCode'
                                                            autoComplete='off'
                                                            placeholder='Enter Zip Code here...'
                                                        />
                                                    </div>

                                                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 my-3'>
                                                        <label className='fw-bold fs-6 mb-2'>Country</label>
                                                        <Field
                                                            className='form-select form-select-lg mb-3'
                                                            as='select'
                                                            autoComplete='off'
                                                            placeholder='Enter Country here...'
                                                            name='mailingInfo.country'
                                                        >

                                                            <option>- Select Country -</option>
                                                            <option value='Afghanistan'>Afghanistan</option>
                                                            <option value='Aland Islands'>Aland Islands</option>
                                                            <option value='Albania'>Albania</option>
                                                            <option value='Algeria'>Algeria</option>
                                                            <option value='American Samoa'>American Samoa</option>
                                                            <option value='Andorra'>Andorra</option>
                                                            <option value='Angola'>Angola</option>
                                                            <option value='Anguilla'>Anguilla</option>
                                                            <option value='Antarctica'>Antarctica</option>
                                                            <option value='Antigua and Barbuda'>Antigua and Barbuda</option>
                                                            <option value='Argentina'>Argentina</option>
                                                            <option value='Armenia'>Armenia</option>
                                                            <option value='Aruba'>Aruba</option>
                                                            <option value='Australia'>Australia</option>
                                                            <option value='Austria'>Austria</option>
                                                            <option value='Azerbaijan'>Azerbaijan</option>
                                                            <option value='Bahamas'>Bahamas</option>
                                                            <option value='Bahrain'>Bahrain</option>
                                                            <option value='Bangladesh'>Bangladesh</option>
                                                            <option value='Barbados'>Barbados</option>
                                                            <option value='Belarus'>Belarus</option>
                                                            <option value='Belgium'>Belgium</option>
                                                            <option value='Belize'>Belize</option>
                                                            <option value='Benin'>Benin</option>
                                                            <option value='Bermuda'>Bermuda</option>
                                                            <option value='Bhutan'>Bhutan</option>
                                                            <option value='Bolivia'>Bolivia</option>
                                                            <option value='Bonaire, Sint Eustatius and Saba'>Bonaire, Sint Eustatius and Saba</option>
                                                            <option value='Bosnia and Herzegovina'>Bosnia and Herzegovina</option>
                                                            <option value='Botswana'>Botswana</option>
                                                            <option value='Bouvet Island'>Bouvet Island</option>
                                                            <option value='Brazil'>Brazil</option>
                                                            <option value='British Indian Ocean Territory'>British Indian Ocean Territory</option>
                                                            <option value='Brunei Darussalam'>Brunei Darussalam</option>
                                                            <option value='Bulgaria'>Bulgaria</option>
                                                            <option value='Burkina Faso'>Burkina Faso</option>
                                                            <option value='Burundi'>Burundi</option>
                                                            <option value='Cambodia'>Cambodia</option>
                                                            <option value='Cameroon'>Cameroon</option>
                                                            <option value='Canada'>Canada</option>
                                                            <option value='Cape Verde'>Cape Verde</option>
                                                            <option value='Cayman Islands'>Cayman Islands</option>
                                                            <option value='Central African Republic'>Central African Republic</option>
                                                            <option value='Chad'>Chad</option>
                                                            <option value='Chile'>Chile</option>
                                                            <option value='China'>China</option>
                                                            <option value='Christmas Island'>Christmas Island</option>
                                                            <option value='Cocos (Keeling) Islands'>Cocos (Keeling) Islands</option>
                                                            <option value='Colombia'>Colombia</option>
                                                            <option value='Comoros'>Comoros</option>
                                                            <option value='Congo'>Congo</option>
                                                            <option value='Congo, Democratic Republic of the Congo'>Congo, Democratic Republic of the Congo</option>
                                                            <option value='Cook Islands'>Cook Islands</option>
                                                            <option value='Costa Rica'>Costa Rica</option>
                                                            <option value='Croatia'>Croatia</option>
                                                            <option value='Cuba'>Cuba</option>
                                                            <option value='Curacao'>Curacao</option>
                                                            <option value='Cyprus'>Cyprus</option>
                                                            <option value='Czech Republic'>Czech Republic</option>
                                                            <option value='Denmark'>Denmark</option>
                                                            <option value='Djibouti'>Djibouti</option>
                                                            <option value='Dominica'>Dominica</option>
                                                            <option value='Dominican Republic'>Dominican Republic</option>
                                                            <option value='Ecuador'>Ecuador</option>
                                                            <option value='Egypt'>Egypt</option>
                                                            <option value='El Salvador'>El Salvador</option>
                                                            <option value='Equatorial Guinea'>Equatorial Guinea</option>
                                                            <option value='Eritrea'>Eritrea</option>
                                                            <option value='Estonia'>Estonia</option>
                                                            <option value='Ethiopia'>Ethiopia</option>
                                                            <option value='Falkland Islands (Malvinas)'>Falkland Islands (Malvinas)</option>
                                                            <option value='Faroe Islands'>Faroe Islands</option>
                                                            <option value='Fiji'>Fiji</option>
                                                            <option value='Finland'>Finland</option>
                                                            <option value='France'>France</option>
                                                            <option value='French Guiana'>French Guiana</option>
                                                            <option value='French Polynesia'>French Polynesia</option>
                                                            <option value='French Southern Territories'>French Southern Territories</option>
                                                            <option value='Gabon'>Gabon</option>
                                                            <option value='Gambia'>Gambia</option>
                                                            <option value='Georgia'>Georgia</option>
                                                            <option value='Germany'>Germany</option>
                                                            <option value='Ghana'>Ghana</option>
                                                            <option value='Gibraltar'>Gibraltar</option>
                                                            <option value='Greece'>Greece</option>
                                                            <option value='Greenland'>Greenland</option>
                                                            <option value='Grenada'>Grenada</option>
                                                            <option value='Guadeloupe'>Guadeloupe</option>
                                                            <option value='Guam'>Guam</option>
                                                            <option value='Guatemala'>Guatemala</option>
                                                            <option value='Guernsey'>Guernsey</option>
                                                            <option value='Guinea'>Guinea</option>
                                                            <option value='Guinea-Bissau'>Guinea-Bissau</option>
                                                            <option value='Guyana'>Guyana</option>
                                                            <option value='Haiti'>Haiti</option>
                                                            <option value='Heard Island and Mcdonald Islands'>Heard Island and Mcdonald Islands</option>
                                                            <option value='Holy See (Vatican City State)'>Holy See (Vatican City State)</option>
                                                            <option value='Honduras'>Honduras</option>
                                                            <option value='Hong Kong'>Hong Kong</option>
                                                            <option value='Hungary'>Hungary</option>
                                                            <option value='Iceland'>Iceland</option>
                                                            <option value='India'>India</option>
                                                            <option value='Indonesia'>Indonesia</option>
                                                            <option value='Iran, Islamic Republic of'>Iran, Islamic Republic of</option>
                                                            <option value='Iraq'>Iraq</option>
                                                            <option value='Ireland'>Ireland</option>
                                                            <option value='Isle of Man'>Isle of Man</option>
                                                            <option value='Israel'>Israel</option>
                                                            <option value='Italy'>Italy</option>
                                                            <option value='Jamaica'>Jamaica</option>
                                                            <option value='Japan'>Japan</option>
                                                            <option value='Jersey'>Jersey</option>
                                                            <option value='Jordan'>Jordan</option>
                                                            <option value='Kazakhstan'>Kazakhstan</option>
                                                            <option value='Kenya'>Kenya</option>
                                                            <option value='Kiribati'>Kiribati</option>
                                                            <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                                                            <option value='Korea, Republic of'>Korea, Republic of</option>
                                                            <option value='Kosovo'>Kosovo</option>
                                                            <option value='Kuwait'>Kuwait</option>
                                                            <option value='Kyrgyzstan'>Kyrgyzstan</option>
                                                            <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                                                            <option value='Latvia'>Latvia</option>
                                                            <option value='Lebanon'>Lebanon</option>
                                                            <option value='Lesotho'>Lesotho</option>
                                                            <option value='Liberia'>Liberia</option>
                                                            <option value='Libyan Arab Jamahiriya'>Libyan Arab Jamahiriya</option>
                                                            <option value='Liechtenstein'>Liechtenstein</option>
                                                            <option value='Lithuania'>Lithuania</option>
                                                            <option value='Luxembourg'>Luxembourg</option>
                                                            <option value='Macao'>Macao</option>
                                                            <option value='Macedonia, the Former Yugoslav Republic of'>Macedonia, the Former Yugoslav Republic of</option>
                                                            <option value='Madagascar'>Madagascar</option>
                                                            <option value='Malawi'>Malawi</option>
                                                            <option value='Malaysia'>Malaysia</option>
                                                            <option value='Maldives'>Maldives</option>
                                                            <option value='Mali'>Mali</option>
                                                            <option value='Malta'>Malta</option>
                                                            <option value='Marshall Islands'>Marshall Islands</option>
                                                            <option value='Martinique'>Martinique</option>
                                                            <option value='Mauritania'>Mauritania</option>
                                                            <option value='Mauritius'>Mauritius</option>
                                                            <option value='Mayotte'>Mayotte</option>
                                                            <option value='Mexico'>Mexico</option>
                                                            <option value='Micronesia, Federated States of'>Micronesia, Federated States of</option>
                                                            <option value='Moldova, Republic of'>Moldova, Republic of</option>
                                                            <option value='Monaco'>Monaco</option>
                                                            <option value='Mongolia'>Mongolia</option>
                                                            <option value='Montenegro'>Montenegro</option>
                                                            <option value='Montserrat'>Montserrat</option>
                                                            <option value='Morocco'>Morocco</option>
                                                            <option value='Mozambique'>Mozambique</option>
                                                            <option value='Myanmar'>Myanmar</option>
                                                            <option value='Namibia'>Namibia</option>
                                                            <option value='Nauru'>Nauru</option>
                                                            <option value='Nepal'>Nepal</option>
                                                            <option value='Netherlands'>Netherlands</option>
                                                            <option value='Netherlands Antilles'>Netherlands Antilles</option>
                                                            <option value='New Caledonia'>New Caledonia</option>
                                                            <option value='New Zealand'>New Zealand</option>
                                                            <option value='Nicaragua'>Nicaragua</option>
                                                            <option value='Niger'>Niger</option>
                                                            <option value='Nigeria'>Nigeria</option>
                                                            <option value='Niue'>Niue</option>
                                                            <option value='Norfolk Island'>Norfolk Island</option>
                                                            <option value='Northern Mariana Islands'>Northern Mariana Islands</option>
                                                            <option value='Norway'>Norway</option>
                                                            <option value='Oman'>Oman</option>
                                                            <option value='Pakistan'>Pakistan</option>
                                                            <option value='Palau'>Palau</option>
                                                            <option value='Palestinian Territory, Occupied'>Palestinian Territory, Occupied</option>
                                                            <option value='Panama'>Panama</option>
                                                            <option value='Papua New Guinea'>Papua New Guinea</option>
                                                            <option value='Paraguay'>Paraguay</option>
                                                            <option value='Peru'>Peru</option>
                                                            <option value='Philippines'>Philippines</option>
                                                            <option value='Pitcairn'>Pitcairn</option>
                                                            <option value='Poland'>Poland</option>
                                                            <option value='Portugal'>Portugal</option>
                                                            <option value='Puerto Rico'>Puerto Rico</option>
                                                            <option value='Qatar'>Qatar</option>
                                                            <option value='Reunion'>Reunion</option>
                                                            <option value='Romania'>Romania</option>
                                                            <option value='Russian Federation'>Russian Federation</option>
                                                            <option value='Rwanda'>Rwanda</option>
                                                            <option value='Saint Barthelemy'>Saint Barthelemy</option>
                                                            <option value='Saint Helena'>Saint Helena</option>
                                                            <option value='Saint Kitts and Nevis'>Saint Kitts and Nevis</option>
                                                            <option value='Saint Lucia'>Saint Lucia</option>
                                                            <option value='Saint Martin'>Saint Martin</option>
                                                            <option value='Saint Pierre and Miquelon'>Saint Pierre and Miquelon</option>
                                                            <option value='Saint Vincent and the Grenadines'>Saint Vincent and the Grenadines</option>
                                                            <option value='WS'>Samoa</option>
                                                            <option value='>San Marino'>San Marino</option>
                                                            <option value='Sao Tome and Principe'>Sao Tome and Principe</option>
                                                            <option value='Saudi Arabia'>Saudi Arabia</option>
                                                            <option value='Senegal'>Senegal</option>
                                                            <option value='Serbia'>Serbia</option>
                                                            <option value='Serbia and Montenegro'>Serbia and Montenegro</option>
                                                            <option value='Seychelles'>Seychelles</option>
                                                            <option value='Sierra Leone'>Sierra Leone</option>
                                                            <option value='Singapore'>Singapore</option>
                                                            <option value='Sint Maarten'>Sint Maarten</option>
                                                            <option value='Slovakia'>Slovakia</option>
                                                            <option value='Slovenia'>Slovenia</option>
                                                            <option value='Solomon Islands'>Solomon Islands</option>
                                                            <option value='Somalia'>Somalia</option>
                                                            <option value='South Africa'>South Africa</option>
                                                            <option value='South Georgia and the South Sandwich Islands'>South Georgia and the South Sandwich Islands</option>
                                                            <option value='South Sudan'>South Sudan</option>
                                                            <option value='Spain'>Spain</option>
                                                            <option value='Sri Lanka'>Sri Lanka</option>
                                                            <option value='Sudan'>Sudan</option>
                                                            <option value='Suriname'>Suriname</option>
                                                            <option value='Svalbard and Jan Mayen'>Svalbard and Jan Mayen</option>
                                                            <option value='Swaziland'>Swaziland</option>
                                                            <option value='Sweden'>Sweden</option>
                                                            <option value='Switzerland'>Switzerland</option>
                                                            <option value='Syrian Arab Republic'>Syrian Arab Republic</option>
                                                            <option value='Taiwan, Province of China'>Taiwan, Province of China</option>
                                                            <option value='Tajikistan'>Tajikistan</option>
                                                            <option value='Tanzania, United Republic of'>Tanzania, United Republic of</option>
                                                            <option value='Thailand'>Thailand</option>
                                                            <option value='Timor-Leste'>Timor-Leste</option>
                                                            <option value='Togo'>Togo</option>
                                                            <option value='Tokelau'>Tokelau</option>
                                                            <option value='Tonga'>Tonga</option>
                                                            <option value='Trinidad and Tobago'>Trinidad and Tobago</option>
                                                            <option value='Tunisia'>Tunisia</option>
                                                            <option value='Turkey'>Turkey</option>
                                                            <option value='Turkmenistan'>Turkmenistan</option>
                                                            <option value='Turks and Caicos Islands'>Turks and Caicos Islands</option>
                                                            <option value='Tuvalu'>Tuvalu</option>
                                                            <option value='Uganda'>Uganda</option>
                                                            <option value='Ukraine'>Ukraine</option>
                                                            <option value='United Arab Emirates'>United Arab Emirates</option>
                                                            <option value='United Kingdom'>United Kingdom</option>
                                                            <option value='United States'>United States</option>
                                                            <option value='United States Minor Outlying Islands'>United States Minor Outlying Islands</option>
                                                            <option value='Uruguay'>Uruguay</option>
                                                            <option value='Uzbekistan'>Uzbekistan</option>
                                                            <option value='Vanuatu'>Vanuatu</option>
                                                            <option value='Venezuela'>Venezuela</option>
                                                            <option value='Viet Nam'>Viet Nam</option>
                                                            <option value='Virgin Islands, British'>Virgin Islands, British</option>
                                                            <option value='Virgin Islands, U.s.'>Virgin Islands, U.s.</option>
                                                            <option value='Wallis and Futuna'>Wallis and Futuna</option>
                                                            <option value='Western Sahara'>Western Sahara</option>
                                                            <option value='Yemen'>Yemen</option>
                                                            <option value='Zambia'>Zambia</option>
                                                            <option value='Zimbabwe'>Zimbabwe</option>
                                                        </Field>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                        <label className='fw-bold fs-6 mb-2'>Primary Phone</label>
                                                        <Field
                                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                                            type='number'
                                                            name='mailingInfo.primaryPhone'
                                                            autoComplete='off'
                                                        />
                                                        <ErrorMessage
                                                            name='mailingInfo.primaryPhone'
                                                            component='div'
                                                            className='text-danger'
                                                        />
                                                    </div>

                                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                        <label className='fw-bold fs-6 mb-2'>Secondary Phone</label>
                                                        <Field
                                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                                            type='number'
                                                            name='mailingInfo.secondaryPhone'
                                                            autoComplete='off'
                                                        />
                                                        <ErrorMessage
                                                            name='mailingInfo.secondaryPhone'
                                                            component='div'
                                                            className='text-danger'
                                                        />
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                                        <label className='fw-bold fs-6 mb-2'>Additional Phone</label>
                                                        <Field
                                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                                            type='number'
                                                            name='mailingInfo.additionalPhone'
                                                            autoComplete='off'
                                                        />
                                                        <ErrorMessage
                                                            name='mailingInfo.additionalPhone'
                                                            component='div'
                                                            className='text-danger'
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null}
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3">
                                        <div className="row">
                                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-0'>
                                                <label className='fw-bold fs-6 mb-0'>
                                                    Add Program ?
                                                    <input
                                                        type='checkbox'
                                                        name='programName'
                                                        className='mx-2'
                                                        onChange={() =>
                                                            setShowProgram(!showProgram)
                                                        }
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                        {
                                            showProgram ?
                                                <div>
                                                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                                        <label className=' fw-bold fs-6 mb-2' >Program Name - Site Name</label>
                                                        <Field as="select"
                                                            name="programID"
                                                            className='form-select form-select-lg mb-3'
                                                        >
                                                            <option hidden>- Select Program for Client -</option>
                                                            {program.map((option) => (
                                                                <option
                                                                    key={option?.siteName}
                                                                    value={option?.formID}
                                                                >
                                                                    {option.programName} - {option?.siteName}
                                                                </option>
                                                            )
                                                            )}
                                                        </Field>
                                                    </div>
                                                </div> : null
                                        }
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3">
                                        <div className='row'>
                                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-0'>
                                                <label className='fw-bold fs-6 mb-0'>
                                                    Add Insurance ?
                                                    <input
                                                        type='checkbox'
                                                        name=''
                                                        className='mx-2'
                                                        onChange={() =>
                                                            setShowInsurance(!showInsurance)
                                                        }
                                                    />
                                                </label>
                                            </div>
                                            {
                                                showInsurance ? <div>
                                                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                                        <label className=' fw-bold fs-6 mb-2'>Insurance Group Name</label>
                                                        <Field
                                                            type='text'
                                                            name='insuranceInfo.insuranceGroup'
                                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                                            placeholder='Enter Insurance Group Name... '
                                                            autoComplete='off'
                                                        ></Field>
                                                    </div>
                                                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                                        <label className=' fw-bold fs-6 mb-2'>Insurance Company Name</label>
                                                        <Field
                                                            type='text'
                                                            name='insuranceInfo.insuranceCompany'
                                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                                            placeholder='Enter Insurance Company Name...'
                                                            autoComplete='off'
                                                        ></Field>
                                                    </div>
                                                </div> : null
                                            }
                                        </div>
                                    </div>
                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                        <label className='fw-bold fs-6 mb-0'>
                                            Add Guardian ?
                                            <input
                                                type='checkbox'
                                                name=''
                                                className='mx-2'
                                                onChange={() =>
                                                    setShowGuardian(!showGuardian)
                                                }
                                            />
                                        </label>
                                        {
                                            showGuardian ?
                                                <div>
                                                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                                        <label className=' fw-bold fs-6 mb-2'>Guardian First Name</label>
                                                        <Field
                                                            type='text'
                                                            name='guardianFirstName'
                                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                                            placeholder='Enter Guardian First Name'
                                                            autoComplete='off'
                                                        ></Field>
                                                    </div>
                                                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                                        <label className=' fw-bold fs-6 mb-2'>Guardian Last Name</label>
                                                        <Field
                                                            type='text'
                                                            name='guardianLastName'
                                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                                            placeholder='Enter Guardian Last Name'
                                                            autoComplete='off'
                                                        ></Field>
                                                    </div>
                                                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                                        <label className=' fw-bold fs-6 mb-2'>Guardian Primary Phone Number</label>
                                                        <Field
                                                            type='number'
                                                            name='guardianPrimaryPhone'
                                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                                            placeholder='Enter Guardian Phone Number'
                                                            autoComplete='off'
                                                        ></Field>
                                                    </div>
                                                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                                        <label className=' fw-bold fs-6 mb-2'>Guardian Email</label>
                                                        <Field
                                                            type='email'
                                                            name='guardianEmail'
                                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                                            placeholder='Enter Guardian Email Address'
                                                            autoComplete='off'
                                                        ></Field>
                                                    </div>

                                                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                                        <label className='fw-bold fs-6 mb-2'>Guardian Type</label>
                                                        <Field
                                                            className='form-select form-select-lg mb-3'
                                                            as='select'
                                                            name='guardianType'
                                                            autoComplete='off'
                                                            placeholder='Select Guardian Type'
                                                        >
                                                            <option value='' hidden>
                                                                - Select Guardian Type -
                                                            </option>
                                                            <option value='Ad Litem'>Ad Litem</option>
                                                            <option value='Advocate'>Advocate</option>
                                                            <option value='Conservator'>Conservator</option>
                                                            <option value='Limited'>Limited</option>
                                                            <option value='Plenary'>Plenary</option>
                                                            <option value='Other'>Other</option>
                                                        </Field>
                                                    </div>
                                                </div> : null
                                        }
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3">

                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-0'>
                                            <label className='fw-bold fs-6 mb-2'>
                                                Add Shared Contact ?
                                                <input
                                                    type='checkbox'
                                                    name=''
                                                    className='mx-2'
                                                    onChange={() =>
                                                        setShowSharedContact(!showSharedContact)
                                                    }
                                                />
                                            </label>
                                        </div>

                                        {
                                            showSharedContact ?
                                                <div className='row'>
                                                    <SharedContactSearching companyid={companyid} setSharedContact={setSharedContact} />
                                                </div> : null
                                        }
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3">
                                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-0'>
                                            <label className='fw-bold fs-6 mb-0'>
                                                Add Allergy ?
                                                <input
                                                    type='checkbox'
                                                    name=''
                                                    className='mx-2'
                                                    onChange={() =>
                                                        setShowAllergy(!showAllergy)
                                                    }
                                                />
                                            </label>
                                        </div>
                                        {
                                            showAllergy ?
                                                <div>
                                                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                                        <label className=' fw-bold fs-6 mb-2'>Allergy Name</label>
                                                        <Field
                                                            type='text'
                                                            name='allergyName'
                                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                                            placeholder='Allergy Name'
                                                            autoComplete='off'
                                                        ></Field>
                                                    </div>
                                                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                                        <label className=' fw-bold fs-6 mb-2' >Allergy Type</label>
                                                        <Field as="select"
                                                            name="allergyType"
                                                            className='form-select form-select-lg mb-3'
                                                        >
                                                            <option hidden>- Please Select -</option>
                                                            <option value="Adverse Allergy">Adverse Allergy</option>
                                                            <option value="Animal Allergy">Animal Allergy</option>
                                                            <option value="Drug Allergy">Drug Allergy</option>
                                                            <option value="Environment Allergy">Environment Allergy</option>
                                                            <option value="Food Allergy">Food Allergy</option>
                                                            <option value="Miscellaneous Allergy">Miscellaneous Allergy</option>
                                                            <option value="Plant Allergy">Plant Allergy</option>
                                                            <option value="Pollen Allergy">Pollen Allergy</option>
                                                        </Field>
                                                    </div>
                                                </div> : null
                                        }
                                    </div>
                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                        <label className='fw-bold fs-6 mb-0'>
                                            Add Diagnosis ?
                                            <input
                                                type='checkbox'
                                                name=''
                                                className='mx-2'
                                                onChange={() =>
                                                    setDiagnosis(!diagnosis)
                                                }
                                            />
                                        </label>

                                        {
                                            diagnosis ?
                                                <div className="row">
                                                    <DiagnosticsSearching setDiagnosisForm={setDiagnosisForm} setCodeType={setCodeType} codeType={codeType} diagnosisForm={diagnosisForm} />
                                                </div> : null
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button type='submit' className='btn btn-primary mt-4 '>
                                Save
                            </button>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div >
    )
}

export default NewIndividual
