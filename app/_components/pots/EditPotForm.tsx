"use client";
import { FormEvent, useState, useTransition } from "react";
import FormDescription from "../UI/FormDescription";
import FormHeader from "../UI/FormHeader";
import Input from "../UI/Input";
import { MdErrorOutline } from "react-icons/md";
import { TbCurrencyDollar } from "react-icons/tb";
import ThemeInput from "../UI/ThemeInput";
import Button from "../UI/Button";
import { PotType } from "@/models/Pot";
import { updatePot } from "@/app/_actions/pots/updatePot";

type EditPotFormProps = {
  close?: () => void;
  usedColor: string[];
  pot: PotType;
};

function EditPotForm({ close, usedColor, pot }: EditPotFormProps) {
  const [error, setError] = useState<{ name?: string; target?: string }>({});
  const [isPending, startTransition] = useTransition();
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
  const [color, setColor] = useState(
    colorTag.find((cr) => cr.color.toLowerCase() === pot.theme.toLowerCase()),
  );
  const { _id } = pot;
  console.log(color);
  function handleSubmitEditPot(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const currentPot = {
      name: formData.get("pot") as string,
      target: formData.get("target") as string,
      theme: color?.color,
      _id,
    };

    startTransition(async () => {
      const result = await updatePot(currentPot);
      if (result.success) close?.();
      if (result.error?.name) setError({ name: result.error.name });
      if (result.error?.target) setError({ target: result.error.target });
      if (result.error?.name && result.error?.target)
        setError({ name: "Can't be empty", target: "Can't be empty" });
    });
  }

  return (
    <>
      {close && <FormHeader close={close}>Edit Pot</FormHeader>}
      <FormDescription>
        If your saving targets change, feel free to update your pots.
      </FormDescription>
      <form onSubmit={handleSubmitEditPot} className="flex flex-col gap-200">
        <div className="relative">
          <Input name="pot" limit={30} defaultValue={pot.name}>
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
          <Input
            name="target"
            icon={<TbCurrencyDollar />}
            defaultValue={String(pot.target)}
          >
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
        <Button isPending={isPending}>Save Changes</Button>
      </form>
    </>
  );
}

export default EditPotForm;
