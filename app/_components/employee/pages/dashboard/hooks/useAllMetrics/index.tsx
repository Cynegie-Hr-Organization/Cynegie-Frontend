import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { getAllDeviceRequest } from "@/app/api/services/employee/device-management";
import { getAllMyAppRequest } from "@/app/api/services/employee/app-request";
import { DeviceRequest, FetchParams } from "@/types";

export type AppRequest = {
  employee: string;
  appId: {
    appName: string;
    id: string;
  };
  status: string;
  reasonForRequest: string;
  company: string;
  requestDate: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
};

const INIT_FETCH_PARAMS: FetchParams = {
  page: 1,
  limit: 10,
  sortOrder: "asc",
};

const useRequests = () => {
  const [deviceRequests, setDeviceRequests] = useState<DeviceRequest[]>([]);
  const [appRequests, setAppRequests] = useState<AppRequest[]>([]);
  const [isDeviceLoading, setIsDeviceLoading] = useState(true);
  const [isAppLoading, setIsAppLoading] = useState(true);
    const [fetchParams] = useState<FetchParams>(INIT_FETCH_PARAMS);


   const fetchDeviceRequestsMutation = useMutation({
    mutationFn: () => getAllDeviceRequest("asc", 1, 10),
    onSuccess: (response) => {
      console.log("Device requests fetched successfully:", response);
      if (response?.requests) {
        const sortedRequests = response.requests.sort(
          (a: DeviceRequest, b: DeviceRequest) =>
            new Date(a.requestedDate).getTime() -
            new Date(b.requestedDate).getTime(),
        );
        setDeviceRequests(sortedRequests);
      } else {
        console.warn("No device requests found in the response.");
      }
      setIsDeviceLoading(false);
    },
    onError: (error) => {
      console.error("Failed to fetch device requests:", error);
      setIsDeviceLoading(false);
    },
  });

  const fetchAppRequestsMutation = useMutation({
    mutationFn: () => getAllMyAppRequest(fetchParams),
    onSuccess: (response) => {
      console.log("App requests fetched successfully:", response);
      setAppRequests(response?.data);
      setIsAppLoading(false);
    },
    onError: (error) => {
      console.error("Failed to fetch app requests:", error);
      setIsAppLoading(false);
    },
  });

  useEffect(() => {
    fetchDeviceRequestsMutation.mutate();
    fetchAppRequestsMutation.mutate();
  }, [fetchAppRequestsMutation, fetchDeviceRequestsMutation]);

  return { deviceRequests, appRequests, isDeviceLoading, isAppLoading };
};

export default useRequests;
