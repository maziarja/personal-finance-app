"use client";

import { PotType } from "@/models/Pot";
import FormDescription from "../UI/FormDescription";
import FormHeader from "../UI/FormHeader";
import { FormEvent, useState, useTransition } from "react";
import { TbCurrencyDollar } from "react-icons/tb";
import Button from "../UI/Button";
import { addMoneyPot } from "@/app/_actions/pots/addMoneyPot";
import { MdErrorOutline } from "react-icons/md";

type AddMoneyPotType = {
  pot: PotType;
  close?: () => void;
};

function AddMoneyPot({ pot, close }: AddMoneyPotType) {
  const [isPending, startTransition] = useTransition();
  const [addMoneyAmount, setAddMoneyAmount] = useState("");
  const newAmount = Number(pot.total) + Number(addMoneyAmount);
  const [error, setError] = useState("");

  function handleSubmitAddMoney(e: FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const potNewAddMoney = {
        potId: pot._id,
        addMoneyAmount: +addMoneyAmount,
        total: pot.total,
        financeId: pot.financeId,
        target: pot.target,
      };
      const result = await addMoneyPot(potNewAddMoney);
      if (result.success) close?.();
      if (result.error) setError(result.error);
    });
  }

  return (
    <>
      {close && (
        <FormHeader close={close}>Add to &apos;{pot.name}&apos;</FormHeader>
      )}
      <FormDescription>
        Add money to your pot to keep it separate from your main balance. As
        soon as you add this money, it will be deducted from your current
        balance.
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
                width: `${(pot.total / pot.target) * 100}% `,
              }}
              className="bg-grey-900 h-full rounded-l-full transition-all duration-200"
            ></div>
            <div
              style={{
                width: `${(+addMoneyAmount / pot.target) * 100}%`,
              }}
              className="bg-green h-full rounded-r-full transition-all duration-200"
            ></div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-preset-5-bold text-green">
              {((newAmount / pot.target) * 100).toFixed(2)}%
            </p>
            <p className="text-preset-5 text-grey-500">
              Target of ${pot.target.toLocaleString()}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmitAddMoney} className="flex flex-col gap-250">
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
                max={+pot.target}
                name={"amount"}
                id={"amount"}
                value={addMoneyAmount}
                onChange={(e) => {
                  if (+e.target.value < 0) return;
                  if (+e.target.value + pot.total > pot.target) {
                    setAddMoneyAmount(String(pot.target - pot.total));
                  } else {
                    setAddMoneyAmount(e.target.value);
                  }
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
          <Button isPending={isPending}>Confirm Addition</Button>
        </form>
      </div>
    </>
  );
}

export default AddMoneyPot;
