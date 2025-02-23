import { baseUrl } from "@/constants/config";
import axios from "axios";
import { getToken } from "../../../../payroll-management/pages/overview/api";

export const downloadFile = async (
  endpoint: string,
  filename: string,
  fileType: "pdf" | "excel",
  params: any,
) => {
  const url = `${baseUrl}/v1/${endpoint}`;
  const token = await getToken();
  const headers = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
  };
  const responseType = "blob";

  const response = await axios.get(url, {
    params,
    headers,
    responseType,
  });

  const blob = new Blob([response.data], {
    type: `application/${
      fileType === "pdf"
        ? "pdf"
        : "vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    }`,
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
