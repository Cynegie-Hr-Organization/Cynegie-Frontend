import { color } from "@/constants";

type TableLessonCellProps = {
  value?: number;
};

const TableLessonCell: React.FC<TableLessonCellProps> = ({ value }) => {
  return (
    <>
      Lesson <span style={{ color: color.info.dark }}>{value}</span>
    </>
  );
};

export default TableLessonCell;
