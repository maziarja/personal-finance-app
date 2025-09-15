"use client";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Input from "./Input";
import { TbCurrencyDollar } from "react-icons/tb";
import ThemeInput from "./ThemeInput";
import Button from "./Button";

function TempModal({ colorsPicked }: { colorsPicked: string[] }) {
  return (
    // overlay
    <div className="fixed inset-0 bg-black/50">
      {/* styled modal */}
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-250 rounded-xl bg-white px-250 py-300">
        {/* header */}
        <div className="flex items-center justify-between">
          <p className="text-preset-2 text-grey-900">Add New Pot</p>
          <IoIosCloseCircleOutline className="text-grey-500 h-400 w-400" />
        </div>
        {/* description */}
        <p className="text-preset-4 text-grey-500">
          Create a pot to set savings targets. These can help keep you on track
          as you save for special purchases.
        </p>
        {/* form */}
        <form className="flex flex-col gap-200">
          <Input name="pot" limit={30}>
            Pot Name
          </Input>
          <Input name="target" icon={<TbCurrencyDollar />}>
            Target
          </Input>
          <ThemeInput colorsPicked={colorsPicked} />
          <Button>Add Pot</Button>
        </form>
      </div>
    </div>
  );
}

export default TempModal;
