import Dot from "@/app/_components/shared/dot";

type DotLegend = {
  type?: "meeting-indicator";
  dotColor?: string;
  label?: string;
  value?: number;
  countedItemName?: string;
  isPercentage?: boolean;
  boldValue?: boolean;
};

const DotLegend: React.FC<DotLegend> = (props) => {
  const isMeetingIndicator = props.type === "meeting-indicator";
  return (
    <div className="flex justify-between gap-5 items-center font-normal text-sm text-[#1A1919] ">
      <div className="flex items-center gap-2">
        <Dot
          color={props.dotColor}
          width={isMeetingIndicator ? 8 : 18.29}
          height={isMeetingIndicator ? 8 : 18.36}
        />
        <div className={`${isMeetingIndicator && "text-[#5C6675]"} capitalize`}>
          {props.label}
        </div>
      </div>
      {props.value && (
        <div className={`${props.boldValue && "font-bold"}`}>{`${
          props.value ?? ""
        }${props.isPercentage ? "%" : ""} ${
          props.countedItemName &&
          props.countedItemName + (props.value == 1 ? "" : "s")
        }`}</div>
      )}
    </div>
  );
};

export default DotLegend;
