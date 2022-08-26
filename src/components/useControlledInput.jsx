import { useState } from 'react';

export const useControlledInput = () => {
    const [value, setValue] = useState( initialValue );

    const onChange = e => {
        setValue( e.target.value );
    }

    return {
        value,
        onChange
    };
};
