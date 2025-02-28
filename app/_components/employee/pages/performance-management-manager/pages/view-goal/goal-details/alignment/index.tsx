import { AlignmentGoalDetailsProps } from "../types";
import AlignmentGoalDetailsChart from "./chart";

const AlignmentGoalDetails: React.FC<AlignmentGoalDetailsProps> = (props) => {
  const { alignedGoal, chart } = props;
  return (
    <div>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        <AlignmentGoalDetailsChart
          value={chart?.value}
          status={chart?.status}
        />
        <div className="flex flex-col gap-4">
          <p className="card-title-small">Aligment</p>
          <p>Aligns To</p>
          <p className="card-subtitle-small">
            <b>{`${alignedGoal?.type} : `}</b>
            {alignedGoal?.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlignmentGoalDetails;
