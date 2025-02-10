"use client";
import Modal from "@/app/_components/employee/modal";
import SvgIcon from "@/app/_components/icons/container";
import PieChart from "@/app/_components/shared/charts/pie-chart";
import Page from "@/app/_components/shared/page";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import SectionWithCards from "@/app/_components/shared/section-with-cards";
import CardGroup from "@/app/_components/shared/section-with-cards/card-group";
import SectionCardContainer from "@/app/_components/shared/section-with-cards/container";
import Table from "@/app/_components/shared/table";
import { FieldType, StatusMap } from "@/app/_components/shared/table/types";
import Toast from "@/app/_components/shared/toast";
import { color, icon, route } from "@/constants";
import { ColorVariant, FetchParams } from "@/types";
import { AccessRight, Employee } from "@/types/api-index";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMyEmployees } from "../../payroll-management/pages/overview/api";
import PendingApprovalRequests from "./pending-approval-requests";

const chartLabels = [
  "Full Time",
  "Part Time",
  "Contract",
  "Intern",
  "Freelancer",
];
const chartValues = [50, 20, 10, 15, 5];
const chartColors = [
  color.pieChart.info,
  color.pieChart.success,
  color.pieChart.warning,
  color.pieChart.error,
  color.pieChart.grey,
];

const cardIconSize = {
  width: 13.56,
  height: 13.56,
};

type MappedEmployee = {
  id: string;
  name: string;
  staffID: string;
  email: string;
  workEmail: string;
  jobTitle: string;
  department: string;
  permissions: { name: string; value: string }[];
};

