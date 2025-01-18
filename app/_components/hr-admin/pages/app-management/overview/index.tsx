"use client";
import Modal from "@/app/_components/employee/modal";
import LegendSeries from "@/app/_components/employee/pages/attendance-and-time-tracking/leave-balance/legend/series";
import BarChart from "@/app/_components/employee/pages/attendance-and-time-tracking/total-hours-worked/chart";
import SvgIcon from "@/app/_components/icons/container";
import DoughnutChart from "@/app/_components/shared/charts/donut-chart";
import Page from "@/app/_components/shared/page";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import CardGroup from "@/app/_components/shared/section-with-cards/card-group";
import SectionCardContainer from "@/app/_components/shared/section-with-cards/container";
import {
  APRStatusMap,
  color,
  defaultDonutChartData,
  defaultDonutChartOptions,
  icon,
} from "@/constants";
import { useState } from "react";
import RecentRequestAccessCard from "./recent-access-card";
import { ChevronDown } from "lucide-react";
import Popover from "@/app/_components/shared/custom-popover";
import { PopoverType } from "@/app/_components/shared/custom-popover/types";
import SearchField from "@/app/_components/employee/input-fields/search";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const getIcon = (path: string) => {
  return <SvgIcon path={path} width={13.56} height={13.56} />;
};

const appUsageChartData = [
  { item: "Figma", usage: 200 },
  { item: "Zoom", usage: 180 },
  { item: "Excel", usage: 160 },
  { item: "Slack", usage: 140 },
  { item: "Notion", usage: 120 },
  { item: "Google Meet", usage: 100 },
];

const handleSearchQuery = (query: string) => {
    console.log("Search Query:", query); // Replace with actual search logic
  };

const extraDark = color.info.extraDark;
const dark = color.info.dark;
const light = color.info.light;

const mostUsedBarColors = [extraDark, dark, extraDark, dark, extraDark, dark];
const leastUsedBarColors = [dark, light, dark, light, dark, light];

