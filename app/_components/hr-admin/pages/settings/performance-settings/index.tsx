import { useState } from "react";
import Image from "next/image";

export default function PerformanceSettingComponent() {
  const [weights, setWeights] = useState({
    selfAssessment: 20,
    managerAssessment: 40,
    goals: 25,
    feedback: 15,
  });

  const [ratingWeights, setRatingWeights] = useState([20, 40, 60, 80, 100]);
  const [ratingTiers, setRatingTiers] = useState([
    { range: "Below 60%", rating: "Needs Improvement" },
    { range: "60% - 74%", rating: "Meets Expectations" },
    { range: "75% - 89%", rating: "Exceeds Expectations" },
    { range: "90 - 100%", rating: "Outstanding" },
  ]);
  const [newTier, setNewTier] = useState({ range: "", rating: "" });
  const [showNewTierInputs, setShowNewTierInputs] = useState(false);

  const totalWeight =
    weights.selfAssessment +
    weights.managerAssessment +
    weights.goals +
    weights.feedback;

  const handleChange = (key: string, value: number) => {
    setWeights((prev) => ({ ...prev, [key]: value }));
  };

  const handleRatingWeightChange = (index: number, value: number) => {
    setRatingWeights((prev) => {
      const newWeights = [...prev];
      newWeights[index] = value;
      return newWeights;
    });
  };

  const handleAddNewTier = () => {
    setRatingTiers((prev) => [...prev, newTier]);
    setNewTier({ range: "", rating: "" });
    setShowNewTierInputs(false);
  };

  return (
    <div className="p-2 mx-auto bg-white w-full rounded-lg mt-6">
      <h2 className="text-sm font-semibold mb-4">
        Set Weight for Performance Factors
      </h2>
      <p className="text-gray-600 text-xs mb-4">
        Define how each factor contributes to the final performance score
      </p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {Object.entries(weights).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {key.replace(/([A-Z])/g, " $1")} Weight
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => handleChange(key, Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        ))}
      </div>

      <div className="flex items-center text-green-600 mb-4">
        <Image
          src="/good-icon.svg"
          alt="good"
          className="mr-2"
          width={30}
          height={30}
        />
        <span className="font-medium">{totalWeight}%</span>
      </div>
      <p className="text-gray-600 mb-6">Total weight must sum to 100%</p>

      <h2 className="text-sm font-semibold mb-4">Set Rating Weight</h2>
      <p className="text-gray-600 text-xs mb-4">
        Assign percentage values to each rating level
      </p>

      <table className="w-full border-collapse border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">Rating (1 - 5)</th>
            <th className="border p-2 text-left">Weight (%)</th>
          </tr>
        </thead>
        <tbody>
          {ratingWeights.map((weight, index) => (
            <tr key={index} className="border">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <input
                  type="number"
                  value={weight}
                  onChange={(e) =>
                    handleRatingWeightChange(index, Number(e.target.value))
                  }
                  className="w-full px-2 py-1 "
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center text-green-600 my-4">
        <Image
          src="/good-icon.svg"
          alt="good"
          className="mr-2"
          width={30}
          height={30}
        />
        <span className="font-medium">100%</span>
      </div>
      <p className="text-gray-600 mb-6">Total weight must sum to 100%</p>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold mb-4">
            Set Weight for Performance Rating Scale
          </h2>
          <p className="text-gray-600 text-xs mb-4">
            Define how employee performance is categorized based on total score
          </p>
        </div>
        <div>
          <button
            className="text-primary font-bold py-2 px-4 rounded"
            onClick={() => setShowNewTierInputs(true)}
          >
            Add New Rating Tier
          </button>
        </div>
      </div>

      {showNewTierInputs && (
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Score Range (%)
              </label>
              <input
                type="text"
                value={newTier.range}
                onChange={(e) =>
                  setNewTier({ ...newTier, range: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Final Rating
              </label>
              <input
                type="text"
                value={newTier.rating}
                onChange={(e) =>
                  setNewTier({ ...newTier, rating: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <button
            className={`text-white font-bold py-2 px-4 rounded ${
              !newTier.range.trim() || !newTier.rating.trim()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary"
            }`}
            onClick={handleAddNewTier}
            disabled={!newTier.range.trim() || !newTier.rating.trim()}
          >
            Save Rating Tier
          </button>
        </div>
      )}

      <table className="w-full border-collapse border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">Score Range (%)</th>
            <th className="border p-2 text-left">Final Rating</th>
          </tr>
        </thead>
        <tbody>
          {ratingTiers.map(({ range, rating }, index) => (
            <tr key={index} className="border">
              <td className="border p-2">{range}</td>
              <td className="border p-2">{rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
