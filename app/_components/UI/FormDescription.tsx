import { ReactNode } from "react";

function FormDescription({ children }: { children: ReactNode }) {
  return <p className="text-preset-4 text-grey-500">{children}</p>;
}

export default FormDescription;
