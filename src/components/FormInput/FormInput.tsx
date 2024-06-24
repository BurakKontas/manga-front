import React from 'react';
import { FormInputProps } from './FormInput.types';

import styles from './FormInput.module.scss';

const FormInput: React.FC<FormInputProps> = ({ onChange, value, title, type="text", disabled = false, 
  containerClassName = '', inputClassName = "", titleClassName = '',
  titleStyle={}, containerStyle={}, inputStyle={} }) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target);
  };

  return (
      <div style={containerStyle} className={`${styles.container} ${containerClassName}`}>
      <div className={`${styles.title} ${titleClassName}`} style={titleStyle}>{title}</div>
      <input
        type={type}
        className={`${inputClassName} ${styles.input}`}
        style={inputStyle}
        disabled={disabled}
        value={value || ''}
        onChange={handleChange}
      ></input>
      </div>
  );
}

export default FormInput;
