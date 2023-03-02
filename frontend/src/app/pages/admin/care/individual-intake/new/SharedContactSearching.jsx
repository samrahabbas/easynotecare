import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

const SharedContactSearching = ({ companyid, setSharedContact }) => {
    const [options, setOptions] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        // Fetch data from API using axios
        axios.get("/shared/get/" + companyid)
            .then((response) => {
                // Map the data to an array of options for the Select component
                const mappedData = response.data.map((item) => ({ value: item.formID, label: `${item.firstName}  ${item.lastName}`}));
                setOptions(mappedData);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // Filter the options based on search term
    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <Select
                options={filteredOptions}
                onChange={(selectedOption) => {
                    let temparr = selectedOption.map((item) => item.value);
                    setSharedContact(temparr)
                }}
                onInputChange={(inputValue) => setSearch(inputValue)}
                isMulti={true}
                isClearable={true}
                isSearchable={true}
            />
        </div>
    )
}

export default SharedContactSearching