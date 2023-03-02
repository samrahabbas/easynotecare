const IRow = ({ program, setEnrollKey }) => {
    return (
        <tr>
            <td className="px-3">
                {program.formID}
            </td>
            <td>
                {program.programName}
            </td>
            <td>
                {program.programType}
            </td>
            <td>
                {program.siteName}
            </td>
            <td>
                {program.createDate}
            </td>
            <td>
                <span className='text-primary mb-1' role="button"
                    style={{ textDecoration: "underline" }}
                    onClick={() => setEnrollKey(program.formID)}>
                    Add
                </span>
            </td>
        </tr>
    )
}

export default IRow