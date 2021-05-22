import React, { SyntheticEvent } from 'react';
import { UseFormRegister } from 'react-hook-form/dist/types';
import { FormProps } from '../../../utils/types';

interface InputProps extends FormProps {
  type?: string;
  register?: UseFormRegister<any>;
  onChange?: (e?: SyntheticEvent) => void;
  value?: string;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  label,
  type = 'text',
  errorPrefix = label,
  register,
  name,
  errors,
  customValidation,
  onChange,
  value,
  required = true,
}) => {
  return (
    <div className='form-input-wrapper'>
      {label && (
        <label htmlFor={name}>
          {label} {required && '*'}
        </label>
      )}
      {register ? (
        <>
          <input
            type={type}
            id={name}
            placeholder={placeholder}
            className={`form-input ${errors && errors[name] ? 'is-danger' : ''}`}
            {...register(name, {
              required: `${errorPrefix} is a required.`,
              ...customValidation,
            })}
          />
          {errors && errors[name] && <span className={errors ? 'is-danger' : ''}> {errors[name]?.message}</span>}
        </>
      ) : (
        <input onChange={onChange} value={value} type={type} id={name} placeholder={placeholder} className={'form-input'} />
      )}
    </div>
  );
};

export default Input;
