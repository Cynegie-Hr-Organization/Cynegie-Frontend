import DetailBlock from "./details-block";

export const Compensation = () => {
  return (
    <div className="space-y-11">
      <div className="space-y-5">
        <h3 className="text-base font-semibold text-primary">Compensation</h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailBlock label="Base Salary" value="N 110,,000.00" />
          <DetailBlock label="Salary Frequency" value="Monthly" />
          <DetailBlock label="Bonus Structure" value="11%" />
          <DetailBlock label="Comission" value="-" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailBlock label="Employment Status" value="Active" />
          <DetailBlock label="Stock Options" value="11%" />
          <DetailBlock
            label="Effective Date of Compensation"
            value="27th of the month"
          />
          <DetailBlock label="Pay Grade/Level" value="Level 11" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailBlock label="Employee ID" value="CYN0345678" />
          <DetailBlock label="Payment Method" value="Bank Transfer" />
          <DetailBlock label="Bank Account Name" value="Guaranty Trust Bank" />
          <DetailBlock label="Bank Account Number" value="0217703343" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailBlock label="Routing Number" value="234100" />
          <DetailBlock label="Tax Filing Status" value="Active" />
          <DetailBlock label="Tax Identification Number" value="000111222333" />
          <DetailBlock label="Overnight" value="Night" />
        </div>
      </div>

      <div className="space-y-5">
        <h3 className="text-base font-semibold text-primary">Allowances</h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailBlock label="Data Allowance" value="N 23,000.00" />
          <DetailBlock label="Wardrobe Allowance" value="N 43,500.00" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailBlock label="Pension" value="N 56,000.00" />
          <DetailBlock label="Tax Payment" value="N 37,500.00" />
        </div>
      </div>
    </div>
  );
};
