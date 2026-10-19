import { twMerge } from "tailwind-merge";
import { MdKeyboardArrowDown } from "react-icons/md";

const Select = ({
  label,
  labelClassName = "",
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  disabled = false,
  required = false,
  error,
  icon: Icon,
  iconClassName = "text-gray-500",
  className = "",
  selectClassName = "",
}) => {
  return (
    <div className={twMerge("w-full", className)}>
      {label && (
        <label
          htmlFor={name}
          className={twMerge(
            "mb-2 block text-sm font-medium text-gray-700",
            labelClassName
          )}
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon
            className={twMerge(
              "absolute left-3 top-1/2 z-10 -translate-y-1/2 text-xl",
              iconClassName
            )}
          />
        )}

        <select
          id={name}
          name={name}
          value={value ?? ""}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={twMerge(
            "w-full appearance-none rounded-lg border bg-white py-2.5 pl-4 pr-10 text-sm text-gray-900 outline-none transition focus:border-[#ac1e44] cursor-pointer disabled:pointer-events-none",
            Icon && "pl-10",
            error
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300",
            disabled && "cursor-not-allowed bg-gray-100 text-gray-500",
            selectClassName
          )}
        >
          <option value="" disabled>
            {placeholder}
          </option>

          {options.map((option) => (
            <option
              className="cursor-pointer"
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        <MdKeyboardArrowDown
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-2xl text-gray-500"
        />
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Select;