const HrAdminAppManagementOverview = () => {
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [barColors, setBarColors] = useState(mostUsedBarColors);
  return (
    <Page
      title="App Dashboard"
      hasButtons
      rightButton={{
        type: ButtonType.outlined,
        text: "Actions",
        popoverOptions: [
          {
            name: "Request App Access",
            onClick: () => setOpenRequestModal(true),
          },
          { name: "App Usage Reports", onClick: () => {} },
          { name: "App Inventory", onClick: () => {} },
        ],
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-4">
        <div className="flex flex-col gap-6 col-span-1 md:col-span-4">
          <div className="flex flex-col gap-4 ">
            <div className="card-title-large">Overview</div>
            <CardGroup
              gridItemSize={{ xs: 12, sm: 4 }}
              cards={[
                {
                  labelText: "Total Apps",
                  value: 20,
                  valueBelow: true,
                  largeLabelText: true,
                  icon: getIcon(icon.taskSquare),
                  iconColorVariant: "purple",
                },
                {
                  labelText: "Active Apps",
                  value: 15,
                  denominator: 20,
                  valueBelow: true,
                  largeLabelText: true,
                  icon: (
                    <div className="fill-black">{getIcon(icon.statusUp)}</div>
                  ),
                  iconColorVariant: "success",
                },
                {
                  labelText: "Inactive Apps",
                  value: 5,
                  denominator: 20,
                  valueBelow: true,
                  largeLabelText: true,
                  icon: getIcon(icon.documentCode),
                  iconColorVariant: "ash",
                },
              ]}
            />
          </div>
          <BarChart
            title="Summary Statistic"
            isCard
            inputFields={[
              {
                type: "select",
                defaultValue: 0,
                options: [
                  { label: "Most Used", value: 0 },
                  { label: "Least Used", value: 1 },
                ],
                getCurrentValue: (value) =>
                  setBarColors(
                    value === 0 ? mostUsedBarColors : leastUsedBarColors,
                  ),
              },
            ]}
            data={appUsageChartData}
            bars={[{ dataKey: "usage" }]}
            hasLegend={false}
            chartLayout="vertical"
            xAxisType="number"
            yAxisDataKey="item"
            yAxisType="category"
            xAxisDataKey="usage"
            hideXAxis
            removeCartesianGrid
            barRadius={[0, 6, 6, 0]}
            barColors={barColors}
            chartMargin={{ left: 45, right: 50, bottom: -30, top: 10 }}
            yAxisTickMargin={103}
            useCustomTick
            fitContent
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <div className="flex flex-col gap-4 h-full">
            <div className="card-title-large">
              App Summary: UI/UX Department
            </div>
            <div className="common-card flex flex-col gap-6 h-full relative">
              <div className="absolute right-10 top-5 cursor-pointer z-10">
                <Popover
                  type={PopoverType.addItems}
                  triggerButton={
                    <button>
                      <ChevronDown />
                    </button>
                  }
                  addItemsSelectContent={
                    <div className="w-[240px] h-[370px]">
                      <div className="mx-2 pt-3">
                <SearchField getSearchQuery={handleSearchQuery} />
                      </div>
                      <div className="flex flex-col gap-4 pb-4 pt-2">
                        {Array(6)
                          .fill("UI/UX Department")
                          .map((department, index) => (
                            <div
                              className={`flex items-center pl-2 border mx-2 py-2 font-bold cursor-pointer hover:bg-[#E6EBF9]`}
                              key={index}
                            >
                              {department}
                            </div>
                          ))}
                      </div>
                    </div>
                  }
                />
              </div>
              <DoughnutChart
                data={{
                  ...defaultDonutChartData,
                  labels: ["Active", "Inactive"],
                  datasets: [
                    {
                      data: [55, 45],
                      backgroundColor: [color.info.dark, color.info.light],
                    },
                  ],
                }}
                options={{ ...defaultDonutChartOptions, cutout: "70%" }}
                chartheight={20}
                chartwidth={20}
                containersx={{ flex: 0.8, pb: 5, height: 20, width: 30, pt: 1 }}
              />
              <div className="flex gap-2 flex-[0.2]">
                <div className="flex flex-col gap-2">
                  <div className="card-title-small">
                    App Summary: UI/UX Department
                  </div>
                  <div className="card-subtitle-small">
                    From 1-31 January, 2024
                  </div>
                </div>
                <div>
                  <Popover
                    type={PopoverType.addItems}
                    triggerButton={
                      <button style={{ fill: color.icon.grey }}>
                        <SvgIcon path={icon.calendar} width={25} height={25} />
                      </button>
                    }
                    addItemsSelectContent={
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar
                          sx={{
                            width: "fit-content",
                            px: 0.8,
                            pb: 3,
                            height: "fit-content",
                            boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                      </LocalizationProvider>
                    }
                  />
                </div>
              </div>
              <div className="flex-[0.3]">
                <div className="flex gap-8">
                  {[
                    {
                      color: color.info.dark,
                      label: "Active",
                      value: `${55}%`,
                    },
                    {
                      color: color.info.light,
                      label: "Inactive",
                      value: `${45}%`,
                    },
                  ].map((series) => (
                    <LegendSeries
                      key={series.label}
                      color={series.color}
                      label={series.label}
                      value={series.value}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[-6]">
        <SectionCardContainer
          title="Recent App Access"
          titleSize="large"
          isCard
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6)
              .fill({
                appLogo: icon.figma,
                appName: "Figma",
                status: "Approved",
                statusMap: APRStatusMap,
                dueDate: "December 15th, 2023",
                userPictures: [
                  "/image/persons/person-1.png",
                  "/image/persons/person-1.png",
                  "/image/persons/person-1.png",
                ],
              })
              .map((props, index) => (
                <RecentRequestAccessCard key={index} {...props} />
              ))}
          </div>
        </SectionCardContainer>
      </div>
      {openRequestModal && (
        <Modal
          open={openRequestModal}
          onClose={() => setOpenRequestModal(false)}
          title="Request App Access"
          subtitle="Request app access below"
          form={{
            gridSpacing: 3,
            inputFields: [
              {
                name: "App Name",
                type: "select",
              },
              {
                name: "Department",
                type: "select",
              },
              {
                name: "Employee Name",
                type: "select",
              },
              {
                name: "Reason for access",
                type: "select",
              },
            ],
          }}
          buttonOne={{
            type: ButtonType.outlined,
            text: "Save and Continue",
            onClick: () => setOpenRequestModal(false),
          }}
          buttonTwo={{
            type: ButtonType.contained,
            text: "Submit Request",
            onClick: () => {
              setOpenRequestModal(false);
              setOpenSuccessModal(true);
            },
          }}
        />
      )}
      {openSuccessModal && (
        <Modal
          open={openSuccessModal}
          onClose={() => {}}
          hasHeading={false}
          centerImage={icon.successTick}
          centerTitle="Request Submission Successful"
          centerMessage="Your request has been sent successfully"
          buttonOne={{
            type: ButtonType.outlined,
            text: "Request Another App",
            onClick: () => {
              setOpenSuccessModal(false);
              setOpenRequestModal(true);
            },
          }}
          buttonTwo={{
            type: ButtonType.contained,
            text: "View App Request",
            onClick: () => setOpenSuccessModal(false),
          }}
          reduceVerticalGap
        />
      )}
    </Page>
  );
};

export default HrAdminAppManagementOverview;
