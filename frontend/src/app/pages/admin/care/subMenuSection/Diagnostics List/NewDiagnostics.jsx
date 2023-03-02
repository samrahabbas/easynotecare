import axios from 'axios'
import { useState, useEffect } from 'react'
import AsyncSelect from 'react-select/async';
import { randomID } from '../../../../../../_helper/randomID';

const NewDiagnostics = ({ setNewForm, client }) => {
    const [inputValue, setInputValue] = useState('')
    const [codeType, setCodeType] = useState('')
    const [formData, setFormData] = useState({
        formID: "DIAGNOSIS-" + randomID(),
        diagnosisCodeType: "",
        diagnosisName: "",
        description: "",
        diagnosisDate: '',
        diagnosedBy: "",
        enteredBy: "",
    })

    const searchICD = (value) => {
        if (value.length >= 3) {
            if (codeType === 'ICD-10') {
                return new Promise((resolve, reject) => {
                    axios.post(`/icd10/findICD`, {
                        value: value
                    })
                        .then(res => {
                            let tempvar = []
                            for (let i = 0; i < res.data.length; i++) {
                                let tempobj = {}
                                tempobj.label = res.data[i].info
                                tempobj.value = res.data[i].info
                                tempvar.push(tempobj)
                            }
                            resolve(tempvar)
                        })
                        .catch(err => reject(err))
                })
            } else if (codeType === 'ICD-9') {
                return new Promise((resolve, reject) => {
                    axios.post(`/icd9/findICD`, {
                        value: value
                    })
                        .then(res => {
                            let tempvar = []
                            for (let i = 0; i < res.data.length; i++) {
                                let tempobj = {}
                                tempobj.label = res.data[i].info
                                tempobj.value = res.data[i].code
                                tempvar.push(tempobj)
                            }
                            resolve(tempvar)
                        })
                        .catch(err => reject(err))
                })
            }
        }
    }

    const loadOptions = async (inputValue, callback) => {
        const response = await searchICD(inputValue)
        callback(response)
    };

    const handleInputChange = (newValue) => {
        setInputValue(newValue)
        return newValue;
    };

    const theme = (theme) => ({
        ...theme,
        spacing: {
            ...theme.spacing,
            controlHeight: 45,
        }
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevName) => {
            return {
                ...prevName,
                [name]: value,
            };
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let newData = { ...formData };
        if (newData.diagnosisCodeType && newData.diagnosisName && newData.description) {
            let tempobj = {
                clientID: client.formID,
                diagnosticsInfo: newData,
            }
            axios.put("/health/addDiagnostics", tempobj)
                .then(res => setNewForm(false))

        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='my-4'>
                    <button className="btn btn-primary btn-sm" onClick={() => {
                        setNewForm(false)
                    }}>
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary btn-sm mx-5" onSubmit={handleSubmit}>Add</button>
                </div>
                <div className="row">
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                        <label className=' fw-bold fs-6 mb-2'>Diagnosis Code Type</label>
                        <select
                            className='form-select form-select-lg mb-3'
                            name='diagnosisCodeType'
                            aria-label='.form-select-lg example'
                            onChange={(e) => {
                                setCodeType(e.target.value)
                                handleChange(e)
                            }}
                            onSubmit={handleSubmit}
                        >
                            <option hidden> - Select Code Type - </option>
                            <option value='ICD-9'>ICD-9</option>
                            <option value='ICD-10'>ICD-10</option>
                        </select>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                        <label className=' fw-bold fs-6 mb-2'>Diagnosis Name</label>
                        <AsyncSelect
                            name='diagnosisName'
                            loadOptions={loadOptions}
                            onInputChange={handleInputChange}
                            theme={theme}
                            onChange={(e) => {
                                let tempvar = formData
                                tempvar.diagnosisName = e.value
                                setFormData(tempvar)
                            }}
                            onSubmit={handleSubmit}
                            isDisabled={codeType === '' ? true : false} />
                    </div>
                </div>


                <div className="row">
                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                        <label className=' fw-bold fs-6 mb-2'>Description</label>
                        <textarea
                            name="description"
                            id=""
                            cols="30"
                            rows="4"
                            className='form-control form-control-solid mb-3 mb-lg-0'
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            value={formData.description}
                        />
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                        <label className=' fw-bold fs-6 mb-2'>Diagnosis Date</label>
                        <input
                            type="date"
                            name='diagnosisDate'
                            className='form-control form-control-solid mb-3 mb-lg-0'
                            autoComplete="off"
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            value={formData.diagnosisDate}
                        />
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                        <label className=' fw-bold fs-6 mb-2'>Diagnosed By</label>
                        <input
                            type='text'
                            name='diagnosedBy'
                            className='form-control form-control-solid mb-3 mb-lg-0'
                            autoComplete="off"
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            value={formData.diagnosedBy}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default NewDiagnostics