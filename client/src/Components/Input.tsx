import React, {
  Dispatch,
  HTMLInputTypeAttribute,
  ReactElement,
  SetStateAction,
} from "react";

interface Props {
  label?: boolean;
  title: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeHolder?: boolean;
  type: HTMLInputTypeAttribute;
  id: string;
  required?: boolean;
}

export default function Input({
  label,
  placeHolder,
  setValue,
  title,
  type,
  value,
  id,
  required,
}: Props): ReactElement {
  return (
    <>
      {label ? (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {title}
        </label>
      ) : (
        ""
      )}
      <div className={label ? "mt-1" : ""}>
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          placeholder={placeHolder ? title : ""}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </>
  );
}
