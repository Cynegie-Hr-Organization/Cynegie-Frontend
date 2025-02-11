import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { getAllMetrics } from "@/app/api/services/employee/learning";
import { SummaryCard } from "@/types";
import { color } from "@/constants";

const useSummaryCardsData = () => {
  const [summaryCardsData, setSummaryCardsData] = useState<SummaryCard[]>([
    {
      value: 0,
      iconColorVariant: "success",
      labelText: "Course Completed",
      valueLineColor: color.success.dark,
    },
    {
      value: 0,
      iconColorVariant: "warning",
      labelText: "Course In Progress",
      valueLineColor: color.warning.dark,
    },
    {
      value: 0,
      iconColorVariant: "error",
      labelText: "Course Overdue",
      valueLineColor: color.error.dark,
    },
    {
      value: 0,
      iconColorVariant: "info",
      labelText: "Certification Received",
      valueLineColor: color.info.dark,
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetricsMutation = useMutation({
    mutationFn: getAllMetrics,
    onSuccess: (response) => {
      console.log("Metrics fetched successfully:", response);
      const metrics = response[0];
      console.log("Metrics:", metrics.completedCourses);
      setSummaryCardsData([
        {
          value: metrics.completedCourses,
          iconColorVariant: "success",
          labelText: "Course Completed",
          valueLineColor: color.success.dark,
        },
        {
          value: metrics.activeCourses,
          iconColorVariant: "warning",
          labelText: "Course In Progress",
          valueLineColor: color.warning.dark,
        },
        {
          value: metrics.cancelledCourses,
          iconColorVariant: "error",
          labelText: "Course Overdue",
          valueLineColor: color.error.dark,
        },
        {
          value: metrics.totalCourses,
          iconColorVariant: "info",
          labelText: "Certification Received",
          valueLineColor: color.info.dark,
        },
      ]);
      setIsLoading(false);
    },
    onError: (error) => {
      console.error("Failed to fetch metrics:", error);
      setError("Failed to fetch metrics. Please try again later.");
      setIsLoading(false);
    },
  });

  useEffect(() => {
    fetchMetricsMutation.mutate();
  }, []);

  return { summaryCardsData, isLoading, error };
};

export default useSummaryCardsData;
