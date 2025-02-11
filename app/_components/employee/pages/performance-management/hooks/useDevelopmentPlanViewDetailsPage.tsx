import { DetailGroupProps } from "@/app/_components/shared/detail-group/types";
import { PageProps } from "@/app/_components/shared/page/types";
import { FieldType, TableProps } from "@/app/_components/shared/table/types";
import { CISStatusMap, route } from "@/constants";
import { useRouter } from "next/navigation";

const useDevelopmentPlanViewDetailsPage = () => {
  const router = useRouter();
  const pageData: PageProps = {
    backText: "Back to Development Plan",
    onBackTextClick: () =>
      router.push(route.employee.performanceManagement.developmentPlan),
  };
  const detailGroup: DetailGroupProps = {
    gridLayout: "development-plan",
    statusMap: CISStatusMap,
    details: [
      {
        name: "Plan",
        value: "Leadership Skills",
      },
      {
        name: "Start Date",
        value: "12 July 2024",
      },
      {
        name: "End Date",
        value: "12 July 2024",
      },
      {
        name: "Status",
        value: "In Progress",
        type: "status",
      },
    ],
  };
  const description =
    "Improve Leadership skills by developing and enhancing leadership abilities through targeted training and practical application";

  const tableData: TableProps = {
    hasActionsColumn: true,
    headerRowData: ["Actions", "Steps"],
    bodyRowData: Array(3).fill({
      actionStep: "Lead a team project",
      status: "In Progress",
    }),
    fieldTypes: [FieldType.text, FieldType.status],
    displayedFields: ["actionStep", "status"],
    statusMap: CISStatusMap,
    fieldToGetAction: "status",
    fieldActionMap: {
      "In Progress": [
        {
          name: "Mark as Complete",
          onClick: () => {},
        },
      ],
      "Not Started": [{ name: "Start", onClick: () => {} }],
    },
    filters: [
      {
        name: "Status",
        items: ["All", "Completed", "In Progress", "Not Started"],
      },
    ],
  };

  return { pageData, detailGroup, description, tableData };
};

export default useDevelopmentPlanViewDetailsPage;
