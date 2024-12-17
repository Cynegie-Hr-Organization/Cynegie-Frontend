'use client';

import { color } from '@/constants';
import { useRouter } from 'next/navigation';

type TableLinkCellProps = {
  value?: string | number;
  path?: string;
};

const TableLinkCell: React.FC<TableLinkCellProps> = ({ value, path }) => {
  const router = useRouter();
  return (
    <span
      className={`cursor-pointer text-[${color.info.dark}]`}
      onClick={() => router.push(path ?? '')}
    >
      {value}
    </span>
  );
};

export default TableLinkCell;
