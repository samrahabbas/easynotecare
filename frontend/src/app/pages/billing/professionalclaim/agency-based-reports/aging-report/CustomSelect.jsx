import Select from "react-select";
import { useField } from "formik";
import React from "react";
export default function SelectField(props) {
    const [field, state, { setValue }] = useField(props.field.name);

    // value is an array now
    const onChange = (value) => {
        setValue(value);
    };

    const style = {
        control: (styles) => ({
            ...styles,
            backgroundColor: "#F5F8FA",
            border: "none",
            minHeight: '43px',
            borderRadius: '6px',
            fontSize: 'initial',
            fontWeight: '500'
        })
    }
    return (
        <div>
            <Select
                {...props}
                value={state?.value}
                styles={style}
                isMulti
                onChange={onChange}
                
            /></div>
    );
}
