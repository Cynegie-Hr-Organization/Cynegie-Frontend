"use client";

import TransactionsTable from "./table";

const Transactions = () => {
  return (
    <div className="space-y-8">
      <h3 className="text-xl font-bold text-black font-roboto">Transactions</h3>
      <TransactionsTable />
    </div>
  );
};

export default Transactions;
