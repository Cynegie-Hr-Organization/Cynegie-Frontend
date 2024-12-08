import {
  fetchDeviceAndRequestMetric,
  fetchSecurityAlertsMetric,
} from "@/app/api/services/it-admin/metrics";
import { DeviceMetrics, SecurityAlertsAnalytics } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useFetchSecurityAlertsMetric = () => {
  const queryKey = ["securityAlertsMetric"];

  const { data, isLoading, isError, error, refetch } =
    useQuery<SecurityAlertsAnalytics>({
      queryKey,
      queryFn: fetchSecurityAlertsMetric,
      staleTime: 5 * 60 * 1000,
      retry: 2,
    });

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export const useFetchDeviceMetrics = () => {
  const queryKey = ["deviceMetrics"];

  const { data, isLoading, isError, error, refetch } = useQuery<DeviceMetrics>({
    queryKey,
    queryFn: fetchDeviceAndRequestMetric,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
};
