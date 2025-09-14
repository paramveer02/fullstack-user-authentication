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
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        {labelText || name}
        {rest.required && <span className="ml-1 text-rose-500">*</span>}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        onChange={onChange}
        className="
          block w-full rounded-lg
          border border-slate-300
          bg-slate-50
          px-3 py-2.5 text-slate-900
          placeholder-slate-400
          shadow-sm outline-none
          focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
          transition
        "
        {...rest}
      />
    </div>
  );
};

export default FormRow;
