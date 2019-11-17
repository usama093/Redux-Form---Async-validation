import React from "react";

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, asyncValidating }
}) => (
  <div className="form-group">
    <label>{label}</label>
    <div className={asyncValidating ? "async-validating" : undefined}>
      <input
        {...input}
        type={type}
        className="form-control form-control-lg rounded-0"
      />
      {touched &&
        (error && <span className="text-danger">{`${label} ${error}`}</span>)}
    </div>
  </div>
);

export default renderField;
