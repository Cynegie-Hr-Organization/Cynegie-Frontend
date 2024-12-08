"use client";
import StatusPill from "@/app/_components/shared/pills/status";
import { ChevronLeft } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import ViewPayrollReportTable from "../../../tables/view-payroll-report";
import React from "react";
import DownloadReportModal from "../../../modals/download-report";

const HrAdminViewPayrollReport = () => {
  const router = useRouter();
  const [showDownloadModal, setShowDownloadModal] = React.useState(false);
  return (
    <Stack gap={3} mx={5} mb={10} mt={6}>
      <Stack direction="row" alignItems="center">
        <Stack
          flexGrow={1}
          direction="row"
          alignItems="center"
          gap={1}
          sx={{ display: { xs: "none", sm: "flex" }, cursor: "pointer" }}
          onClick={() => router.push("/hr-admin/payroll/reports")}
        >
          <ChevronLeft
            sx={{ color: "#8D8484", height: "36px", width: "36px" }}
          />
          <div style={{ color: "#667185", fontWeight: 400, fontSize: "16px" }}>
            Back to Payroll Reports
          </div>
        </Stack>
        <button
          onClick={() => setShowDownloadModal(true)}
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
          Download Report
        </button>
      </Stack>
      <Stack gap={4} padding={3} className="common-card">
        <Stack>
          <div style={{ fontSize: "14px", fontWeight: 700, color: "#667185" }}>
            Report Title
          </div>
          <div style={{ fontSize: "18px", fontWeight: 700, color: "#1D2739" }}>
            Finance Department 2024 Payroll Report
          </div>
        </Stack>
        <Stack direction="row" gap={12}>
          {[
            { label: "Payroll Period", value: "Jul 1st - 30th, 2024" },
            { label: "Report Generated On", value: "Jul 31st, 2024" },
            { label: "Total Employee", value: "200" },
            { label: "Total Payroll Cost", value: "N34,886,000" },
            { label: "Status", value: "" },
          ].map((item, index) => (
            <Stack gap={1} key={index}>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#0A112F99",
                }}
              >
                {item.label}
              </div>
              {index === 4 ? (
                <StatusPill variant="success" text="Available" />
              ) : (
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#1D2739",
                  }}
                >
                  {item.value}
                </div>
              )}
            </Stack>
          ))}
        </Stack>
      </Stack>
      <ViewPayrollReportTable />
      {showDownloadModal && (
        <DownloadReportModal
          open={showDownloadModal}
          onCloseFn={() => setShowDownloadModal(false)}
        />
      )}
    </Stack>
  );
};

export default HrAdminViewPayrollReport;
