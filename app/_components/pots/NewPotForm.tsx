"use client";
import { TbCurrencyDollar } from "react-icons/tb";
import Button from "../UI/Button";
import Input from "../UI/Input";
import ThemeInput from "../UI/ThemeInput";
import { FormEvent, useState, useTransition } from "react";
import FormHeader from "../UI/FormHeader";
import FormDescription from "../UI/FormDescription";
import { createNewPot } from "@/app/_actions/pots/createNewPot";
import { MdErrorOutline } from "react-icons/md";

function NewPotForm({
  usedColor,
  close,
}: {
  usedColor: string[];
  close?: () => void;
}) {
  const colorTag = [
    { name: "Green", color: "#277c78" },
    { name: "Yellow", color: "#f2cdac" },
    { name: "Cyan", color: "#82c9d7" },
    { name: "Navy", color: "#626070" },
    { name: "Red", color: "#c94736" },
    { name: "Purple", color: "#826cb0" },
    { name: "Turquoise", color: "#597c7c" },
    { name: "Brown", color: "#93674f" },
    { name: "Magenta", color: "#934f6f" },
    { name: "Blue", color: "#3f82b2" },
    { name: "Navy Grey", color: "#97a0ac" },
    { name: "Army Green", color: "#7f9161" },
    { name: "Pink", color: "#af81ba" },
    { name: "Gold", color: "#cab361" },
    { name: "Orange", color: "#be6c49" },
  ];
  const [color, setColor] = useState(colorTag.at(0));
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<{ name?: string; target?: string }>({});

  function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const potName = formData.get("pot") as string;
    const target = formData.get("target") as string;
    startTransition(async () => {
      const newPot = {
        target,
        potName,
        color: color?.color,
      };

      const result = await createNewPot(newPot);
      if (result.success) close?.();
      if (result.error?.name) setError({ name: result.error.name });
      if (result.error?.target) setError({ target: result.error.target });
      if (result.error?.name && result.error?.target)
        setError({ name: "Can't be empty", target: "Can't be empty" });
    });
  }

  return (
    <>
      {close && <FormHeader close={close}>Add New Pot</FormHeader>}
      <FormDescription>
        Create a pot to set savings targets. These can help keep you on track as
        you save for special purchases.
      </FormDescription>
      <form className="flex flex-col gap-200" onSubmit={handleSubmitForm}>
        <div className="relative">
          <Input name="pot" limit={30}>
            Pot Name
          </Input>
          {error.name && (
            <div className="absolute top-9 right-3 flex items-center gap-50">
              <MdErrorOutline className="fill-red" />
              <p className="text-preset-5 text-red">{error.name}</p>
            </div>
          )}
        </div>
        <div className="relative">
          <Input name="target" icon={<TbCurrencyDollar />}>
            Target
          </Input>
          {error.target && (
            <div className="absolute top-9 right-3 flex items-center gap-50">
              <MdErrorOutline className="fill-red" />
              <p className="text-preset-5 text-red">{error.target}</p>
            </div>
          )}
        </div>
        <ThemeInput
          colorsPicked={usedColor}
          color={color}
          setColor={setColor}
        />
        <Button isPending={isPending}>Add Pot</Button>
      </form>
    </>
  );
}

export default NewPotForm;
