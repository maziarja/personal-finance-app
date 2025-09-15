import { getPots } from "@/app/_actions/pots/getPots";
import PotsContainer from "@/app/_components/overview/PotsContainer";
import Link from "next/link";
import { IoMdArrowDropright } from "react-icons/io";

async function Page() {
  const pots = await getPots();

  return (
    <div className="flex flex-col gap-250 rounded-xl bg-white px-250 py-300 md:px-400 md:py-400">
      <div className="flex items-center justify-between">
        <p className="text-preset-2 text-grey-900">Pots</p>
        <Link
          href={"/pots"}
          className="flex cursor-pointer items-center gap-150"
        >
          <p className="text-preset-4 text-grey-500">See Details</p>
          <IoMdArrowDropright className="fill-grey-500" />
        </Link>
      </div>
      <PotsContainer pots={pots} />
    </div>
  );
}

export default Page;
