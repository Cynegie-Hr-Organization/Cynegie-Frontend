"use client";
import Modal from "@/app/_components/employee/modal";
import { InputFieldValue } from "@/app/_components/employee/modal/types";
import CalendarIcon from "@/app/_components/icons/calendar";
import Page from "@/app/_components/shared/page";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import CardGroup from "@/app/_components/shared/section-with-cards/card-group";
import Table from "@/app/_components/shared/table";
import { FieldType } from "@/app/_components/shared/table/types";
import Toast from "@/app/_components/shared/toast";
import { color, icon, initFetchParams, route } from "@/constants";
import { FetchParams } from "@/types";
import { Box, Button, Grid2, MenuItem, Select, Stack } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import BonusAndIncentivesChart from "../../charts/bonuses-and-incentives-chart";
import PayrollOverviewChartLarge from "../../charts/payroll-overview/large";
import PayrollOverviewChartMobile from "../../charts/payroll-overview/mobile";
import { deletePayroll, getPayrolls } from "./api";
import "./style.css";

const HrAdminPayrollOverviewPage = () => {
  const router = useRouter();
  const [dateRange, setDateRange] = React.useState<{
    startDate: Date;
    endDate: Date;
  }>({
    startDate: dayjs().startOf("month").toDate(),
    endDate: dayjs().endOf("month").toDate(),
  });

  const [fetchParams, setFetchParams] = useState<
    FetchParams & { status?: InputFieldValue }
  >({ ...initFetchParams });

  const { data } = useQuery({
    queryKey: ["payrolls", fetchParams],
    queryFn: () => getPayrolls(fetchParams),
  });

  const [payrolls, setPayrolls] = useState<
    {
      id: string;
      payrollName: string;
      payrollPeriod: string;
      paymentDate: string;
      totalEmployees: number;
      grossPay: string;
      netPay: string;
      approvalDate?: string;
      status: "approved" | "pending" | "rejected";
    }[]
  >();

  useEffect(() => {
    if (data) {
      if (data.data) {
        setPayrolls(
          data.data.map((payroll) => ({
            id: payroll.id,
            payrollName: payroll.payrollName,
            payrollPeriod: `${dayjs(payroll.startDate).format(
              "DD MMM"
            )} - ${dayjs(payroll.endDate).format("DD MMM")}`,
            paymentDate: dayjs(payroll.paymentDate).format("DD MMM YYYY"),
            totalEmployees: payroll.employees.length,
            grossPay: `₦${payroll.totalGrossPay}`,
            netPay: `₦${payroll.totalGrossPay}`,
            approvalDate: payroll.approvalDate
              ? dayjs(payroll.approvalDate).format("DD MMM YYYY")
              : "--",
            status: payroll.status,
          }))
        );
      }
    } else {
      setPayrolls(undefined);
    }
  }, [data]);

  const [statusFilter, setStatusFilter] = useState<InputFieldValue>();

  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [selectedPayrollId, setSelectedPayrollId] = useState("");

  const deletePayrollMutation = useMutation({
    mutationFn: (id: string) => deletePayroll(id),
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["payrolls"], exact: false });
      queryClient.resetQueries({ queryKey: ["payrolls"] });
      setOpenSuccessToast(true);
      setOpenDeleteModal(false);
      setLoading(false);
    },
  });

  const [openSuccessToast, setOpenSuccessToast] = useState(false);

  return (
    <Page
      title="Payroll"
      subtitle="Manage employee and organization payroll"
      hasButtons
      leftButton={{
        type: ButtonType.outlined,
        text: "Actions",
        popoverOptions: [
          {
            name: "Payroll Reports",
            onClick: () => router.push("/hr-admin/payroll/reports"),
          },
          {
            name: "Payroll Settings",
            onClick: () => router.push("/hr-admin/payroll/settings"),
          },
        ],
      }}
      smActions={[
        {
          name: "Create Payroll",
          onClick: () => router.push("/hr-admin/payroll/create-payroll"),
        },
        {
          name: "Payroll Reports",
          onClick: () => router.push("/hr-admin/payroll/reports"),
        },
        {
          name: "Payroll Settings",
          onClick: () => router.push("/hr-admin/payroll/settings"),
        },
      ]}
      rightButton={{
        type: ButtonType.contained,
        text: "Create Payroll",
        onClick: () => router.push("/hr-admin/payroll/create-payroll"),
      }}
    >
      <CardGroup
        gridItemSize={{ xs: 12, sm: 6, md: 3 }}
        cards={[
          {
            labelText: "Total Payroll Cost",
            value: "₦34,886,000",
            additionalInfo: {
              left: { text: "+20% ", color: "#099137" },
              right: { text: "Last Month", color: "" },
            },
          },
          {
            labelText: "Completed Payments",
            value: "40",
            additionalInfo: {
              left: { text: "₦90,251,000 ", color: color.success.dark },
              right: { text: "Paid", color: "" },
            },
          },
          {
            labelText: "Pending Payments",
            value: "12",
            additionalInfo: {
              left: { text: "₦7,251,000 ", color: color.warning.dark },
              right: { text: "Pending", color: "" },
            },
          },
          {
            labelText: "Total Payrolls",
            value: "124",
          },
        ]}
        cardLargeLabelText
        cardValueBelow
      />
      <Grid2 display="none" columnSpacing={2} rowSpacing={2} container>
        {[
          {
            title: "Total Payroll Cost",
            value: "₦34,886,000",
            additionalInfo: { value: "+20%", description: "Last Month" },
          },
          {
            title: "Completed Payments",
            value: "40",
            additionalInfo: { value: "₦90,251,000", description: "Paid" },
          },
          {
            title: "Pending Payments",
            value: "12",
            additionalInfo: { value: "₦7,251,000", description: "Pending" },
          },
          {
            title: "Total Payrolls",
            value: "124",
            additionalInfo: { value: "", description: "" },
          },
        ].map((item, index) => (
          <Grid2
            key={index}
            size={{ xs: 12, sm: 6, md: 3 }}
            className="common-card"
          >
            <Stack gap={3}>
              <Box
                sx={{
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "#1B1B1B",
                }}
              >
                {item.title}
              </Box>
              <Stack direction="row" alignItems="center">
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
                <Box sx={{ fontWeight: 400, fontSize: "12px" }}>
                  <span style={{ color: index == 2 ? "#B56D00" : "#2B9943" }}>
                    {item.additionalInfo.value}
                  </span>{" "}
                  <span style={{ color: "#9094A1" }}>
                    {item.additionalInfo.description}
                  </span>
                </Box>
              </Stack>
            </Stack>
          </Grid2>
        ))}
      </Grid2>
      <Grid2 columnSpacing={3} rowSpacing={3} container>
        <Grid2 className="common-card" size={{ xs: 12, sm: 12, md: 8.5 }}>
          <Stack gap={3}>
            <Stack
              sx={{
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "flex-start" },
                gap: { xs: 1, sm: 0 },
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  fontSize: { xs: "16px", sm: "20px" },
                  fontWeight: 600,
                  color: { xs: "#101928", sm: "#000000" },
                  mr: 2,
                }}
              >
                Payroll Cost Overview
              </Box>
              <Stack
                sx={{ display: { xs: "none", sm: "flex" } }}
                direction="row"
                gap={2}
              >
                <Select
                  defaultValue="Monthly"
                  sx={{ height: "30px", borderRadius: "4.62px", pr: "15px" }}
                >
                  <MenuItem value="Monthly">Monthly</MenuItem>
                  <MenuItem value="Yearly">Yearly</MenuItem>
                </Select>
                <Select
                  defaultValue="All Departments"
                  sx={{ height: "30px", borderRadius: "4.62px", pr: "15px" }}
                >
                  <MenuItem value="All Departments">All Departments</MenuItem>
                  <MenuItem value="Sales">Sales</MenuItem>
                  <MenuItem value="IT">IT</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                </Select>
              </Stack>
              <Select
                defaultValue="01 June - 31 June, 2024"
                sx={{
                  height: "30px",
                  borderRadius: "4.62px",
                  pr: "5px",
                  display: { xs: "flex", sm: "none" },
                }}
                disabled
              >
                <MenuItem value="01 June - 31 June, 2024">
                  01 June - 31 June, 2024
                </MenuItem>
              </Select>
            </Stack>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <PayrollOverviewChartLarge />
            </Box>
            <Stack
              sx={{ display: { xs: "flex", sm: "none" }, mb: "-80px" }}
              gap={4}
            >
              <div
                style={{
                  fontWeight: 700,
                  color: "#101928",
                  fontSize: "28px",
                }}
              >
                ₦120,574,000
              </div>
              <div style={{ margin: "0px -24.5px" }}>
                <PayrollOverviewChartMobile />
              </div>
            </Stack>
          </Stack>
        </Grid2>
        <Grid2 className="common-card" size={{ xs: 12, sm: 12, md: 3.5 }}>
          <Stack gap={4}>
            <Stack alignItems="center" direction="row">
              <Stack flexGrow={1} gap={0.5} mr={2}>
                <Box className="card-title-small">Bonuses and Incentives</Box>
                <Box className="card-subtitle-small">
                  From{" "}
                  {dayjs(dateRange.startDate).format("DD MMM YYYY") +
                    " - " +
                    dayjs(dateRange.endDate).format("DD MMM YYYY")}
                </Box>
              </Stack>
              <Button
                className="overview-calendar"
                sx={{ border: 0, padding: 0, mt: -4.5, pl: 6 }}
              >
                <DateRangePicker
                  preventOverflow
                  showOneCalendar
                  cleanable={false}
                  placement="auto"
                  ranges={[]}
                  format="dd MMM yyyy"
                  onChange={(e) => {
                    if (e) setDateRange({ startDate: e[0], endDate: e[1] });
                  }}
                  caretAs={CalendarIcon}
                />
              </Button>
            </Stack>

            <Grid2 rowSpacing={2} mb={-3} container>
              {Array(2)
                .fill(undefined)
                .map((_, index) => (
                  <Grid2
                    size={{ xs: 12, sm: 6, md: 6, lg: 6 }}
                    key={index}
                    className={index == 0 ? "grid-item-right-margin" : ""}
                  >
                    <Stack
                      sx={{
                        borderLeft: `3.26px solid ${
                          index == 0 ? "#8AA2E3" : "#0035C3"
                        }`,
                        pl: "10px",
                      }}
                    >
                      <Box
                        sx={{
                          color: "#70707A",
                          fontWeight: 400,
                          fontSize: "11.4px",
                        }}
                      >
                        Bonuses
                      </Box>
                      <Box
                        sx={{
                          fontSize: "19.53px",
                          fontWeight: 600,
                          color: "#101928",
                        }}
                      >
                        ₦2,764,000
                      </Box>
                    </Stack>
                  </Grid2>
                ))}
            </Grid2>

            <Box
              sx={{
                position: "relative",
                marginBottom: "-20px",
                marginTop: { xs: 0, md: "-25px", lg: 0 },
              }}
            >
              <div
                style={{
                  width: "200px",
                  height: "300px",
                  margin: "0 auto -100px auto",
                }}
              >
                <BonusAndIncentivesChart />
              </div>
              <Box
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 100,
                  marginInline: "auto",
                  width: "fit-content",
                }}
              >
                <Box
                  sx={{
                    fontWeight: 400,
                    fontSize: "11.4px",
                    color: "#70707A",
                    textAlign: "center",
                  }}
                >
                  Total
                </Box>
                <Box
                  sx={{ fontWeight: 600, fontSize: "16px", color: "#101928" }}
                >
                  ₦32,764,000
                </Box>
              </Box>
            </Box>
          </Stack>
        </Grid2>
      </Grid2>
      <Table
        hasActionsColumn
        hasCheckboxes
        headerRowData={[
          "Payroll Name",
          "Payroll Period",
          "Payment Date",
          "Total Employees",
          "Gross Pay",
          "Net Pay",
          "Approval Date",
          "Status",
        ]}
        bodyRowData={payrolls}
        skeletonSizes={Array(7).fill("medium")}
        fieldTypes={[...Array(7).fill(FieldType.text), FieldType.status]}
        displayedFields={[
          "payrollName",
          "payrollPeriod",
          "paymentDate",
          "totalEmployees",
          "grossPay",
          "netPay",
          "approvalDate",
          "status",
        ]}
        statusMap={{
          approved: "success",
          pending: "warning",
          rejected: "error",
        }}
        fieldActionMap={{
          approved: [
            { name: "View Details", onClick: () => {} },
            { name: "View Payroll Report", onClick: () => {} },
          ],
          pending: [
            {
              name: "View Details",
              onClick: () => {},
              onDataReturned: (id) =>
                router.push(`${route.hrAdmin.payroll["view-payroll"]}${id}`),
            },
            {
              name: "Edit Payroll",
              onClick: () => {},
              onDataReturned: (id) =>
                router.push(`${route.hrAdmin.payroll["edit-payroll"]}${id}`),
            },
            {
              name: "Delete",
              onClick: () => {},
              onDataReturned: (id) => {
                if (typeof id === "string") {
                  setSelectedPayrollId(id);
                  setOpenDeleteModal(true);
                }
              },
            },
          ],
          rejected: [{ name: "Resolve Issue", onClick: () => {} }],
        }}
        fieldToGetAction="status"
        onSearch={(query) => setFetchParams({ ...fetchParams, search: query })}
        formFilter={{
          gridSpacing: 2,
          inputFields: [
            {
              label: "Status",
              type: "select",
              options: [
                { label: "Approved", value: "approved" },
                { label: "Pending", value: "pending" },
                { label: "Rejected", value: "rejected" },
              ],
              value: statusFilter,
              setValue: setStatusFilter,
              selectValControlledFromOutside: true,
            },
          ],
        }}
        onResetClick={() => setStatusFilter(undefined)}
        onFilterClick={() =>
          setFetchParams({ ...fetchParams, status: statusFilter })
        }
        paginationMeta={{
          ...data?.meta,
          itemsOnPage: payrolls?.length,
          onPrevClick: () =>
            setFetchParams({ ...fetchParams, page: fetchParams.page - 1 }),
          onNextClick: () =>
            setFetchParams({ ...fetchParams, page: fetchParams.page + 1 }),
          loading: payrolls ? false : true,
          onChangeLimit: (limit: number) =>
            setFetchParams({ ...fetchParams, limit: limit }),
        }}
        fieldToReturnOnActionItemClick="id"
      />
      <Modal
        open={openDeleteModal}
        onClose={() => {}}
        hasHeading={false}
        reduceVerticalGap
        centerImage={icon.deleteX}
        centerTitle="Delete Payroll?"
        centerMessage="If you delete this payroll, it will be removed from the payroll Management and it will be inaccessible"
        buttonOne={{
          type: loading ? ButtonType.disabled : ButtonType.outlined,
          text: "Cancel",
          onClick: () => setOpenDeleteModal(false),
        }}
        buttonTwo={{
          type: loading
            ? ButtonType.disabledLoading
            : ButtonType.deleteContained,
          text: loading ? "" : "Delete Payroll",
          onClick: () => {
            deletePayrollMutation.mutateAsync(selectedPayrollId);
          },
        }}
      />
      {openSuccessToast && (
        <Toast
          icon={icon.checkCircle}
          open={openSuccessToast}
          onClose={() => setOpenSuccessToast(false)}
          type="success"
          status="Successful"
          message="You have successfully deleted the payroll"
        />
      )}
    </Page>
  );
};

export default HrAdminPayrollOverviewPage;
