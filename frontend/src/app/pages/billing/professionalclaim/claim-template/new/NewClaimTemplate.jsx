import React, { useState, useEffect } from 'react'
import { Form, Formik, Field, useField, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import SelectField from '../CustomSelect'
import SelectNameField from './CustomSelect'
import Select from 'react-select'



// const registrationSchema = Yup.object().shape({
//   individualName: Yup.string()
//     .required('Individual Name is required'),
// })
const templateGroup = [
]
const IndividualNames = [

]
const BillingProviderOptions = [
    { label: 'Guardian Haven Academy (EIN: 825356921, PCN# 100069300)', value: 'Guardian Haven Academy (EIN: 825356921, PCN# 100069300)' }
]
const RenderingProviderOptions = [
    { label: 'Guardian Haven Academy (EIN: 825356921, PCN# 100069300)', value: 'Guardian Haven Academy (EIN: 825356921, PCN# 100069300)' }
]
const ReferringProviderOptions = [
    { label: 'Guardian Haven Academy (EIN: 825356921, PCN# 100069300)', value: 'Guardian Haven Academy (EIN: 825356921, PCN# 100069300)' }

]
const ServiceFacilityOptions = [
    { label: 'Guardian Haven Academy (EIN: 825356921, PCN# 100069300)', value: 'Guardian Haven Academy (EIN: 825356921, PCN# 100069300)' },
]
const SignatureOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
]
const PlaceOptions = [

    { label: '02-Telehealth', value: '02-Telehealth' },
    { label: '03-School', value: '03-School' },
    { label: '04-Homeless Shelter', value: '04-Homeless Shelter' },
    { label: '05-Indian Health Service Free-standing Facility', value: '05-Indian Health Service Free-standing Facility' },
    { label: '06-Indian Health Service Provider-based Facility', value: '06-Indian Health Service Provider-based Facility' },
    { label: '07-Tribal 638 Free-standing Facility', value: '07-Tribal 638 Free-standing Facility' },
    { label: '08-Tribal 638 Provider-based Facility', value: '08-Tribal 638 Provider-based Facility' },
    { label: '10-Unassigned', value: '10-Unassigned' },



]
const FrequencyTypeOptions = [
    { label: '1-Original (Admit thru Discharge Claim)', value: '1-Original (Admit thru Discharge Claim)' },
    { label: '2-Interim - First Claim', value: '2-Interim - First Claim' },
    { label: '3-Interim - Continuing Claim', value: '3-Interim - Continuing Claim' },
    { label: '4-Interim - Last Claim', value: '4-Interim - Last Claim' },
    { label: '6-Corrected (Adjustment of Prior Claim)', value: '6-Corrected (Adjustment of Prior Claim)' },
    { label: '7-Replacement (Replacement of Prior Claim)', value: '7-Replacement (Replacement of Prior Claim)' },
    { label: '8-Void (Void/Cancel of Prior Claim)', value: '8-Void (Void/Cancel of Prior Claim)' },

]
const MedicareAssignmentOptions = [
    { label: 'A-Assigned', value: 'A-Assigned' },
    { label: 'B-Assignment Accepted on Clinical Lab Services Only', value: 'B-Assignment Accepted on Clinical Lab Services Only' },
    { label: 'C-Not Assigned', value: 'C-Not Assigned' },
    { label: 'P-Patient Refuses to Assign Benefits', value: 'P-Patient Refuses to Assign Benefits' },
]
const InformationOptions = [
    { label: 'A-Appropriate Release of Information on File at Health Care Service Provider', value: 'A-Appropriate Release of Information on File at Health Care Service Provider' },
    { label: 'I-Informed Consent to Release Medical Information for Diagnoses', value: 'I-Informed Consent to Release Medical Information for Diagnoses' },
    { label: 'M-The Provider has Limited or Restricted Ability to Release Data Related to a Claim', value: 'M-The Provider has Limited or Restricted Ability to Release Data Related to a Claim' },
    { label: 'N-No, Provider is not Allowed to Release Data.', value: 'N-No, Provider is not Allowed to Release Data.' },
    { label: 'O-On File at Payor or at Plan Sponsor', value: 'O-On File at Payor or at Plan Sponsor' },
    { label: 'Y-Yes, Provider has a Signed Statement Permitting Release of Medical Billing Related to a Claim', value: 'Y-Yes, Provider has a Signed Statement Permitting Release of Medical Billing Related to a Claim' },
]
const PatientSignatureOptions = [
    { label: 'B-Signed Signature Authorization Form or Forms are on File', value: 'B-Signed Signature Authorization Form or Forms are on File' },
    { label: 'C-Signed HCFA-1500 Claim Form on File', value: 'C-Signed HCFA-1500 Claim Form on File' },
    { label: 'P-Signature generated by Provider because the Patient was not Physically Present for Services', value: 'P-Signature generated by Provider because the Patient was not Physically Present for Services' },
]
const FillingIndicatorOptions = [
    { label: 'Medicaid', value: 'Medicaid' },
]
const BenefitsIndicatorOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
]
const PayerOptions = [
    { label: 'Primary', value: 'Primary' },
    { label: 'Secondary', value: 'Secondary' },
    { label: 'Tertiary', value: 'Tertiary' },
    { label: 'Unknown', value: 'Unknown' },
]
const RelationOptions = [
    { label: 'Spouse', value: 'Spouse' },
    { label: 'Self', value: 'Self' },
    { label: 'Child', value: 'Child' },
    { label: 'Employee', value: 'Employee' },
    { label: 'Unknown', value: 'Unknown' },
    { label: 'Life Partner', value: 'Life Partner' },
    { label: 'Other RelationShip', value: 'Other RelationShip' },
]
const SpecialProgramOptions = [
    { label: '03-Special Federal Funding', value: '03-Special Federal Funding' },
]
const data = [
    { label: 'Algood, Shane / 0000004038', value: 'Algood, Shane / 0000004038' },
    { label: 'Alvarez, Jessenia / 0000211534', value: 'Alvarez, Jessenia / 0000211534' },
    { label: 'Ambrose, Shelley / 0000176739 ', value: 'Ambrose, Shelley / 0000176739 ' },
    { label: 'Andrews, Isaac / 0043818', value: 'Andrews, Isaac / 0043818' }
]


