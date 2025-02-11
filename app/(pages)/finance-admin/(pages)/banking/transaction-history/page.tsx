"use client";

import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import TransactionsHistoryTable from "../table";

const TransactionHistory = () => {
  const router = useRouter();
  return (
    <div className="space-y-4">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 text-base"
      >
        <IoIosArrowBack size={24} />
        Back to Banking
      </button>
      <p className="text-2xl font-bold text-black">Transaction History</p>
      <TransactionsHistoryTable />
    </div>
  );
};

export default TransactionHistory;
