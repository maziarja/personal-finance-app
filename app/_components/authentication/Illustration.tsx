import logoLarge from "@/public/assets/images/logo-large.svg";
import Image from "next/image";
function Illustration() {
  return (
    <div className="m-250 hidden max-w-140 rounded-xl bg-[url('/assets/images/illustration-authentication.svg')] bg-cover bg-center bg-no-repeat p-500 lg:flex lg:flex-col">
      <Image src={logoLarge} width={0} height={0} alt="Logo" />
      <div className="mt-auto flex w-[90%] flex-col gap-200">
        <p className="text-preset-1 text-white">
          Keep track of your money and save for your future
        </p>
        <p className="text-preset-4 text-white">
          Personal finance app puts you in control of your spending. Track
          transactions, set budgets, and add to savings pots easily.
        </p>
      </div>
    </div>
  );
}

export default Illustration;
