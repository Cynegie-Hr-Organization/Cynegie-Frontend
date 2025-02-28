import { PageProps } from "@/app/_components/shared/page/types";
import { FieldType, TableProps } from "@/app/_components/shared/table/types";
import { CISStatusMap, route } from "@/constants";
import { useRouter } from "next/navigation";

const useManagerDevelopmentPlanPage = () => {
  const router = useRouter();
  const pageData: PageProps = {
    backText: "Back to Performance Management",
    onBackTextClick: () =>
      router.push(route.employee.performanceManagement.home),
    title: "Development Plan",
    smallHeading: true,
  };

  const tableData: TableProps = {
    headerRowData: ["Plan Name", "Start Date", "End Date", "Status"],
    bodyRowData: Array(5)
      .fill({
        name: "Leadership Skills",
        startDate: "18 July 2024",
        endDate: "28 July 2024",
        status: "In Progress",
      })
      .map((row) => ({ ...row, ["view-details"]: "view-details" })),
    fieldTypes: [
      FieldType.link,
      ...Array(2).fill(FieldType.text),
      FieldType.status,
    ],
    displayedFields: ["name", "startDate", "endDate", "status"],
    statusMap: CISStatusMap,
    filters: [
      {
        name: "Status",
        items: ["All", "Completed", "In Progress", "Not Started"],
      },
    ],
    fieldToGetSlug: "view-details",
  };
  return { pageData, tableData };
};

export default useManagerDevelopmentPlanPage;
