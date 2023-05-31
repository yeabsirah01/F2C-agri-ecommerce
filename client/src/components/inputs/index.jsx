import { useField } from "formik";
import "./styles.css";

const TextInput = ({ label, size = 12, ...inputProps }) => {
  const { value, onChange, onBlur, ...rest } = inputProps;
  const [field, meta] = useField(rest);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    if (rest.type === "number" && parseFloat(inputValue) < 0) {
      onChange({ target: { value: "0", name: rest.name } }); // Set the value to '0' if negative
    } else {
      onChange(e);
    }
  };

  return (
    <div className="inputt" style={{ gridColumn: `span ${size}` }}>
      <label>{label}</label>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onBlur={onBlur}
        {...field}
        {...rest}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const TextAreaInput = ({ label, size = 12, ...inputProps }) => {
  const [field, meta] = useField(inputProps);
  return (
    <div className="input" style={{ gridColumn: `span ${size}` }}>
      <label>{label}</label>
      <textarea type="text" {...field} {...inputProps} rows={7} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const SelectInput = ({
  label,
  options,
  size = 12,
  placeholder = "select",
  ...inputProps
}) => {
  const [field, meta] = useField(inputProps);
  return (
    <div className="input" style={{ gridColumn: `span ${size}` }}>
      <label>{label}</label>
      <select {...field}>
        <option value="select">{placeholder}</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export { TextInput, SelectInput, TextAreaInput };
