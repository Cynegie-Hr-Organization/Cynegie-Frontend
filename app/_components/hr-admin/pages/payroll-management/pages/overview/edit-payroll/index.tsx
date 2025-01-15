"use client";
import { useParams } from "next/navigation";
import HrAdminCreatePayrollPage from "../create-payroll";

const EditPayrollPage = () => {
  const { slug } = useParams();

  return (
    <HrAdminCreatePayrollPage
      editPayrollId={typeof slug === "string" ? slug : undefined}
    />
  );
};

export default EditPayrollPage;