const NewClaimTemplate = () => {

    const [individual, setIndividual] = useState(false)
    const [name, setName] = useState(data)
    const handleChange = () => {
        setIndividual(!individual)
    }

    const initialValues = {
        status: '',
        tempGroupName: [],
        individualName: [],
        billingProvider: [],
        renderingProvider: [],
        providerServiceLine: [],
        referringProvider: [],
        serviceFacilityLocation: [],
        signatureOnFire: [],
        placeOfService: [],
        claimFrequencyTypeCode: [],
        medicalAssignmentCode: [],
        informationCode: [],
        patientSignature: [],
        filingIndicator: [],
        benefitsIndicator: [],
        payerResponsibility: [],
        relationToIndividual: [],
        specialProgramCode: [],
    }

    return (
        <Formik
            // validationSchema={registrationSchema}
            enableReinitialize
            initialValues={
                initialValues
            }
            onSubmit={(values, { isSubmitting }) => {
                console.log(values)
            }}
        >
            {({ isSubmitting, resetForm }) => (
                <Form>
                    <div className='fv-row mb-7 fv-plugins-icon-container p-5 card'>
                        <div className='card-body'>
                            <h1 className='mb-5'>New Professional Claim Template</h1>
                            <div className='row'>
                                <div className=' mt-4'>
                                    <div className='col-col-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                        <h6>Template Status</h6>
                                    </div>
                                    <div className='mb-6'>
                                        <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20 mt-3'>
                                            Inactive
                                            <Field
                                                name='status'
                                                value='Inactive'
                                                type='radio'
                                                className='mx-2'
                                            />
                                        </label>
                                        <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20 mt-3'>
                                            Active
                                            <Field
                                                name='status'
                                                type='radio'
                                                value='active'
                                                className='mx-2'
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 ' >
                                    <label className='fw-bold fs-6 mb-2' >Template Group Name</label>
                                    <Field
                                        as='select'
                                        name='tempGroupName'
                                        autoComplete='off'
                                        options={templateGroup}
                                        component={SelectField}
                                        placeholder='Select Template Group Name'
                                    />
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 ' >
                                    <label className='fw-bold fs-6 mb-2 css-1hb7zxy-IndicatorsContainer' >Individual Name</label>
                                    <select
                                        name='individualName'
                                        onChange={handleChange}
                                        placeholder='Individual Name'
                                        className='form-control form-control-solid mb-lg-0 form-select form-select-lg mb-3 css-1ukj4ht-control '
                                    >
                                        {name.map((option) => (
                                            <option
                                                key={option.label}
                                                value={option.value}
                                            >{option.label}</option>
                                        ))}
                                        {/* <option value='Algood, Shane / 0000004038' > Algood, Shane / 0000004038</option>
                                        <option value='Alvarez, Jessenia / 0000211534' >Alvarez, Jessenia / 0000211534 </option>
                                        <option value='Ambrose, Shelley / 0000176739 ' > Ambrose, Shelley / 0000176739</option>
                                        <option value='Andrews, Isaac / 0043818 ' > Andrews, Isaac / 0043818</option>
                                        <option value='Ballard, Michelle / 0000171331 ' >Ballard, Michelle / 0000171331 </option>
                                        <option value=' Banter, Ayla / 0001046155' >Banter, Ayla / 0001046155 </option>
                                        <option value='Becknel, Alyssa / 0000191851 ' >Becknel, Alyssa / 0000191851 </option>
                                        <option value='Bejarano-Velasquez, Ursula / 0001059771 ' >Bejarano-Velasquez, Ursula / 0001059771 </option>
                                        <option value='Bell, Chileah / 00000000CB ' >Bell, Chileah / 00000000CB </option>
                                        <option value='Biddle, Brandon / 0001000053 ' >Biddle, Brandon / 0001000053 </option>
                                        <option value=' Bousquet, Ryan / 0001021376' >Bousquet, Ryan / 0001021376 </option>
                                        <option value='Briere, Melanie / 0000170156 ' >Briere, Melanie / 0000170156 </option>
                                        <option value='Bruggeman, John / 0000161613 ' > Bruggeman, John / 0000161613</option>
                                        <option value='Byerly, Kenneth / 0000178720 ' >Byerly, Kenneth / 0000178720 </option>
                                        <option value=' Campos, Elizabeth / 00001059233' >Campos, Elizabeth / 00001059233 </option>
                                        <option value='Castagner, Frisco / 0000024317 ' > Castagner, Frisco / 0000024317</option>
                                        <option value='Chacko, Joseph / 0000212919 ' > Chacko, Joseph / 0000212919</option>
                                        <option value='Coates, Michael / 0000007388 ' >Coates, Michael / 0000007388 </option>
                                        <option value='Cobb, Kristopher / 0000178105 ' >Cobb, Kristopher / 0000178105 </option> */}
                                    </select>

                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 ' >
                                    <label className='fw-bold fs-6 mb-2' >Billing Provider</label>
                                    <Field
                                        as='select'
                                        name='billingProvider'
                                        autoComplete='off'
                                        options={BillingProviderOptions}
                                        component={SelectField}
                                        placeholder='Select Billing Provider'
                                    />
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 ' >
                                    <label className='fw-bold fs-6 mb-2' >Rendering Provider</label>
                                    <Field
                                        as='select'
                                        name='renderingProvider'
                                        autoComplete='off'
                                        options={RenderingProviderOptions}
                                        component={SelectField}
                                        placeholder='Select Rendering Provider'
                                    />
                                </div>
                                <div className="row">
                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-0 mt-6'>
                                        <label className='fw-bold fs-6 mb-0'>
                                            Use Rendering Provider in Service Line
                                            <Field
                                                type='checkbox'
                                                name='providerServiceLine'
                                                value='Use Rendering Provider in Service Line'
                                                className='mx-5'
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 mt-6' >
                                    <label className='fw-bold fs-6 mb-2'>Referring Provider</label>
                                    <Field
                                        as='select'
                                        name='referringProvider'
                                        autoComplete='off'
                                        options={ReferringProviderOptions}
                                        component={SelectField}
                                        placeholder='Select Referring Provider'
                                    />
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 mt-6 ' >
                                    <label className='fw-bold fs-6 mb-2' >Service Facility Location</label>
                                    <Field
                                        as='select'
                                        name='serviceFacilityLocation'
                                        autoComplete='off'
                                        options={ServiceFacilityOptions}
                                        component={SelectField}
                                        placeholder='Select Service Facility Location'
                                    />
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 ' >
                                    <label className='fw-bold fs-6 mb-2' >Signature On Fire</label>
                                    <Field
                                        as='select'
                                        name='signatureOnFire'
                                        autoComplete='off'
                                        options={SignatureOptions}
                                        component={SelectField}
                                        placeholder='Select Signature On Fire'
                                    />
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 ' >
                                    <label className='fw-bold fs-6 mb-2' >Place Of Service</label>
                                    <Field
                                        as='select'
                                        name='placeOfService'
                                        autoComplete='off'
                                        options={PlaceOptions}
                                        component={SelectField}
                                        placeholder='Select Place Of Service'
                                    />
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 ' >
                                    <label className='fw-bold fs-6 mb-2' >Claim Frequency Type Code</label>
                                    <Field
                                        as='select'
                                        name='claimFrequencyTypeCode'
                                        autoComplete='off'
                                        options={FrequencyTypeOptions}
                                        component={SelectField}
                                        placeholder='Select Claim Frequency Type Code'
                                    />
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 ' >
                                    <label className='fw-bold fs-6 mb-2' >Medicare Assignment Code</label>
                                    <Field
                                        as='select'
                                        name='medicalAssignmentCode'
                                        autoComplete='off'
                                        options={MedicareAssignmentOptions}
                                        component={SelectField}
                                        placeholder='Select Medicare Assignment Code'
                                    />
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 ' >
                                    <label className='fw-bold fs-6 mb-2' >Release of Information Code</label>
                                    <Field
                                        as='select'
                                        name='informationCode'
                                        autoComplete='off'
                                        options={InformationOptions}
                                        component={SelectField}
                                        placeholder='Select Release of Information Code'
                                    />
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 ' >
                                    <label className='fw-bold fs-6 mb-2' >Patient Signature Source Code</label>
                                    <Field
                                        as='select'
                                        name='patientSignature'
                                        autoComplete='off'
                                        options={PatientSignatureOptions}
                                        component={SelectField}
                                        placeholder='Select Patient Signature Source Code'
                                    />
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 ' >
                                    <label className='fw-bold fs-6 mb-2' >Claim Filing Indicator</label>
                                    <Field
                                        as='select'
                                        name='filingIndicator'
                                        autoComplete='off'
                                        options={FillingIndicatorOptions}
                                        component={SelectField}
                                        placeholder='Select Claim Filing Indicator'
                                    />
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 ' >
                                    <label className='fw-bold fs-6 mb-2' >Assignment of Benefits Indicator</label>
                                    <Field
                                        as='select'
                                        name='benefitsIndicator'
                                        autoComplete='off'
                                        options={BenefitsIndicatorOptions}
                                        component={SelectField}
                                        placeholder='Select Assignment of Benefits Indicator'
                                    />
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 ' >
                                    <label className='fw-bold fs-6 mb-2' >Payer Responsibility</label>
                                    <Field
                                        as='select'
                                        name='payerResponsibility'
                                        autoComplete='off'
                                        options={PayerOptions}
                                        component={SelectField}
                                        placeholder='Select Payer Responsibility'
                                    />
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 ' >
                                    <label className='fw-bold fs-6 mb-2' >RelationShip To Individual</label>
                                    <Field
                                        as='select'
                                        name='relationToIndividual'
                                        autoComplete='off'
                                        options={RelationOptions}
                                        component={SelectField}
                                        placeholder='Select RelationShip To Individual'
                                    />
                                </div>
                                <div className='col-col-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3 ' >
                                    <label className='fw-bold fs-6 mb-2' >Special Program Code</label>
                                    <Field
                                        as='select'
                                        name='specialProgramCode'
                                        autoComplete='off'
                                        options={SpecialProgramOptions}
                                        component={SelectField}
                                        placeholder='Select Special Program Code'
                                    />
                                </div>

                            </div>


                        </div>

                    </div>
                    {individual ? <div className='fv-row mb-7 fv-plugins-icon-container p-5 card'>
                        <div className='card-body'>
                            <h1 className='mb-5'>Service Link</h1>
                            <table className='table table-light table-rounded table-striped border border-2 table-hover fs-6 gy-5 mt-5'>
                                <thead>
                                    <tr className='text-start table-dark text-gray-400 table-rounded fw-bolder fs-7 text-uppercase gs-0'>
                                        <th className="px-3 min-w-100px">Select</th>
                                        <th className="px-3 min-w-100px" >Service Description</th>
                                        <th className="px-3 min-w-100px" >Service Code</th>
                                        <th className="px-3 min-w-100px" >Unit Rate ($)</th>
                                        <th className="px-3 min-w-100px" >Procedure Modifier</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='text-gray-600 fs-2 fw-bolder'>
                                        <td className="p-3">
                                            <input
                                                type='checkbox'
                                                name='programName'
                                                className='mx-2'
                                            />
                                        </td>
                                        <td className="px-3" >
                                            <span className="text-gray-800 text-hover-primary mb-1">LSD3 ADT - 1:3</span>
                                        </td>
                                        <td className="px-3" >S5102</td>
                                        <td className="px-3" >$14.34</td>
                                        <td className="px-3" >UC</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                        : null
                    }
                    <div className='d-flex justify-content-start pb-6 mt-6'>
                        <div className='mx-3'>
                            <button
                                // to='/billing/professionalclaim'
                                className='btn btn-primary btn-sm'
                            >
                                Cancel
                            </button>
                        </div>
                        <div>
                            <button
                                className='btn btn-sm btn-success'
                                type='submit'
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </Form>
            )}

        </Formik>
    )
}

export default NewClaimTemplate