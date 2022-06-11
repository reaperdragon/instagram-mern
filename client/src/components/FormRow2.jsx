import React from "react";

const FormRow2 = ({ type, name, value, handleChange, placeholder }) => {
  return (
    <textarea
      type={type}
      value={value}
      name={name}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

export default FormRow2;
