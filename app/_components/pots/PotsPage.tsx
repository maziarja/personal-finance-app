"use client";
import PotContainer from "./PotContainer";
import Modal from "../UI/Modal";
import { PotType } from "@/models/Pot";
import NewPotForm from "./NewPotForm";

function PotsPage({ pots }: { pots: PotType[] }) {
  const usedColor = pots.map((p) => p.theme);

  return (
    <div className="py-100">
      <Modal>
        <div className="mb-400 flex items-center justify-between">
          <h1 className="text-preset-1 text-grey-900">Pots</h1>
          <Modal.Open open="add-pot">
            <button className="bg-grey-900 text-preset-4-bold hover:bg-grey-500 flex cursor-pointer gap-200 rounded-lg p-200 text-white">
              + Add New Pot
            </button>
          </Modal.Open>
        </div>
        <div className="flex flex-col gap-300 overflow-y-scroll lg:grid lg:grid-cols-2">
          {pots.map((pot) => (
            <PotContainer key={pot._id} pot={pot} usedColor={usedColor} />
          ))}
        </div>

        <Modal.Window name="add-pot">
          <NewPotForm usedColor={usedColor} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default PotsPage;
