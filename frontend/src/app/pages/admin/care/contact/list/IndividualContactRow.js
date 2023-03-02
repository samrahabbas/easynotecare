import { Link, useLocation } from "react-router-dom"
const IndividualContactRow = ({ individual }) => {
    const location = useLocation()
    return (
        <tr>
            <td className="px-3">
                <Link 
                className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname.startsWith('/care/contact/new') && ' active ')
                 + (location.pathname.startsWith('/care/contact/listing') && ' active ')
                    
                }
                to={{
                    pathname: `/care/contact/listing/${individual.formID}`,
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
                    pathname: `/care/contact/listing/${individual.formID}`,
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
                    pathname: `/care/contact/listing/${individual.formID}`,
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
                    pathname: `/care/contact/listing/${individual.formID}`,
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
                    pathname: `/care/contact/listing/${individual.formID}`,
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
                    pathname: `/care/contact/listing/${individual.formID}`,
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
                    pathname: `/care/contact/listing/${individual.formID}`,
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
                    pathname: `/care/contact/listing/${individual.formID}`,
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
                    pathname: `/care/contact/listing/${individual.formID}`,
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
                    pathname: `/care/contact/listing/${individual.formID}`,
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
                    pathname: `/care/contact/listing/${individual.formID}`,
                    state: individual
                }}>
                    <span className="text-gray-800 text-hover-primary mb-1"
                        style={{ cursor: "pointer" }}
                    >
                        {/* {individual.st1 + ' ' + 
                        individual.st2 + ' ' + 
                        individual.city + ' ' + 
                        individual.state +' '+
                        individual.country} */}
                        {
                            individual.mailingaddress
                        }
                    </span>
                </Link>
            </td>
        </tr>
    )
}

export default IndividualContactRow