"use client";

import UsersPermissionTable from "@/app/(pages)/super-admin/(pages)/users/users-permission/table";
import AppButton from "@/app/_components/shared/button";
import { AppDropdownMenu } from "@/app/_components/shared/dropdown-menu";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { IoIosArrowDown } from "react-icons/io";

const UserPermission = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="space-y-8 py-6">
        <PageHeader
          title="User Permission"
          description="Grant permissions to users in your organization"
          buttonLabel="Grant Permissions"
          buttonLink="/super-admin/users/users-permission/manage"
        />

        <UsersPermissionTable />
      </div>
    </Suspense>
  );
};

const PageHeader = ({
  title,
  description,
  buttonLabel,
  buttonLink,
}: {
  title: string;
  description: string;
  buttonLabel: string;
  buttonLink: string;
}) => {
  const router = useRouter();

  const handleGrantPermission = () => {
    router.push(buttonLink);
  };

  return (
    <div className="flex justify-between items-center gap-x-4 md:gap-x-0">
      <div className="">
        <h1 className="text-base font-bold text-gray-900">{title}</h1>
        <p className="md:text-xs text-gray-500">{description}</p>
      </div>

      <div className="hidden md:flex items-center gap-4">
        <AppButton
          onClick={handleGrantPermission}
          label={buttonLabel}
          className=" btn-primary w-full text-sm text-white"
        />
      </div>
      <AppDropdownMenu
        width="w-[190px]"
        trigger={
          <button
            type="button"
            className="text-gray-500 font-semibold flex gap-2 items-center border rounded-lg px-4 py-2 md:hidden"
          >
            Action <IoIosArrowDown size={24} />
          </button>
        }
        menuItems={
          <div>
            <button className="hover:bg-gray-100 px-4 py-2 w-full text-left text-sm">
              Approve All
            </button>
            <button className="hover:bg-gray-100 px-4 py-2 w-full text-left text-sm">
              Reject All
            </button>
            <button className="hover:bg-gray-100 px-4 py-2 w-full text-left text-sm">
              View Details
            </button>
          </div>
        }
      />
    </div>
  );
};

export default UserPermission;
