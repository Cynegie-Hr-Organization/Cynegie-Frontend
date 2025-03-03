// hooks/useJobCandidateMetrics.ts
"use client";

import { getJobCandidateMetrics, JobCandidateMetrics } from "@/app/api/services/candidate";
import { useState, useEffect } from "react";

export const useJobCandidateMetrics = () => {
  const [metrics, setMetrics] = useState<JobCandidateMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const data = await getJobCandidateMetrics();
        // Ensure the response matches the expected interface
        setMetrics({
          total: data.total,
          counts: {
            Applied: data.counts.Applied || 0, 
            Interviewed: data.counts.Interviewed || 0,   
            Hired: data.counts.Hired || 0, 
            Screened: data.counts.Screened || 0,     
          },
        });
      } catch (err) {
        console.error(err);
        setError("Failed to fetch job candidate metrics");
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  return { metrics, loading, error };
};