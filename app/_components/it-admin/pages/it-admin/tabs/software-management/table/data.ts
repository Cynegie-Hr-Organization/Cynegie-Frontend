export interface SoftwareManagementProps {
  id: string;
  softwareName: string; // Updated field for software name
  version: string; // Added field for software version
  licenseCount: number; // Changed to a number to represent count
  licenseExpiryDate: string; // Represents expiry date as a string
}

export const softwareManagementData: SoftwareManagementProps[] = [
  {
    id: "1",
    softwareName: "Adobe Photoshop",
    version: "2023.1.0",
    licenseCount: 25,
    licenseExpiryDate: "2024-12-31",
  },
  {
    id: "2",
    softwareName: "Microsoft Office",
    version: "2021",
    licenseCount: 50,
    licenseExpiryDate: "2025-06-15",
  },
  {
    id: "3",
    softwareName: "AutoCAD",
    version: "2022.5",
    licenseCount: 10,
    licenseExpiryDate: "2023-07-01",
  },
  {
    id: "4",
    softwareName: "Zoom",
    version: "5.15.0",
    licenseCount: 100,
    licenseExpiryDate: "2024-03-10",
  },
  {
    id: "5",
    softwareName: "Slack",
    version: "4.29.0",
    licenseCount: 150,
    licenseExpiryDate: "2025-01-20",
  },
];
