const ListOfSharedContactsRow = ({ contact, setNewSharedContact }) => {
    return (
        <tr>
            <td className="px-3">
                <span className="text-gray-800 text-hover-primary mb-1"
                    style={{ cursor: "pointer" }}
                >
                    {contact.formID}
                </span>
            </td>

            <td>
                <span className="text-gray-800 text-hover-primary mb-1"
                    style={{ cursor: "pointer" }}
                >
                    {contact.firstName} {contact.lastName}
                </span>
            </td>

            <td>
                <span className="text-gray-800 text-hover-primary mb-1"
                    style={{ cursor: "pointer" }}
                >
                    {contact.type}
                </span>
            </td>

            <td>
                <span className="text-gray-800 text-hover-primary mb-1"
                    style={{ cursor: "pointer" }}
                >
                    {contact.organizationName}
                </span>
            </td>

            <td>
                <span className="text-gray-800 text-hover-primary mb-1"
                    style={{ cursor: "pointer" }}
                >
                    {contact.speciality}
                </span>
            </td>

            <td>
                <span className="text-gray-800 text-hover-primary mb-1"
                    style={{ cursor: "pointer" }}
                >
                    {contact.npiNumber}
                </span>
            </td>

            <td>
                <span className="text-gray-800 text-hover-primary mb-1"
                    style={{ cursor: "pointer" }}
                >
                    {contact.mailingaddress}
                </span>
            </td>

            <td>
                <span className="text-gray-800 text-hover-primary mb-1"
                    style={{ cursor: "pointer" }}
                >
                    {contact.primaryPhone}
                </span>
            </td>

            <td>
                <span className="text-gray-800 text-hover-primary mb-1"
                    style={{ cursor: "pointer" }}
                >
                    {contact.email}
                </span>
            </td>

            <td>
                <div
                    style={{ cursor: "pointer" }}
                    data-bs-toggle="modal" data-bs-target="#kt_modal_add_shared_contact"
                    className='btn btn-icon text-hover-primary btn-bg-light btn-active-color-primary btn-sm me-1'
                    onClick={() => {
                        setNewSharedContact(contact)
                    }}
                >
                    <i className="fa fa-plus"></i>
                </div>
            </td>
        </tr >
    )
}

export default ListOfSharedContactsRow