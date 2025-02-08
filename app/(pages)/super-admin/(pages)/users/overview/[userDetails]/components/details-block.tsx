import Link from "next/link";
import Skeleton from "react-loading-skeleton";

const DetailBlock = ({ label, value, labelClassName, valueClassName, isLoading, isLink }: {
  label: string;
  value: string;
  labelClassName?: string;
  valueClassName?: string;
  isLoading?: boolean;
  isLink?: boolean;
}) => {

  return (
    <div className="space-y-1 text-sm">
      <p className={`font-semibold text-gray-400 ${labelClassName ?? ''}`}>{label}</p>
      {isLoading ? (
        <Skeleton />
      ) : (
        isLink ? (
          <Link href={value} target="_blank" className={`font-semibold text-black ${valueClassName ?? ''}`}>{value}</Link>
        ) : (
          <p className={`font-semibold text-black ${valueClassName ?? ''}`}>{value}</p>
        )
      )
      }
    </div >
  )
}


export default DetailBlock;