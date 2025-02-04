import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getAllDeviceRequest } from '@/app/api/services/employee/device-management';
import { getAllMyAppRequest } from '@/app/api/services/employee/app-request';
import { DeviceRequest } from '@/types';

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
  id: string;
};

const useRequests = () => {
  const [deviceRequests, setDeviceRequests] = useState<DeviceRequest[]>([]);
  const [appRequests, setAppRequests] = useState<AppRequest[]>([]);
  const [isDeviceLoading, setIsDeviceLoading] = useState(true);
  const [isAppLoading, setIsAppLoading] = useState(true);

  const fetchDeviceRequestsMutation = useMutation({
    mutationFn: () => getAllDeviceRequest("asc", 1, 10),
    onSuccess: (response) => {
      console.log('Device requests fetched successfully:', response);
      const sortedRequests = response.requests.sort(
        (a: DeviceRequest, b: DeviceRequest) => new Date(a.requestedDate).getTime() - new Date(b.requestedDate).getTime()
      );
      setDeviceRequests(sortedRequests);
      setIsDeviceLoading(false);
    },
    onError: (error) => {
      console.error('Failed to fetch device requests:', error);
      setIsDeviceLoading(false);
    },
  });

  const fetchAppRequestsMutation = useMutation({
    mutationFn: () => getAllMyAppRequest("asc", 1, 10),
    onSuccess: (response) => {
      console.log('App requests fetched successfully:', response);
      setAppRequests(response.data.items);
      setIsAppLoading(false);
    },
    onError: (error) => {
      console.error('Failed to fetch app requests:', error);
      setIsAppLoading(false);
    },
  });

  useEffect(() => {
    fetchDeviceRequestsMutation.mutate();
    fetchAppRequestsMutation.mutate();
  }, []);

  return { deviceRequests, appRequests, isDeviceLoading, isAppLoading };
};

export default useRequests;