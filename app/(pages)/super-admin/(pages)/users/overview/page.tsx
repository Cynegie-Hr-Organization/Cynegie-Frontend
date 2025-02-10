"use client";

import UsersOverviewTable from "@/app/(pages)/super-admin/(pages)/users/overview/table";
import AppButton from "@/app/_components/shared/button";
import { AppSelect } from "@/app/_components/shared/select";
import { useRouter } from "next/navigation";
import { GoDotFill } from "react-icons/go";
import { BarChartComponent } from "./bar-chart";

const UserManagement = () => {
  const managementCards = [
    {
      color: "#F9FAFB",
      textColor: "#344054",
      title: "Total Users",
      value: "3,000",
      percentage: "+20",
    },
    {
      color: "#F9FAFB",
      textColor: "#344054",
      title: "Active Users",
      value: "2,000",
      percentage: "-4.09",
    },
    {
      color: "#F9FAFB",
      textColor: "#344054",
      title: "Inactive Users",
      value: "1,000",
      percentage: "30",
    },
    {
      color: "#F9FAFB",
      textColor: "#344054",
      title: "Inactive Users",
      value: "1,000",
      percentage: "30",
    },
  ];

  return (
    <div className="space-y-8 py-6">
      <PageHeader
        title="User Management"
        buttonLabel="Manage Permissions"
        buttonLink="/super-admin/users/users-permission/manage"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {managementCards.map((card, index) => (
          <div key={index} className="common-card space-y-4 !p-4">
            <h4 className="text-xs font-semibold text-gray-900">
              {card.title}
            </h4>

            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-bold">{card.value}</p>
              <p className="text-xs">
                <span
                  className={
                    card?.percentage.includes("+")
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {card.percentage}%
                </span>{" "}
                Last Month
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="common-card !p-4 md:px-6 h-[322px]">
        <div className="space-y-4">
          <div className="w-full flex flex-col md:flex-row items-start md:items-center gap-y-4 md:gap-y-0 justify-between">
            <h3 className="text-sm font-semibold text-gray-900">
              User Activity Level
            </h3>

            <div className="flex items-center gap-4">
              <AppSelect
                width="w-[120px]"
                placeholder="This Month"
                listItems={[
                  { label: "This Month", value: "this_month" },
                  { label: "This Year", value: "this_year" },
                  { label: "This Week", value: "this_week" },
                  { label: "This Quarter", value: "this_quarter" },
                ]}
                onChange={(value) => console.log(value)}
              />
              <AppSelect
                width="w-fit space-x-2"
                placeholder="All Departments"
                listItems={[
                  { label: "This Month", value: "this_month" },
                  { label: "This Year", value: "this_year" },
                  { label: "This Week", value: "this_week" },
                  { label: "This Quarter", value: "this_quarter" },
                ]}
                onChange={(value) => console.log(value)}
              />
            </div>
          </div>

          <div className="flex gap-x-2 justify-end">
            <ChartLabel text="Active Users" color="#335DCF" />
            <ChartLabel text="Inactive Users" color="#D0D5DD" />
          </div>
        </div>

        <BarChartComponent chartConfig={{}} chartData={[]} />
      </div>

      <div className="space-y-4">
        <h3 className="text-base font-bold text-gray-900">User List</h3>

        <UsersOverviewTable />
      </div>
    </div>
  );
};

const PageHeader = ({
  title,
  buttonLabel,
  buttonLink,
}: {
  title: string;
  buttonLabel: string;
  buttonLink: string;
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(buttonLink);
  };

  return (
    <div className="flex justify-between items-center gap-x-4 md:gap-x-0">
      <h3 className="text-base font-bold text-gray-900">{title}</h3>

      <div className="hidden md:flex items-center gap-4">
        <AppButton
          label={buttonLabel}
          onClick={handleClick}
          className="btn-primary w-full text-sm text-white"
        />
      </div>
    </div>
  );
};

const ChartLabel = ({ text, color }: { text: string; color: string }) => {
  return (
    <div className="flex items-center justify-center gap-x-4">
      <GoDotFill color={color} />
      {text}
    </div>
  );
};

export default UserManagement;
