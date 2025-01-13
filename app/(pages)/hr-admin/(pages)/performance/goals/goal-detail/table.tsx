import React, { useState } from "react";
import { LuListFilter } from "react-icons/lu";
import { Checkbox } from "@/components/ui/checkbox";
import { RiSearchLine } from "react-icons/ri";
import { Goal, KeyResult, Milestone } from "@/types";

type GoalDetailTableProps = {
  keyResults: KeyResult[];
  milestones: Milestone[];
  goaldata: Goal;
};

const GoalDetailTable = ({
  keyResults,
  milestones,
  goaldata,
}: GoalDetailTableProps) => {
  const [selectedTab, setSelectedTab] = useState<"keyResults" | "milestones">(
    "keyResults",
  );

  return (
    <div className="space-y-4">
      {/* Tab buttons */}
      <div className="flex">
        <button
          className={`px-4 py-2 text-sm font-semibold rounded-t-lg ${
            selectedTab === "keyResults"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "border-b-2 border-gray-300 text-gray-700"
          }`}
          onClick={() => setSelectedTab("keyResults")}
        >
          Key Results
        </button>
        <button
          className={`px-4 py-2 text-sm font-semibold rounded-t-lg ${
            selectedTab === "milestones"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "border-b-2 border-gray-300 text-gray-700"
          }`}
          onClick={() => setSelectedTab("milestones")}
        >
          Milestones
        </button>
      </div>

      {/* Tab content */}
      <div className="w-full mt-4">
        {selectedTab === "keyResults" ? (
          <KeyResultsTable keyResults={keyResults} />
        ) : (
          <MilestonesTable milestones={milestones} goalData={goaldata} />
        )}
      </div>
    </div>
  );
};

const KeyResultsTable = ({ keyResults }: { keyResults: KeyResult[] }) => {
  return (
    <div className="common-card overflow-x-scroll">
      <div className="flex mb-3 flex-col md:flex-row items-start md:items-center justify-between w-full gap-4 md:gap-0">
        <div className="flex-grow max-w-[300px] xl:max-w-[479px] flex items-center border pl-4 border-gray-300 rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-1 focus-within:border-primary focus-within:ring-primary">
          <RiSearchLine className="text-gray-400" />
          <input
            type="text"
            placeholder="Search here..."
            className="w-full h-9 px-2 outline-none"
          />
        </div>

        <button
          type="button"
          className="text-gray-400 font-bold flex gap-2 items-center border rounded-lg px-4 py-2"
        >
          <LuListFilter /> Filter
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead className="bg-[#F7F9FC]">
          <tr>
            <th className="px-6 py-3 text-left">
              <Checkbox className={"rounded-md border-gray-300"} />
            </th>
            <th className="px-4 py-3 text-left">Key Results</th>
            <th className="px-4 py-3 text-left">Target</th>
            <th className="px-4 py-3 text-left">Due Date</th>
            <th className="px-4 py-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {keyResults.map((keyResult) => {
            const percentage = (keyResult.targetValue / 100) * 100; // Assuming targetValue is a percentage
            return (
              <tr
                key={keyResult.id}
                className="border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054]"
              >
                <td className="px-6 py-4">
                  <Checkbox className={"rounded-md border-gray-300"} />
                </td>
                <td className="px-4 py-4">
                  <p className="text-sm">{keyResult.result}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="text-sm">{keyResult.targetValue}%</p>
                </td>
                <td className="px-4 py-4">
                  <p className="text-sm truncate">
                    {new Date(keyResult.dueDate).toLocaleDateString()}
                  </p>
                </td>
                <td className="px-4 py-4">
                  <Progress percentage={percentage} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const MilestonesTable = ({
  milestones,
  goalData,
}: {
  milestones: Milestone[];
  goalData: Goal;
}) => {
  return (
    <div className="common-card overflow-x-scroll">
      <div className="flex mb-3 flex-col md:flex-row items-start md:items-center justify-between w-full gap-4 md:gap-0">
        <div className="flex-grow max-w-[300px] xl:max-w-[479px] flex items-center border pl-4 border-gray-300 rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-1 focus-within:border-primary focus-within:ring-primary">
          <RiSearchLine className="text-gray-400" />
          <input
            type="text"
            placeholder="Search here..."
            className="w-full h-9 px-2 outline-none"
          />
        </div>

        <button
          type="button"
          className="text-gray-400 font-bold flex gap-2 items-center border rounded-lg px-4 py-2"
        >
          <LuListFilter /> Filter
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead className="bg-[#F7F9FC]">
          <tr>
            <th className="px-6 py-3 text-left">
              <Checkbox className={"rounded-md border-gray-300"} />
            </th>
            <th className="px-4 py-3 text-left">Milestone</th>
            <th className="px-4 py-3 text-left">Due Date</th>
            <th className="px-4 py-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {milestones.map((milestone) => {
            const now = new Date();
            const dueDate = new Date(milestone.dueDate);
            const totalDuration = dueDate.getTime() - now.getTime(); // Total time between now and dueDate
            const timeElapsed =
              now.getTime() - new Date(goalData.createdAt).getTime();

            // If dueDate has passed or it's ongoing, calculate percentage progress
            const percentage =
              totalDuration <= 0
                ? 100
                : Math.min((timeElapsed / totalDuration) * 100, 100);

            return (
              <tr
                key={milestone.id}
                className="border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054]"
              >
                <td className="px-6 py-4">
                  <Checkbox className={"rounded-md border-gray-300"} />
                </td>
                <td className="px-4 py-4">
                  <p className="text-sm">{milestone.milestoneName}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="text-sm truncate">
                    {new Date(milestone.dueDate).toLocaleDateString()}
                  </p>
                </td>
                <td className="px-4 py-4">
                  <Progress percentage={percentage} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const Progress = ({ percentage }: { percentage: number }) => {
  return (
    <div className="text-xs space-y-1 text-gray-700">
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <span
          className="bg-primary h-full block transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></span>
      </div>
      <div className="flex items-center justify-between">
        <p>Achieved {percentage}%</p>
        <p>{percentage}%</p>
      </div>
    </div>
  );
};

export default GoalDetailTable;
