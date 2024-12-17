type TableCellProps = {
  value?: string | number;
};

const TableTextCell: React.FC<TableCellProps> = ({ value }) => {
  return <>{value}</>;
};

export default TableTextCell;
