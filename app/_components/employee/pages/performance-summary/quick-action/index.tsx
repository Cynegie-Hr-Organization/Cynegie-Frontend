import SvgIcon from "@/app/_components/icons/container";

export type QuickActionProps = {
  icon: string | React.ReactElement;
  text: string;
  bgColor: string;
  color: string;
};

const QuickAction: React.FC<QuickActionProps> = ({
  icon,
  text,
  bgColor,
  color,
}) => {
  return (
    <div
      style={{ backgroundColor: bgColor, fill: color }}
      className="flex flex-col items-center justify-center gap-5 py-8"
    >
      {typeof icon === "string" ? (
        <SvgIcon path={icon} width={44} height={44} />
      ) : (
        <>{icon}</>
      )}
      <p>{text}</p>
    </div>
  );
};

export default QuickAction;
