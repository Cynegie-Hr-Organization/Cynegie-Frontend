export interface DeviceManagementProps {
  id: string;
  deviceId: string;
  assignTo: string;
  deviceType: string;
  location: string;
  status: "Available" | "In-use" | "Under Maintenance";
}

export const deviceManagementData: DeviceManagementProps[] = [
  {
    id: "1",
    deviceId: "2134MP",
    assignTo: "Bob Smith",
    deviceType: "MacBook Pro 2019",
    location: "Abuja",
    status: "In-use",
  },
  {
    id: "2",
    deviceId: "6542DL",
    assignTo: "Alice Johnson",
    deviceType: "Dell Latitude 7400",
    location: "Lagos",
    status: "Available",
  },
  {
    id: "3",
    deviceId: "9821HP",
    assignTo: "John Doe",
    deviceType: "HP EliteBook 850 G7",
    location: "Kano",
    status: "Under Maintenance",
  },
  {
    id: "4",
    deviceId: "8473LN",
    assignTo: "Jane Smith",
    deviceType: "Lenovo ThinkPad X1 Carbon",
    location: "Port Harcourt",
    status: "In-use",
  },
  {
    id: "5",
    deviceId: "7312AC",
    assignTo: "Chris Evans",
    deviceType: "Acer Aspire 5",
    location: "Ibadan",
    status: "Available",
  },
  {
    id: "6",
    deviceId: "4512SP",
    assignTo: "Emily Brown",
    deviceType: "Surface Pro 7",
    location: "Kaduna",
    status: "In-use",
  },
  {
    id: "7",
    deviceId: "3654HP",
    assignTo: "Michael Green",
    deviceType: "HP Spectre x360",
    location: "Jos",
    status: "Under Maintenance",
  },
  {
    id: "8",
    deviceId: "1923DL",
    assignTo: "Sarah Taylor",
    deviceType: "Dell Inspiron 15",
    location: "Enugu",
    status: "Available",
  },
  {
    id: "9",
    deviceId: "6789AC",
    assignTo: "Andrew Carter",
    deviceType: "Acer Swift 3",
    location: "Benin City",
    status: "In-use",
  },
  {
    id: "10",
    deviceId: "5432LN",
    assignTo: "Rebecca Wilson",
    deviceType: "Lenovo IdeaPad S540",
    location: "Uyo",
    status: "Available",
  },
];
