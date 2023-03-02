const HealthProfileMenu = ({ client, setMainHealth, setDiagnosisSection, setAllergySection, setDirectivesSection, setAllergyTypeSection, setDiagnosisTypeSection }) => {

    return (
        <div>
            <div className='card mb-5 mb-xl-10'>
                <div className='card-body pt-3 pb-0'>
                    <p className='text-gray-800 fs-2 fw-bolder'>{`Health Profile of ${client.firstName} ${client.lastName}`}</p>
                    <div className='d-flex overflow-auto h-60px'>
                        <ul className='nav nav-stretch w-100 justify-content-between nav-line-tabs border-transparent fs-5 py-5'>
                            <li className='nav-item' style={{ cursor: "pointer" }}
                                onClick={() => {
                                    setMainHealth(true)
                                    setDiagnosisSection(false)
                                    setAllergySection(false)
                                    setDirectivesSection(false)
                                    setAllergyTypeSection(false)
                                    setDiagnosisTypeSection(false)
                                }}>
                                <span className='nav-link  text-active-primary fw-bolder'>Health Data</span>
                            </li>
                            <li className="nav-item" style={{ cursor: "pointer" }}
                                onClick={() => {
                                    setMainHealth(false)
                                    setDiagnosisSection(false)
                                    setAllergySection(true)
                                    setDirectivesSection(false)
                                    setAllergyTypeSection(false)
                                    setDiagnosisTypeSection(false)
                                }}>
                                <span className='nav-link  text-active-primary fw-bolder'>Allergy Profile</span>
                            </li>
                            <li className="nav-item" style={{ cursor: "pointer" }}
                                onClick={() => {
                                    setMainHealth(false)
                                    setDiagnosisSection(false)
                                    setAllergySection(false)
                                    setDirectivesSection(false)
                                    setAllergyTypeSection(true)
                                    setDiagnosisTypeSection(false)
                                }}>
                                <span className='nav-link  text-active-primary fw-bolder'>Allergy Types</span>
                            </li>
                            <li className="nav-item" style={{ cursor: "pointer" }}
                                onClick={() => {
                                    setMainHealth(false)
                                    setDiagnosisSection(true)
                                    setAllergySection(false)
                                    setDirectivesSection(false)
                                    setAllergyTypeSection(false)
                                    setDiagnosisTypeSection(false)
                                }}>
                                <span className='nav-link  text-active-primary fw-bolder'>Diagnosis</span>
                            </li>
                            {/* <li className="nav-item" style={{ cursor: "pointer" }}
                                onClick={() => {
                                    setMainHealth(false)
                                    setDiagnosisSection(false)
                                    setAllergySection(false)
                                    setDirectivesSection(false)
                                    setAllergyTypeSection(false)
                                    setDiagnosisTypeSection(true)
                                }}>
                                <span className='nav-link  text-active-primary fw-bolder'>Diagnosis Types</span>
                            </li> */}
                            <li className="nav-item" style={{ cursor: "pointer" }}
                                onClick={() => {
                                    setMainHealth(false)
                                    setDiagnosisSection(false)
                                    setAllergySection(false)
                                    setDirectivesSection(true)
                                    setAllergyTypeSection(false)
                                    setDiagnosisTypeSection(false)
                                }}>
                                <span className='nav-link  text-active-primary fw-bolder'>Directives</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HealthProfileMenu