import { FormProps } from "@/app/_components/shared/form/types";
import {
  ButtonProps,
  ButtonType,
} from "@/app/_components/shared/page/heading/types";
import { PageProps } from "@/app/_components/shared/page/types";
import { getUserDetails } from "@/utils/getUserDetails";
import { useEffect, useState } from "react";
import { useMutation } from '@tanstack/react-query';
import { updateProfile } from '@/app/api/services/employee/profile';

const useEmployeeProfilePage = () => {
  const [userDetails, setUserDetails] = useState<{
    name: string;
    email: string;
  } | null>(null);

  const [firstName, setFirstName] = useState<string | number | undefined>("");
  const [middleName, setMiddleName] = useState<string | number | undefined>("");
  const [lastName, setLastName] = useState<string | number | undefined>("");
  const [email, setEmail] = useState<string | number | undefined>("");
  const [phoneNumber, setPhoneNumber] = useState<string | number | undefined>("");
  const [dateOfBirth, setDateOfBirth] = useState<string | number | undefined>("");
  const [state, setState] = useState<string | number | undefined>("");
  const [jobTitle, setJobTitle] = useState<string | number | undefined>("");
  const [nationality, setNationality] = useState<string | number | undefined>("Nigerian");
  const [department, setDepartment] = useState<string | number | undefined>("");

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await getUserDetails();
      if (details) {
        setUserDetails(details);
        setFirstName(details.name.split(" ")[0]);
        setLastName(details.name.split(" ")[1]);
        setEmail(details.email);
      }
    };
    fetchDetails();
  }, []);

  const mutation = useMutation({
    mutationFn: (data: any) => updateProfile(data),
    onSuccess: (data) => {
      console.log('Profile updated successfully:', data);
    },
    onError: (error) => {
      console.error('Profile update failed:', error);
    },
  });

  const handleFormSubmit = (formData: any) => {
    const data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      maritalStatus: formData.maritalStatus,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      country: formData.country,
      state: formData.state,
      city: formData.city,
      streetAddress: formData.streetAddress,
      postalCode: formData.postalCode,
      nationality: formData.nationality,
      idUpload: formData.idUpload,
      passport: formData.passport,
    };

    mutation.mutate(data);
  };

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
        value: firstName,
        setValue: setFirstName,
      },
      {
        label: "Middle Name",
        type: "text",
        value: middleName,
        setValue: setMiddleName,
      },
      {
        label: "Last Name",
        type: "text",
        value: lastName,
        setValue: setLastName,
      },
      {
        label: "Email Address",
        type: "text",
        value: email,
        setValue: setEmail,
      },
      {
        label: "Phone Number",
        type: "text",
        value: phoneNumber,
        setValue: setPhoneNumber,
      },
      {
        label: "Date of Birth",
        type: "date",
        value: dateOfBirth,
        setValue: setDateOfBirth,
      },
      {
        label: "State",
        type: "select",
        placeholder: "Select",
        value: state,
        setValue: setState,
      },
      {
        label: "Job Title",
        type: "select",
        placeholder: "Select",
        value: jobTitle,
        setValue: setJobTitle,
      },
      {
        label: "Nationality",
        type: "text",
        value: nationality,
        setValue: setNationality,
      },
      {
        label: "Department",
        type: "select",
        placeholder: "Select",
        value: department,
        setValue: setDepartment,
      },
    ],
  };

  const editButtonProps: ButtonProps = {
    type: ButtonType.contained,
    text: "Edit",
    onClick: handleFormSubmit,

  };

  return { pageProps, formProps, editButtonProps, userDetails };
};

export default useEmployeeProfilePage;