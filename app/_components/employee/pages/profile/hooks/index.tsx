/* eslint-disable react-hooks/exhaustive-deps */
import { FormProps } from "@/app/_components/shared/form/types";
import {
  ButtonProps,
  ButtonType,
} from "@/app/_components/shared/page/heading/types";
import { PageProps } from "@/app/_components/shared/page/types";
import {
  getProfile,
  requestUpdateProfile,
} from "@/app/api/services/employee/profile";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ModalProps } from "../../../modal/types";

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

  const [reasonForUpdate, setReasonForUpdate] = useState<
    string | number | undefined
  >("");

  const [firstName, setFirstName] = useState<string | number | undefined>("");
  const [lastName, setLastName] = useState<string | number | undefined>("");
  const [email, setEmail] = useState<string | number | undefined>("");
  const [phoneNumber, setPhoneNumber] = useState<string | number | undefined>(
    "",
  );
  const [dateOfBirth, setDateOfBirth] = useState<string | number | undefined>(
    "",
  );
  const [state, setState] = useState<string | number | undefined>("");
  const [nationality, setNationality] = useState<string | number | undefined>(
    "",
  );
  const [hireDate, setHireDate] = useState<string | number | undefined>("");
  const [openEditRequestModal, setOpenEditRequestModal] = useState(false);
  const [employeeId, setEmployeeId] = useState<string | number | undefined>("");

  const fetchProfileMutation = useMutation({
    mutationFn: getProfile,
    onSuccess: (response) => {
      console.log(response);
      const details = response?.employee;
      if (details) {
        setEmployeeId(details.id);
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
      console.log("Profile fetched successfully:", response);
    },
    onError: (error) => {
      console.error("Failed to fetch profile:", error);
    },
  });

  useEffect(() => {
    fetchProfileMutation.mutate();
  }, []);

  const requestUpdateMutation = useMutation({
    mutationFn: (data: any) => requestUpdateProfile(data),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Profile Update Request successfully!");
      setOpenEditRequestModal(false);
    },
    onError: (error) => {
      console.error("Profile Update Request Failed:", error);
      toast.error("Profile Update Request Failed. Please try again.");
    },
  });

  const constructUpdatePayload = () => {
    const updates = [];
    if (firstName !== userDetails?.firstName) {
      updates.push({ field: "firstName", value: firstName });
    }
    if (lastName !== userDetails?.lastName) {
      updates.push({ field: "lastName", value: lastName });
    }
    if (dateOfBirth !== userDetails?.dateOfBirth) {
      updates.push({ field: "dateOfBirth", value: dateOfBirth });
    }
    if (phoneNumber !== userDetails?.phoneNumber) {
      updates.push({ field: "phoneNumber", value: phoneNumber });
    }
    if (state !== userDetails?.state) {
      updates.push({ field: "state", value: state });
    }
    if (nationality !== userDetails?.nationality) {
      updates.push({ field: "nationality", value: nationality });
    }

    return {
      employeeId,
      updates,
      reasonForUpdate: reasonForUpdate,
      supportingDocuments: [" "],
      isEmployeeRequest: true,
      isHrRequest: false,
    };
  };

  const handleRequestEditSubmit = () => {
    if (!reasonForUpdate) {
      toast.error("Please provide a reason for the update request.");
      return;
    }

    console.log(constructUpdatePayload);
    const data = constructUpdatePayload();

    console.log("Data:", data);
    requestUpdateMutation.mutate(data);
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
        disabled: true,
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
        disabled: true,
      },
    ],
  };

  const editButtonProps: ButtonProps = {
    type: ButtonType.contained,
    text: "Edit",
    onClick: () => {
      setOpenEditRequestModal(true);
    },
  };

  const editRequestModalProps: ModalProps = {
    open: openEditRequestModal,
    onClose: () => setOpenEditRequestModal(false),
    centerImage: "/icons/lockIcon.png",
    centerTitle: "Editing Disabled",
    centerMessage:
      "The fields are currently locked for editing. Request access from HR to enable edit",
    form: {
      gridSpacing: 4,
      inputFields: [
        {
          label: "Why are you requesting this edit?",
          required: true,
          type: "text",
          value: reasonForUpdate,
          setValue: setReasonForUpdate,
        },
        {
          label: "Supporting Document",
          type: "drag-upload",
        },
      ],
    },
    buttonOne: {
      type: ButtonType.outlined,
      text: "Cancel",
      onClick: () => {
        setOpenEditRequestModal(false);
      },
    },
    buttonTwo: {
      type: ButtonType.contained,
      text: "Request Edit Access",
      onClick: handleRequestEditSubmit,
    },
    centerButton: true,
  };

  return {
    pageProps,
    formProps,
    editButtonProps,
    userDetails,
    editRequestModalProps,
  };
};

export default useEmployeeProfilePage;
