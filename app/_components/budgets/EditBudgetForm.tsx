"use client";

import { FormEvent, useState, useTransition } from "react";
import FormDescription from "../UI/FormDescription";
import FormHeader from "../UI/FormHeader";
import Input from "../UI/Input";
import ThemeInput from "../UI/ThemeInput";
import { MdErrorOutline } from "react-icons/md";
import Button from "../UI/Button";
import BudgetCategoryInput from "./BudgetCategoryInput";
import { TransactionType } from "@/models/Transaction";
import { TbCurrencyDollar } from "react-icons/tb";
import { BudgetType } from "@/models/Budget";
import { updateBudget } from "@/app/_actions/budgets/updateBudget";

type Category = TransactionType["category"];

type EditBudgetFormProps = {
  budget: BudgetType;
  usedColor: string[];
  close?: () => void;
  usedCategories: Category[];
};

function EditBudgetForm({
  close,
  usedColor,
  budget,
  usedCategories,
}: EditBudgetFormProps) {
  const [error, setError] = useState<{
    maximum?: string;
    category?: string;
    theme?: string;
  }>({});

  const [isPending, startTransition] = useTransition();
  const [category, setCategory] = useState<Category>(budget.category);

  const isUsedCategory = usedCategories.some(
    (cat) => cat === category && category !== budget.category,
  );

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
    colorTag.find(
      (cr) => cr.color.toLowerCase() === budget.theme.toLowerCase(),
    ),
  );

  const isUsedColor = usedColor.some(
    (cr) =>
      cr.toLowerCase() === color?.color.toLowerCase() &&
      color.color.toLowerCase() !== budget.theme.toLowerCase(),
  );

  function handleSubmitUpdateBudget(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const maximumSpend = formData.get("maximumSpend") as string;
    const updatedBudget = {
      maximum: maximumSpend,
      theme: color?.color,
      category,
      id: budget._id,
    };

    startTransition(async () => {
      if (isUsedCategory)
        return setError({ category: "This category was used" });
      if (isUsedColor) return setError({ theme: "This theme was used" });
      const result = await updateBudget(updatedBudget);
      if (result.error) setError(result.error);
      if (result.success) close?.();
    });
  }

  return (
    <>
      {close && <FormHeader close={close}>Edit Budget</FormHeader>}
      <FormDescription>
        As your budgets change, feel free to update your spending limits.
      </FormDescription>
      <form
        onSubmit={handleSubmitUpdateBudget}
        className="flex flex-col gap-200"
      >
        <div className="relative space-y-50">
          <BudgetCategoryInput
            category={category}
            setCategory={setCategory}
            usedCategories={usedCategories}
          />
          {error.category && (
            <div className="flex items-center gap-50">
              <MdErrorOutline className="fill-red" />
              <p className="text-preset-5 text-red">{error.category}</p>
            </div>
          )}
        </div>
        <div className="relative">
          <Input
            defaultValue={String(budget.maximum)}
            name="maximumSpend"
            placeholder="e.g. 2000"
            icon={<TbCurrencyDollar />}
          >
            Maximum Spend
          </Input>
          {error.maximum && (
            <div className="absolute top-9 right-3 flex items-center gap-50">
              <MdErrorOutline className="fill-red" />
              <p className="text-preset-5 text-red">{error.maximum}</p>
            </div>
          )}
        </div>
        <div className="relative space-y-50">
          <ThemeInput
            color={color}
            setColor={setColor}
            colorsPicked={usedColor}
          />
          {error.theme && (
            <div className="flex items-center gap-50">
              <MdErrorOutline className="fill-red" />
              <p className="text-preset-5 text-red">{error.theme}</p>
            </div>
          )}
        </div>
        <Button isPending={isPending}>Save Changes</Button>
      </form>
    </>
  );
}

export default EditBudgetForm;
