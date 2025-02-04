import { FormProps } from "@/app/_components/shared/form/types";
import {
  ButtonProps,
  ButtonType,
} from "@/app/_components/shared/page/heading/types";
import { PageProps } from "@/app/_components/shared/page/types";
import { getProfile, updateProfile } from "@/app/api/services/employee/profile";
import { useEffect, useState } from "react";
import { useMutation } from '@tanstack/react-query';
import { toast } from "react-toastify";

const useEmployeeProfilePage = () => {
  const [userDetails, setUserDetails] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    country: string;
    gender: string;
    state: string;
    city: string;
    streetAddress: string;
    postalCode: string;
    nationality: string;
    maritalStatus: string;
    idUpload: string;
    passport: string;
  } | null>(null);

  const [firstName, setFirstName] = useState<string | number | undefined>("");
  const [lastName, setLastName] = useState<string | number | undefined>("");
  const [email, setEmail] = useState<string | number | undefined>("");
  const [phoneNumber, setPhoneNumber] = useState<string | number | undefined>("");
  const [dateOfBirth, setDateOfBirth] = useState<string | number | undefined>("");
  const [state, setState] = useState<string | number | undefined>("");
  const [nationality, setNationality] = useState<string | number | undefined>("");
  const [hireDate , setHireDate] = useState<string | number | undefined>("");
  
  const fetchProfileMutation = useMutation({
    mutationFn: getProfile,
    onSuccess: (response) => {
      const details = response?.employee;
      console.log(details);
      if (details) {
        setUserDetails(details.personalInfo);
        setFirstName(details.personalInfo.firstName);
        setLastName(details.personalInfo.lastName);
        setEmail(details.personalInfo.email);
        setPhoneNumber(details.personalInfo.phoneNumber);
        setDateOfBirth(details.personalInfo.dateOfBirth);
        setState(details.personalInfo.state);
        setNationality(details.personalInfo.nationality);
        setState(details.personalInfo.state);
        setHireDate(details.employmentInformation.hireDate);
      }
      console.log('Profile fetched successfully:', response);
    },
    onError: (error) => {
      console.error('Failed to fetch profile:', error);
    },
  });

  useEffect(() => {
    fetchProfileMutation.mutate();
  }, []);

  const updateProfileMutation = useMutation({
    mutationFn: (data: any) => updateProfile(data),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Profile updated successfully!");
    },
    onError: (error) => {
      console.error('Profile update failed:', error);
            toast.error("Profile update failed. Please try again.");

    },
  });

  const handleFormSubmit = () => {
    const data = {
      firstName,
      lastName,
      dateOfBirth,
      phoneNumber,
      state,
      city: "", // Add city state if needed
      streetAddress: "", // Add streetAddress state if needed
      postalCode: "", // Add postalCode state if needed
      nationality,
        };

    console.log('Data:', data);
    updateProfileMutation.mutate(data);
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
        disabled : true,
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
        type: "text",
        value: state,
        setValue: setState,
      },
      {
        label: "Nationality",
        type: "text",
        value: nationality,
        setValue: setNationality,
      },
      {
        label: "Employee Start date",
        type: "date",
        value: hireDate,
        disabled : true,
        
      }
      
    ],
  };

  const editButtonProps: ButtonProps = {
    type: ButtonType.contained,
    text: updateProfileMutation.isPending ? "Updating..." : "Edit",
    onClick: handleFormSubmit,
    
  };

  return { pageProps, formProps, editButtonProps, userDetails };
};

export default useEmployeeProfilePage;