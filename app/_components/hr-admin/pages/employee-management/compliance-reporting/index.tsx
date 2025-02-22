"use client";
import Modal from "@/app/_components/employee/modal";
import BarChart from "@/app/_components/employee/pages/attendance-and-time-tracking/total-hours-worked/chart";
import SvgIcon from "@/app/_components/icons/container";
import PieChart from "@/app/_components/shared/charts/pie-chart";
import Page from "@/app/_components/shared/page";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import CardGroup from "@/app/_components/shared/section-with-cards/card-group";
import SectionCardContainer from "@/app/_components/shared/section-with-cards/container";
import TabFormat from "@/app/_components/shared/tab-format";
import Table from "@/app/_components/shared/table";
import { FieldType } from "@/app/_components/shared/table/types";
import { color, icon } from "@/constants";
import { EmployeeDistribution, FetchParams, TurnoverReport } from "@/types";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  apiRequest,
  getAllTasks,
  getDepartmentStats,
  getEmployeeDemographyCharts,
  getTaskSummary,
  getTurnoverChartData,
} from "../../payroll-management/pages/overview/api";

type MappedTasks = {
  taskName: string;
  assignedTo: string;
  date: string;
  status: string;
};

type MappedDepartmentStat = {
  department: string;
  totalEmployeeNo: number;
  male: number;
  female: number;
};

type MappedTurnoverBreakdown = {
  department: string;
  totalEmployeeNo: number;
  employeesLeft: number;
  turnover: number;
};

