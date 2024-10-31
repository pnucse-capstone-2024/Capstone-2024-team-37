import React from 'react';

function TextButton({
  handleClick,
  color,
  children,
  moreStyle,
  disabled = false,
}) {
  if (color === 'light')
    return (
      <button
        type="button"
        onClick={() => {
          handleClick();
        }}
        disabled={disabled}
      >
        <div
          className={`  text-md rounded-2xl border-pcDarkGray border-solid border-[1px] text-pcLightBlack text-center ${moreStyle} font-bold ${disabled ? 'bg-pcDisabledLightGray' : 'bg-pcLightGray hover:bg-pcGray'}`}
        >
          {children}
        </div>
      </button>
    );
  if (color === 'dark')
    return (
      <button
        type="button"
        onClick={() => {
          handleClick();
        }}
        disabled={disabled}
      >
        <div
          className={`bg-pcLightBlack text-md rounded-lg text-white text-center ${moreStyle}`}
        >
          {children}
        </div>
      </button>
    );
}

export default TextButton;
