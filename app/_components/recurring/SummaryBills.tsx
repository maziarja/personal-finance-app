import { formattedNum } from "@/app/_lib/formattedNum";

type SummaryBillsProps = {
  paidBills: { total: number; numOfBills: number };
  upcomingBillsObj: { total: number; numOfBills: number };
  dueSoonBillsObj: { total: number; numOfBills: number };
};

function SummaryBills({
  paidBills,
  upcomingBillsObj,
  dueSoonBillsObj,
}: SummaryBillsProps) {
  return (
    <div className="flex flex-col gap-250 rounded-xl bg-white p-250">
      <p className="text-grey-900 text-preset-3">Summary</p>
      <div className="flex flex-col gap-200">
        <div className="flex items-center justify-between gap-200">
          <p className="text-preset-5 text-grey-500">Paid Bills</p>
          <p className="text-preset-5-bold text-grey-900">
            {`${paidBills.numOfBills} ($${formattedNum(paidBills.total)})`}
          </p>
        </div>
        <hr className="text-grey-500/15" />
        <div className="flex items-center justify-between gap-200">
          <p className="text-preset-5 text-grey-500">Total Upcoming</p>
          <p className="text-preset-5-bold text-grey-900">
            {`${upcomingBillsObj.numOfBills} ($${formattedNum(upcomingBillsObj.total)})`}
          </p>
        </div>
        <hr className="text-grey-500/15" />
        <div className="flex items-center justify-between gap-200">
          <p className="text-preset-5 text-red">Due Soon</p>
          <p className="text-preset-5-bold text-red">
            {" "}
            {`${dueSoonBillsObj.numOfBills} ($${formattedNum(dueSoonBillsObj.total)})`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SummaryBills;
