import DetailBlock from "@/app/(pages)/super-admin/(pages)/users/overview/[userDetails]/components/details-block";
import { Compensation } from "@/app/_core/actions/user/employee";

const formatCurrency = (currency: string | number) => `N${currency}`;

export const CompensationTab = ({ userData }: { userData?: Compensation }) => {
  const {
    baseSalary,
    salaryFrequency,
    overtime,
    taxFilingStatus,
    paymentMethod,
    bonusStructure,
    commission,
    stockOptions,
    payGrade,
    taxIdentificationNumber,
    allowance,
    deduction,
  } = userData ?? {};

  return (
    <div className="space-y-11">
      <div className="space-y-5">
        <h3 className="text-base font-semibold text-primary">
          Compensation Details
        </h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailBlock
            label="Base Salary"
            value={baseSalary ? formatCurrency(baseSalary) : "NIL"}
          />
          <DetailBlock
            label="Salary Frequency"
            value={salaryFrequency ?? "NIL"}
          />
          <DetailBlock label="Overtime" value={overtime ?? "NIL"} />
          <DetailBlock
            label="Tax Filing Status"
            value={taxFilingStatus ?? "NIL"}
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailBlock label="Payment Method" value={paymentMethod ?? "NIL"} />
          <DetailBlock
            label="Bonus Structure"
            value={(bonusStructure && bonusStructure.trim()) || "NIL"}
          />
          <DetailBlock
            label="Commission"
            value={commission ? formatCurrency(commission) : "NIL"}
          />
          <DetailBlock
            label="Stock Options"
            value={stockOptions ? formatCurrency(stockOptions) : "NIL"}
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailBlock label="Pay Grade" value={payGrade ?? "NIL"} />
          <DetailBlock
            label="Tax ID Number"
            value={taxIdentificationNumber ?? "NIL"}
          />
        </div>

        <h3 className="text-base font-semibold text-primary mt-6">
          Allowances
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {allowance && allowance.length > 0 ? (
            allowance.map((allow, index) => (
              <DetailBlock
                key={allow.id || index}
                label={allow.allowanceName}
                value={formatCurrency(allow.allowanceAmount)}
              />
            ))
          ) : (
            <DetailBlock label="Allowances" value="No allowances" />
          )}
        </div>

        <h3 className="text-base font-semibold text-primary mt-6">
          Deductions
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {deduction && deduction.length > 0 ? (
            deduction.map((ded, index) => (
              <DetailBlock
                key={ded.id ?? index}
                label={ded.deductionName}
                value={formatCurrency(ded.deductionAmount)}
              />
            ))
          ) : (
            <DetailBlock label="Deductions" value="No deductions" />
          )}
        </div>
      </div>
    </div>
  );
};
