import { Formik, Form, Field } from "formik"
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import SubMenuSection from '../../subMenuSection/SubMenuSection'
import axios from 'axios'

const MainInsuranceForm = ({ location }) => {
    const [insuranceData, setInsuranceData] = useState({})
    const [individual, setIndividual] = useState({})
    const [showEditingForm, setShowEditingForm] = useState(true)

    const history = useHistory()

    useEffect(() => {
        if (location.state === undefined) {
            history.push('/care/insurance/list')
        } else {
            console.log(location.state)
            setInsuranceData(location.state.insuranceInfo)
            setIndividual(location.state)
            setShowEditingForm(true)
            //         setIndividualList(Inddata)
            //   let tempvariable = Inddata.filter((ind) => ind.individualIDNumber === location.state.individualIDNumber)
            //   setIndividualSelected(tempvariable[0].individual)
        }
    }, [history, location.state])

    return (
        <div>
            <div className="d-flex justify-content-center">
                <div className='card card-flush h-md-100 w-100'>
                    <div className="mt-6 mx-6">
                        <SubMenuSection individual={individual} />
                    </div>
                    <div className="card-header w-75">
                        <div className="card-title">
                            <h2 className="fw-bolder">Insurance Data Of: {individual.firstName + ' ' + individual.lastName}</h2>
                        </div>
                    </div>
                    <div className="card-body">
                        {
                            showEditingForm ?
                                <div>
                                    <div className="d-flex">
                                        <div>
                                            <button className="btn btn-primary btn-sm" onClick={() => setShowEditingForm(false)}>Edit Form</button>
                                        </div>
                                    </div>
                                    <div className="row my-7" style={{ border: "1px solid #80808045", padding: "0px 10px 0px 10px" }}>

                                        <h5 className='mt-4 text-primary'>Medicare Section</h5>
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                                            <label className="fw-bold fs-6 mb-2 w-50">Medicare Number</label>
                                            <label className="fs-7 mb-2 w-50">{insuranceData.medicareNumber}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                                            <label className="fw-bold fs-6 mb-2 w-50">Medicare Date</label>
                                            <label className="fs-7 mb-2 w-50">{insuranceData.medicareDate}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                                            <label className="fw-bold fs-6 mb-2 w-50">Med Plan D ID</label>
                                            <label className="fs-7 mb-2 w-50">{insuranceData.medPlanDId}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                                            <label className="fw-bold fs-6 mb-2 w-50">Med Plan D Name</label>
                                            <label className="fs-7 mb-2 w-50">{insuranceData.medPlanDName}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                                            <label className="fw-bold fs-6 mb-2 w-50">Med Plan D Issuer</label>
                                            <label className="fs-7 mb-2 w-50">{insuranceData.medPlanDIssuer}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                                            <label className="fw-bold fs-6 mb-2 w-50">Med Plan D RxBIN</label>
                                            <label className="fs-7 mb-2 w-50">{insuranceData.medPlanDRxBin}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                                            <label className="fw-bold fs-6 mb-2 w-50">Med Plan D RxPCN</label>
                                            <label className="fs-7 mb-2 w-50">{insuranceData.medPlanDRxPcn}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                                            <label className="fw-bold fs-6 mb-2 w-50">Med Plan D RxGRP</label>
                                            <label className="fs-7 mb-2 w-50">{insuranceData.medPlanDRxGrp}</label>
                                        </div>
                                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-7'>
                                            <label className="fw-bold fs-6 mb-2 w-25">Other Benefits</label>
                                            <label className="fs-7 mb-2 w-75">{insuranceData.otherBenefits}</label>
                                        </div>

                                        <h5 className='mt-4 text-primary'>Other Insurance</h5>
                                        <hr />
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                                            <label className="fw-bold fs-6 mb-2 w-50">Insurance Company</label>
                                            <label className="fs-7 mb-2 w-50">{insuranceData.insuranceCompany}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                                            <label className="fw-bold fs-6 mb-2 w-50">Insurance Group</label>
                                            <label className="fs-7 mb-2 w-50">{insuranceData.insuranceGroup}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                                            <label className="fw-bold fs-6 mb-2 w-50">Insurance Policy Number</label>
                                            <label className="fs-7 mb-2 w-50">{insuranceData.insurancePolicyNumber}</label>
                                        </div>
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                                            <label className="fw-bold fs-6 mb-2 w-50">Insurance Policy Holder</label>
                                            <label className="fs-7 mb-2 w-50">{insuranceData.insurancePolicyHolder}</label>
                                        </div>

                                        <h5 className="mt-4 text-primary">Attachment(s)</h5>
                                        <hr />

                                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-7'>
                                            <label className="fw-bold fs-6 mb-2 w-50">Files Added are</label>
                                            <label className="fs-7 mb-2 w-50">File1, File2, File3</label>
                                        </div>
                                    </div>
                                </div>
                                :
                                <Formik
                                    initialValues={{
                                        medicareNumber: insuranceData.medicareNumber,
                                        medicareDate: insuranceData.medicareDate,
                                        medPlanDId: insuranceData.medPlanDId,
                                        medPlanDName: insuranceData.medPlanDName,
                                        medPlanDIssuer: insuranceData.medPlanDIssuer,
                                        medPlanDRxBin: insuranceData.medPlanDRxBin,
                                        medPlanDRxPcn: insuranceData.medPlanDRxPcn,
                                        medPlanDRxGrp: insuranceData.medPlanDRxGrp,
                                        otherBenefits: insuranceData.otherBenefits,
                                        insuranceCompany: insuranceData.insuranceCompany,
                                        insuranceGroup: insuranceData.insuranceGroup,
                                        insurancePolicyNumber: insuranceData.insurancePolicyNumber,
                                        insurancePolicyHolder: insuranceData.insurancePolicyHolder,
                                        files: insuranceData.files
                                    }}
                                    onSubmit={(values, { setSubmitting }) => {
                                        let tempobj = location.state
                                        tempobj.insuranceInfo = values
                                        console.log("tempobj", tempobj)
                                        axios.put("clients/update", tempobj)
                                            .then(res => {
                                                console.log(res.data)
                                                setInsuranceData(values)
                                                setShowEditingForm(true);
                                            })
                                            .catch((err) => {
                                                console.log(err)
                                                // throw new Error(err);
                                            })

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
                                                        <label className="fw-bold fs-6 mb-2 w-100">Medicare Number</label>
                                                        <Field
                                                            type='number'
                                                            name='medicareNumber'
                                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                                            placeholder='Medicare Number'
                                                            autoComplete="off"
                                                        ></Field>
                                                    </div>
                                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                                                        <label className="fw-bold fs-6 mb-2 w-100">Medicare Date</label>
                                                        <Field
                                                            type='date'
                                                            name='medicareDate'
                                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                                            placeholder='Medicare Date'
                                                            autoComplete="off"
                                                        ></Field>
                                                    </div>
                                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                                                        <label className="fw-bold fs-6 mb-2 w-100">Med Plan D ID</label>
                                                        <Field
                                                            type='number'
                                                            name='medPlanDId'
                                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                                            placeholder='Med Plan D ID'
                                                            autoComplete="off"
                                                        ></Field>
                                                    </div>
                                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                                                        <label className="fw-bold fs-6 mb-2 w-100">Med Plan D Name</label>
                                                        <Field
                                                            name='medPlanDName'
                                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                                            placeholder='Med Plan D Name'
                                                            autoComplete="off"
                                                        ></Field>
                                                    </div>
                                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                                                        <label className="fw-bold fs-6 mb-2 w-100">Med Plan D Issuer</label>
                                                        <Field
                                                            name='medPlanDIssuer'
                                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                                            placeholder='Med Plan D Issuer'
                                                            autoComplete="off"
                                                        ></Field>
                                                    </div>
                                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                                                        <label className="fw-bold fs-6 mb-2 w-100">Med Plan D RxBIN</label>
                                                        <Field
                                                            name='medPlanDRxBin'
                                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                                            placeholder='Med Plan D RxBIN'
                                                            autoComplete="off"
                                                        ></Field>
                                                    </div>
                                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                                                        <label className="fw-bold fs-6 mb-2 w-100">Med Plan D RxPCN</label>
                                                        <Field
                                                            name='medPlanDRxPcn'
                                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                                            placeholder='Med Plan D RxPCN'
                                                            autoComplete="off"
                                                        ></Field>
                                                    </div>
                                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                                                        <label className="fw-bold fs-6 mb-2 w-100">Med Plan D RxGrp</label>
                                                        <Field
                                                            name='medPlanDRxGrp'
                                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                                            placeholder='Med Plan D RxGrp'
                                                            autoComplete="off"
                                                        ></Field>
                                                    </div>
                                                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-7'>
                                                        <label className="fw-bold fs-6 mb-2 w-100-">Other Benefits</label>
                                                        <Field as="textarea" name="otherBenefits"
                                                            className='form-control form-control-solid mb-3 mb-lg-0' rows="4"></Field>
                                                    </div>
                                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                                                        <label className="fw-bold fs-6 mb-2 w-100">Insurance Company</label>
                                                        <Field
                                                            name='insuranceCompany'
                                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                                            placeholder='Insurance Company'
                                                            autoComplete="off"
                                                        ></Field>
                                                    </div>
                                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                                                        <label className="fw-bold fs-6 mb-2 w-100">Insurance Group</label>
                                                        <Field
                                                            name='insuranceGroup'
                                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                                            placeholder='Insurance Group'
                                                            autoComplete="off"
                                                        ></Field>
                                                    </div>
                                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                                                        <label className="fw-bold fs-6 mb-2 w-100">Insurance Policy Number</label>
                                                        <Field
                                                            type="number"
                                                            name='insurancePolicyNumber'
                                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                                            placeholder='Insurance Policy Number'
                                                            autoComplete="off"
                                                        ></Field>
                                                    </div>
                                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-7'>
                                                        <label className="fw-bold fs-6 mb-2 w-100">Insurance Policy Holder</label>
                                                        <Field
                                                            name='insurancePolicyHolder'
                                                            className='form-control form-control-solid mb-3 mb-lg-0'
                                                            placeholder='Insurance Policy Number'
                                                            autoComplete="off"
                                                        ></Field>
                                                    </div>
                                                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-7'>
                                                        <label className="fw-bold fs-6 mb-2 w-100">Files</label>
                                                        <Field type="file" name="files"
                                                            className='form-control form-control-solid mb-3 mb-lg-0'></Field>
                                                    </div>
                                                </div>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainInsuranceForm