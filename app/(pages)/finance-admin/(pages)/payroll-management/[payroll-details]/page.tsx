"use client";

import { useRouter } from "next/navigation";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import { PiMoney } from "react-icons/pi";
import DetailsTable from "./details-table";

const PayrollDetails = () => {
  const router = useRouter();

  const pageCards = [
    {
      icon: <HiOutlineUserGroup />,
      color: "#EADAFF",
      textColor: "#344054",
      title: "Total Employees",
      value: "50",
    },
    {
      icon: <PiMoney />,
      color: "#FFF5E6",
      textColor: "#FFAD33",
      title: "Total Gross Pay",
      value: "₦34,886,000",
    },
    {
      icon: <PiMoney />,
      color: "#E7F6EC",
      textColor: "#0F973D",
      title: "Total Net Pay",
      value: "₦34,886,000",
    },
  ];

  return (
    <div className="space-y-6">
      <button onClick={() => router.back()} className="flex items-center gap-2">
        <IoIosArrowBack size={24} /> Back to Payroll Management
      </button>

      <div className="space-y-6">
        <h3 className="text-2xl font-bold">Payroll Details</h3>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-4 bg-white rounded-lg border-none p-5 justify-between">
          <PayrollDetailInfo
            label="Payroll Name"
            value="Finance Sept 2024 Payroll"
          />
          <PayrollDetailInfo
            label="Payroll Period"
            value="Sept 1, 2024 - Sept 30, 2024"
          />
          <PayrollDetailInfo label="Payment Date" value="Sept 30, 2024" />
          <PayrollDetailInfo label="Approval Date" value="..." />
          <PayrollDetailInfo label="Approval Status" status="approved" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pageCards.map((card, index) => (
            <div className="common-card space-y-5" key={index}>
              <div className="flex items-center gap-2">
                <div
                  className="rounded-full p-2"
                  style={{ backgroundColor: card.color, color: card.textColor }}
                >
                  {card.icon}
                </div>
                <h3 className="font-roboto lg:text-xs text-sm text-[#848897] font-medium">
                  {card.title}
                </h3>
              </div>
              <p className="font-roboto text-xl font-bold">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <p className="font-semibold">Employees in Payroll</p>
          <DetailsTable />
        </div>
      </div>
    </div>
  );
};

const PayrollDetailInfo = ({
  label,
  value,
  status,
}: {
  label: string;
  value?: string;
  status?: string;
}) => {
  return (
    <div className="space-y-[6px] text-sm">
      <p className="font-semibold text-gray-500">{label}</p>
      <p className="font-bold">{value}</p>
      {status && (
        <div className="bg-amber-50 text-amber-600 font-semibold rounded-full px-3 py-1 text-sm w-max text-nowrap capitalize">
          {" "}
          pending{" "}
        </div>
      )}
    </div>
  );
};

export default PayrollDetails;
