const DetailBlock = ({ label, value, labelClassName, valueClassName }: {
  label: string,
  value: string,
  labelClassName?: string,
  valueClassName?: string
}) => {

  return (
    <div className="space-y-1 text-xs">
      <p className={`font-semibold text-gray-400 ${labelClassName ?? ''}`}>{label}</p>
      <p className={`font-semibold text-black ${valueClassName ?? ''}`}>{value}</p>
    </div>
  )
}


export default DetailBlock;