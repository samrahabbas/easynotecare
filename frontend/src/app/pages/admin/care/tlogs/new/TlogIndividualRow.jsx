const TlogIndividualRow = ({ individual, setSelectedIndividual, setShowNewForm }) => {
    return (
        <tr>
            <td className="px-3">
                <span className="text-gray-800 text-hover-primary mb-1"
                    onClick={() => {
                        setSelectedIndividual(individual)
                        setShowNewForm(true)
                    }}
                    style={{ cursor: "pointer" }}
                >
                    {individual.formID}
                </span>
            </td>
            <td>
                <span className="text-gray-800 text-hover-primary mb-1"
                    onClick={() => {
                        setSelectedIndividual(individual)
                        setShowNewForm(true)
                    }}
                    style={{ cursor: "pointer" }}
                >
                    {individual.firstName} {individual.lastName}
                </span>
            </td>
            <td>
                <span className="text-gray-800 text-hover-primary mb-1"
                    onClick={() => {
                        setSelectedIndividual(individual)
                        setShowNewForm(true)
                    }}
                    style={{ cursor: "pointer" }}
                >
                    {individual.socialSecurityNumber}
                </span>
            </td>
            <td>
                <span className="text-gray-800 text-hover-primary mb-1"
                    onClick={() => {
                        setSelectedIndividual(individual)
                        setShowNewForm(true)
                    }}
                    style={{ cursor: "pointer" }}
                >
                    {individual.medicaidNumber}
                </span>
            </td>
            <td>
                <span className="text-gray-800 text-hover-primary mb-1"
                    onClick={() => {
                        setSelectedIndividual(individual)
                        setShowNewForm(true)
                    }}
                    style={{ cursor: "pointer" }}
                >
                    {individual.status}
                </span>
            </td>
            <td>
                <span className="text-gray-800 text-hover-primary mb-1"
                    onClick={() => {
                        setSelectedIndividual(individual)
                        setShowNewForm(true)
                    }}
                    style={{ cursor: "pointer" }}
                >
                    {individual.enteredBy}
                </span>
            </td>
            <td>
                <span className="text-gray-800 text-hover-primary mb-1"
                    onClick={() => {
                        setSelectedIndividual(individual)
                        setShowNewForm(true)
                    }}
                    style={{ cursor: "pointer" }}
                >
                    {individual.admittedBy}
                </span>
            </td>
            <td>
                <span className="text-gray-800 text-hover-primary mb-1"
                    onClick={() => {
                        setSelectedIndividual(individual)
                        setShowNewForm(true)
                    }}
                    style={{ cursor: "pointer" }}
                >
                    {individual.admissionDate}
                </span>
            </td>
            <td>
                <span className="text-gray-800 text-hover-primary mb-1"
                    onClick={() => {
                        setSelectedIndividual(individual)
                        setShowNewForm(true)
                    }}
                    style={{ cursor: "pointer" }}
                >
                    {individual.birthDate}
                </span>

            </td>
            <td>
                <span className="text-gray-800 text-hover-primary mb-1"
                    onClick={() => {
                        setSelectedIndividual(individual)
                        setShowNewForm(true)
                    }}
                    style={{ cursor: "pointer" }}
                >
                    {individual.lastUpdatedBy}
                </span>
            </td>
            <td>
                <span className="text-gray-800 text-hover-primary mb-1"
                    onClick={() => {
                        setSelectedIndividual(individual)
                        setShowNewForm(true)
                    }}
                    style={{ cursor: "pointer" }}
                >
                    {individual.mailingaddress}
                </span>
            </td>
        </tr>
    )
}

export default TlogIndividualRow