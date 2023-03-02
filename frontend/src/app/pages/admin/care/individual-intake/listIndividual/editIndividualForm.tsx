import { useEffect, useState, useRef } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import SubMenuSection from '../../subMenuSection/SubMenuSection'
import { useHistory } from 'react-router-dom'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
} from '@react-pdf/renderer'

/**
 * Validator for adding individual
 */
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
})

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: '30px',
    border: '5px solid gray',
  },
  sectionHeading: {
    display: 'flex',
    marginTop: '10px',
    marginBottom: '10px',
    width: '100%',
    borderBottom: '1px solid gray',
  },
  sectionWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  sectionHeader: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    marginBottom: '10px',
    fontWeight: 'bold',
    fontSize: '10pt',
  },
  section: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    marginBottom: '10px',
    fontSize: '10pt',
  },
  heading: {
    fontSize: '15pt',
    color: '#0275d8',
  },
  singleLineFormTitle: {
    display: 'flex',
    width: '33.3%',
    flexDirection: 'row',
    marginBottom: '10px',
    fontWeight: 'bold',
    fontSize: '10pt',
  },
  singleLineFormLabel: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    marginBottom: '10px',
    fontSize: '10pt',
  },
})

const EditIndividualForm = ({ location }: { location: { state: any } }) => {
  const history = useHistory()
  const [showResAddr, setShowResAddr] = useState<boolean>(false)
  const [showMailingAddr, setShowMailingAddr] = useState<boolean>(false)
  const [showEditingForm, setShowEditingForm] = useState<boolean>(true)
  const [clientFileName, setClientFileName] = useState('')
  const [sameAsPrimary, setSameAsPrimary] = useState(false)
  const [showSubMenu, setShowSubMenu] = useState(false)
  const [editIndividualData, setEditIndividualData] = useState({
    formID: '',
    title: '',
    gender: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    socialSecurityNumber: '',
    medicaidNumber: '',
    status: '',
    email: '',
    phoneNumber: '',
    race: '',
    ethnicity: '',
    enteredDate: '',
    enteredBy: '',
    admittedBy: '',
    lastUpdatedBy: '',
    admissionDate: '',
    addrInCareOf: '',
    residentialAddr: false,
    mailingAddr: false,
    addrInfo: {
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
    mailingInfo: {
      st1: '',
      st2: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
      primaryPhone: '',
      secondaryPhone: '',
      additionalPhone: '',
    }
  })

  const printRef = useRef(null)

  useEffect(() => {
    if (location.state !== undefined) {
      setEditIndividualData(location.state)
      setShowResAddr(location.state.residentialAddr)
      setShowMailingAddr(location.state.mailingAddr)
      setClientFileName(location.state.individual + '_Form.pdf')
    } else {
      history.push('/care/individual-intake/list')
    }
  }, [])

  // Create Document Component
  const MyDocument = () => (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.sectionHeading}>
          <Text style={styles.heading}>Client Demographic Form (CDF)</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionWrapper}>
            <Text style={styles.singleLineFormTitle}>Image</Text>
            <Text style={styles.singleLineFormLabel}>Image will be shown here</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionHeader}>Title</Text>
            <Text style={styles.section}>{editIndividualData.title}</Text>
          </View>
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionHeader}>Gender</Text>
            <Text style={styles.section}>{editIndividualData.gender}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionHeader}>First Name</Text>
            <Text style={styles.section}>{editIndividualData.firstName}</Text>
          </View>
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionHeader}>Last Name</Text>
            <Text style={styles.section}>{editIndividualData.lastName}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionHeader}>Birth Date</Text>
            <Text style={styles.section}>{editIndividualData.birthDate}</Text>
          </View>
          {/* <View style={styles.sectionWrapper}>
            <Text style={styles.sectionHeader}>Nick Name</Text>
            <Text style={styles.section}>{editIndividualData.goesby}</Text>
          </View> */}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionHeader}>SSN</Text>
            <Text style={styles.section}>{editIndividualData.socialSecurityNumber}</Text>
          </View>
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionHeader}>Medicaid Number</Text>
            <Text style={styles.section}>{editIndividualData.medicaidNumber}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionHeader}>Email</Text>
            <Text style={styles.section}>{editIndividualData.email}</Text>
          </View>
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionHeader}>Phone Number</Text>
            <Text style={styles.section}>{editIndividualData.phoneNumber}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionHeader}>Race</Text>
            <Text style={styles.section}>{editIndividualData.race}</Text>
          </View>
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionHeader}>Ethnicity</Text>
            <Text style={styles.section}>{editIndividualData.ethnicity}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionHeader}>Status</Text>
            <Text style={styles.section}>{editIndividualData.status}</Text>
          </View>
          <View style={styles.sectionWrapper}></View>
        </View>

        <View style={styles.sectionHeading}>
          <Text style={styles.heading}>Residential Address</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionHeader}>Street 1</Text>
            <Text style={styles.section}>{editIndividualData.addrInfo?.st1}</Text>
          </View>


          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionHeader}>Street 2</Text>
            <Text style={styles.section}>{editIndividualData.addrInfo?.st2}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionHeader}>City</Text>
            <Text style={styles.section}>{editIndividualData.addrInfo?.city}</Text>
          </View>
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionHeader}>Zip Code</Text>
            <Text style={styles.section}>{editIndividualData.addrInfo?.zipCode}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionHeader}>State</Text>
            <Text style={styles.section}>{editIndividualData.addrInfo?.state}</Text>
          </View>
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionHeader}>County</Text>
            <Text style={styles.section}>{editIndividualData.addrInfo?.country}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionHeader}>Primary Phone</Text>
            <Text style={styles.section}>{editIndividualData.addrInfo?.primaryPhone}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionHeader}>Secondary Phone</Text>
            <Text style={styles.section}>{editIndividualData.addrInfo?.secondaryPhone}</Text>
          </View>
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionHeader}>Additional Phone</Text>
            <Text style={styles.section}>{editIndividualData.addrInfo?.additionalPhone}</Text>
          </View>

        </View>
        <View style={styles.sectionHeading}>
          <Text style={styles.heading}>Mailing Address</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionHeader}>Street 1</Text>
            <Text style={styles.section}>{editIndividualData.mailingInfo?.st1}</Text>
          </View>


          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionHeader}>Street 2</Text>
            <Text style={styles.section}>{editIndividualData.mailingInfo?.st2}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionHeader}>City</Text>
            <Text style={styles.section}>{editIndividualData.mailingInfo?.city}</Text>
          </View>
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionHeader}>Zip Code</Text>
            <Text style={styles.section}>{editIndividualData.mailingInfo?.zipCode}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionHeader}>State</Text>
            <Text style={styles.section}>{editIndividualData.mailingInfo?.state}</Text>
          </View>
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionHeader}>Country</Text>
            <Text style={styles.section}>{editIndividualData.mailingInfo?.country}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionHeader}>Primary Phone</Text>
            <Text style={styles.section}>{editIndividualData.mailingInfo?.primaryPhone}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionHeader}>Secondary Phone</Text>
            <Text style={styles.section}>{editIndividualData.mailingInfo?.secondaryPhone}</Text>
          </View>
          f
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionHeader}>Additional Phone</Text>
            <Text style={styles.section}>{editIndividualData.mailingInfo?.additionalPhone}</Text>
          </View>
        </View>
      </Page>
    </Document>
  )

  return (
    <div>
      <div className='fv-row fv-plugins-icon-container px-5'>
        {/* <PDFViewer>
                    <MyDocument />
                </PDFViewer> */}
        <div className='row'>
          <div className='fv-row fv-plugins-icon-container card'>
            <div className='card-body scroll-y'>
              <div>
                <div className='mb-9'>
                  <SubMenuSection individual={editIndividualData} />

                </div>
                {showEditingForm ? (
                  <div>
                    <div className='d-flex'>
                      <button
                        className='btn btn-primary btn-sm mr-4'
                        onClick={() => {
                          setShowEditingForm(false)
                        }}
                      >
                        Edit
                      </button>
                      {/* <button className="btn btn-primary btn-sm mx-4">Show PDF</button> */}
                      <div className='btn btn-primary btn-sm mx-3'>
                        <PDFDownloadLink
                          document={<MyDocument />}
                          fileName={clientFileName}
                          className='link-light'
                        >
                          {({ blob, url, loading, error }) =>
                            loading ? 'Loading document...' : 'Export to PDF'
                          }
                        </PDFDownloadLink>
                      </div>
                    </div>
                    <div className='my-7 px-4' ref={printRef}>
                      <h1 className='mb-6'>Client Demographic Form (CDF)</h1>
                      <div className='row ' style={{ border: '1px solid #80808045' }}>
                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                          <label className='fw-bold fs-6 mb-2 w-25'>Image</label>
                          <label className='w-50'>Image to be shown here</label>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                          <label className='fw-bold fs-6 mb-2 w-50'>Title</label>
                          <label className='w-50'>{editIndividualData.title}</label>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                          <label className='fw-bold fs-6 mb-2 w-50'>Gender</label>
                          <label className='w-50'>{editIndividualData.gender}</label>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                          <label className='fw-bold fs-6 mb-2 w-50'>First Name</label>
                          <label className='w-50'>{editIndividualData.firstName}</label>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                          <label className='fw-bold fs-6 mb-2 w-50'>Last Name</label>
                          <label className='w-50'>{editIndividualData.lastName}</label>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                          <label className='fw-bold fs-6 mb-2 w-50'>Birth Date</label>
                          <label className='w-50'>{editIndividualData.birthDate}</label>
                        </div>
                        {/* <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                          <label className='fw-bold fs-6 mb-2 w-50'>Nickname</label>
                          <label className='w-50'>{editIndividualData.goesby}</label>
                        </div> */}
                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                          <label className='fw-bold fs-6 mb-2 w-50'>SSN</label>
                          <label className='w-50'>{editIndividualData.socialSecurityNumber}</label>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                          <label className='fw-bold fs-6 w-50'>Medicaid Number</label>
                          <label className='w-50'>{editIndividualData.medicaidNumber}</label>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                          <label className='fw-bold fs-6 w-50'>Email</label>
                          <label className='w-50'>{editIndividualData.email}</label>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                          <label className='fw-bold fs-6 w-50'>Phone Number</label>
                          <label className='w-50'>{editIndividualData.phoneNumber}</label>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                          <label className='fw-bold fs-6 w-50'>Race</label>
                          <label className='w-50'>{editIndividualData.race}</label>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                          <label className='fw-bold fs-6 w-50'>Ethnicity</label>
                          <label className='w-50'>{editIndividualData.ethnicity}</label>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                          <label className='fw-bold fs-6 w-50'>Status</label>
                          <label className='w-50'>{editIndividualData.status}</label>
                        </div>
                        {/* <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                                                            <label className='fw-bold fs-6 w-50'>Class Membership</label>
                                                            <label className='w-50'>{editIndividualData.classMembership}</label>
                                                    </div> */}

                        <h3 className='mt-6 text-primary display-7'>Residential Address</h3>
                        <hr />

                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                          <label className='fw-bold fs-6 w-50'>Street 1</label>
                          <label className='w-50'>{editIndividualData.addrInfo?.st1}</label>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                          <label className='fw-bold fs-6 w-50'>Street 2</label>
                          <label className='w-50'>{editIndividualData.addrInfo?.st2}</label>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                          <label className='fw-bold fs-6 w-50'>City</label>
                          <label className='w-50'>{editIndividualData.addrInfo?.city}</label>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                          <label className='fw-bold fs-6 w-50'>Residential Zip Code</label>
                          <label className='w-50'>{editIndividualData.addrInfo?.zipCode}</label>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                          <label className='fw-bold fs-6 w-50'>State</label>
                          <label className='w-50'>
                            {editIndividualData.addrInfo?.state}
                          </label>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                          <label className='fw-bold fs-6 w-50'>County</label>
                          <label className='w-50'>{editIndividualData.addrInfo?.country}</label>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                          <label className='fw-bold fs-6 w-50'>Primary Phone</label>
                          <label className='w-50'>{editIndividualData.addrInfo?.primaryPhone}</label>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                          <label className='fw-bold fs-6 w-50'>Secondary Phone</label>
                          <label className='w-50'>{editIndividualData.addrInfo?.secondaryPhone}</label>
                        </div>

                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                          <label className='fw-bold fs-6 w-50'>Additional Phone</label>
                          <label className='w-50'>{editIndividualData.addrInfo?.additionalPhone}</label>
                        </div>
                        <h4 className='mt-5 mb-5 text-primary display-7'>Mailing Address</h4>
                        <hr />

                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                          <label className='fw-bold fs-6 w-50'>Street 1</label>

                          <label className='w-50'>{editIndividualData.mailingInfo?.st1}</label>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                          <label className='fw-bold fs-6 w-50'>Street 2</label>

                          <label className='w-50'>{editIndividualData.mailingInfo?.st2}</label>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                          <label className='fw-bold fs-6 w-50'>City</label>
                          <label className='w-50'>{editIndividualData.mailingInfo?.city}</label>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                          <label className='fw-bold fs-6 w-50'>State</label>
                          <label className='w-50'>{editIndividualData.mailingInfo?.state}</label>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                          <label className='fw-bold fs-6 w-50'>Zip Code</label>
                          <label className='w-50'>{editIndividualData.mailingInfo?.zipCode}</label>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                          <label className='fw-bold fs-6 w-50'>County</label>
                          <label className='w-50'>{editIndividualData.mailingInfo?.country}</label>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                          <label className='fw-bold fs-6 w-50'>Primary Phone</label>
                          <label className='w-50'>{editIndividualData.mailingInfo?.primaryPhone}</label>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                          <label className='fw-bold fs-6 w-50'>Secondary Phone</label>
                          <label className='w-50'>{editIndividualData.mailingInfo?.secondaryPhone}</label>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 my-3'>
                          <label className='fw-bold fs-6 w-50'>Additional Phone</label>
                          <label className='w-50'>
                            {editIndividualData.mailingInfo?.additionalPhone}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Formik
                      enableReinitialize
                      initialValues={editIndividualData}
                      validationSchema={registrationSchema}
                      onSubmit={(values, { setSubmitting }) => {
                        // console.log(values)
                        axios.put("clients/update", values)
                          .then(res => {
                            // console.log(res.data)
                            setEditIndividualData(values)
                            setShowEditingForm(true)
                            setSubmitting(false);
                          })
                          .catch((err) => {
                            console.log(err)
                            // throw new Error(err);
                          })

                        //  idKey = "_id"
                        // setIndividuals((prevState) =>
                        //     prevState.map((ind) => ind["_id" as keyof Object] === values["_id" as keyof Object] ? tempValues : ind)
                        // )
                      }}
                    >
                      {({ isSubmitting, resetForm, values }) => (
                        <Form>
                          <div className='d-flex my-6'>
                            <div>
                              <button
                                className='btn btn-primary btn-sm me-4'
                                onClick={() => {
                                  resetForm()
                                  setShowEditingForm(true)
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                            <div>
                              <button type='submit' className='btn btn-primary btn-sm'>
                                Save
                              </button>
                            </div>
                          </div>
                          <div>
                            <h1 className='mb-5'>Client Demographic Form (IDF) (Edit)</h1>
                            <div className='row'>
                              <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                <label className=' fw-bold fs-6 mb-2'>Image</label>
                                <input
                                  type='file'
                                  name='user_name'
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
                                <label className=' fw-bold fs-6 mb-2'>Gender</label>
                                <Field
                                  as='select'
                                  name='gender'
                                  className='form-select form-select-lg mb-3'
                                  aria-label='.form-select-lg example'
                                >
                                  <option hidden>Select Title</option>
                                  <option value='Male'>Male</option>
                                  <option value='Female'>Female</option>
                                  <option value='Unknown'>Unknown</option>
                                </Field>
                                <ErrorMessage
                                  name='gender'
                                  component='div'
                                  className='text-danger'
                                />
                              </div>
                              <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                <label className=' fw-bold fs-6 mb-2'>First Name</label>
                                <Field
                                  type='text'
                                  name='firstName'
                                  className='form-control form-control-solid mb-3 mb-lg-0'
                                  placeholder='First Name'
                                  autoComplete='off'
                                  required
                                ></Field>
                                <ErrorMessage
                                  name='firstName'
                                  component='div'
                                  className='text-danger'
                                />
                              </div>
                              <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                <label className=' fw-bold fs-6 mb-2'>Last Name</label>
                                <Field
                                  type='text'
                                  name='lastName'
                                  className='form-control form-control-solid mb-3 mb-lg-0'
                                  placeholder='Last Name'
                                  autoComplete='off'
                                ></Field>
                                <ErrorMessage
                                  name='lastName'
                                  component='div'
                                  className='text-danger'
                                />
                              </div>
                              <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 '>
                                <label className='fw-bold fs-6 mb-2'>Birth Date</label>
                                <Field
                                  type='date'
                                  name='birthDate'
                                  className='form-control form-control-solid mb-3 mb-lg-0'
                                  placeholder=''
                                ></Field>
                              </div>
                              {/* <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                <label className=' fw-bold fs-6 mb-2'>Nickname</label>
                                <Field
                                  type='text'
                                  name='goesby'
                                  className='form-control form-control-solid mb-3 mb-lg-0'
                                  placeholder='Nickname'
                                  autoComplete='off'
                                ></Field>
                              </div> */}
                              <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                <label className=' fw-bold fs-6 mb-2'>SSN</label>
                                <Field
                                  type='number'
                                  name='socialSecurityNumber'
                                  className='form-control form-control-solid mb-3 mb-lg-0'
                                  placeholder='xxxxxxxxx'
                                  autoComplete='off'
                                ></Field>
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
                              </div>
                              <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                <label className=' fw-bold fs-6 mb-2'>Race</label>
                                <Field
                                  as='select'
                                  name='race'
                                  className='form-select form-select-lg mb-3'
                                  aria-label='.form-select-lg example'
                                >
                                  <option>Select Race</option>
                                  <option value='American Indian/Alaskan Native'>American Indian/Alaskan Native</option>+
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
                                  <option value='Native Hawaiian/Other Pacific Islander'>Native Hawaiian/Other Pacific Islander</option>
                                  <option value='Samoan'>Samoan</option>
                                  <option value='Undetermined'>Undetermined</option>
                                  <option value='Unknown'>Unknown</option>
                                  <option value='Vietnamese'>Vietnamese</option>
                                  <option value='White'>White</option>
                                  <option value='Other'>Other</option>
                                </Field>
                              </div>
                              <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                <label className=' fw-bold fs-6 mb-2'>Ethnicity</label>
                                <Field
                                  as='select'
                                  name='ethnicity'
                                  className='form-select form-select-lg mb-3'
                                  aria-label='.form-select-lg example'
                                >
                                  <option >Select Ethnicity / Hispanic Origin</option>
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
                              <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                <label className=' fw-bold fs-6 mb-2'>Status</label>
                                <Field
                                  as='select'
                                  name='status'
                                  className='form-select form-select-lg mb-3'
                                  aria-label='.form-select-lg example'
                                >
                                  <option hidden>Select Status</option>
                                  <option value='Admitted'>Admitted</option>
                                  <option value='Pending Admission'>Pending Admission</option>
                                  <option value='Discharged'>Discharged</option>
                                  <option value='Deceased'>Deceased</option>
                                  <option value='Deleted'>Deleted</option>
                                </Field>
                              </div>
                              {/* <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                <label className=' fw-bold fs-6 mb-2'>Class Membership</label>
                                <Field
                                  as='select'
                                  name='classMembership'
                                  className='form-select form-select-lg mb-3'
                                  aria-label='.form-select-lg example'
                                >
                                  <option value=''>Select Class Membership</option>
                                </Field>
                              </div> */}
                            </div>
                            <div className='d-flex'>
                              <div className='d-flex justify-content-center my-1'>
                                <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20 mt-3'>
                                  Residential Address
                                  <input
                                    type='checkbox'
                                    className='mx-2'
                                    checked={showResAddr}
                                    onChange={() => {
                                      setShowResAddr((checked) => !checked)
                                    }}
                                  />
                                </label>
                              </div>
                            </div>
                            {showResAddr ? (
                              <div className='row'>
                                <h3 className='my-5 text-primary display-7'>Residential Address</h3>


                                <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                  <label className=' fw-bold fs-6 mb-2'>Address</label>
                                  <div className='row'>
                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                      <label className=' fw-bold fs-6 mb-2'>
                                        Street 1
                                      </label>
                                      <Field
                                        type='text'
                                        name='addrInfo.st1'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Street 1'
                                        autoComplete='off'
                                      ></Field>
                                    </div>
                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                      <label className=' fw-bold fs-6 mb-2'>
                                        Street 2
                                      </label>
                                      <Field
                                        type='text'
                                        name='addrInfo.st2'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Street 2'
                                        autoComplete='off'
                                      ></Field>
                                    </div>
                                  </div>
                                </div>

                                <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                  <div className='row'>
                                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 my-3'>
                                      <label className=' fw-bold fs-6 mb-2'>
                                        City
                                      </label>
                                      <Field
                                        type='text'
                                        name='addrInfo.city'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='City'
                                        autoComplete='off'
                                      ></Field>
                                    </div>
                                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 my-3'>
                                      <label className=' fw-bold fs-6 mb-2'>
                                        State
                                      </label>
                                      <Field
                                        className='form-select form-select-lg mb-3'
                                        autoComplete='off'
                                        as='select'
                                        placeholder='Enter State here...'
                                        name='addrInfo.state'
                                      >
                                        <option >Select State</option>
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
                                      <label className=' fw-bold fs-6 mb-2'>
                                        Zip Code
                                      </label>
                                      <Field
                                        type='number'
                                        name='addrInfo.zipCode'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder='Zip Code'
                                        autoComplete='off'
                                      ></Field>
                                    </div>
                                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 my-3'>
                                      <label className=' fw-bold fs-6 mb-2'>
                                        Country
                                      </label>
                                      <Field
                                        as='select'
                                        name='addrInfo.country'
                                        className='form-select form-select-lg mb-3'
                                      // aria-label='.form-select-lg example'
                                      >
                                        <option hidden>Select Country</option>
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
                                </div>



                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                  <label className=' fw-bold fs-6 mb-2'>Primary Phone</label>
                                  <Field
                                    type='number'
                                    name='addrInfo.primaryPhone'
                                    className='form-control form-control-solid mb-3 mb-lg-0'
                                    placeholder=''
                                    autoComplete='off'
                                  ></Field>
                                </div>

                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                  <label className=' fw-bold fs-6 mb-2'>Secondary Phone</label>
                                  <Field
                                    type='number'
                                    name='addrInfo.secondaryPhone'
                                    className='form-control form-control-solid mb-3 mb-lg-0'
                                    placeholder=''
                                    autoComplete='off'
                                  ></Field>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                  <label className=' fw-bold fs-6 mb-2'>Additional Phone</label>
                                  <Field
                                    type='text'
                                    name='addrInfo.additionalPhone'
                                    className='form-control form-control-solid mb-3 mb-lg-0'
                                    placeholder=''
                                    autoComplete='off'
                                  ></Field>
                                </div>
                                <div className='d-flex my-1'>
                                  <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20 mt-3'>
                                    Is Mailing Address same as Residential Address
                                    <input
                                      type='checkbox'
                                      className='mx-2'
                                      checked={showMailingAddr}
                                      onChange={() => {
                                        setShowMailingAddr((checked) => !checked)
                                      }}
                                    />
                                  </label>
                                </div>
                                {showMailingAddr ? (


                                  <div className='row'>
                                    <h3 className=' mb-5 mt-5 text-primary display-7'>
                                      Mailing Address
                                    </h3>


                                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                      <label className=' fw-bold fs-6 mb-2'>Address</label>
                                      <div className='row'>
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                          <label className=' fw-bold fs-6 mb-2'>
                                            Street 1
                                          </label>
                                          <Field
                                            type='text'
                                            name='mailingInfo.st1'
                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                            placeholder='Street 1'
                                            autoComplete='off'
                                          ></Field>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                          <label className=' fw-bold fs-6 mb-2'>
                                            Street 2
                                          </label>
                                          <Field
                                            type='text'
                                            name='mailingInfo.st2'
                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                            placeholder='Street 2'
                                            autoComplete='off'
                                          ></Field>
                                        </div>
                                      </div>
                                    </div>

                                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                      <div className='row'>
                                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 my-3'>
                                          <label className=' fw-bold fs-6 mb-2'>
                                            City
                                          </label>
                                          <Field
                                            type='text'
                                            name='mailingInfo.city'
                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                            placeholder='City'
                                            autoComplete='off'
                                          ></Field>
                                        </div>
                                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 my-3'>
                                          <label className=' fw-bold fs-6 mb-2'>
                                            State
                                          </label>
                                          <Field
                                            as='select'
                                            name='mailingInfo.state'
                                            className='form-select form-select-lg mb-3'
                                            aria-label='.form-select-lg example'
                                          >
                                            <option value=''>Select State</option>
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
                                          <label className=' fw-bold fs-6 mb-2'>
                                            Zip Code
                                          </label>
                                          <Field
                                            type='number'
                                            name='mailingInfo.zipCode'
                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                            placeholder='Zip Code'
                                            autoComplete='off'
                                          ></Field>
                                        </div>
                                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 my-3'>
                                          <label className=' fw-bold fs-6 mb-2'>
                                            Country
                                          </label>
                                          <Field
                                            className='form-select form-select-lg mb-3'
                                            as='select'
                                            name='mailingInfo.country'
                                            autoComplete='off'
                                            placeholder='Enter Country here...'
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
                                    </div>

                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                      <label className=' fw-bold fs-6 mb-2'>
                                        Primary Phone
                                      </label>
                                      <Field
                                        type='number'
                                        name='mailingInfo.primaryPhone'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder=''
                                        autoComplete='off'
                                      ></Field>
                                    </div>

                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                                      <label className=' fw-bold fs-6 mb-2'>
                                        Secondary Phone
                                      </label>
                                      <Field
                                        type='number'
                                        name='mailingInfo.secondaryPhone'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder=''
                                        autoComplete='off'
                                      ></Field>
                                    </div>
                                    <div className='col-xl-6 col-lg-16 col-md-6 col-sm-12 col-12 my-3'>
                                      <label className=' fw-bold fs-6 mb-2'>
                                        Additional Phone
                                      </label>
                                      <Field
                                        type='text'
                                        name='mailingInfo.additionalPhone'
                                        className='form-control form-control-solid mb-3 mb-lg-0'
                                        placeholder=''
                                        autoComplete='off'
                                      ></Field>
                                    </div>

                                  </div>


                                ) : null}
                              </div>
                            ) : null}
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditIndividualForm
