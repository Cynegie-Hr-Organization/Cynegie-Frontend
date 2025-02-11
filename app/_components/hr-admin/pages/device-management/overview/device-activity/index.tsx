import Dot from "@/app/_components/shared/dot";
import { color } from "@/constants";

type DeviceActivityProps = {
  name: string;
  date: string;
};

const DeviceActivity: React.FC<DeviceActivityProps> = ({ name, date }) => {
  return (
    <div className="flex items-center gap-4">
      <Dot color={color.info.dark} width={16} height={16} />
      <div>
        <div>
          You assigned Device to <span className="font-bold">{name}</span>
        </div>
        <div className="tiny-text" style={{ color: color.info.dark }}>
          {date}
        </div>
      </div>
    </div>
  );
};

export default DeviceActivity;
