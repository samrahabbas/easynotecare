import AsyncSelect from 'react-select/async'
import axios from 'axios'

const DiagnosticsSearching = ({ setDiagnosisForm, setCodeType, codeType, diagnosisForm }) => {
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
                                let tempobj = {
                                    label: '',
                                    value: ''
                                }
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
                                let tempobj = {
                                    label: '',
                                    value: ''
                                }
                                tempobj.label = res.data[i].info
                                tempobj.value = res.data[i].info
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
        setDiagnosisForm((prevName) => {
            return {
                ...prevName,
                [name]: value,
            };
        });
    };

    return (
        <div>
            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                <label className=' fw-bold fs-6 mb-2'>Diagnosis Code Type</label>
                <select
                    className='form-select form-select-lg mb-3'
                    name='diagnosisCodeType'
                    aria-label='.form-select-lg example'
                    onChange={(e) => {
                        setCodeType(e.target.value)
                        handleChange(e)
                    }}
                >
                    <option hidden> - Select Code Type - </option>
                    <option value='ICD-9'>ICD-9</option>
                    <option value='ICD-10'>ICD-10</option>
                </select>
            </div>
            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                <label className=' fw-bold fs-6 mb-2'>Diagnosis Name</label>
                <AsyncSelect
                    name='diagnosisName'
                    loadOptions={loadOptions}
                    onInputChange={handleInputChange}
                    theme={theme}
                    onChange={(e) => {
                        let tempvar = diagnosisForm
                        tempvar.diagnosisName = e.value
                        setDiagnosisForm(tempvar)
                    }}
                    isDisabled={codeType === '' ? true : false} />
            </div>
        </div>
    )
}

export default DiagnosticsSearching