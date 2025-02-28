"use client";
import Modal from "@/app/_components/employee/modal";
import BigCalendar, {
  CalendarEvent,
} from "@/app/_components/employee/pages/upcoming-widget/big-calendar";
import AvatarGroup from "@/app/_components/shared/avatar-group";
import Page from "@/app/_components/shared/page";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import { color, route } from "@/constants";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const HrAdminCalendarPage = () => {
  const router = useRouter();
  const [openAddHolidayModal, setOpenAddHolidayModal] = useState(false);
  const [openHolidayModal, setOpenHolidayModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent>();
  return (
    <Page
      backText="Back to Dashboard"
      onBackTextClick={() => router.push(route.hrAdmin.dashboard)}
      hasButtons
      rightButton={{
        type: ButtonType.contained,
        text: "Add Company Holiday",
        onClick: () => setOpenAddHolidayModal(true),
      }}
    >
      <BigCalendar
        events={[
          {
            title: `Independence Day (Public Holiday)`,
            start: new Date(2025, 1, 1, 0, 0),
            end: new Date(2025, 1, 1, 24, 0),
            description: "Public Holiday",
            location: "Conference Room 1",
            color: "blue",
          },
          {
            title: "Company Retreat",
            start: new Date(2025, 1, 10, 10, 0),
            end: new Date(2025, 1, 10, 11, 0),
            description: "Public Holiday",
            location: "Conference Room 1",
            color: "blue",
          },
          {
            title: "Restricted Leave Period",
            start: new Date(2025, 1, 10, 10, 0),
            end: new Date(2025, 1, 10, 11, 0),
            description: "Public Holiday",
            location: "Conference Room 1",
            color: "blue",
          },
        ]}
        indicators={[
          { dotColor: color.success.dark, label: "Meetings" },
          { dotColor: color.error.dark, label: "Deadline" },
          { dotColor: color.warning.dark, label: "Company Event" },
          { dotColor: color.ash.dark, label: "Public Holiday" },
          { dotColor: color.info.dark, label: "Company Specific Holiday" },
          { dotColor: color.ash.light, label: "Restricted Leave Period" },
        ]}
        onSelectEvent={(event) => {
          setSelectedEvent(event);
          setOpenHolidayModal(true);
        }}
      />
      {openAddHolidayModal && (
        <Modal
          open={openAddHolidayModal}
          onClose={() => setOpenAddHolidayModal(false)}
          title="Add Company Holiday"
          forms={[
            {
              gridSpacing: 3,
              inputFields: [
                {
                  label: "Holiday Name",
                  type: "text",
                  placeholder: "Enter name",
                },
                {
                  label: "Date",
                  type: "date",
                },
                {
                  label: "Applies To",
                  type: "multi-select",
                  options: [], //TODO: Use departments and their ids as the options
                },
              ],
            },
          ]}
          buttonOne={{
            type: ButtonType.outlined,
            text: "Cancel",
          }}
          buttonTwo={{
            type: ButtonType.contained,
            text: "Add Holiday",
          }}
        />
      )}
      {openHolidayModal && (
        <Modal
          open={openHolidayModal}
          onClose={() => setOpenHolidayModal(false)}
          customBody={
            <div className="flex flex-col mt-[-24] gap-3">
              <div className="flex items-center gap-2  ml-[-12]">
                <ChevronLeft
                  sx={{ color: "#8D8484", height: "36px", width: "36px" }}
                />
                <p className="card-title-large">October 2, 2025</p>
                <ChevronRight
                  sx={{ color: "#8D8484", height: "36px", width: "36px" }}
                />
              </div>
              <p className="card-subtitle-small">{selectedEvent?.title}</p>
              <div className="flex flex-col gap-1">
                <p className="card-subtitle-small !text-black">
                  Employees on Leave
                </p>
                <div className="ml-[-3]">
                  <AvatarGroup avatars={Array(14).fill("")} />
                </div>
              </div>
              <div className="flex gap-4 items-center ml-[-10]">
                {["Public Holiday", "Restricted Period"].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <Checkbox
                      checked={
                        selectedEvent?.description === "Public Holiday" &&
                        index === 0
                      }
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          }
          buttonOne={{
            type: ButtonType.outlined,
            text: "Cancel",
            onClick: () => setOpenHolidayModal(false),
          }}
          buttonTwo={{
            type: ButtonType.contained,
            text: "Save Changes",
            onClick: () => {},
          }}
        />
      )}
    </Page>
  );
};

export default HrAdminCalendarPage;
