import React from 'react';

const Input = ({
  name,
  label,
  value,
  onChange,
  type,
  id,
  aria,
  autoFocus,
  error,
}) => {
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
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
