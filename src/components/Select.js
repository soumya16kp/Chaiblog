import React, { useId } from "react";
import "./Select.css"
const Select = React.forwardRef(function Select(
  { options = [], label, className = "", ...props },
  ref
) {
  const id = useId(); 

  return (
    <div className="select-container">
      {label && <label htmlFor={id} className="select-label">{label}</label>}
      <select {...props} id={id} ref={ref} className={`select-input ${className}`}>
        {options.length > 0 ? (
          options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))
        ) : (
          <option value="" disabled>
            No options available
          </option>
        )}
      </select>
    </div>
  );
});

export default Select;
