"use client";

import React from "react";
import ItAdminHeader from "./header";
import OverviewCards from "@/app/_components/hr-admin/pages/hiring/cards/overview-card";
import Image from "next/image";
import RecentActivities from "./recent-activities";
import OverviewTabs from "./tabs";
import {
  useFetchDeviceMetrics,
  useFetchSecurityAlertsMetric,
} from "@/utils/it-admin/useFetchMetrics";

const ItAdminDashboard: React.FC = () => {
  const {
    data: securityAlertsData,
    isLoading: isSecurityLoading,
    isError: isSecurityError,
  } = useFetchSecurityAlertsMetric();
  const {
    data: deviceMetricsData,
    isLoading: isDeviceLoading,
    isError: isDeviceError,
  } = useFetchDeviceMetrics();

  if (isSecurityError || isDeviceError) {
    return (
      <div className="h-full w-full items-center flex justify-center">
        Error loading metrics
      </div>
    );
  }

  const { totalAlerts, recentAlerts = [] } = securityAlertsData || {};
  const { totalDevices, totalRequests } = deviceMetricsData || {};

  return (
    <div className="space-y-4">
      <ItAdminHeader />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="col-span-2 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-2">
          <OverviewCards
            icon={
              <Image
                src="/open-positions.svg"
                alt="Devices Icon"
                width={30}
                height={30}
              />
            }
            title="Total Devices"
            value={totalDevices ? totalDevices.toString() : "0"} // Display total devices
            loading={isDeviceLoading}
          />

          <OverviewCards
            icon={
              <Image
                src="/total-candiate.svg"
                alt="Requests Icon"
                width={30}
                height={30}
              />
            }
            title="Total Requests"
            value={totalRequests ? totalRequests.toString() : "0"} // Display total requests
            loading={isDeviceLoading}
          />

          <OverviewCards
            icon={
              <Image
                src="/total-candiate.svg"
                alt="Active Software Licenses Icon"
                width={30}
                height={30}
              />
            }
            title="Active Software Licenses"
            value="2"
            loading={isSecurityLoading}
          />

          <OverviewCards
            icon={
              <Image
                src="/padlockAvatar.svg"
                alt="Recent Security Alert Icon"
                width={30}
                height={30}
              />
            }
            title="Recent Security Alerts"
            value={totalAlerts ? totalAlerts.toString() : "0"} // Display total alerts
            loading={isSecurityLoading}
          />
        </div>
        <div className="hidden md:block md:col-span-1">
          {/* Pass loading state to RecentActivities */}
          <RecentActivities
            recentAlerts={recentAlerts}
            isLoading={isSecurityLoading}
          />
        </div>
      </div>
      <div className="w-full">
        <OverviewTabs />
      </div>
    </div>
  );
};

export default ItAdminDashboard;
