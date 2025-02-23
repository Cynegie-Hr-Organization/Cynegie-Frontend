"use client";

interface CardProps {
  title: string;
  value: string | React.JSX.Element;
  percentage: string;
  comment: string;
}

const Card: React.FC<CardProps> = ({ title, value, percentage, comment }) => {
  return (
    <div className="common-card text-sm space-y-8">
      <h3 className="text-sm font-semibold text-gray-500">{title}</h3>
      <div className="flex items-center justify-between gap-x-2">
        <p className="font-bold">{value}</p>
        <p className=" text-red-500">
          {percentage} <span className="text-gray-500">{comment}</span>
        </p>
      </div>
    </div>
  );
};

const GoalReportCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
      <Card
        title="Active Goals "
        value="50"
        percentage="50"
        comment="goals at risk"
      />

      <Card
        title="Company Goal Completion"
        value="50"
        percentage=""
        comment="Last 30 days"
      />

      <Card
        title="Department Goal Completion"
        value="72%"
        percentage=""
        comment="Last 30 days"
      />

      <Card
        title="Employee Goal Completion"
        value="50%"
        percentage=""
        comment="12 Pending approval"
      />
    </div>
  );
};

export default GoalReportCards;
