import React from "react";
import "./Input.sass";

export interface InputProps {
  value: string;
  placeholder: string;
  handleChange: (value: string) => void;
  maxLength?: number;
}

const Input = ({ value, placeholder, handleChange, maxLength }: InputProps) => {
  return (
    <div className="input">
      <input
        className="input-field"
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
        maxLength={maxLength}
      />
      <span className="input-reset" onClick={() => handleChange("")}>
        &nbsp;
      </span>
    </div>
  );
};

export default Input;
