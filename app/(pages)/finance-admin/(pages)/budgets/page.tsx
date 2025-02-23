"use client";

import AddBudgetModal from "@/app/(pages)/finance-admin/(pages)/budgets/budget-form-modal";
import AppButton from "@/app/_components/shared/button";
import CardSkeleton from "@/app/_components/shared/skelentons/card";
import { useBudgetSummary } from "@/app/_core/use-cases/finance/useBudget";
import { getLocalCurrency } from "@/lib/utils";
import { LuPlus } from "react-icons/lu";
import BudgetsTable from "./table";

const BudgetsPage = () => {
  const { data: budgetSummary, isLoading } = useBudgetSummary();
  const { remainingBudget, totalAllocated, totalSpent } = budgetSummary ?? {};

  const pageCards = [
    {
      title: "Total Budget Allocated ",
      description:
        totalAllocated || totalAllocated === 0
          ? getLocalCurrency(totalAllocated)
          : "...",
    },
    {
      title: "Total Budget Spent",
      description:
        totalSpent || totalSpent === 0 ? getLocalCurrency(totalSpent) : "...",
    },
    {
      title: "Remaining Funds",
      description:
        remainingBudget || remainingBudget === 0
          ? getLocalCurrency(remainingBudget)
          : "...",
    },
  ];

  return (
    <div className="space-y-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold">Budgets Management</h3>
          <p className="text-xs text-gray-500">
            Manage finance and organization payroll
          </p>
        </div>

        <AddBudgetModal
          trigger={
            <AppButton
              label="Add New"
              className="btn-primary hidden md:block"
            />
          }
        />
        <AddBudgetModal
          trigger={
            <button className="btn-primary rounded-full p-3 md:hidden block">
              <LuPlus className="text-xl" strokeWidth={3} />
            </button>
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <CardSkeleton numberOfCards={pageCards.length} />
        ) : (
          pageCards.map((card, index) => (
            <div className="common-card space-y-5" key={index}>
              <div className="flex items-center gap-2">
                <h3 className="font-roboto lg:text-xs text-sm text-[#848897] font-medium">
                  {card.title}
                </h3>
              </div>
              <p className="font-roboto text-xl font-bold">
                {card.description}
              </p>
            </div>
          ))
        )}
      </div>

      <BudgetsTable />
    </div>
  );
};

export default BudgetsPage;
