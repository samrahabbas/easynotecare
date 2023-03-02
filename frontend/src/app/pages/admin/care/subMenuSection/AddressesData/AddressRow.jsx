const AddressRow = ({ address }) => {
  return (
    <tr>
      <td className="px-3">
        <span className="text-gray-800  mb-1"
          style={{ cursor: "pointer" }}
        >
          {address.name}
        </span>
      </td>
      <td className="px-3">
        <span className="text-gray-800  mb-1"
          style={{ cursor: "pointer" }}
        >
          {address.addrType}
        </span>
      </td>
      <td>
        <span className="text-gray-800  mb-1"
          style={{ cursor: "pointer" }}
        >
          {address.address}
        </span>
      </td>
      <td>
        <span className="text-gray-800  mb-1"
          style={{ cursor: "pointer" }}
        >
          {address.primaryPhone}
        </span>
      </td>
      <td>
        <span className="text-gray-800  mb-1"
          style={{ cursor: "pointer" }}
        >
          {address.secondaryPhone}
        </span>
      </td>
      <td>
        <span className="text-gray-800  mb-1"
          style={{ cursor: "pointer" }}
        >
          {address.enteredDate}
        </span>
      </td>
    </tr>
  )
}

export default AddressRow