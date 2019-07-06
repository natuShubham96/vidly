import React from 'react';

const Input = ({name, label, value, onChange, type, id, aria, autoFocus}) => {
  return (
    <div className="form-group">
      <label for={name}>{label}</label>
      <input
        autoFocus={autoFocus}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        className="form-control"
        id={id}
        aria-describedby={aria}
      />
    </div>
  );
};

export default Input;
