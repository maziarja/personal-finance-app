import { CHALLENGE_DATE, DUE_SOON_RANGE } from "@/config/constants";
import { TransactionType } from "@/models/Transaction";
import { format, isAfter, isBefore } from "date-fns";
import Image from "next/image";
import { FaCircleCheck } from "react-icons/fa6";
import { BiSolidErrorCircle } from "react-icons/bi";
import { formattedNum } from "@/app/_lib/formattedNum";

type RecurringBillsContainerProps = {
  bill: TransactionType;
  numOfBills: number;
  index: number;
};

function RecurringBillsContainer({
  bill,
  numOfBills,
  index,
}: RecurringBillsContainerProps) {
  const { amount, avatar, name, date } = bill;
  const billDate = format(date, "do");

  const alreadyPaid = isAfter(
    new Date(
      CHALLENGE_DATE.day,
      CHALLENGE_DATE.hours,
      CHALLENGE_DATE.min,
      CHALLENGE_DATE.sec,
    ),
    new Date(
      new Date(date).getDate(),
      new Date(date).getHours(),
      new Date(date).getMinutes(),
      new Date(date).getSeconds(),
    ),
  );

  const dueSoon =
    isBefore(
      new Date(
        new Date(date).getDate(),
        new Date(date).getHours(),
        new Date(date).getMinutes(),
        new Date(date).getSeconds(),
      ),
      new Date(
        CHALLENGE_DATE.day + DUE_SOON_RANGE,
        CHALLENGE_DATE.hours,
        CHALLENGE_DATE.min,
        CHALLENGE_DATE.sec,
      ),
    ) &&
    isAfter(
      new Date(
        new Date(date).getDate(),
        new Date(date).getHours(),
        new Date(date).getMinutes(),
        new Date(date).getSeconds(),
      ),
      new Date(
        CHALLENGE_DATE.day,
        CHALLENGE_DATE.hours,
        CHALLENGE_DATE.min,
        CHALLENGE_DATE.sec,
      ),
    );
  return (
    <>
      <div className="@container flex flex-col gap-100 rounded-lg md:flex-row md:items-center md:gap-400">
        <div className="flex items-center gap-200 md:flex-1/5 lg:@[422px]:flex-1 lg:@[460px]:flex-1/5">
          <Image
            src={`/${avatar.replace("./", "")}`}
            alt="logo"
            height={32}
            width={32}
            className="h-400 w-400 rounded-full md:h-500 md:w-500"
          />
          <p className="text-preset-4-bold text-grey-900">{name}</p>
        </div>
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-100">
            <p className="text-preset-5 text-green">Monthly - {billDate}</p>
            {alreadyPaid && <FaCircleCheck className="fill-green" />}
            {dueSoon && (
              <BiSolidErrorCircle className="fill-red h-[19px] w-[19px]" />
            )}
          </div>
          <p className="text-preset-4-bold text-grey-900">
            ${formattedNum(Math.abs(amount))}
          </p>
        </div>
      </div>
      {numOfBills > index + 1 && <hr className="text-grey-100" />}
    </>
  );
}

export default RecurringBillsContainer;
