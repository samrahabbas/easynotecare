import React from 'react'

const SharedContactsSubSectionRow = ({ contact, setEditSharedContact, setDeleteSharedContact, setShowEditForm }) => {
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
                <button
                    style={{ cursor: "pointer" }}
                    data-bs-toggle="modal" data-bs-target="#kt_modal_delete_contact"
                    className='btn btn-icon text-hover-primary btn-bg-light btn-active-color-primary btn-sm me-1'
                    onClick={() => setDeleteSharedContact(contact.formID)}
                >
                    <span className='svg-icon svg-icon-3'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width={24}
                            height={24}
                            viewBox='0 0 24 24'
                            fill='none'
                        >
                            <path
                                d='M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z'
                                fill='black'
                            />
                            <path
                                opacity='0.5'
                                d='M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z'
                                fill='black'
                            />
                            <path
                                opacity='0.5'
                                d='M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z'
                                fill='black'
                            />
                        </svg>
                    </span>
                </button>
            </td>
        </tr >
    )
}

export default SharedContactsSubSectionRow