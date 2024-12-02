"use client";
import { ChevronLeft } from "@mui/icons-material";
import { Dialog, DialogContent, Divider, Stack } from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const HrAdminPayrollSummaryPage = () => {
  const router = useRouter();
  const [showSuccessDialog, setShowSuccessDialog] = React.useState(false);
  return (
    <Stack mx={5} gap={3} mb={10}>
      <Stack
        direction="row"
        alignItems="center"
        gap={1}
        sx={{ display: { xs: "none", sm: "flex" }, cursor: "pointer" }}
        onClick={() => router.push("/hr-admin/payroll/review-payroll")}
      >
        <ChevronLeft sx={{ color: "#8D8484", height: "36px", width: "36px" }} />
        <div style={{ color: "#667185", fontWeight: 400, fontSize: "16px" }}>
          Back to Payroll Review
        </div>
      </Stack>
      <div className="section-heading">Payroll Summary</div>
      <Stack
        gap={2}
        sx={{
          backgroundColor: "#0035C3",
          borderRadius: "10px",
          padding: "30px",
        }}
      >
        <div style={{ fontSize: "14px", fontWeight: 400, color: "#FFF" }}>
          Total Debit
        </div>
        <div style={{ fontSize: "28px", fontWeight: 500, color: "#FFF" }}>
          N1,286,000.00
        </div>
      </Stack>
      <Stack className="common-card" px={4} gap={3} pt={5}>
        <div style={{ color: "#101928", fontWeight: 500, fontSize: "20px" }}>
          Detail Payment
        </div>
        <Stack gap={2}>
          {[
            { label: "Total Gross Pay", value: "N1,440,000.00" },
            { label: "Total Tax Deductions", value: "N144,000.00" },
            { label: "Total Pension Deductions", value: "N90,000.00" },
            { label: "Total Other Deductions", value: "N23,000.00" },
            { label: "Total Bonuses", value: "N62,000.00" },
          ].map((item, index) => (
            <Stack key={index} direction="row" alignItems="center">
              <div
                style={{
                  flexGrow: 1,
                  color: "#101928",
                  fontWeight: 400,
                  fontSize: "16px",
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  color: "#101928",
                  fontWeight: 700,
                  fontSize: "18px",
                }}
              >
                {item.value}
              </div>
            </Stack>
          ))}
        </Stack>
        <Divider />
        <Stack direction="row" alignItems="center">
          <div
            style={{
              flexGrow: 1,
              color: "#101928",
              fontWeight: 400,
              fontSize: "16px",
            }}
          >
            Total Payroll Cost
          </div>
          <div
            style={{
              color: "#101928",
              fontWeight: 700,
              fontSize: "28px",
            }}
          >
            N1,286,000.00
          </div>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        gap={2}
      >
        <button
          style={{
            borderRadius: "8px",
            border: "1.5px solid #98A2B3",
            color: "#344054",
            fontSize: "16px",
            fontWeight: 600,
            padding: "10px 0px",
            width: "250px",
            backgroundColor: "#FFFFFF",
          }}
        >
          Save & Continue Later
        </button>
        <button
          onClick={() => {
            setShowSuccessDialog(true);
          }}
          style={{
            borderRadius: "8px",
            border: "1.5px solid #98A2B3",
            color: "#FFFFFF",
            fontSize: "16px",
            fontWeight: 600,
            padding: "10px 0px",
            width: "250px",
            backgroundColor: "#0035C3",
          }}
        >
          Finalize Payroll
        </button>
      </Stack>
      {showSuccessDialog && (
        <Dialog open={showSuccessDialog}>
          <DialogContent>
            <Stack gap={3} alignItems="center" padding={3}>
              <Image
                src="/icons/success-tick.svg"
                alt=""
                height={100}
                width={100}
              />
              <div
                style={{ color: "#303030", fontWeight: 600, fontSize: "20px" }}
              >
                You're all set
              </div>
              <div>
                Payroll{" "}
                <span style={{ color: "#303030", fontWeight: 700 }}>
                  1st Sept - 31st September
                </span>{" "}
                has been sent for approval
              </div>
              <button
                onClick={() => {
                  router.push("/hr-admin/payroll/overview");
                }}
                style={{
                  borderRadius: "8px",
                  border: "1.5px solid #98A2B3",
                  color: "#FFFFFF",
                  fontSize: "16px",
                  fontWeight: 600,
                  padding: "10px 0px",
                  width: "250px",
                  backgroundColor: "#0035C3",
                  marginTop: "10px",
                }}
              >
                Back to Payroll
              </button>
            </Stack>
          </DialogContent>
        </Dialog>
      )}
    </Stack>
  );
};

export default HrAdminPayrollSummaryPage;
