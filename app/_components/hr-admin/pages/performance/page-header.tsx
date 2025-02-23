"use client";

import { useRouter } from "next/navigation";
import AppButton from "@/app/_components/shared/button";

export const PageHeader = ({
  title,
  description,
  buttonLabel,
  to,
}: {
  title: string;
  description: string;
  buttonLabel: string;
  to: string;
}) => {
  const router = useRouter();
  const handleClick = () => router.push(to);

  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-lg font-bold text-black">{title}</h3>
        <p className="text-xs text-gray-500">{description}</p>
      </div>

      <AppButton
        onClick={handleClick}
        label={buttonLabel}
        className="btn-primary w-full"
      />
    </div>
  );
};
