import React from 'react';
import cl from './SuccessButton.module.css';

const SuccessButton = ({children, ...props}) => {
    return (
        <button {...props} className={cl.successBtn}>
            {children}
        </button>
    );
}

export default SuccessButton;
