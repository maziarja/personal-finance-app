"use client";

import { PotType } from "@/models/Pot";
import FormDescription from "../UI/FormDescription";
import FormHeader from "../UI/FormHeader";
import { TbCurrencyDollar } from "react-icons/tb";
import Button from "../UI/Button";
import { FormEvent, useState, useTransition } from "react";
import { withdrawPot } from "@/app/_actions/pots/withdrawPot";
import { MdErrorOutline } from "react-icons/md";

type WithdrawPotType = {
  close?: () => void;
  pot: PotType;
};

function WithdrawPot({ close, pot }: WithdrawPotType) {
  const [isPending, startTransition] = useTransition();
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [error, setError] = useState("");

  const newAmount = Number(pot.total) - Number(withdrawAmount);
  function handleSubmitWithdrawal(e: FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const potNewWithdraw = {
        potId: pot._id,
        withdrawAmount: +withdrawAmount,
        total: pot.total,
        financeId: pot.financeId,
      };
      const result = await withdrawPot(potNewWithdraw);
      if (result.success) close?.();
      if (result.error) setError(result.error);
    });
  }
  return (
    <>
      {close && (
        <FormHeader close={close}>
          Withdraw from &apos;{pot.name}&apos;
        </FormHeader>
      )}
      <FormDescription>
        Withdraw from your pot to put money back in your main balance. This will
        reduce the amount you have in this pot.
      </FormDescription>
      <div className="flex flex-col gap-200">
        <div className="flex items-center justify-between">
          <p className="text-preset-4 text-grey-500">New Amount</p>
          <p className="text-grey-900 text-preset-1">${newAmount.toFixed(2)}</p>
        </div>
        <div className="flex flex-col gap-150">
          <div className="bg-beige-100 flex h-100 gap-[2px] rounded-sm">
            <div
              style={{
                width: `${(newAmount / pot.target) * 100}% `,
              }}
              className="bg-grey-900 h-full rounded-l-full transition-all duration-200"
            ></div>
            <div
              style={{
                width: `${(+withdrawAmount / pot.target) * 100}%`,
              }}
              className="bg-red h-full rounded-r-full transition-all duration-200"
            ></div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-preset-5-bold text-red">
              {((newAmount / pot.target) * 100).toFixed(2)}%
            </p>
            <p className="text-preset-5 text-grey-500">
              Target of ${pot.target.toLocaleString()}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmitWithdrawal}
          className="flex flex-col gap-250"
        >
          <div className="flex flex-col gap-50">
            <label
              htmlFor="amount"
              className="text-preset-5-bold text-grey-500"
            >
              Amount to Withdraw
            </label>
            <div className="border-beige-500 flex items-center gap-150 rounded-lg border-1 bg-white px-250 py-150">
              <p className="text-beige-500">{<TbCurrencyDollar />}</p>
              <input
                className="text-preset-4 text-grey-900 w-full outline-none"
                type="number"
                min={0}
                max={+pot.total}
                name={"amount"}
                id={"amount"}
                value={withdrawAmount}
                onChange={(e) => {
                  if (+e.target.value < 0 || +e.target.value > pot.total)
                    return;
                  setWithdrawAmount(e.target.value);
                }}
              />
              {error && (
                <div className="text-preset-5 text-red flex w-full items-center gap-50">
                  <MdErrorOutline className="fill-red ml-auto" />
                  <p>{error}</p>
                </div>
              )}
            </div>
          </div>
          <Button isPending={isPending}>Confirm Withdrawal</Button>
        </form>
      </div>
    </>
  );
}

export default WithdrawPot;
