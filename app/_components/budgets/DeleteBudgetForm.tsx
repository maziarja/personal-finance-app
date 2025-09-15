"use client";

import { FormEvent, useTransition } from "react";
import DeleteForm from "../UI/DeleteForm";
import FormDescription from "../UI/FormDescription";
import FormHeader from "../UI/FormHeader";
import { deleteBudget } from "@/app/_actions/budgets/deleteBudget";
import { BudgetType } from "@/models/Budget";

type DeleteBudgetForm = {
  close?: () => void;
  budget: BudgetType;
};

function DeleteBudgetForm({ close, budget }: DeleteBudgetForm) {
  const [isPending, startTransition] = useTransition();
  function handleDeleteBudget(e: FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const result = await deleteBudget(budget._id);
      if (result.success) close?.();
    });
  }
  return (
    <>
      {close && (
        <FormHeader close={close}>
          Delete &quot;{budget.category}&quot;?
        </FormHeader>
      )}
      <FormDescription>
        Are you sure you want to delete this budget? This action cannot be
        reversed, and all the data inside it will be removed forever.
      </FormDescription>
      <form onSubmit={handleDeleteBudget} className="flex flex-col">
        <DeleteForm close={close} isPending={isPending} />
      </form>
    </>
  );
}

export default DeleteBudgetForm;
