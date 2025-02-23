"use client";
import Appbutton from "@/app/_components/shared/buttons";
import CardSkeleton from "@/app/_components/shared/skelentons/card";
import { useOnboardingData } from "@/app/_core/use-cases/hr-admin/useOnboarding";
import { Box, Grid2, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { FaCheck } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { LuClock3 } from "react-icons/lu";
import { PiChartLineUp } from "react-icons/pi";

const OverViewSection = () => {
  const { data, isLoading } = useOnboardingData();
  const { totalNewHires } = data ?? {};
  const router = useRouter();

  const overviewContents = [
    {
      color: "#DEE3FF",
      title: "Total New Hire",
      count: totalNewHires ?? "...",
      icon: <HiOutlineUserGroup />,
    },
    {
      color: "#DEE3FF",
      title: "Pending",
      count: 304,
      icon: <LuClock3 />,
    },
    {
      color: "#DEE3FF",
      title: "In progress",
      count: 56,
      icon: <PiChartLineUp />,
    },
    {
      color: "#DEE3FF",
      title: "Completed",
      count: 23,
      icon: <FaCheck />,
    },
  ];

  return (
    <Stack gap={3}>
      <Stack gap={2}>
        <Box className="flex items-center justify-between">
          <h3 className="text-base font-bold xl:block hidden">Overview</h3>
          <Appbutton
            buttonText="Onboarding Templates"
            className="bg-primary hidden md:block"
            onClick={() => router.push("/hr-admin/onboarding/template")}
          />
        </Box>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
            <CardSkeleton numberOfCards={overviewContents.length} />
          </div>
        ) : (
          <Grid2 columnSpacing={2} rowSpacing={2} container>
            {overviewContents.map((content) => (
              <Grid2
                key={content.title}
                size={{ xs: 12, sm: 6, md: 3 }}
                className="common-card"
              >
                <Stack gap={2}>
                  <Stack direction="row" alignItems="center" gap={2}>
                    <div
                      className="p-1 rounded-full text-center flex justify-center w-fit"
                      style={{ backgroundColor: content.color }}
                    >
                      {content.icon}
                    </div>
                    <p className="text-xs font-semibold text-[#1B1B1B]">
                      {content.title}
                    </p>
                  </Stack>

                  <p className="text-lg font-bold text-[#1B1B1B]">
                    {content.count}
                  </p>
                </Stack>
              </Grid2>
            ))}
          </Grid2>
        )}
      </Stack>
    </Stack>
  );
};

export default OverViewSection;
