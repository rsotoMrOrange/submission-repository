import { useState } from 'react';

const useField = ( fieldValue, type, name ) => {
    const [value, setValue] = useState(fieldValue);

    const onChange = (event) => {
        setValue(event.target.value);
    }

    const reset = () => {
        setValue(fieldValue);
    } 

    return {
        reset,
        fieldProps: {
            onChange,
            name,
            value,
            type,
        }
    }
}

export { useField };