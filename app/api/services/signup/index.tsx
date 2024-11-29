import { request } from "@/utils/request";

import { baseUrl } from "@/constants/config";
import { CompanyRegistrationData } from "@/types";

export const registerCompany = async (payload: CompanyRegistrationData) => {
  return request('POST', `${baseUrl}/v1/user/register-company`, {
    headers: {
      'Content-Type': 'application/json',
    },
    data: payload
  });
};