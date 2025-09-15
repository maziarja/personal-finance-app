import { PotType } from "@/models/Pot";
import PotIconOverviewPage from "../UI/PotIconOverviewPage";
import { POT_LIMIT_FOR_OVERVIEW } from "@/config/constants";

type PotsContainerProps = {
  pots: PotType[];
};

function PotsContainer({ pots }: PotsContainerProps) {
  const totalSaved = pots.reduce((acc, cur) => acc + cur.total, 0);
  return (
    <div className="flex flex-col gap-250 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
      <div className="bg-beige-100 flex items-center gap-200 rounded-xl p-200">
        <PotIconOverviewPage />
        <div className="flex flex-col gap-[11px]">
          <p className="text-preset-4 text-grey-500">Total Saved</p>
          <p className="text-preset-1 text-grey-900">${totalSaved}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-200">
        {pots.slice(-POT_LIMIT_FOR_OVERVIEW).map((pot) => (
          <div key={pot._id} className="flex items-center gap-200">
            <div
              style={{
                backgroundColor: pot.theme,
              }}
              className="h-full w-50 rounded-lg"
            ></div>
            <div className="flex flex-col gap-50">
              <p className="text-preset-5 text-grey-500">{pot.name}</p>
              <p className="text-preset-4-bold text-grey-900">${pot.total}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PotsContainer;
