export interface SecurityManagementProps {
  id: string; // Unique identifier for the alert
  alertType: string; // Type or category of the alert
  severity: "Low" | "Medium" | "High" | "Critical"; // Alert severity level
  date: string; // Date of the alert in ISO format (YYYY-MM-DD)
  description: string; // Added field for a brief description of the alert
}

export const securityManagementData: SecurityManagementProps[] = [
  {
    id: "1",
    alertType: "Unauthorized Access",
    severity: "High",
    date: "2024-12-01",
    description:
      "Multiple failed login attempts detected from IP 192.168.1.10.",
  },
  {
    id: "2",
    alertType: "Malware Detected",
    severity: "Critical",
    date: "2024-11-30",
    description:
      "Ransomware identified on server SRV-01. Immediate action required.",
  },
  {
    id: "3",
    alertType: "Suspicious Activity",
    severity: "Medium",
    date: "2024-11-29",
    description: "Unusual data transfer detected during off-hours.",
  },
  {
    id: "4",
    alertType: "Phishing Attempt",
    severity: "Low",
    date: "2024-11-28",
    description:
      "Email flagged as a potential phishing attempt sent to finance team.",
  },
  {
    id: "5",
    alertType: "Firewall Breach",
    severity: "Critical",
    date: "2024-11-27",
    description:
      "Breach detected in perimeter firewall rules. Access logs being analyzed.",
  },
  {
    id: "6",
    alertType: "Data Leakage",
    severity: "High",
    date: "2024-11-26",
    description:
      "Confidential documents uploaded to unauthorized cloud storage.",
  },
  {
    id: "7",
    alertType: "System Vulnerability",
    severity: "Medium",
    date: "2024-11-25",
    description:
      "Outdated software version on critical servers. Patch recommended.",
  },
];
