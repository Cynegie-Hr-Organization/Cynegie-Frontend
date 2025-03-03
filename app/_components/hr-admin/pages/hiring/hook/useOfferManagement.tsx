// hooks/useJobCandidateMetrics.ts
"use client";

import { getJobOfferMetrics, JobOfferMetrics } from "@/app/api/services/job-offer";
import { useState, useEffect } from "react";

export const useOfferManagementMetrics = () => {
  const [metrics, setMetrics] = useState<JobOfferMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const data = await getJobOfferMetrics();
        // Ensure the response matches the expected interface
        setMetrics({
          total: data.total,
          counts: {
            Pending: data.counts.Pending || 0, 
            Withdrawn: data.counts.Withdrawn || 0,   
            Accepted: data.counts.Accepted || 0, 
            Rejected: data.counts.Rejected || 0,     
          },
        });
        console.log(`my metrics ${data}`);
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