import React from 'react'

const PgEnRow = ({ individual, setDelistKey, index }) => {
    return (
        <tr>
            <td className="px-3">
                {individual.formID}
            </td>
            <td>
                {individual.firstName} {individual.lastName}
            </td>
            <td>
                {individual.birthDate}
            </td>
            <td>
                {individual.mailingaddress}
            </td>
            <td>
                {individual.socialSecurityNumber}
            </td>
            <td>
                {individual.medicaidNumber}
            </td>
            <td>
                {individual.status}
            </td>
            <td>
                <span className='text-primary mb-1' role="button"
                    style={{ textDecoration: "underline" }}
                    onClick={() => {
                        setDelistKey(individual.formID)
                    }}>Discharge</span>
            </td>
        </tr>
    )
}

export default PgEnRow