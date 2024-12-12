"use client";

import { Box, Button, Grid2, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import PayrollBenefitsManagementTable from "../../tables/benefits-management";
import { useState } from "react";
import AddBenefitModal from "../../modals/add-benefit";
import Image from "next/image";

const HrAdminPayrollBenefitsManagementPage = () => {
  const router = useRouter();
  const [showAddBenefitsModal, setShowAddBenefitsModal] = useState(false);
  return (
    <Stack gap={3} mb={10} mt={6}>
      <Stack direction="row" alignItems="center">
        <div style={{ flexGrow: 1 }} className="section-heading">
          Benefits Management
        </div>
        <Stack direction="row" gap={2}>
          <Button
            // disabled
            onClick={() => router.push("/hr-admin/payroll/salary-advance")}
            style={{
              borderRadius: "8px",
              border: "1.5px solid #98A2B3",
              color: "#98A2B3",
              fontSize: "16px",
              fontWeight: 600,
              padding: "8px 20px",
              textTransform: "none",
              // width: '250px',
              //   backgroundColor: '#0035C3',
            }}
          >
            Salary Advance
          </Button>
          <button
            onClick={() => setShowAddBenefitsModal(true)}
            style={{
              borderRadius: "8px",
              border: "1.5px solid #98A2B3",
              color: "#FFFFFF",
              fontSize: "16px",
              fontWeight: 600,
              padding: "8px 20px",
              // width: '250px',
              backgroundColor: "#0035C3",
            }}
          >
            Add Benefits
          </button>
        </Stack>
      </Stack>
      <Grid2 columnSpacing={2} rowSpacing={2} container>
        {[
          {
            title: "Total Benefits",
            value: "10",
            icon: "/icons/group.svg",
          },
          {
            title: "Employees Enrolled",
            value: "250",
            icon: "/icons/paper-money.svg",
          },
          {
            title: "Pending Enrollments",
            value: "5",
            icon: "/icons/paper-money.svg",
          },
          {
            title: "Pending Approvals",
            value: "3",
            icon: "/icons/paper-money.svg",
          },
        ].map((item, index) => (
          <Grid2
            key={index}
            size={{ xs: 12, sm: 6, md: 3 }}
            className="common-card"
          >
            <Stack gap={3}>
              <Stack direction="row" alignItems="center" gap={1}>
                <div
                  style={{
                    padding: "6px",
                    borderRadius: "50%",
                    backgroundColor: "#EADAFF",
                  }}
                >
                  <Image src={item.icon} width={16} height={16} alt="" />
                </div>
                <Box
                  sx={{
                    fontWeight: 600,
                    fontSize: "16px",
                    color: "#1B1B1B",
                  }}
                >
                  {item.title}
                </Box>
              </Stack>
              <Box
                flexGrow={1}
                sx={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#1B1B1B",
                }}
              >
                {item.value}
              </Box>
            </Stack>
          </Grid2>
        ))}
      </Grid2>
      <PayrollBenefitsManagementTable />
      <AddBenefitModal
        open={showAddBenefitsModal}
        onCloseFn={() => setShowAddBenefitsModal(false)}
      />
    </Stack>
  );
};

export default HrAdminPayrollBenefitsManagementPage;
