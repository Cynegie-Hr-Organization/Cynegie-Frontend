import { FormProps } from "@/app/_components/shared/form/types";
import {
  ButtonProps,
  ButtonType,
} from "@/app/_components/shared/page/heading/types";
import { PageProps } from "@/app/_components/shared/page/types";
import { getUserDetails } from "@/utils/getUserDetails";
import { useEffect, useState } from "react";

const useEmployeeProfilePage = () => {
  const [userDetails, setUserDetails] = useState<{
    name: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await getUserDetails();
      if (details) {
        setUserDetails(details);
      }
    };
    fetchDetails();
  }, []);

  const pageProps: PageProps = {
    title: "Update Your Profile",
  };

  const formProps: FormProps = {
    layout: "3-columns",
    gridSpacing: 5,
    inputFields: [
      {
        label: "First Name",
        type: "text",
        value: userDetails?.name.split(" ")[0] ?? "",
      },
      {
        label: "Middle Name",
        type: "text",
        value: "",
      },
      {
        label: "Last Name",
        type: "text",
        value: userDetails?.name.split(" ")[1] ?? "",
      },
      {
        label: "Email Address",
        type: "text",
        value: userDetails?.email ?? "",
      },
      {
        label: "Phone Number",
        type: "text",
        value: "09038447892",
      },
      {
        label: "Date of Birth",
        type: "date",
      },
      {
        label: "State",
        type: "select",
        placeholder: "Select",
      },
      {
        label: "Job Title",
        type: "select",
        placeholder: "Select",
      },
      {
        label: "Nationality",
        type: "text",
        value: "Nigerian",
        placeholder: "Select",
      },
      {
        label: "Department",
        type: "select",
        placeholder: "Select",
      },
    ],
  };

  const editButtonProps: ButtonProps = {
    type: ButtonType.contained,
    text: "Edit",
  };

  return { pageProps, formProps, editButtonProps, userDetails };
};

export default useEmployeeProfilePage;
