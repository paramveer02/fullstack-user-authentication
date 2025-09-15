import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const FormRow = ({
  type = "text",
  name,
  labelText,
  defaultValue,
  onChange,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        {labelText || name}
        {rest.required && <span className="ml-1 text-rose-500">*</span>}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={isPassword && showPassword ? "text" : type}
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

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible className="h-5 w-5" />
            ) : (
              <AiOutlineEye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default FormRow;
