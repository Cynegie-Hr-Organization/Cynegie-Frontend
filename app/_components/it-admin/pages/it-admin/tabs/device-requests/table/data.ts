export interface JobsTabData {
  id: string;
  requestId: string;
  name: string; // Department or team name
  requestedDevice: string; // Name of the requested device
  requestedDate: string; // ISO date format
  status: "Approved" | "Pending" | "Denied";
}

export const deviceRequestData: JobsTabData[] = [
  {
    id: "1",
    requestId: "2323MOP",
    name: "Ayomide Alibaba",
    requestedDevice: "MacBook Pro 16-inch",
    requestedDate: "2024-11-01T10:00:00Z",
    status: "Approved",
  },
  {
    id: "2",
    requestId: "1457NXT",
    name: "Bisola Azubuike",
    requestedDevice: "iPad Pro 11-inch",
    requestedDate: "2024-11-05T15:30:00Z",
    status: "Pending",
  },
  {
    id: "3",
    requestId: "9087PLT",
    name: "Bola John",
    requestedDevice: "Dell XPS 13",
    requestedDate: "2024-10-25T09:00:00Z",
    status: "Denied",
  },
  {
    id: "4",
    requestId: "4672RTS",
    name: "Umar Ali baba",
    requestedDevice: "HP Spectre x360",
    requestedDate: "2024-11-03T14:20:00Z",
    status: "Approved",
  },
  {
    id: "5",
    requestId: "7834KLM",
    name: "Peter John",
    requestedDevice: "Wacom Cintiq 16",
    requestedDate: "2024-11-10T08:45:00Z",
    status: "Pending",
  },
];
