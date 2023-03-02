import { CSVLink } from 'react-csv';

const ExportCSV = ({ headerProp, filename, data, title }) => {
    return (
        <button
            className='btn btn-sm btn-success'
            disabled={data.length > 0 ? false : true}
        >
            <CSVLink
                headers={headerProp}
                data={data}
                filename={filename}
                style={{ "color": "#fff" }}
            >
                {title} &nbsp;
                <i className="bi  fa-sm bi-file-earmark-excel-fill"></i>
            </CSVLink>
        </button>
    );
}

export default ExportCSV;