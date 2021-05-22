import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { FormProps } from '../../../utils/types';

interface TextareaProps extends FormProps {
  register: UseFormRegister<any>;
}

const Textarea: React.FC<TextareaProps> = ({ placeholder, label, errorPrefix = label, register, name, errors, customValidation }) => {
  return (
    <div className='form-input-wrapper'>
      <label htmlFor={name}>{label} *</label>
      <textarea
        id={name}
        rows={5}
        placeholder={placeholder}
        className={`form-input ${errors && errors[name] ? 'is-danger' : ''}`}
        {...register(name, {
          required: `${errorPrefix} is a required.`,
          ...customValidation,
        })}
      ></textarea>
      {errors && errors[name] && <span className={errors ? 'is-danger' : ''}> {errors[name]?.message}</span>}
    </div>
  );
};

export default Textarea;
