"use client";
import Modal from "@/app/_components/employee/modal";
import {
  addEmployee,
  getEmployee,
} from "@/app/_components/hr-admin/pages/payroll-management/pages/benefits-management/api";
import SvgIcon from "@/app/_components/icons/container";
import { ButtonGroupProps } from "@/app/_components/shared/button-group/types";
import { AddedItem } from "@/app/_components/shared/custom-popover/content/add-items";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import { icon } from "@/constants";
import { countriesWithStates } from "@/constants/countries-states";
import { AddEmployeePayload } from "@/types";
import { transformToArray } from "@/utils/form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import HrAdminEmployeeDirectoryAddEditEmployee from "..";
// import { employeeData } from "../edit";

const formGridSpacing = 5;

const HrAdminEmployeeDirectoryAddEmployee: React.FC<{ type?: "edit" }> = ({
  type,
}) => {
  const isEdit = type === "edit";
  const [currentTab, setCurrentTab] = useState(0);
  const [tabOneInitCompletion, setTabOneInitCompletion] = useState(
    isEdit ? true : false
  );
  const [tabTwoInitCompletion, setTabTwoInitCompletion] = useState(
    isEdit ? true : false
  );
  const [tabThreeInitCompletion, setTabThreeInitCompletion] = useState(
    isEdit ? true : false
  );
  const [tabFourInitCompletion, setTabFourInitCompletion] = useState(
    isEdit ? true : false
  );

  const [mutationLoading, setMutationLoading] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  const { slug } = useParams();

  const { data: employeeData } = useQuery({
    queryKey: ["employee", slug],
    ...(isEdit && {
      queryFn: () => getEmployee(typeof slug === "string" ? slug : ""),
    }),
  });

  const loading = employeeData ? false : isEdit ? true : false;

  console.log(employeeData);

  const handleTabChange = (event?: React.SyntheticEvent, _newTab?: number) => {
    const newTab = _newTab ?? 0;
    event?.preventDefault();
    if (!mutationLoading) {
      switch (currentTab) {
        case 0:
          if (newTab > 0 && personalInfoIsValid && tabOneInitCompletion) {
            setCurrentTab(newTab);
          }
          break;
        case 1:
          if (newTab > 1) {
            if (newTab == 2 && employmentIsValid && tabTwoInitCompletion) {
              setCurrentTab(newTab);
            }
            if (newTab == 3 && compensationIsValid && tabThreeInitCompletion) {
              setCurrentTab(newTab);
            }
            if (newTab == 4 && documentsIsValid && tabFourInitCompletion) {
              setCurrentTab(newTab);
            }
          } else {
            if (newTab < 1) {
              setCurrentTab(newTab);
            }
          }
          break;
        case 2:
          if (newTab > 2) {
            if (newTab == 3 && compensationIsValid && tabThreeInitCompletion) {
              setCurrentTab(newTab);
            }
            if (newTab == 4 && documentsIsValid && tabFourInitCompletion) {
              setCurrentTab(newTab);
            }
          } else {
            if (newTab < 2) {
              setCurrentTab(newTab);
            }
          }
          break;
        case 3:
          if (newTab > 3) {
            if (newTab == 4 && documentsIsValid && tabFourInitCompletion) {
              setCurrentTab(newTab);
            }
          } else {
            if (newTab < 3) {
              setCurrentTab(newTab);
            }
          }
          break;
        case 4:
          if (newTab < 4) {
            setCurrentTab(newTab);
          }
          break;
      }
    }
  };

  const {
    control: personalInfoControl,
    register: personalInfoRegister,
    formState: { errors: personalInfoErrors, isValid: personalInfoIsValid },
    watch: personalInfoWatch,
    getValues: personalInfoGetValues,
    resetField: personalInfoResetField,
    setValue: personalInfoSetValue,
  } = useForm();

  const country = personalInfoWatch("Country");
  const [states, setStates] = useState<{ label: string; value: string }[]>([]);

  const {
    control: employmentControl,
    register: employmentRegister,
    formState: { errors: employmentErrors, isValid: employmentIsValid },
    getValues: employmentGetValues,
    resetField: employmentResetField,
    watch: employmentWatch,
  } = useForm();

  const {
    register: compenstationRegister,
    control: compensationControl,
    formState: { errors: compensationErrors, isValid: compensationIsValid },
    getValues: compensationGetValues,
    unregister: compensationUnregister,
  } = useForm();

  const {
    register: documentsRegister,
    control: documentsControl,
    formState: { isValid: documentsIsValid },
    watch: documentsWatch,
    getValues: documentsGetValues,
    resetField: documentsResetField,
    unregister: documentsUnregister,
  } = useForm();

  const documents = documentsWatch();

  const [addedDocs, setAddedDocs] = useState<AddedItem[]>(
    isEdit
      ? []
      : [
          { name: "ID Upload", value: "" },
          { name: "Proof of Contract", value: "" },
        ]
  );

  const {
    register: equipmentsAndAccessRegister,
    control: equipmentsAndAccessControl,
    formState: {
      errors: equipmentsAndAccessErrors,
      isValid: equipmentsAndAccessIsValid,
    },
    // resetField: equipmentsAndAccessResetField,
    // watch: equipmentsAndAccessWatch,
    getValues: equipmentsAndAccessGetValues,
    unregister: equipmentsAndAccessUnregister,
  } = useForm();

  // const [deviceTypes, setDeviceTypes] = useState<
  //   { label: string; value: string }[]
  // >([]);

  // const deviceCategory = equipmentsAndAccessWatch("Device Category");

  const availableTools = ["Behance", "Figma", "Mailchimp", "Slack"];

  const [employeeTools, setEmployeeTools] = useState<AddedItem[]>(
    isEdit ? [{ name: "Tool", value: "" }] : [{ name: "Tool", value: "" }]
  );

  const saveAndContinueLaterButton = {
    type: ButtonType.outlined,
    text: "Save and Continue Later",
    onClick: () => {},
  };

  const personalInfoButtonGroup: ButtonGroupProps = {
    leftButton: saveAndContinueLaterButton,
    rightButton: {
      type: !loading
        ? personalInfoIsValid
          ? ButtonType.contained
          : ButtonType.disabled
        : ButtonType.disabled,
      text: isEdit ? "Save Changes" : "Continue",
      isSubmit: true,
      onClick: () => {
        if (!tabOneInitCompletion) {
          setCurrentTab(currentTab + 1);
          setTabOneInitCompletion(true);
        } else {
          setCurrentTab(currentTab + 1);
        }
      },
    },
    position: "end",
  };

  const employmentButtonGroup: ButtonGroupProps = {
    leftButton: saveAndContinueLaterButton,
    rightButton: {
      type: employmentIsValid ? ButtonType.contained : ButtonType.disabled,
      text: isEdit ? "Save Changes" : "Continue",
      onClick: () => {
        if (!tabTwoInitCompletion) {
          setTabTwoInitCompletion(true);
          setCurrentTab(currentTab + 1);
        } else {
          setCurrentTab(currentTab + 1);
        }
      },
    },
    position: "end",
  };

  const compensationButtonGroup: ButtonGroupProps = {
    leftButton: saveAndContinueLaterButton,
    rightButton: {
      type: compensationIsValid ? ButtonType.contained : ButtonType.disabled,
      text: isEdit ? "Save Changes" : "Continue",
      isSubmit: true,
      onClick: () => {
        if (!tabThreeInitCompletion) {
          setTabThreeInitCompletion(true);
          setCurrentTab(currentTab + 1);
        } else {
          setCurrentTab(currentTab + 1);
        }
      },
    },
    position: "end",
  };

  const [allowances, setAllowances] = useState<AddedItem[]>(
    isEdit ? [] : [{ name: "", value: "" }]
  );

  const [deductions, setDeductions] = useState<AddedItem[]>(
    isEdit ? [] : [{ name: "", value: "" }]
  );

  const documentsRightButtonEditType = !Object.values(documents).includes(
    undefined
  )
    ? Object.values(documents).filter((val) => val.length < 1).length === 0
      ? ButtonType.contained
      : ButtonType.disabled
    : ButtonType.disabled;

  const documentsRightButtonDefaultType = documentsIsValid
    ? ButtonType.contained
    : ButtonType.disabled;

  const documentsButtonGroup: ButtonGroupProps = {
    leftButton: saveAndContinueLaterButton,
    rightButton: {
      type: isEdit
        ? documentsRightButtonEditType
        : documentsRightButtonDefaultType,
      text: isEdit ? "Save Changes" : "Continue",
      isSubmit: true,
      onClick: () => {
        if (!tabFourInitCompletion) {
          setTabFourInitCompletion(true);
          setCurrentTab(currentTab + 1);
        } else {
          setCurrentTab(currentTab + 1);
        }
      },
    },
    position: "end",
  };

  const docsArray = Object.values(documentsGetValues()).map(
    /*async*/ (/*doc*/ _, index) => ({
      documentName: addedDocs[index]?.name,
      documentUrl: `link_for_${addedDocs[index]?.name}`, //TODO: Get link from the backend using an upload function. For example: await upload(doc),
    })
  );

  const equipmentsAndAccessButtonGroup: ButtonGroupProps = {
    leftButton: saveAndContinueLaterButton,
    rightButton: {
      type: equipmentsAndAccessIsValid
        ? mutationLoading
          ? ButtonType.disabledLoading
          : ButtonType.contained
        : ButtonType.disabled,
      text: mutationLoading ? "" : "Add Employee",
      isSubmit: true,
      onClick: () =>
        addEmployeeMutation.mutateAsync({
          employmentInformation: {
            // roleId: "67406495725dac101825eeea", //TODO: Get role ID from the backend or make it default to the employee role when not provided. The default behaviour has now been handled in the backend
            jobTitle: employmentGetValues()["Job Title"],
            department: employmentGetValues()["Department"], //TODO: Get department ID from the backend
            manager: employmentGetValues()["Manager/Supervisor"], //TODO: Get manager ID from the backend
            employmentType: employmentGetValues()["Employment Type"],
            employmentStatus: employmentGetValues()["Employment Status"],
            workLocation: employmentGetValues()["Work Location/Branch"],
            workSchedule: employmentGetValues()["Work Schedule"],
            probationPeriod: employmentGetValues()["Probation Period"],
            contractEndDate:
              employmentGetValues()["Contract End Date"]?.toISOString(),
            staffId: "DS1001",
            workEmail: employmentGetValues()["Work Email"],
            hireDate: employmentGetValues()["Hire Date"]?.toISOString(),
            // jobDescription: "job_description_doc_url", //TODO: Get doc URL await upload(tab2["Job Description"][0]),
            jobDescription:
              employmentGetValues()?.["Job Description"]?.[0]?.name,
          },
          personalInfo: {
            firstName: personalInfoGetValues()["First Name"],
            lastName: personalInfoGetValues()["Last Name"],
            middleName: personalInfoGetValues()["Middle Name"],
            dateOfBirth:
              personalInfoGetValues()["Date of Birth"]?.toISOString(),
            gender: personalInfoGetValues()["Gender"],
            maritalStatus: personalInfoGetValues()["Marital Status"],
            phoneNumber: personalInfoGetValues()["Phone Number"],
            email: personalInfoGetValues()["Email Address"],
            country: personalInfoGetValues()["Country"],
            state: personalInfoGetValues()["State"],
            city: personalInfoGetValues()["City"],
            streetAddress: personalInfoGetValues()["Street Address"],
            postalCode: personalInfoGetValues()["Postal Code"],
            nationality: personalInfoGetValues()["Nationality"],
          },
          compensation: {
            baseSalary: Number(compensationGetValues()["Base Salary"]),
            salaryFrequency: compensationGetValues()["Salary Frequency"],
            overtime: compensationGetValues()["Overtime"],
            taxFilingStatus: compensationGetValues()["Tax Filing Status"],
            paymentMethod: compensationGetValues()["Payment Method"],
            bonusStructure: compensationGetValues()["Bonus Structure"],
            commission: Number(compensationGetValues()["Commission"]),
            stockOptions: Number(compensationGetValues()["Stock Options"]),
            payGrade: compensationGetValues()["Pay Grade/Level"],
            bankName: compensationGetValues()["Bank Name"],
            bankAccountNo: compensationGetValues()["Bank Account Number"],
            effectiveDateOfCompensation:
              compensationGetValues()[
                "Effective Date of Compensation"
              ]?.toISOString(),
            taxIdentificationNumber:
              compensationGetValues()["Tax Identification Number (TIN)"],
            allowance: transformToArray(
              compensationGetValues(),
              "allowancename",
              "amount",
              "allowanceName",
              "allowanceAmount",
              true
            ),
            deduction: transformToArray(
              compensationGetValues(),
              "deductionname",
              "deductionamount",
              "deductionName",
              "deductionAmount",
              true
            ),
          },
          nextOfKin: {
            firstName: personalInfoGetValues()["First Name (Next of Kin)"],
            lastName: personalInfoGetValues()["Last Name (Next of Kin)"],
            gender: personalInfoGetValues()["Gender"],
            relationship: personalInfoGetValues()["Relationship"],
            phoneNumber: personalInfoGetValues()["Phone Number (Next of Kin)"],
            email: personalInfoGetValues()["Email Address (Next of Kin)"],
          },
          documents: docsArray,
          accessRights: [
            {
              devices: [equipmentsAndAccessGetValues()["Device Type"]],
              permissions: transformToArray(
                equipmentsAndAccessGetValues(),
                "tool",
                "id",
                "tool",
                "id",
                false
              ).map((permission) => ({
                tool: availableTools[permission.tool],
                id: permission.id,
              })),
            },
          ],
        }),
    },
    position: "end",
  };

  const addEmployeeMutation = useMutation({
    mutationFn: (payload: AddEmployeePayload) => addEmployee(payload),
    onMutate: () => setMutationLoading(true),
    onSuccess: (res: any) => {
      if (Object.keys(res).includes("error")) {
        alert("An error occured");
        setMutationLoading(false);
      } else {
        queryClient.resetQueries({ queryKey: ["employees"] });
        setOpenSuccessModal(true);
        setMutationLoading(false);
      }
    },
    onError: () => {
      alert("An error occureed");
      setMutationLoading(false);
    },
  });

  useEffect(() => {
    if (country) {
      setStates(
        countriesWithStates[country].map((state) => ({
          label: state,
          value: state,
        }))
      );
    }
  }, [country]);

  useEffect(() => {
    if (employeeData && isEdit) {
      setAllowances(
        employeeData?.compensation.allowance.map((allowance) => ({
          name: allowance.allowanceName,
          value: allowance.allowanceAmount,
        }))
      );
      setDeductions(
        employeeData?.compensation.deduction.map((deduction) => ({
          name: deduction.deductionName,
          value: deduction.deductionAmount,
        }))
      );
      setAddedDocs(
        employeeData?.documents.map((document) => ({
          name: document.documentName,
          value: document.documentUrl,
        }))
      );
      setEmployeeTools(
        employeeData?.accessRights[0].permissions.map((permission) => ({
          name: permission.tool,
          value: permission.id,
        }))
      );
    }
  }, [employeeData, isEdit]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [currentTab]);

  // useEffect(() => {
  //   if (deviceCategory) {
  //     switch (deviceCategory) {
  //       case "laptop":
  //         setDeviceTypes([
  //           { label: "Laptop", value: "677bd034a44473351eade101" },
  //         ]);
  //         break;
  //       default:
  //         setDeviceTypes([]);
  //     }
  //     equipmentsAndAccessResetField("Device Type");
  //   }
  // }, [deviceCategory]);

  return (
    <>
      <HrAdminEmployeeDirectoryAddEditEmployee
        title={isEdit ? "Edit Employee" : "Add Employee"}
        tabValue={currentTab}
        handleTabChange={handleTabChange}
        personalInformation={{
          forms: [
            {
              layout: "3-columns",
              title: "Bio Data",
              gridSpacing: formGridSpacing,
              control: personalInfoControl,
              register: personalInfoRegister,
              errors: personalInfoErrors,
              loading: loading,
              inputFields: [
                {
                  label: "First Name",
                  type: "text",
                  placeholder: "Enter first name",
                  required: true,
                  ...(isEdit && {
                    defaultValue: employeeData?.personalInfo.firstName,
                  }),
                },
                {
                  label: "Middle Name",
                  type: "text",
                  placeholder: "Enter middle name",
                  ...(isEdit && {
                    defaultValue: employeeData?.personalInfo.middleName,
                  }),
                },
                {
                  label: "Last Name",
                  type: "text",
                  placeholder: "Enter last name",
                  required: true,
                  ...(isEdit && {
                    defaultValue: employeeData?.personalInfo.lastName,
                  }),
                },
                {
                  label: "Email Address",
                  type: "text",
                  placeholder: "Enter email",
                  required: true,
                  ...(isEdit && {
                    defaultValue: employeeData?.personalInfo.email,
                  }),
                },
                {
                  label: "Phone Number",
                  type: "text",
                  placeholder: "Enter phone number",
                  required: true,
                  ...(isEdit && {
                    defaultValue: employeeData?.personalInfo.phoneNumber,
                  }),
                },
                {
                  label: "Date of Birth",
                  type: "date",
                  required: true,
                  hookFormField: true,
                  controllerRules: {
                    required: "Start date is required",
                  },
                  ...(isEdit && {
                    defaultValue: employeeData?.personalInfo.dateOfBirth,
                  }),
                },
                {
                  label: "Country",
                  type: "select",
                  placeholder: "Select",
                  required: true,
                  hookFormField: true,
                  options: Object.keys(countriesWithStates).map((country) => ({
                    label: country,
                    value: country,
                  })),
                  ...(isEdit && {
                    defaultValue: employeeData?.personalInfo.country,
                  }),
                },
                {
                  label: "Street Address",
                  type: "text",
                  required: true,
                  placeholder: "Enter address",
                  ...(isEdit && {
                    defaultValue: employeeData?.personalInfo.streetAddress,
                  }),
                },
                {
                  label: "City",
                  type: "text",
                  required: true,
                  placeholder: "Enter city",
                  ...(isEdit && {
                    defaultValue: employeeData?.personalInfo.city,
                  }),
                },
                {
                  label: "State",
                  type: "select",
                  placeholder: "Select",
                  hookFormField: true,
                  required: true,
                  options: states,
                  ...(isEdit && {
                    defaultValue: employeeData?.personalInfo.state,
                  }),
                },
                {
                  label: "Postal Code",
                  type: "text",
                  required: true,
                  placeholder: "Enter postal code",
                  ...(isEdit && {
                    defaultValue: employeeData?.personalInfo.postalCode,
                  }),
                },
                {
                  label: "Nationality",
                  type: "text",
                  required: true,
                  placeholder: "Enter nationality",
                  ...(isEdit && {
                    defaultValue: employeeData?.personalInfo.nationality,
                  }),
                },
                {
                  label: "Marital Status",
                  type: "select",
                  placeholder: "Select",
                  required: true,
                  hookFormField: true,
                  options: [
                    { label: "Single", value: "single" },
                    { label: "Married", value: "married" },
                    { label: "Divorced", value: "divorced" },
                    { label: "Widowed", value: "widowed" },
                    { label: "Separated", value: "separated" },
                    {
                      label: "Domestic Partnership",
                      value: "domestic-partnership",
                    },
                  ],
                  ...(isEdit && {
                    defaultValue: employeeData?.personalInfo.maritalStatus,
                  }),
                },
                {
                  label: "ID Upload",
                  type: "drag-upload-hook-form",
                  required: true,
                  hookFormGetValues: personalInfoGetValues,
                  hookFormResetField: personalInfoResetField,
                  hookFormWatch: personalInfoWatch,
                  hookFormSetValue: personalInfoSetValue,
                  ...(isEdit && {
                    defaultValue:
                      employeeData?.personalInfo.idUpload ??
                      "link_for_id_upload",
                  }),
                },
                {
                  label: "Passport",
                  type: "drag-upload-hook-form",
                  required: true,
                  hookFormGetValues: personalInfoGetValues,
                  hookFormResetField: personalInfoResetField,
                  hookFormWatch: personalInfoWatch,
                  hookFormSetValue: personalInfoSetValue,
                  ...(isEdit && {
                    defaultValue:
                      employeeData?.personalInfo.passport ??
                      "link_for_passport",
                  }),
                },
              ],
            },
            {
              layout: "3-columns",
              title: "Next of Kin Details",
              gridSpacing: formGridSpacing,
              control: personalInfoControl,
              register: personalInfoRegister,
              errors: personalInfoErrors,
              loading: loading,
              inputFields: [
                {
                  label: "First Name",
                  hookFormName: "First Name (Next of Kin)",
                  required: true,
                  type: "text",
                  placeholder: "Enter first name",
                  ...(isEdit && {
                    defaultValue: employeeData?.nextOfKin[0].firstName,
                  }),
                },
                {
                  label: "Last Name",
                  hookFormName: "Last Name (Next of Kin)",
                  type: "text",
                  required: true,
                  placeholder: "Enter last name",
                  ...(isEdit && {
                    defaultValue: employeeData?.nextOfKin[0].lastName,
                  }),
                },
                {
                  label: "Gender",
                  type: "select",
                  placeholder: "Select",
                  required: true,
                  options: [
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                  ],
                  hookFormField: true,
                  controllerRules: {
                    required: "Gender is required",
                  },
                  ...(isEdit && {
                    defaultValue: employeeData?.nextOfKin[0].gender,
                  }),
                },
                {
                  label: "Email Address",
                  hookFormName: "Email Address (Next of Kin)",
                  type: "text",
                  required: true,
                  placeholder: "Enter email",
                  ...(isEdit && {
                    defaultValue: employeeData?.nextOfKin[0].email,
                  }),
                },
                {
                  label: "Phone Number",
                  hookFormName: "Phone Number (Next of Kin)",
                  type: "text",
                  required: true,
                  placeholder: "Enter phone number",
                  ...(isEdit && {
                    defaultValue: employeeData?.nextOfKin[0].phoneNumber,
                  }),
                },
                {
                  label: "Relationship",
                  type: "select",
                  required: true,
                  hookFormField: true,
                  placeholder: "Select",
                  controllerRules: {
                    required: "Relationship is required",
                  },
                  options: [
                    {
                      label: "Spouse",
                      value: "spouse",
                    },
                    { label: "Parent", value: "parent" },
                    { label: "Child", value: "child" },
                    { label: "Sibling", value: "sibling" },
                    { label: "Other", value: "other" },
                  ],
                  ...(isEdit && {
                    defaultValue: employeeData?.nextOfKin[0].relationship,
                  }),
                },
              ],
              buttonGroup: personalInfoButtonGroup,
            },
          ],
        }}
        employment={{
          forms: [
            {
              layout: "3-columns",
              title: "Employment Information",
              gridSpacing: formGridSpacing,
              control: employmentControl,
              register: employmentRegister,
              errors: employmentErrors,
              loading: loading,
              inputFields: [
                {
                  label: "Job Title",
                  type: "text",
                  required: true,
                  placeholder: "Enter job title",
                  ...(isEdit && {
                    defaultValue: employeeData?.employmentInformation.jobTitle,
                  }),
                },
                {
                  label: "Department",
                  // type: "multi-select",
                  type: "select",
                  required: true,
                  hookFormField: true,
                  options: [
                    {
                      label: "Artificial Intelligence",
                      value: "679cf7e77779e02cd91b82af",
                    },
                    // { label: "IT", value: "uuid-two" },
                  ],
                  ...(isEdit && {
                    defaultValue:
                      employeeData?.employmentInformation.department
                        .departmentName,
                  }),
                },
                // {
                //   label: "Manager/Supervisor",
                //   type: "multi-select",
                //   required: true,
                //   hookFormField: true,
                //   controllerRules: {
                //     required: "Manager/Supervisor is required",
                //   },
                //   options: [
                //     {
                //       label: "Ayomide",
                //       value: "uuid-one",
                //     },
                //   ],
                // },
                {
                  label: "Manager/Supervisor",
                  type: "text",
                  required: true,
                  placeholder: "Enter name",
                  ...(isEdit && {
                    defaultValue: employeeData?.employmentInformation.manager,
                  }),
                },
                {
                  label: "Employment Type",
                  type: "select",
                  required: true,
                  hookFormField: true,
                  controllerRules: {
                    required: "Employment type is required",
                  },
                  options: [
                    {
                      label: "Full-Time",
                      value: "full_time",
                    },
                    {
                      label: "Part-Time",
                      value: "part_time",
                    },
                  ],
                  ...(isEdit && {
                    defaultValue:
                      employeeData?.employmentInformation.employmentType,
                  }),
                },
                {
                  label: "Employment Status",
                  type: "select",
                  required: true,
                  hookFormField: true,
                  controllerRules: {
                    required: "Employment status is required",
                  },
                  options: [
                    { label: "Terminated", value: "terminated" },
                    { label: "On leave", value: "on_leave" },
                  ],
                  ...(isEdit && {
                    defaultValue:
                      employeeData?.employmentInformation.employmentStatus,
                  }),
                },
                {
                  label: "Hire Date",
                  type: "date",
                  required: true,
                  hookFormField: true,
                  ...(isEdit && {
                    defaultValue: employeeData?.employmentInformation.hireDate,
                  }),
                },
                {
                  label: "Work Location/Branch",
                  type: "select",
                  required: true,
                  hookFormField: true,
                  controllerRules: {
                    required: true,
                  },
                  options: [
                    {
                      label: "Headquarters",
                      value: "headquarters",
                    },
                    { label: "Remote", value: "remote" },
                    { label: "On site", value: "onsite" },
                    { label: "Hybrid", value: "hybrid" },
                    { label: "Ikoyi Lagos", value: "ikoyi-lagos" },
                    { label: "Branch 1", value: "branch-1" },
                  ],
                  ...(isEdit && {
                    defaultValue:
                      employeeData?.employmentInformation.workLocation,
                  }),
                },
                {
                  label: "Work Schedule",
                  type: "select",
                  required: true,
                  hookFormField: true,
                  placeholder: "Select",
                  controllerRules: {
                    required: "Work Schedule is required",
                  },
                  options: [
                    {
                      label: "9 to 5",
                      value: "9_to_5",
                    },
                    {
                      label: "Shift Work",
                      value: "Shift_Work",
                    },
                  ],
                  ...(isEdit && {
                    defaultValue:
                      employeeData?.employmentInformation.workSchedule,
                  }),
                },
                {
                  label: "Staff ID",
                  type: "text",
                  placeholder: "CYN123",
                  disabled: true,
                  ...(isEdit && {
                    defaultValue: employeeData?.employmentInformation.staffId,
                  }),
                },
                {
                  label: "Probation Period",
                  type: "text",
                  placeholder: "Enter probation period",
                  ...(isEdit && {
                    defaultValue:
                      employeeData?.employmentInformation.probationPeriod,
                  }),
                },
                {
                  label: "Contract End Date",
                  type: "date",
                  required: true,
                  hookFormField: true,
                  controllerRules: {
                    required: "Contract end date is required",
                  },
                  ...(isEdit && {
                    defaultValue:
                      employeeData?.employmentInformation.contractEndDate ??
                      undefined,
                  }),
                },
                {
                  label: "Work Email",
                  type: "text",
                  required: true,
                  placeholder: "Enter work email",
                  ...(isEdit && {
                    defaultValue: employeeData?.employmentInformation.workEmail,
                  }),
                },
                {
                  label: "Work Phone Number",
                  type: "text",
                  required: true,
                  placeholder: "Enter phone number",
                  ...(isEdit && {
                    defaultValue:
                      employeeData?.employmentInformation.workPhoneNumber,
                  }),
                },
                {
                  label: "Job Description",
                  type: "drag-upload-hook-form",
                  required: true,
                  hookFormGetValues: employmentGetValues,
                  hookFormResetField: employmentResetField,
                  hookFormWatch: employmentWatch,
                  ...(isEdit && {
                    defaultValue:
                      employeeData?.employmentInformation.jobDescription,
                  }),
                },
              ],
              buttonGroup: employmentButtonGroup,
            },
          ],
        }}
        compensation={{
          forms: [
            {
              title: "Compensation Breakdown",
              gridSpacing: formGridSpacing,
              layout: "3-columns",
              register: compenstationRegister,
              control: compensationControl,
              errors: compensationErrors,
              loading: loading,
              inputFields: [
                {
                  label: "Base Salary",
                  type: "text",
                  required: true,
                  startadornment: (
                    <div className="mr-2">
                      <SvgIcon path={icon.naira} width={15} height={13.33} />
                    </div>
                  ),
                  placeholder: "Enter base salary",
                  ...(isEdit && {
                    defaultValue: employeeData?.compensation.baseSalary,
                  }),
                },
                {
                  label: "Salary Frequency",
                  type: "select",
                  required: true,
                  hookFormField: true,
                  options: [
                    { label: "Monthly", value: "monthly" },
                    { label: "Bi-Weekly", value: "bi-weekly" },
                  ],
                  ...(isEdit && {
                    defaultValue: employeeData?.compensation.salaryFrequency,
                  }),
                },
                {
                  label: "Bonus Structure",
                  type: "text",
                  placeholder: "Enter bonus structure",
                  ...(isEdit && {
                    defaultValue: employeeData?.compensation.bonusStructure,
                  }),
                },
                {
                  label: "Commission",
                  type: "text",
                  placeholder: "Enter commission",
                  ...(isEdit && {
                    defaultValue: employeeData?.compensation.commission,
                  }),
                },
                {
                  label: "Stock Options",
                  type: "text",
                  placeholder: "Enter stock options",
                  ...(isEdit && {
                    defaultValue: employeeData?.compensation.stockOptions,
                  }),
                },
                {
                  label: "Effective Date of Compensation",
                  type: "date",
                  required: true,
                  hookFormField: true,
                  ...(isEdit && {
                    defaultValue:
                      employeeData?.compensation.effectiveDateOfCompensation,
                  }),
                },
                {
                  label: "Pay Grade/Level",
                  type: "select",
                  required: true,
                  hookFormField: true,
                  options: [
                    {
                      label: "Level 1",
                      value: "1",
                    },
                    { label: "Level 2", value: "2" },
                  ],
                  ...(isEdit && {
                    defaultValue: employeeData?.compensation.payGrade,
                  }),
                },
                {
                  label: "Payment Method",
                  type: "select",
                  required: true,
                  hookFormField: true,
                  options: [{ label: "Bank Transfer", value: "bank_transfer" }],
                  ...(isEdit && {
                    defaultValue: employeeData?.compensation.paymentMethod,
                  }),
                },
                {
                  label: "Bank Name",
                  type: "select",
                  required: true,
                  hookFormField: true,
                  options: [
                    {
                      label: "First Bank",
                      value: "First Bank",
                    },
                    {
                      label: "GT Bank",
                      value: "GT Bank",
                    },
                  ],
                  ...(isEdit && {
                    defaultValue: employeeData?.compensation.bankName,
                  }),
                },
                {
                  label: "Bank Account Number",
                  type: "text",
                  required: true,
                  placeholder: "Enter account number",
                  ...(isEdit && {
                    defaultValue: employeeData?.compensation.bankAccountNo,
                  }),
                },
                {
                  label: "Routing Number",
                  type: "text",
                  required: true,
                  placeholder: "Enter routing number",
                  ...(isEdit && {
                    defaultValue: employeeData?.compensation.routingNumber,
                  }),
                },
                {
                  label: "Tax Filing Status",
                  type: "select",
                  required: true,
                  hookFormField: true,
                  options: [{ label: "Active", value: "active" }],
                  ...(isEdit && {
                    defaultValue: employeeData?.compensation.taxFilingStatus,
                  }),
                },
                {
                  label: "Tax Identification Number (TIN)",
                  type: "text",
                  required: true,
                  placeholder: "Enter TIN",
                  ...(isEdit && {
                    defaultValue:
                      employeeData?.compensation.taxIdentificationNumber,
                  }),
                },
                {
                  label: "Overtime",
                  type: "select",
                  required: true,
                  hookFormField: true,
                  options: [{ label: "Time and Half", value: "time_and_half" }],
                  ...(isEdit && {
                    defaultValue: employeeData?.compensation.overtime,
                  }),
                },
              ],
            },
            {
              register: compenstationRegister,
              control: compensationControl,
              errors: compensationErrors,
              inputFields: [
                {
                  label: "Allowances",
                  type: "add-items",
                  addItemsProps: {
                    addText: "Include More Allowance",
                    type: "no-select",
                    addedItems: allowances,
                    hookFormName: "allowancename",
                    secondaryHookFormName: "amount",
                    secondaryFieldRequired: true,
                    inputFieldType: "text",
                    showFieldLabels: false,
                    hasSecondaryField: true,
                    inputFieldRequired: true,
                    inputFieldPlacehdoler: "Enter name of allowance",
                    secondaryFieldPlaceholder: "Amount",
                    startIndexToShowDelete: 1,
                    secondaryFieldStartAdornment: (
                      <SvgIcon path={icon.naira} width={15} height={13.33} />
                    ),
                    gridCols: { xs: 3, lg: 3 },
                    hookFormErrors: compensationErrors,
                    hookFormRegister: compenstationRegister,
                    hookFormUnregister: compensationUnregister,
                    getLocalAddedItems: (items) => setAllowances(items),
                  },
                },
              ],
            },
            {
              inputFields: [
                {
                  label: "Deductions",
                  type: "add-items",
                  addItemsProps: {
                    addText: "Include More Deductions",
                    type: "no-select",
                    addedItems: deductions,
                    inputFieldType: "text",
                    hookFormName: "deductionname",
                    secondaryHookFormName: "deductionamount",
                    inputFieldRequired: true,
                    secondaryFieldRequired: true,
                    showFieldLabels: false,
                    hasSecondaryField: true,
                    inputFieldPlacehdoler: "Enter name of deduction",
                    secondaryFieldPlaceholder: "Amount",
                    startIndexToShowDelete: 1,
                    secondaryFieldStartAdornment: (
                      <SvgIcon path={icon.naira} width={15} height={13.33} />
                    ),
                    gridCols: { xs: 3, lg: 3 },
                    hookFormErrors: compensationErrors,
                    hookFormRegister: compenstationRegister,
                    hookFormUnregister: compensationUnregister,
                    getLocalAddedItems: (items) => setDeductions(items),
                  },
                },
              ],
              buttonGroup: compensationButtonGroup,
            },
          ],
        }}
        documents={{
          forms: [
            {
              title: "Document Upload",
              gridSpacing: formGridSpacing,
              layout: "3-columns",
              control: documentsControl,
              register: documentsRegister,
              // errors: documentsErrors,
              loading: loading,
              inputFields: [
                {
                  type: "add-items",
                  addItemsProps: {
                    addText: "Add More Documents",
                    type: "no-select",
                    addedItems: addedDocs,
                    getLocalAddedItems: (items) => setAddedDocs(items),
                    inputFieldType: "drag-upload-hook-form",
                    inputFieldRequired: true,
                    hookFormName: "document",
                    hookFormRegister: documentsRegister,
                    hookFormGetValues: documentsGetValues,
                    hookFormResetField: documentsResetField,
                    hookFormWatch: documentsWatch,
                    hookFormUnregister: documentsUnregister,
                    showFieldLabels: true,
                    startIndexToShowDelete: 2,
                    gridCols: { xs: 1 },
                  },
                },
              ],
              buttonGroup: documentsButtonGroup,
            },
          ],
        }}
        equipmentsAndAccess={{
          forms: [
            {
              title: "Employee Equipment",
              gridSpacing: formGridSpacing,
              layout: "3-columns",
              control: equipmentsAndAccessControl,
              errors: equipmentsAndAccessErrors,
              register: equipmentsAndAccessRegister,
              loading: loading,
              inputFields: [
                // {
                //   label: "Device Category",
                //   type: "select",
                //   required: true,
                //   hookFormField: true,
                //   controllerRules: {
                //     required: "Device Category",
                //   },
                //   options: [
                //     { label: "Laptop", value: "laptop" },
                //     { label: "Desktop", value: "desktop" },
                //   ],
                // },
                {
                  label: "Device Type",
                  type: "select",
                  hookFormField: true,
                  required: true,
                  controllerRules: {
                    required: "Device Type is required",
                  },
                  options: [
                    // { label: "Laptop", value: "677bd034a44473351eade101" },
                    { label: "Laptop", value: "Laptop" },
                  ],
                  ...(isEdit && {
                    defaultValue: employeeData?.accessRights[0].devices[0],
                  }),
                },
              ],
            },
            {
              title: "Access",
              gridSpacing: formGridSpacing,
              control: equipmentsAndAccessControl,
              errors: equipmentsAndAccessErrors,
              register: equipmentsAndAccessRegister,
              inputFields: [
                {
                  type: "add-items",
                  addItemsProps: {
                    addText: "Add More Access",
                    type: "no-select",
                    getLocalAddedItems: (items) => setEmployeeTools(items),
                    addedItems: employeeTools,
                    allItems: availableTools,
                    hasSelectOptions: true,
                    hookFormControl: equipmentsAndAccessControl,
                    hookFormRegister: equipmentsAndAccessRegister,
                    hookFormUnregister: equipmentsAndAccessUnregister,
                    hookFormErrors: equipmentsAndAccessErrors,
                    inputFieldType: "select",
                    inputFieldName: "Tool",
                    ...(isEdit && { forceInputFieldNameAsLabel: true }),
                    hookFormName: "tool",
                    inputFieldRequired: true,
                    inputFieldIsHookForm: true,
                    inputFieldControllerRules: { required: "Tool is required" },
                    secondaryFieldRequired: true,
                    secondaryFieldControllerRules: {
                      required: "ID is required",
                    },
                    useNameAsDefaultValue: true,
                    secondaryHookFormName: "id",
                    secondaryFieldType: "text",
                    secondaryFieldPlaceholder: "Enter ID",
                    showFieldLabels: true,
                    startIndexToShowDelete: 1,
                    hasSecondaryField: true,
                    secondaryFieldName: "ID",
                    gridCols: { xs: 1, lg: 3 },
                  },
                },
              ],
              buttonGroup: equipmentsAndAccessButtonGroup,
            },
          ],
        }}
      />
      {openSuccessModal && (
        <Modal
          open={openSuccessModal}
          onClose={() => {}}
          hasHeading={false}
          centerImage={icon.successTick}
          centerTitle="Employee Created Successfully"
          centerButton
          buttonOne={{
            type: ButtonType.contained,
            text: "Return to Employee Directory",
            onClick: () =>
              router.push("/hr-admin/employee-management/directory"),
          }}
        />
      )}
    </>
  );
};

export default HrAdminEmployeeDirectoryAddEmployee;
