"use client";

import { FormEvent, useTransition } from "react";
import DeleteForm from "../UI/DeleteForm";
import FormDescription from "../UI/FormDescription";
import FormHeader from "../UI/FormHeader";
import { PotType } from "@/models/Pot";
import { deletePot } from "@/app/_actions/pots/deletePot";

type DeletePotForm = {
  close?: () => void;
  pot: PotType;
};

function DeletePotForm({ close, pot }: DeletePotForm) {
  const [isPending, startTransition] = useTransition();
  function handleDeletePot(e: FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const result = await deletePot(pot._id, pot.financeId);
      if (result.success) close?.();
    });
  }
  return (
    <>
      {close && (
        <FormHeader close={close}>Delete &quot;{pot.name}&quot;?</FormHeader>
      )}
      <FormDescription>
        Are you sure you want to delete this pot? This action cannot be
        reversed, and all the data inside it will be removed forever.
      </FormDescription>
      <form onSubmit={handleDeletePot} className="flex flex-col">
        <DeleteForm close={close} isPending={isPending} />
      </form>
    </>
  );
}

export default DeletePotForm;
