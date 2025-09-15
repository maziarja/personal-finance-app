import { ReactNode } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

function FormHeader({
  children,
  close,
}: {
  children: ReactNode;
  close: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-preset-2 text-grey-900">{children}</p>
      <IoIosCloseCircleOutline
        onClick={close}
        className="text-grey-500 h-400 w-400 cursor-pointer"
      />
    </div>
  );
}

export default FormHeader;
