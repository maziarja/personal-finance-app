"use client";
import { PotType } from "@/models/Pot";
import { useEffect, useState } from "react";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";
import DropdownMenu from "../UI/DropdownMenu";
import { useOutsideClick } from "@/app/_hooks/useOutsideClick";
import Modal from "../UI/Modal";
import EditPotForm from "./EditPotForm";
import DeletePotForm from "./DeletePotForm";
import AddMoneyPot from "./AddMoneyPot";
import WithdrawPot from "./WithdrawPot ";
import { formattedNum } from "@/app/_lib/formattedNum";

type PotContainerProps = {
  pot: PotType;
  usedColor: string[];
};

function PotContainer({ pot, usedColor }: PotContainerProps) {
  const { name, total, target, theme } = pot;
  const totalPerPercent = (total / target) * 100;
  const [totalProgress, setTotalProgress] = useState(0);
  const ref = useOutsideClick(() => setPotDropdownMenu(false));
  const [potDropdownMenu, setPotDropdownMenu] = useState(false);
  useEffect(() => {
    setTotalProgress(totalPerPercent);
  }, [totalPerPercent]);

  return (
    <div className="relative flex flex-col gap-400 rounded-xl bg-white px-250 py-300">
      <Modal>
        {potDropdownMenu && (
          <div ref={ref} className="absolute top-15 right-5">
            <DropdownMenu
              items={[
                {
                  label: "Edit Pot",
                  onClick: () => setPotDropdownMenu(false),
                  open: "edit-pot",
                },
                {
                  label: "Delete Pot",
                  onClick: () => setPotDropdownMenu(false),
                  variant: "danger",
                  open: "delete-pot",
                },
              ]}
            />
          </div>
        )}
        <Modal.Window name="edit-pot">
          <EditPotForm usedColor={usedColor} pot={pot} />
        </Modal.Window>
        <Modal.Window name="delete-pot">
          <DeletePotForm pot={pot} />
        </Modal.Window>
        <Modal.Window name="withdraw-pot">
          <WithdrawPot pot={pot} />
        </Modal.Window>
        <Modal.Window name="addMoney-pot">
          <AddMoneyPot pot={pot} />
        </Modal.Window>

        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-200">
            <div
              style={{ backgroundColor: theme }}
              className="h-200 w-200 rounded-full"
            ></div>
            <div className="text-preset-2 text-grey-900">{name}</div>
          </div>
          <IoEllipsisHorizontalOutline
            role="button"
            onClick={() => setPotDropdownMenu(true)}
            className="text-grey-300 cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-200">
          <div className="flex items-center justify-between">
            <p className="text-preset-4 text-grey-500">Total Saved</p>
            <p className="text-preset-1 text-grey-900">
              ${formattedNum(total)}
            </p>
          </div>
          <div className="flex flex-col gap-150">
            <div className="bg-beige-100 h-100 rounded-sm">
              <div
                style={{ width: `${totalProgress}%`, backgroundColor: theme }}
                className={`h-full rounded-sm transition-all duration-1000 ease-out`}
              ></div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-preset-5-bold text-grey-500">
                {formattedNum(totalPerPercent)}
              </p>
              <p className="text-preset-5 text-grey-500">
                Target of ${target.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-200">
          <Modal.Open open="addMoney-pot">
            <button className="bg-beige-100 text-preset-4-bold text-grey-900 hover:ring-beige-500 flex w-full cursor-pointer justify-center gap-200 rounded-lg p-200 hover:bg-white hover:ring-1">
              + Add Money
            </button>
          </Modal.Open>

          <Modal.Open open="withdraw-pot">
            <button className="bg-beige-100 text-preset-4-bold text-grey-900 hover:ring-beige-500 flex w-full cursor-pointer justify-center gap-200 rounded-lg p-200 hover:bg-white hover:ring-1">
              Withdraw
            </button>
          </Modal.Open>
        </div>
      </Modal>
    </div>
  );
}

export default PotContainer;
