"use client";
import { MdHomeFilled } from "react-icons/md";
import { PiArrowsDownUpBold } from "react-icons/pi";
import { PiChartDonutFill } from "react-icons/pi";
import PotsIcon from "./UI/PotsIcon";
import RecurringIcon from "./UI/RecurringIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logoLarge from "@/public/assets/images/logo-large.svg";
import Image from "next/image";
import { TbArrowBigLeftLinesFilled } from "react-icons/tb";
import { useModal } from "../_contexts/modalContext";
import { FiLogOut } from "react-icons/fi";
import { signOutAction } from "../_actions/auth/signOut";

function Sidebar() {
  const pathname = usePathname();
  const { modal, toggleModal } = useModal();
  const navs = [
    {
      url: "/overview",
      icon: <MdHomeFilled className="h-300 w-300 fill-inherit" />,
      name: "Overview",
    },
    {
      url: "/transactions",
      icon: <PiArrowsDownUpBold className="h-300 w-300 fill-inherit" />,
      name: "Transactions",
    },
    {
      url: "/budgets",
      icon: <PiChartDonutFill className="h-300 w-300 fill-inherit" />,
      name: "Budgets",
    },
    {
      url: "/pots",
      icon: <PotsIcon className="h-300 w-300 fill-inherit" />,
      name: "Pots",
    },
    {
      url: "/recurring-bills",
      icon: <RecurringIcon className="h-300 w-300 fill-inherit" />,
      name: "Recurring bills",
    },
  ];
  return (
    <div
      className={`bg-grey-900 relative top-0 left-0 mt-auto flex items-center justify-around rounded-t-lg px-200 pt-100 lg:fixed lg:row-start-1 lg:h-full lg:flex-col lg:items-start lg:justify-start lg:gap-50 lg:rounded-t-none lg:rounded-r-lg lg:px-0 lg:pb-300 lg:duration-200 lg:ease-in-out $${modal.sidebar ? "translate-x-0 lg:h-full lg:w-[300px] lg:opacity-100" : "-translate-x-full overflow-hidden lg:h-0 lg:w-0 lg:opacity-0"}`}
    >
      <div className="hidden w-full gap-100 px-400 py-500 lg:flex">
        <Image src={logoLarge} alt="logo" width={0} height={0} />
        <form action={signOutAction} className="ml-auto hidden lg:block">
          <button className="flex cursor-pointer items-center gap-200">
            <FiLogOut className="text-grey-300 h-300 w-300" />
          </button>
        </form>
      </div>
      {navs.map((nav) => (
        <Link
          key={nav.url}
          href={nav.url}
          className={`flex flex-1 items-center justify-center gap-100 rounded-t-lg pt-100 pb-150 lg:w-[92%] lg:flex-0 lg:justify-start lg:gap-50 lg:rounded-t-none lg:rounded-r-lg lg:pt-0 lg:pb-0 ${nav.url === pathname ? "bg-beige-100" : ""} ${nav.url === pathname ? "border-green border-b-4 lg:border-b-0 lg:border-l-4" : ""}`}
        >
          <button
            className={`${nav.url === pathname ? "fill-green" : "fill-grey-300"} flex flex-col items-center gap-50 lg:flex-row lg:gap-200 lg:px-400 lg:py-200`}
          >
            {nav.icon}
            <span
              className={`${nav.url === pathname ? "text-grey-900" : "text-grey-300"} text-preset-5-bold hidden md:block lg:text-[16px]`}
            >
              {nav.name}
            </span>
          </button>
        </Link>
      ))}
      <button
        onClick={() => toggleModal("sidebar", false)}
        className={`mt-auto mb-32.5 hidden cursor-pointer items-center gap-200 px-400 py-200 transition-all duration-200 lg:flex ${modal.sidebar ? "opacity-100" : "-translate-x-1/4 opacity-0"}`}
      >
        <TbArrowBigLeftLinesFilled className={`fill-grey-300 h-300 w-300`} />
        <span className="text-preset-3 text-grey-300">Minimize Menu</span>
      </button>
    </div>
  );
}

export default Sidebar;
