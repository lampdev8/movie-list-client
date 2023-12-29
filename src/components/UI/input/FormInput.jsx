import React from 'react';
import cl from './FormInput.module.css';

const FormInput = React.forwardRef((props, ref) => {
    return (
        <input {...props} ref={ref} className={cl.formInput} />
    );
});

export default FormInput;
