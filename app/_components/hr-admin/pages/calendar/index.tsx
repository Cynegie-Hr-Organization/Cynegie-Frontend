"use client";
import BigCalendar from "@/app/_components/employee/pages/upcoming-widget/big-calendar";
import Page from "@/app/_components/shared/page";
import { route } from "@/constants";
import { useRouter } from "next/navigation";

const HrAdminCalendarPage = () => {
  const router = useRouter();
  return (
    <Page
      backText="Back to Dashboard"
      onBackTextClick={() => router.push(route.hrAdmin.dashboard)}
    >
      <BigCalendar />
    </Page>
  );
};

export default HrAdminCalendarPage;
