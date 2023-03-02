import { Link } from "react-router-dom"

const InsuranceClientsRow = ({ individual }) => {
    return (
        <tr>
            <td className="px-3">
                <Link to={{
                    pathname: `/care/insurance/${individual.formID}`,
                    state: individual
                }}>
                    <span className="text-gray-800 text-hover-primary mb-1"
                        style={{ cursor: "pointer" }}
                    >
                        {individual.formID}
                    </span>
                </Link>
            </td>
            <td>
                <Link to={{
                    pathname: `/care/insurance/${individual.formID}`,
                    state: individual
                }}>
                    <span className="text-gray-800 text-hover-primary mb-1"
                        style={{ cursor: "pointer" }}
                    >
                        {individual.firstName + " " + individual.lastName}
                    </span>
                </Link>
            </td>
            <td>
                <Link to={{
                    pathname: `/care/insurance/${individual.formID}`,
                    state: individual
                }}>
                    <span className="text-gray-800 text-hover-primary mb-1"
                        style={{ cursor: "pointer" }}
                    >
                        {individual.socialSecurityNumber}
                    </span>
                </Link>
            </td>
            <td>
                <Link to={{
                    pathname: `/care/insurance/${individual.formID}`,
                    state: individual
                }}>
                    <span className="text-gray-800 text-hover-primary mb-1"
                        style={{ cursor: "pointer" }}
                    >
                        {individual.medicaidNumber}
                    </span>
                </Link>
            </td>
            <td>
                <Link to={{
                    pathname: `/care/insurance/${individual.formID}`,
                    state: individual
                }}>
                    <span className="text-gray-800 text-hover-primary mb-1"
                        style={{ cursor: "pointer" }}
                    >
                        {individual.status}
                    </span>
                </Link>
            </td>
            <td>
                <Link to={{
                    pathname: `/care/insurance/${individual.formID}`,
                    state: individual
                }}>
                    <span className="text-gray-800 text-hover-primary mb-1"
                        style={{ cursor: "pointer" }}
                    >
                        {individual.enteredBy}
                    </span>
                </Link>
            </td>
            <td>
                <Link to={{
                    pathname: `/care/insurance/${individual.formID}`,
                    state: individual
                }}>
                    <span className="text-gray-800 text-hover-primary mb-1"
                        style={{ cursor: "pointer" }}
                    >
                        {individual.admittedBy}
                    </span>
                </Link>
            </td>
            <td>
                <Link to={{
                    pathname: `/care/insurance/${individual.formID}`,
                    state: individual
                }}>
                    <span className="text-gray-800 text-hover-primary mb-1"
                        style={{ cursor: "pointer" }}
                    >
                        {individual.admissionDate}
                    </span>
                </Link>
            </td>
            <td>
                <Link to={{
                    pathname: `/care/insurance/${individual.formID}`,
                    state: individual
                }}>
                    <span className="text-gray-800 text-hover-primary mb-1"
                        style={{ cursor: "pointer" }}
                    >
                        {individual.birthDate}
                    </span>
                </Link>
            </td>
            <td>
                <Link to={{
                    pathname: `/care/insurance/${individual.formID}`,
                    state: individual
                }}>
                    <span className="text-gray-800 text-hover-primary mb-1"
                        style={{ cursor: "pointer" }}
                    >
                        {individual.lastUpdatedBy}
                    </span>
                </Link>
            </td>
            <td>
                <Link to={{
                    pathname: `/care/insurance/${individual.formID}`,
                    state: individual
                }}>
                    <span className="text-gray-800 text-hover-primary mb-1"
                        style={{ cursor: "pointer" }}
                    >
                        {
                            individual.mailingInfo.st1 + ' ' +
                            individual.mailingInfo.st2 + ' ' +
                            individual.mailingInfo.city + ' ' +
                            individual.mailingInfo.state + ' ' +
                            individual.mailingInfo.country
                        }
                    </span>
                </Link>
            </td>
        </tr>
    )
}

export default InsuranceClientsRow