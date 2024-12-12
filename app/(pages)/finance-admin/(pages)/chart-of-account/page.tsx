import { AccountGroupsTable, LedgerAccountsTable } from "./tables";

const FinanceAdminChartOfAccount = () => {
  return (
    <div className="space-y-8">
      <h3 className="text-xl font-bold text-black font-roboto">Chart Of Account </h3>

      <AccountGroupsTable />

      <LedgerAccountsTable />
    </div>
  )
}

export default FinanceAdminChartOfAccount;