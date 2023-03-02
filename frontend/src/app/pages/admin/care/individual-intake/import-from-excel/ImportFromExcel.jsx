import { useState, useRef } from 'react';
import { Link } from 'react-router-dom'
import ExportCSV from '../../../../../../_helper/exportCSVHelper/ExportCSV'
import * as XLSX from "xlsx";

const headersDetails = [
    { label: "Form ID", key: "formID" },
    { label: "Client Name", key: "individual" },
    { label: "Social Security Number", key: "socialSecurityNumber" },
    { label: "Medicaid Number", key: "medicaidNumber" },
    { label: "Medicare Number", key: "medicareNumber" },
    { label: "Birth Date", key: "birthDate" },
    { label: "Gender", key: "gender" },
    { label: "Email", key: "email" },
    { label: "Ethnicity", key: "ethnicity" },
    { label: "Race", key: "race" },
    { label: "Phone Number", key: "phoneNumber" },
    { label: "In Care Of", key: "inCareOf" },
    { label: "Status", key: "status" },
    { label: "Case Status", key: "caseStatus" },
    { label: "Address", key: "addrAddress" },
    { label: "City", key: "addrCountry" },
    { label: "Residential County", key: "residentialCounty" },
    { label: "Residential County State", key: "residentialCountyState" },
    { label: "Service County", key: "serviceCounty" },
    { label: "Service County State", key: "serviceCountyState" },
    { label: "Country", key: "addrCity" },
    { label: "Address Primary Phone", key: "addrPrimaryPhone" },
    { label: "Address Secondary Phone", key: "addrSecondaryPhone" },
    { label: "Address ZipCode", key: "addrZipCode" },
    { label: "Mailing Primary Phone", key: "mailingPrimaryPhone" },
    { label: "Mailing Secondary Phone", key: "mailingSecondaryPhone" },
    { label: "Mailing Address", key: "mailingaddress" },
    { label: "Mailing City", key: "mailingCity" },
    { label: "Mailing Country", key: "mailingCountry" },
    { label: "Mailing ZipCode", key: "mailingZipCode" },
    { label: "Entered By", key: "enteredBy" },
    { label: "Admitted By", key: "admittedBy" },
    { label: "Last Updated By", key: "lastUpdatedBy" },
    { label: "Admission Date", key: "admissionDate" },
]

function ImportFromExcel() {
    const [file, setFile] = useState();
    const [items, setItems] = useState([])
    const inputRef = useRef('');

    const handleUploadClick = () => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray, { type: "buffer" });

                const wsname = wb.SheetNames[0];

                const ws = wb.Sheets[wsname];

                const data = XLSX.utils.sheet_to_json(ws);

                resolve(data);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((d) => {
            console.log(d);
            let finalObj = []
            if(d.length > 0){
                let firstEntry = d[0]
                let firstEntryKeys = Object.keys(firstEntry)
                let headerLabels = headersDetails.map((header) => (header.label))
                if(firstEntryKeys.length <= headerLabels.length){
                    for(let i = 0; i < firstEntryKeys.length; i++){
                        if(!headerLabels.includes(firstEntryKeys[i])){
                            console.log("col name not allowed")
                            return;
                        }
                    }
                    for(let i = 0; i < d.length; i++){
                        let tempObj = d[i]
                        for(let j = 0; j < headerLabels.length; j++){
                            if(!firstEntryKeys.includes(headerLabels[j])){
                                tempObj[headerLabels[j]] = ''
                            }
                        }
                        finalObj.push(tempObj)
                    }
                    setItems(finalObj)
                }
            }
            // setItems(d);
        });
    };

    const handleFileChange = (e) => {
        if (!e.target.files) {
            return;
        }
        console.log(e.target.files[0])
        setFile(e.target.files[0]);

        // 🚩 do the file upload here normally...
    };
    return (
        <div>
            <div className='fv-row mb-7 fv-plugins-icon-container p-5 card'>
                <div className='card-body'>
                    <h1 className='mb-5'>IDF Excel Import</h1>
                    <div className='row'>
                        <div style={{ backgroundColor: "BlanchedAlmond" }} className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                            <ul>
                                <li className='mt-3'>The maximum file size allowed is 3 MB.</li>
                                <li>Maximum number of rows allowed is 200.</li>
                                <li>Please use Microsoft Excel Version 2007 or later to enter data into the Excel Template. Supported File Format: xlsx or csv</li>
                            </ul>
                        </div>
                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-3'>
                            <label className=' fw-bold fs-6 mb-2'>File</label>
                            <div className="d-flex">
                                <input
                                    type='file'
                                    name='user_name'
                                    ref={inputRef}
                                    onChange={handleFileChange}
                                    className='form-control form-control-solid mb-3 mb-lg-0'
                                    placeholder=''
                                ></input>
                            </div>

                            <button className="btn btn-primary btn-sm" onClick={() => handleUploadClick()} disabled={file ? false : true}>Upload</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='fv-row mb-7 fv-plugins-icon-container p-5 card'>
                <div className='row'>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 my-1'>
                        <ExportCSV
                            headerProp={headersDetails} filename={"Clients_Template_Sheet"} data={[{}]} title={"Download Excel Template"}
                        />
                    </div>
                </div>
            </div>

            <div className='d-flex flex-stack'>
                <div>
                    <Link to='/admin/general'>
                        <button className='btn btn-primary mt-4'>Cancel</button>
                    </Link>
                </div>
                <div>
                    <button className='btn btn-primary mt-4 me-4'>Upload</button>
                </div>
            </div>

        </div>
    )
}

export default ImportFromExcel