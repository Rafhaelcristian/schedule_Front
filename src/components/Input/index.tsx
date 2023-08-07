import { InputHTMLAttributes, forwardRef, ForwardedRef } from "react";
import { FieldError } from "react-hook-form";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  id: string;
}

export const Input = forwardRef(
  (
    { label, error, ...rest }: IInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div>
        {label ? <label htmlFor={label}>{label}</label> : null}
        <input ref={ref} {...rest} id={label} />
        {error ? <p>{error.message}</p> : null}
      </div>
    );
  }
);
