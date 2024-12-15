"use client";
import Appbutton from "@/app/_components/shared/buttons";
import { Stack, Box, Grid2 } from "@mui/material";
import Image from "next/image";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { LuClock3 } from "react-icons/lu";
import { PiChartLineUp } from "react-icons/pi";
import { FaCheck } from "react-icons/fa";
import { useRouter } from "next/navigation";






const OverViewSection = () => {
const router = useRouter();

  const overviewContents = [
    {
      color: "#DEE3FF",
      title: "Total New Hire",
      count: 327,
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
        <Box className=" flex items-center justify-between">
          <h3 className="section-heading xl:block hidden">Overview</h3>
          <Appbutton
            buttonText="Onboarding Templates"
            className="bg-primary hidden md:block"
            onClick={() => router.push("/hr-admin/onboarding/template")}
          />
        </Box>

        <Grid2 columnSpacing={2} rowSpacing={2} container>
          {overviewContents.map((content) => (
            <Grid2
              key={content.title}
              size={{ xs: 12, sm: 6, md: 3 }}
              className="border-[1.13px] border-card-border bg-white p-3 md:p-5 rounded-[12.56px]"
            >
              <Stack gap={3}>
                <Stack direction="row" alignItems="center" gap={2}>
                  <Box
                    className={`p-1 rounded-full text-center flex justify-center`}
                    sx={{ backgroundColor: content.color }}
                  >
                    <Image
                      src="/icons/task-square-bold.svg"
                      alt=""
                      width={13.56}
                      height={13.56}
                    />
                  </Box>
                  <Box className="text-base font-semibold text-[#1B1B1B]">
                    {" "}
                    {content.title}
                  </Box>
                </Stack>

                <Box className="text-[33.48px] font-bold text-[#1B1B1B]">
                  {content.count}
                </Box>
              </Stack>
            </Grid2>
          ))}
        </Grid2>
      </Stack>
    </Stack>
  );
};

export default OverViewSection;
