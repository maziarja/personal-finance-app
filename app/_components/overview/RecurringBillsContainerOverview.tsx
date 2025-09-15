import { getRecurringBills } from "@/app/_actions/recurringBills/getRecurringBills";
import { formattedNum } from "@/app/_lib/formattedNum";

async function RecurringBillsContainerOverview() {
  const { alreadyPaidBills, dueSoonBills, upcomingBills } =
    await getRecurringBills("");

  const totalPaidBills = Math.abs(
    alreadyPaidBills.reduce((acc, cur) => acc + cur.amount, 0),
  );

  const totalDueSoonBills = Math.abs(
    dueSoonBills.reduce((acc, cur) => acc + cur.amount, 0),
  );

  const totalUpcomingBills = Math.abs(
    upcomingBills.reduce((acc, cur) => acc + cur.amount, 0),
  );

  return (
    <div className="flex flex-col gap-150">
      <div className="bg-beige-100 border-green flex items-center justify-between rounded-lg border-l-4 px-200 py-250">
        <p className="text-preset-4 text-grey-500">Paid Bills</p>
        <p className="text-preset-4-bold text-grey-900">
          ${formattedNum(totalPaidBills)}
        </p>
      </div>
      <div className="bg-beige-100 border-yellow flex items-center justify-between rounded-lg border-l-4 px-200 py-250">
        <p className="text-preset-4 text-grey-500">Total Upcoming</p>
        <p className="text-preset-4-bold text-grey-900">
          ${formattedNum(totalUpcomingBills)}
        </p>
      </div>
      <div className="bg-beige-100 border-cyan flex items-center justify-between rounded-lg border-l-4 px-200 py-250">
        <p className="text-preset-4 text-grey-500">Due Soon</p>
        <p className="text-preset-4-bold text-grey-900">
          ${formattedNum(totalDueSoonBills)}
        </p>
      </div>
    </div>
  );
}

export default RecurringBillsContainerOverview;
