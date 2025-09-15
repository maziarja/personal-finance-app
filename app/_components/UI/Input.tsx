import { ReactElement, ReactNode, useState } from "react";

function Input({
  children,
  name,
  limit,
  icon,
  defaultValue,
  placeholder,
}: {
  children: ReactNode;
  name: string;
  limit?: number;
  icon?: ReactElement;
  defaultValue?: string;
  placeholder?: string;
}) {
  const [value, setValue] = useState<string>(defaultValue || "");
  const [char, setChar] = useState(limit);

  return (
    <div className="flex flex-col gap-50">
      <label htmlFor={name} className="text-preset-5-bold text-grey-500">
        {children}
      </label>
      <div className="border-beige-500 flex items-center gap-150 rounded-lg border-1 bg-white px-250 py-150">
        {icon && <p className="text-beige-500">{icon}</p>}
        <input
          placeholder={placeholder ? placeholder : ""}
          className="text-preset-4 text-grey-900 w-full outline-none"
          type="text"
          name={name}
          id={name}
          value={value.slice(0, limit && limit)}
          onChange={(e) => {
            setValue(e.target.value);
            setChar(limit && limit - e.target.value.length);
          }}
        />
      </div>
      {limit && (
        <p className="text-preset-5 text-grey-500 ml-auto">
          {`${char && char <= 0 ? 0 : char} of`} {limit} characters left
        </p>
      )}
    </div>
  );
}

export default Input;
