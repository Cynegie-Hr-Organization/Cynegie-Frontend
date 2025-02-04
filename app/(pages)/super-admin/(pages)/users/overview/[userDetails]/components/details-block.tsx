import Skeleton from "react-loading-skeleton";

const DetailBlock = ({ label, value, labelClassName, valueClassName, isLoading }: {
  label: string;
  value: string;
  labelClassName?: string;
  valueClassName?: string;
  isLoading?: boolean;
}) => {

  return (
    <div className="space-y-1 text-xs">
      <p className={`font-semibold text-gray-400 ${labelClassName ?? ''}`}>{label}</p>
      {isLoading ? (
        <Skeleton />
      ) : (
        <p className={`font-semibold text-black ${valueClassName ?? ''}`}>{value}</p>
      )
      }
    </div >
  )
}


export default DetailBlock;