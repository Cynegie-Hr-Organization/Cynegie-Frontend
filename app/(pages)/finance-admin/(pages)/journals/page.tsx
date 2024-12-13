import { JournalsTable } from "./tables";

const FinanceAdminJournals = () => {
  return (
    <div className="space-y-8">
        <h3 className="text-xl font-bold text-black font-roboto">Journal Entries </h3>

      <JournalsTable />
    </div>
  )
}

export default FinanceAdminJournals;