const HrAdminEmployeeComplianceReporting = () => {
  const [openExportModal, setOpenExportModal] = useState(false);
  const userGroupIcon = (
    <SvgIcon path={icon.userGroupTwo} width={14} height={14} />
  );

  const [tasks, setTasks] = useState<MappedTasks[]>();

  const [departmentStats, setDepartmentStats] =
    useState<MappedDepartmentStat[]>();

  const [turnoverBreakdown, setTurnoverBreakdown] =
    useState<MappedTurnoverBreakdown[]>();

  const [turnoverChartData, setTurnoverChartData] = useState<
    {
      item: string;
      value: number;
    }[]
  >([]);

  const [fetchParams] = useState<FetchParams>({
    page: 1,
    limit: 10,
    sortOrder: "asc",
  });

  const { data } = useQuery({
    queryKey: ["task-summary"],
    queryFn: () => getTaskSummary(),
  });

  const { data: chartsData } = useQuery({
    queryKey: ["charts"],
    queryFn: () => getEmployeeDemographyCharts(),
  });

  const { data: tasksData } = useQuery({
    queryKey: ["tasks", fetchParams],
    queryFn: () => getAllTasks(fetchParams),
  });

  const { data: departmentStatsData } = useQuery({
    queryKey: ["departmentStats", fetchParams],
    queryFn: () => getDepartmentStats(fetchParams),
  });

  const { data: turnoverBreakdownData } = useQuery({
    queryKey: ["turnover-breakdown"],
    queryFn: () =>
      apiRequest(
        "GET",
        "employees/employee-turnover"
      ) as Promise<TurnoverReport>,
  });

  const { data: _turnoverChartData } = useQuery({
    queryKey: ["turnover-chart"],
    queryFn: () => getTurnoverChartData(),
  });

  useEffect(() => {
    if (tasksData) {
      setTasks(
        tasksData.data.map((task) => ({
          taskName: task.taskName,
          assignedTo: `${task.employees[0].personalInfo?.firstName} ${task.employees[0].personalInfo?.lastName}`,
          date: dayjs(task.dueDate).format("DD-MM-YYYY"),
          status: task.status,
        }))
      );
    } else {
      setTasks(undefined);
    }
  }, [tasksData]);

  useEffect(() => {
    if (_turnoverChartData) {
      const keys = Object.keys(_turnoverChartData);
      const values = Object.values(_turnoverChartData);
      setTurnoverChartData(
        keys.map((key, index) => ({
          item: key,
          value: values[index],
        }))
      );
    }
  }, [_turnoverChartData]);

  function mapEmployeeDistribution(
    data: EmployeeDistribution
  ): MappedDepartmentStat[] {
    return Object.entries(data).map(([department, stats]) => ({
      department,
      totalEmployeeNo: stats.totalEmployees,
      male: stats.male,
      female: stats.female,
    }));
  }

  useEffect(() => {
    if (departmentStatsData) {
      setDepartmentStats(mapEmployeeDistribution(departmentStatsData.data));
    } else {
      setTasks(undefined);
    }
  }, [departmentStatsData]);

  useEffect(() => {
    if (turnoverBreakdownData) {
      const turnoverDepartments = Object.keys(
        turnoverBreakdownData.turnoverReport
      );
      const values = Object.values(turnoverBreakdownData.turnoverReport);
      setTurnoverBreakdown(
        turnoverDepartments.map((department, index) => ({
          department: department,
          totalEmployeeNo: values[index].totalEmployees,
          employeesLeft: values[index].employeesThatLeft,
          turnover: values[index].turnoverPercentage,
        }))
      );
    }
  }, [turnoverBreakdownData]);

  const chart1 = {
    chartLabels: ["Male", "Female"],
    chartValues: [chartsData?.gender.Male ?? 0, chartsData?.gender.Female ?? 0],
    chartColors: [color.pieChart.info, color.pieChart.warning],
  };

  const chart2 = {
    chartLabels: ["Full Time", "Part Time", "Contract", "Intern", "Freelancer"],
    chartValues: [
      chartsData?.employmentType.FullTime ?? 0,
      chartsData?.employmentType.PartTime ?? 0,
      chartsData?.employmentType.Contract ?? 0,
      chartsData?.employmentType.Intern ?? 0,
      chartsData?.employmentType.Freelancer ?? 0,
    ],
    chartColors: [
      color.pieChart.info,
      color.pieChart.success,
      color.pieChart.grey,
      color.pieChart.warning,
      color.pieChart.error,
    ],
  };

  const chart3 = {
    chartLabels: ["Active", "On Leave", "Probation", "Resigned", "Terminated"],
    chartValues: [
      chartsData?.employmentStatus.Active ?? 0,
      chartsData?.employmentStatus.OnLeave ?? 0,
      chartsData?.employmentStatus.Probation ?? 0,
      chartsData?.employmentStatus.Resigned ?? 0,
      chartsData?.employmentStatus.Terminated ?? 0,
    ],
    chartColors: [
      color.pieChart.info,
      color.pieChart.success,
      color.pieChart.grey,
      color.pieChart.warning,
      color.pieChart.error,
    ],
  };

  return (
    <Page title="Compliance and Reports">
      <TabFormat
        tabs={[
          {
            name: "Compliance",
            component: (
              <div className="flex flex-col gap-6">
                <CardGroup
                  gridItemSize={{ xs: 12, sm: 4, md: 3 }}
                  loading={data ? false : true}
                  cards={[
                    {
                      labelText: "Number of Tasks",
                      largeLabelText: true,
                      value: data?.totalTasks,
                      icon: userGroupIcon,
                      iconColorVariant: "ash",
                      valueBelow: true,
                    },
                    {
                      labelText: "Completed Tasks",
                      largeLabelText: true,
                      value: data?.completedTasks,
                      icon: userGroupIcon,
                      iconColorVariant: "purple",
                      valueBelow: true,
                    },
                    {
                      labelText: "Tasks in Progress",
                      largeLabelText: true,
                      value: data?.tasksInProgress,
                      icon: userGroupIcon,
                      iconColorVariant: "purple",
                      valueBelow: true,
                    },
                    {
                      labelText: "Due Tasks",
                      largeLabelText: true,
                      value: data?.dueTasks,
                      icon: userGroupIcon,
                      iconColorVariant: "purple",
                      valueBelow: true,
                    },
                  ]}
                />
                <Table
                  title="Compliance Tasks"
                  headerRowData={["Task Name", "Assigned To", "Date", "Status"]}
                  fieldTypes={[
                    ...Array(3).fill(FieldType.text),
                    FieldType.status,
                  ]}
                  displayedFields={["taskName", "assignedTo", "date", "status"]}
                  bodyRowData={tasks}
                  statusMap={{ pending: "warning", completed: "success" }}
                  formFilter={{
                    inputFields: [
                      {
                        label: "Status",
                        type: "select",
                        placeholder: "Select",
                        options: [
                          { label: "Completed", value: 2 },
                          { label: "In Progress", value: 1 },
                          { label: "Not Started", value: 0 },
                        ],
                      },
                    ],
                  }}
                />
              </div>
            ),
          },
          {
            name: "Reports",
            component: (
              <TabFormat
                type="button"
                tabs={[
                  {
                    name: "Employee Demography",
                    component: (
                      <>
                        <div className="card-title-large my-4">
                          Employee Demography
                        </div>
                        <div className="flex flex-col gap-8">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <SectionCardContainer isCard title="By Gender">
                              <PieChart {...chart1} />
                            </SectionCardContainer>
                            <SectionCardContainer
                              isCard
                              title="By Employment Type"
                            >
                              <PieChart {...chart2} />
                            </SectionCardContainer>
                            <SectionCardContainer
                              isCard
                              title="By Employment Status"
                            >
                              <PieChart {...chart3} />
                            </SectionCardContainer>
                          </div>
                          <Table
                            title="Employee Breakdown"
                            hasCheckboxes
                            headerRowData={[
                              "Department",
                              "Total Employee Number",
                              "Male",
                              "Female",
                            ]}
                            fieldTypes={[...Array(4).fill(FieldType.text)]}
                            displayedFields={[
                              "department",
                              "totalEmployeeNo",
                              "male",
                              "female",
                            ]}
                            bodyRowData={departmentStats}
                            formFilter={{
                              inputFields: [
                                {
                                  label: "Status",
                                  type: "select",
                                  placeholder: "Select",
                                  options: [
                                    { label: "Completed", value: 2 },
                                    { label: "In Progress", value: 1 },
                                    { label: "Not Started", value: 0 },
                                  ],
                                },
                              ],
                            }}
                          />
                        </div>
                      </>
                    ),
                  },
                  {
                    name: "Turnover",
                    component: (
                      <div className="flex flex-col gap-8">
                        <SectionCardContainer isCard title="Employee Turnover">
                          <div className="mt-4">
                            {!_turnoverChartData ? (
                              <div className="flex justify-center mb-10">
                                <CircularProgress />
                              </div>
                            ) : (
                              <BarChart
                                barSize={35}
                                data={turnoverChartData}
                                bars={[{ dataKey: "value" }]}
                                yAxisLabel="(% of Employees)"
                                isPercentage
                              />
                            )}
                          </div>
                        </SectionCardContainer>
                        <Table
                          title="Turnover Breakdown"
                          headerRowData={[
                            "Department",
                            "Total Employee Number",
                            "Employees that Left",
                            "Turnover Percentage",
                          ]}
                          fieldTypes={[...Array(5).fill(FieldType.text)]}
                          displayedFields={[
                            "department",
                            "totalEmployeeNo",
                            "employeesLeft",
                            "turnover",
                          ]}
                          bodyRowData={
                            turnoverBreakdown && [
                              ...turnoverBreakdown,
                              {
                                department: "Total Number",
                                totalEmployeeNo: turnoverBreakdown
                                  .map((turnover) => turnover.totalEmployeeNo)
                                  .reduceRight(
                                    (prev, current) => prev + current
                                  ),
                                employeesLeft: turnoverBreakdown
                                  .map((turnover) => turnover.employeesLeft)
                                  .reduceRight(
                                    (prev, current) => prev + current
                                  ),
                                turnover: turnoverBreakdown
                                  .map((turnover) => turnover.turnover)
                                  .reduceRight(
                                    (prev, current) => prev + current
                                  ),
                              },
                            ]
                          }
                          formFilter={{
                            inputFields: [
                              {
                                label: "Status",
                                type: "select",
                                placeholder: "Select",
                                options: [
                                  { label: "Completed", value: 2 },
                                  { label: "In Progress", value: 1 },
                                  { label: "Not Started", value: 0 },
                                ],
                              },
                            ],
                          }}
                        />
                      </div>
                    ),
                  },
                ]}
                actionButton={{
                  type: ButtonType.contained,
                  text: "Export",
                  onClick: () => setOpenExportModal(true),
                }}
              />
            ),
          },
        ]}
      />
      {openExportModal && (
        <Modal
          open={openExportModal}
          onClose={() => setOpenExportModal(false)}
          hasHeading={false}
          centerTitle="Export Report"
          centerMessage="Select the format you would like to download your report"
          hasDocSelect
          buttonOne={{
            type: ButtonType.outlined,
            text: "Cancel",
            onClick: () => setOpenExportModal(false),
          }}
          buttonTwo={{
            type: ButtonType.download,
            text: "Download",
            onClick: () => setOpenExportModal(false),
          }}
          buttonGroupPosition="center"
        />
      )}
    </Page>
  );
};

export default HrAdminEmployeeComplianceReporting;
