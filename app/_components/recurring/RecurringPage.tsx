import { TransactionType } from "@/models/Transaction";
import RecurringBillsContainer from "./RecurringBillsContainer";
import RecurringBillsFilter from "./RecurringBillsFilter";
import SummaryBills from "./SummaryBills";
import TotalBills from "./TotalBills";

type RecurringPageProps = {
  alreadyPaidBills: TransactionType[];
  dueSoonBills: TransactionType[];
  upcomingBills: TransactionType[];
  sortBy: string;
};

function RecurringPage({
  alreadyPaidBills,
  dueSoonBills,
  upcomingBills,
  sortBy,
}: RecurringPageProps) {
  const totalUpcomingBills = Math.abs(
    upcomingBills.reduce((acc, cur) => acc + cur.amount, 0),
  );
  const totalPaidBills = Math.abs(
    alreadyPaidBills.reduce((acc, cur) => acc + cur.amount, 0),
  );
  const totalBills = totalPaidBills + totalUpcomingBills;

  const paidBills = {
    total: Math.abs(alreadyPaidBills.reduce((acc, cur) => acc + cur.amount, 0)),
    numOfBills: alreadyPaidBills.length,
  };

  const dueSoonBillsObj = {
    total: Math.abs(dueSoonBills.reduce((acc, cur) => acc + cur.amount, 0)),
    numOfBills: dueSoonBills.length,
  };

  const upcomingBillsObj = {
    total: totalUpcomingBills,
    numOfBills: upcomingBills.length,
  };

  const sort = (array: TransactionType[], sortBy: string) => {
    let sortedArray;
    if (sortBy === "Latest") {
      sortedArray = array.sort(
        (a, b) => new Date(a.date).getDate() - new Date(b.date).getDate(),
      );
    }
    if (sortBy === "Oldest") {
      sortedArray = array.sort(
        (a, b) => new Date(b.date).getDate() - new Date(a.date).getDate(),
      );
    }
    if (sortBy === "A to Z") {
      sortedArray = array.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortBy === "Z to A") {
      sortedArray = array.sort((a, b) => b.name.localeCompare(a.name));
    }
    if (sortBy === "Highest") {
      sortedArray = array.sort(
        (a, b) => Math.abs(b.amount) - Math.abs(a.amount),
      );
    }
    if (sortBy === "Lowest") {
      sortedArray = array.sort(
        (a, b) => Math.abs(a.amount) - Math.abs(b.amount),
      );
    }

    return sortedArray;
  };

  const allBills = sort([...alreadyPaidBills, ...upcomingBills], sortBy);

  return (
    <div className="space-y-400">
      <h1 className="text-preset-1 text-grey-900 py-100">Recurring Bills</h1>
      <div className="@container flex flex-col gap-300 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2.08fr)]">
        <div className="flex flex-col gap-150 md:grid md:grid-cols-2 md:gap-300 lg:flex">
          <TotalBills totalBills={totalBills} />
          <SummaryBills
            paidBills={paidBills}
            dueSoonBillsObj={dueSoonBillsObj}
            upcomingBillsObj={upcomingBillsObj}
          />
        </div>
        <div className="flex flex-col gap-300 rounded-xl bg-white px-250 py-300">
          <RecurringBillsFilter />
          <div className="flex flex-col gap-250">
            {allBills?.map((bill, i) => (
              <RecurringBillsContainer
                key={bill._id}
                bill={bill}
                index={i}
                numOfBills={allBills.length}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecurringPage;
