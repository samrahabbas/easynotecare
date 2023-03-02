const GuardianRow = ({ guardian, setGuardianInfo }) => {
    return (
        <tr>

            <td>
                <span
                    className="text-gray-800 text-hover-primary mb-1 px-3"
                    data-bs-toggle="modal" data-bs-target="#kt_modal_show_guardian"
                    style={{ cursor: "pointer" }} onClick={() => setGuardianInfo(guardian)}>
                    {guardian.formID}
                </span>
            </td>

            <td>
                <span
                    className="text-gray-800 text-hover-primary mb-1"
                    data-bs-toggle="modal" data-bs-target="#kt_modal_show_guardian"
                    style={{ cursor: "pointer" }} onClick={() => setGuardianInfo(guardian)}>
                    {guardian.firstName} {guardian.lastName}
                </span>
            </td>

            <td>
                <span
                    className="text-gray-800 text-hover-primary mb-1"
                    data-bs-toggle="modal" data-bs-target="#kt_modal_show_guardian"
                    style={{ cursor: "pointer" }} onClick={() => setGuardianInfo(guardian)}>
                    {guardian?.guardianType}
                </span>
            </td>

            <td>
                <span
                    className="text-gray-800 text-hover-primary mb-1"
                    data-bs-toggle="modal" data-bs-target="#kt_modal_show_guardian"
                    style={{ cursor: "pointer" }} onClick={() => setGuardianInfo(guardian)}>
                    {guardian?.guardianAuthority}
                </span>
            </td>

            <td>
                <span
                    className="text-gray-800 text-hover-primary mb-1"
                    data-bs-toggle="modal" data-bs-target="#kt_modal_show_guardian"
                    style={{ cursor: "pointer" }} onClick={() => setGuardianInfo(guardian)}>
                    {guardian?.guardianEstablishDate}
                </span>
            </td>

            <td>
                <span
                    className="text-gray-800 text-hover-primary mb-1"
                    data-bs-toggle="modal" data-bs-target="#kt_modal_show_guardian"
                    style={{ cursor: "pointer" }} onClick={() => setGuardianInfo(guardian)}>
                    {guardian?.guardianEstablishEndDate}
                </span>
            </td>
        </tr>
    )
}

export default GuardianRow