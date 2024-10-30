import React, { forwardRef } from 'react';

const InputBox = forwardRef(
  (
    {
      type,
      placeholder,
      isError = false,
      moreStyle,
      textMoreStyle,
      value,
      onChange,
      disabled = false,
      defaultValue = '',
      errorMessage = '',
    },
    ref,
  ) => (
    <div
      className={`relative ${moreStyle} flex flex-col items-center justify-start`}
    >
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={`w-full block px-4 py-3 text-md outline-none rounded-lg ${textMoreStyle} ${isError ? 'border-red-500 border-solid border-[2px]' : 'border-pcGray border-solid border-[2px]'}`}
        ref={ref}
        disabled={disabled}
        defaultValue={defaultValue}
      />
      {isError && (
        <span className="absolute top-14 text-center text-red-500 font-bold">
          {errorMessage}
        </span>
      )}
    </div>
  ),
);

export default InputBox;
