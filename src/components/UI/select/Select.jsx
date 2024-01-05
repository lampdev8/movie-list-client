import React from 'react';
import classes from './Select.module.css';

const Select = ({options, value, onChange, defaultValue = null}) => {
    return (
        <select
            value={value}
            onChange={event => onChange(event.target.value)}
            className={classes.select}
        >
            {defaultValue && <option
                    value=""
                >
                    {defaultValue}
                </option>
            }
            {options.map((option) =>
                <option
                    key={option.value}
                    value={option.value}
                >
                    {option.name}
                </option>
            )}
        </select>
    );
}

export default Select;
