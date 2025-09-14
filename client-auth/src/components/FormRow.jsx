const FormRow = ({
  type = "text",
  name,
  labelText,
  defaultValue,
  onChange,
  ...rest
}) => {
  return (
    <div>
      <label htmlFor={name}>{labelText || name}</label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};
export default FormRow;