const HrAdminEmployeeDirectory = () => {
  const router = useRouter();
  const cardIcon = (
    <SvgIcon path={icon.userGroup} width={13.56} height={13.56} />
  );
  const cardIconColorVariant: ColorVariant = "grey";

  const [openTerminateEmployeeModal, setOpenTerminateEmployeeModal] =
    useState(false);
  const [openTerminationToast, setOpenTerminationToast] = useState(false);

  const [openPermissionsModal, setOpenPermissionsModal] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState<MappedEmployee>();

  const [employees, setEmployees] = useState<MappedEmployee[]>();
  const [fetchParams, setFetchParams] = useState<FetchParams>({
    page: 1,
    limit: 10,
    sortOrder: "asc",
  });

  const { data: myEmployees } = useQuery({
    queryKey: ["employees", fetchParams],
    queryFn: () => getMyEmployees(fetchParams),
  });

  useEffect(() => {
    if (myEmployees) {
      setEmployees(
        myEmployees.data.map((employee: Employee) => ({
          id: employee.id,
          name: `${employee.personalInfo.firstName} ${employee.personalInfo.lastName}`,
          staffID: employee.employmentInformation.staffId,
          email: employee.personalInfo.email,
          workEmail: employee.employmentInformation.workEmail,
          jobTitle: employee.employmentInformation.jobTitle,
          department: employee.employmentInformation.department.departmentName,
          permissions: (
            employee.accessRights[0] as AccessRight
          )?.permissions.map((permission) => ({
            name: permission.tool,
            value: permission.id,
          })),
        }))
      );
    } else {
      setEmployees(undefined);
    }
  }, [myEmployees]);

  const statusMap = employees
    ?.map((employee) => employee.department)
    .reduce<StatusMap>((obj, item) => {
      obj[item] = "warning";
      return obj;
    }, {});

  return (
    <Page
      title="Employee Management"
      subtitle="Manage access to all employees in your organization"
      hasButtons
      leftButton={{
        type: ButtonType.outlined,
        text: "Actions",
        popoverOptions: [
          { name: "Manage Department", onClick: () => {} },
          { name: "Manage Roles", onClick: () => {} },
          { name: "Manage Attendance", onClick: () => {} },
        ],
      }}
      rightButton={{
        type: ButtonType.contained,
        text: "Add Employee",
        onClick: () =>
          router.push(route.hrAdmin.employeeManagement.directory.addEmployee),
      }}
    >
      <CardGroup
        cards={[
          {
            labelText: "Total Headcount",
            value: 190,
            valueBelow: true,
            largeLabelText: true,
            icon: <SvgIcon path={icon.userGroup} {...cardIconSize} />,
            iconColorVariant: "purple",
          },
          {
            labelText: "New Hires",
            value: 32,
            valueBelow: true,
            largeLabelText: true,
            icon: (
              <div className="fill-black">
                <SvgIcon path={icon.userFilled} {...cardIconSize} />
              </div>
            ),
            iconColorVariant: "success",
            additionalInfo: { right: { text: "Last 30 days" } },
          },
          {
            labelText: "Open Positions",
            value: 2,
            valueBelow: true,
            largeLabelText: true,
            icon: (
              <div className="fill-black">
                <SvgIcon path={icon.box} {...cardIconSize} />
              </div>
            ),
            iconColorVariant: "ash",
          },
          {
            labelText: "Departure",
            value: 7,
            valueBelow: true,
            largeLabelText: true,
            icon: (
              <div className="fill-black">
                <SvgIcon path={icon.exit} {...cardIconSize} />
              </div>
            ),
            iconColorVariant: "ash",
            additionalInfo: { right: { text: "Last 30 days" } },
          },
        ]}
        gridItemSize={{ xs: 12, sm: 6, md: 3 }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SectionCardContainer isCard title="Employment Type Distribution">
          <PieChart
            chartLabels={chartLabels}
            chartValues={chartValues}
            chartColors={chartColors}
          />
        </SectionCardContainer>
        <SectionWithCards
          isCard
          title="Attendance Overview"
          period="See all"
          periodClick={() =>
            router.push(
              route.hrAdmin.employeeManagement.attendanceManagement.home
            )
          }
          selectFilterProps={{
            type: "select",
            defaultValue: 0,
            options: [{ label: "Today", value: 0 }],
          }}
          cardsGroup={{
            gridItemSize: { xs: 12, sm: 6 },
            cards: [
              {
                value: `${190} hours`,
                labelText: "Total Working Hours",
                icon: cardIcon,
                iconColorVariant: cardIconColorVariant,
              },
              {
                value: `${8} hours`,
                labelText: "Avg working hrs per Employee",
                icon: cardIcon,
                iconColorVariant: cardIconColorVariant,
              },
              {
                value: `${4}%`,
                labelText: "Absenteeism Rate",
                icon: cardIcon,
                iconColorVariant: cardIconColorVariant,
              },
              {
                value: 26,
                labelText: "Total Working Hours",
                icon: cardIcon,
                iconColorVariant: cardIconColorVariant,
              },
            ],
          }}
        />
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <SectionCardContainer
            isCard
            title="Pending Approval Requests"
            period="View all"
            periodClick={() =>
              router.push(
                route.hrAdmin.employeeManagement.approvalManagement.home
              )
            }
          >
            <PendingApprovalRequests
              requests={[
                { title: "Leave Request", from: "John Emmanuel - HR" },
                { title: "Job Offer", from: "Kingsley Donals - HR" },
                { title: "Promotion Request", from: "Femi David - IT" },
                { title: "Expense Approval", from: "Marketing Campaign" },
              ]}
              type="actions"
              actions={[
                { name: "View Details", onClick: () => {} },
                { name: "Approve", onClick: () => {} },
                { name: "Reject", onClick: () => {} },
              ]}
            />
          </SectionCardContainer>
        </div>
      </div>
      <Table
        title="Employee Directory"
        hasActionsColumn
        headerRowData={[
          "Employee Full Name",
          "Staff ID",
          "Email Address",
          "Job Title",
          "Department",
          "Permissions",
        ]}
        bodyRowData={employees}
        fieldTypes={[
          ...Array(4).fill(FieldType.text),
          FieldType.status,
          FieldType.permissions,
        ]}
        displayedFields={[
          "name",
          "staffID",
          "email",
          "jobTitle",
          "department",
          "permissions",
        ]}
        statusMap={statusMap}
        //TODO: Notify backend to allow department and position filtering
        // filters={
        //   [
        //     // {
        //     //   name: "Deparment",
        //     //   items: ["All", "Sales"],
        //     // },
        //     // {
        //     //   name: "Position",
        //     //   items: ["All", "Regional Manager"],
        //     // },
        //   ]
        // }
        actions={[
          {
            name: "Edit Employee Details",
            onClick: () => {},
            onDataReturned: (id) =>
              router.push(
                `${route.hrAdmin.employeeManagement.directory.editEmployee}/${id}`
              ),
          },
          {
            name: "View Employee Details",
            onClick: () => {},
            onDataReturned: (id) =>
              router.push(
                `${route.hrAdmin.employeeManagement.directory.home}/${id}`
              ),
          },
          {
            name: "Terminate Employee",
            onClick: () => setOpenTerminateEmployeeModal(true),
          },
        ]}
        fieldToReturnOnActionItemClick="id"
        onPermissionsClick={(permissions, id) => {
          const foundEmployee = employees?.filter(
            (employee) => employee.id === id
          )?.[0];
          setSelectedEmployee(foundEmployee);
          setOpenPermissionsModal(true);
        }}
        onSearch={(query) => setFetchParams({ ...fetchParams, search: query })}
        paginationMeta={{
          ...myEmployees?.meta,
          itemsOnPage: employees?.length,
          loading: employees ? false : true,
          onChangeLimit: (limit) =>
            setFetchParams({ ...fetchParams, limit: limit }),
          onPrevClick: () =>
            setFetchParams({ ...fetchParams, page: fetchParams.page - 1 }),
          onNextClick: () =>
            setFetchParams({ ...fetchParams, page: fetchParams.page + 1 }),
        }}
      />
      {openTerminateEmployeeModal && (
        <Modal
          open={openTerminateEmployeeModal}
          onClose={() => setOpenTerminateEmployeeModal(false)}
          title="Terminate Employee"
          subtitle="If you terminate employee, they will no longer show on your employee list"
          form={{
            gridSpacing: 3,
            inputFields: [
              {
                label: "Employee Name",
                type: "text",
                disabled: true,
                placeholder: "Salem Moses",
              },
              {
                label: "Termination Date",
                type: "date",
              },
              {
                label: "Reason for Termination",
                type: "text",
              },
              {
                label: "Exit Interview Notes",
                type: "drag-upload",
              },
            ],
          }}
          buttonOne={{
            type: ButtonType.outlined,
            text: "Cancel",
          }}
          buttonTwo={{
            type: ButtonType.deleteContained,
            text: "Terminate",
            onClick: () => {
              setOpenTerminateEmployeeModal(false);
              setOpenTerminationToast(true);
            },
          }}
        />
      )}
      {openPermissionsModal && (
        <Modal
          open={openPermissionsModal}
          // open={true}
          onClose={() => {
            setOpenPermissionsModal(false);
            // setSelectedEmployee(undefined);
          }}
          title="Permissions"
          subtitle="See assigned permissions below"
          form={{
            gridSpacing: 2,
            inputFields: [
              {
                label: "Work Email",
                type: "text",
                value: selectedEmployee?.workEmail,
                disabled: true,
              },
              {
                type: "add-items",
                addItemsProps: {
                  gridCols: { xs: 1, sm: 2, md: 2, lg: 2 },
                  addText: "Add More Permissions",
                  addedItems: selectedEmployee?.permissions,
                  allItems: ["Behance", "Mailchimp", "Figma", "Slack"],
                  showFieldLabels: true,
                },
              },
            ],
          }}
          buttonOne={{
            type: ButtonType.outlined,
            text: "Save Permissions",
          }}
          centerButton
        />
      )}
      {openTerminationToast && (
        <Toast
          open={openTerminationToast}
          onClose={() => setOpenTerminationToast(false)}
          status="Successful"
          message="Employee has been terminated successfully"
          icon={icon.checkCircle}
          type="success"
        />
      )}
    </Page>
  );
};

export default HrAdminEmployeeDirectory;
