import { FaCode, FaCheck } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import { GiProgression } from "react-icons/gi";

interface OverviewPanel {
  icon: React.ReactNode;
  header: string;
  span: string;
}

export const overviewPanel: OverviewPanel[] = [
  {
    icon: <FaCode />,
    header: "Total New Hire",
    span: "327",
  },
  {
    icon: <IoMdTime />,
    header: "Pending",
    span: "304",
  },
  {
    icon: <GiProgression />,
    header: "In progress",
    span: "56",
  },
  {
    icon: <FaCheck />,
    header: " Completed",
    span: "23",
  },
];
