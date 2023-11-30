import React, { FC, useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";

interface InputProps {
  id: string;
  label?: string;
  name?: string;
  value?: any;
  defaultVal?: string | number;
  error?: string | boolean | undefined;
  touch?: string | boolean | undefined;
  disabled?: boolean | undefined;
  className?: any;
}

interface InputTextProps extends InputProps {
  type?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}
export const Input: FC<InputTextProps> = ({
  id,
  label,
  name,
  type,
  value,
  error,
  onChange,
  onBlur,
  onKeyDown,
  touch,
  disabled,
}) => {
  return (
    <div className="w-full relative cursor-text">
      <input
        className={`peer cursor-text h-10 w-full text-xl px-5 border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-gray-600 rounded-none${
          error && touch ? "input-error" : ""
        }`}
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        onBlur={onBlur}
        disabled={disabled}
        onKeyDown={onKeyDown}
      />
      <label
        htmlFor={id}
        className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
      >
        {label}
      </label>
      {error && touch && (
        <span className="text-sm text-error label-text-alt">{error}</span>
      )}
    </div>
  );
};

export const InputPassword: FC<InputTextProps> = ({
  id,
  label,
  name,
  value,
  error,
  onChange,
  onBlur,
  touch,
  disabled,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  function toggleVisibility() {
    setIsVisible((isVisible) => !isVisible);
  }
  return (
    <div className="w-full relative">
      <input
        className={`peer h-10 w-full text-xl px-5 border-b-2  placeholder-transparent focus:outline-none text-black ${className}  ${
          error && touch ? "input-error" : ""
        }`}
        id={id}
        type={isVisible ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        onBlur={onBlur}
        disabled={disabled}
      />
      <label
        htmlFor={id}
        className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
      >
        {label}
      </label>
      {error && touch && (
        <span className="text-sm text-error label-text-alt">{error}</span>
      )}
      <button
        className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
        onClick={toggleVisibility}
      >
        {isVisible ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
};
