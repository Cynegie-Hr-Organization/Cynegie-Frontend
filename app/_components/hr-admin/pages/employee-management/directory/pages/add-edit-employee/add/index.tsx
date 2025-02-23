"use client";
import Modal from "@/app/_components/employee/modal";
import {
  addEmployee,
  getDepartments,
  getEmployee,
} from "@/app/_components/hr-admin/pages/payroll-management/pages/benefits-management/api";
import {
  getDevices,
  requestEmployeeUpdate,
} from "@/app/_components/hr-admin/pages/payroll-management/pages/overview/api";
import SvgIcon from "@/app/_components/icons/container";
import { ButtonGroupProps } from "@/app/_components/shared/button-group/types";
import { AddedItem } from "@/app/_components/shared/custom-popover/content/add-items";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import { icon } from "@/constants";
import { countriesWithStates } from "@/constants/countries-states";
import { AddEmployeePayload, EmployeeUpdateRequest } from "@/types";
import { transformToArray } from "@/utils/form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import HrAdminEmployeeDirectoryAddEditEmployee from "..";

const formGridSpacing = 5;

const HrAdminEmployeeDirectoryAddEmployee: React.FC<{ type?: "edit" }> = ({
  type,
}) => {
  const isEdit = type === "edit";
  const [currentTab, setCurrentTab] = useState(0);
  const [tabOneInitCompletion, setTabOneInitCompletion] = useState(
    isEdit ? true : false,
  );
  const [tabTwoInitCompletion, setTabTwoInitCompletion] = useState(
    isEdit ? true : false,
  );
  const [tabThreeInitCompletion, setTabThreeInitCompletion] = useState(
    isEdit ? true : false,
  );
  const [tabFourInitCompletion, setTabFourInitCompletion] = useState(
    isEdit ? true : false,
  );

  const [tabOneVisits, setTabOneVisits] = useState(0);
  const [tabTwoVisits, setTabTwoVisits] = useState(0);
  const [tabThreeVisits, setTabThreeVisits] = useState(0);
  const [tabFourVisits, setTabFourVisits] = useState(0);
  const [tabFiveVisits, setTabFiveVisits] = useState(0);

  const [mutationLoading, setMutationLoading] = useState(false);
  const [openEditRequestModal, setOpenEditRequestModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const [departmentOptions, setDepartmentOptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >();

  const [deviceOptions, setDeviceOptions] =
    useState<{ label: string; value: string }[]>();

  const router = useRouter();
  const queryClient = useQueryClient();

  const { slug } = useParams();

  const { data: employeeData } = useQuery({
    queryKey: ["employee", slug],
    ...(isEdit && {
      queryFn: () => getEmployee(typeof slug === "string" ? slug : ""),
    }),
  });

  const { data: departmentsData } = useQuery({
    queryKey: ["departments"],
    queryFn: () => getDepartments({ page: 1, limit: 50, sortOrder: "asc" }),
  });

  const { data: devicesData } = useQuery({
    queryKey: ["devices"],
    queryFn: () => getDevices({ page: 1, limit: 50, sortOrder: "asc" }),
  });

  const loading = employeeData ? false : isEdit ? true : false;

  const handleTabChange = (event?: React.SyntheticEvent, _newTab?: number) => {
    const newTab = _newTab ?? 0;
    event?.preventDefault();
    if (!isEdit)
      if (!mutationLoading) {
        switch (currentTab) {
          case 0:
            if (newTab > 0 && personalInfoIsValid && tabOneInitCompletion) {
              if (isEdit) {
                if (isEditPersonalInfoValid) {
                  setCurrentTab(newTab);
                }
              } else {
                setCurrentTab(newTab);
              }
            }
            break;
          case 1:
            if (newTab > 1) {
              if (newTab == 2 && employmentIsValid && tabTwoInitCompletion) {
                setCurrentTab(newTab);
              }
              if (
                newTab == 3 &&
                compensationIsValid &&
                tabThreeInitCompletion
              ) {
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
              if (
                newTab == 3 &&
                compensationIsValid &&
                tabThreeInitCompletion
              ) {
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
    if (isEdit) setCurrentTab(newTab);
  };

  const {
    control: personalInfoControl,
    register: personalInfoRegister,
    formState: {
      errors: personalInfoErrors,
      isValid: personalInfoIsValid,
      dirtyFields: personalInfoDirtyFields,
    },
    watch: personalInfoWatch,
    getValues: personalInfoGetValues,
    resetField: personalInfoResetField,
    setValue: personalInfoSetValue,
    reset: personalInfoReset,
  } = useForm();

  const country = personalInfoWatch("Country");
  const [states, setStates] = useState<{ label: string; value: string }[]>([]);

  const {
    control: employmentControl,
    register: employmentRegister,
    formState: {
      errors: employmentErrors,
      isValid: employmentIsValid,
      dirtyFields: employmentDirtyFields,
    },
    watch: employmentWatch,
    getValues: employmentGetValues,
    resetField: employmentResetField,
    setValue: employmentSetValue,
    reset: employmentReset,
  } = useForm();

  const {
    register: compenstationRegister,
    control: compensationControl,
    formState: {
      errors: compensationErrors,
      isValid: compensationIsValid,
      dirtyFields: compensationDirtyFields,
    },
    getValues: compensationGetValues,
    unregister: compensationUnregister,
    reset: compensationReset,
  } = useForm();

  const {
    register: documentsRegister,
    control: documentsControl,
    formState: { isValid: documentsIsValid, dirtyFields: documentsDirtyFields },
    watch: documentsWatch,
    getValues: documentsGetValues,
    resetField: documentsResetField,
    unregister: documentsUnregister,
    reset: documentsReset,
    setValue: documentsSetValue,
  } = useForm();

  const documents = documentsWatch();

  const [addedDocs, setAddedDocs] = useState<AddedItem[]>(
    isEdit
      ? []
      : [
          { name: "ID Upload", value: "" },
          { name: "Proof of Contract", value: "" },
        ],
  );

  const {
    register: equipmentsAndAccessRegister,
    control: equipmentsAndAccessControl,
    formState: {
      errors: equipmentsAndAccessErrors,
      isValid: equipmentsAndAccessIsValid,
      dirtyFields: equipmentsAndAccessDirtyFields,
    },
    // resetField: equipmentsAndAccessResetField,
    // watch: equipmentsAndAccessWatch,
    getValues: equipmentsAndAccessGetValues,
    unregister: equipmentsAndAccessUnregister,
    reset: equipmentsAndAccessReset,
  } = useForm();

  // const [deviceTypes, setDeviceTypes] = useState<
  //   { label: string; value: string }[]
  // >([]);

  // const deviceCategory = equipmentsAndAccessWatch("Device Category");

  const availableTools = ["Behance", "Figma", "Mailchimp", "Slack"];

  const [employeeTools, setEmployeeTools] = useState<AddedItem[]>(
    isEdit ? [{ name: "Tool", value: "" }] : [{ name: "Tool", value: "" }],
  );

  const {
    register: editRegister,
    formState: { errors: editErrors, isValid: editIsValid },
    watch: editWatch,
    getValues: editGetValues,
    resetField: editResetField,
    setValue: editSetValue,
    reset: editReset,
  } = useForm();

  const saveAndContinueLaterButton = {
    type: ButtonType.outlined,
    text: "Save and Continue Later",
    onClick: () => {},
  };

  const labelToFieldMap: Record<
    string,
    {
      field: string;
      type: "text" | "number" | "doc" | "date";
    }
  > = {
    "First Name": {
      field: "firstName",
      type: "text",
    },
    "Middle Name": {
      field: "middleName",
      type: "text",
    },
    "Last Name": {
      field: "lastName",
      type: "text",
    },
    "Email Address": {
      field: "email",
      type: "text",
    },
    "Phone Number": {
      field: "phoneNumber",
      type: "text",
    },
    "Date of Birth": {
      field: "dateOfBirth",
      type: "date",
    },
    Country: {
      field: "country",
      type: "text",
    },
    "Street Address": {
      field: "streetAddress",
      type: "text",
    },
    City: {
      field: "city",
      type: "text",
    },
    State: {
      field: "state",
      type: "text",
    },
    "Postal Code": {
      field: "postalCode",
      type: "text",
    },

    Nationality: {
      field: "nationality",
      type: "text",
    },
    "Marital Status": {
      field: "maritalStatus",
      type: "text",
    },
    "ID Upload": {
      field: "idUpload",
      type: "text",
    },
    Passport: {
      field: "passport",
      type: "text",
    },
    "First Name (Next of Kin)": {
      field: "fName",
      type: "text",
    },
    "Last Name (Next of Kin)": {
      field: "lName",
      type: "text",
    },
    Gender: {
      field: "gender",
      type: "text",
    },
    "Email Address (Next of Kin)": {
      field: "nextemail",
      type: "text",
    },
    "Phone Number (Next of Kin)": {
      field: "nextPhoneNumber",
      type: "text",
    },
    Relationship: {
      field: "relationship",
      type: "text",
    },
    "Job Title": {
      field: "jobTitle",
      type: "text",
    },
    Department: {
      field: "department",
      type: "text",
    },
    "Manager/Supervisor": {
      field: "manager",
      type: "text",
    },
    "Employment Type": {
      field: "employmentType",
      type: "text",
    },
    "Employment Status": {
      field: "employmentStatus",
      type: "text",
    },
    "Hire Date": {
      field: "hireDate",
      type: "text",
    },
    "Work Location/Branch": {
      field: "workLocation",
      type: "text",
    },
    "Work Schedule": {
      field: "workSchedule",
      type: "text",
    },
    "Staff ID": {
      field: "staffId",
      type: "text",
    },
    "Probation Period": {
      field: "probationPeriod",
      type: "text",
    },
    "Contract End Date": {
      field: "contractEndDate",
      type: "text",
    },
    "Work Email": {
      field: "workEmail",
      type: "text",
    },
    "Work Phone Number": {
      field: "workPhoneNumber",
      type: "text",
    },
    "Job Description": {
      field: "jobDescription",
      type: "text",
    },
    "Base Salary": {
      field: "baseSalary",
      type: "number",
    },
    "Salary Frequency": {
      field: "salaryFrequency",
      type: "text",
    },
    "Bonus Structure": {
      field: "bonusStructure",
      type: "text",
    },
    Commission: {
      field: "commission",
      type: "number",
    },
    "Stock Options": {
      field: "stockOptions",
      type: "number",
    },
    "Effective Date of Compensation": {
      field: "effectiveDateOfCompensation",
      type: "date",
    },
    "Pay Grade/Level": {
      field: "payGrade",
      type: "text",
    },
    "Payment Method": {
      field: "paymentMethod",
      type: "text",
    },
    "Bank Name": {
      field: "bankName",
      type: "text",
    },
    "Bank Account Number": {
      field: "bankAccountNo",
      type: "text",
    },
    "Routing Number": {
      field: "routingNo",
      type: "text",
    },
    "Tax Filing Status": {
      field: "taxFilingStatus",
      type: "text",
    },
    "Tax Identification Number (TIN)": {
      field: "taxIdentificationNumber",
      type: "text",
    },
    Overtime: {
      field: "overtime",
      type: "text",
    },
  };

  const getFieldValue = (
    field: string,
    value: string | FileList | number | Date,
  ) => {
    switch (labelToFieldMap[field].type) {
      case "text":
        return value;
      case "number":
        return Number(value);
      case "doc":
        if (value instanceof FileList) {
          return value[0].name;
        }
      case "date":
        if (!(value instanceof FileList)) {
          if (typeof value !== "string" && typeof value !== "number") {
            return dayjs(value).add(1, "day").toISOString();
          }
        }
    }
  };

  const getCompensationUpdates = () => {
    const allowanceUpdated =
      Object.keys(compensationDirtyFields).filter(
        (key) => key.match("allowancename") || (key.match("amount") && key),
      ).length > 0;
    const deductionUpdated =
      Object.keys(compensationDirtyFields).filter(
        (key) =>
          key.match("deductionname") || (key.match("deductionamount") && key),
      ).length > 0;
    const simpleKeys = Object.keys(compensationDirtyFields).filter(
      (key) =>
        !(
          key.match("allowancename") ||
          key.match("amount") ||
          key.match("deductionname") ||
          key.match("deductionamount")
        ) && key,
    );
    const updatedSimpleKeyFields = simpleKeys.map((field) => ({
      field: labelToFieldMap[field].field,
      value: getFieldValue(field, compensationGetValues(field)),
    }));
    const transformedAllowance = transformToArray(
      compensationGetValues(),
      "allowancename",
      "amount",
      "allowanceName",
      "allowanceAmount",
      true,
    );
    const transformedDeduction = transformToArray(
      compensationGetValues(),
      "deductionname",
      "deductionamount",
      "deductionName",
      "deductionAmount",
      true,
    );
    return [
      ...updatedSimpleKeyFields,
      ...(allowanceUpdated
        ? [
            {
              field: "allowance",
              value: transformedAllowance,
            },
          ]
        : []),
      ...(deductionUpdated
        ? [
            {
              field: "deduction",
              value: transformedDeduction,
            },
          ]
        : []),
    ];
  };

  const docsArray = Object.values(documentsGetValues()).map(
    /*async*/ (/*doc*/ _, index) => ({
      documentName: addedDocs[index]?.name,
      documentUrl: `link_for_${addedDocs[index]?.name}`, //TODO: Get link from the backend using an upload function. For example: await upload(doc),
    }),
  );

  const getDocumentsUpdates = () => {
    const docsUpdated = Object.keys(documentsDirtyFields).length > 0;
    if (docsUpdated) {
      return [{ field: "documents", value: docsArray }];
    } else {
      return [];
    }
  };

  const getEquipmentsAndAccessUpdates = () => {
    const equipmentsAndAccessUpdated =
      Object.keys(equipmentsAndAccessDirtyFields).length > 0;
    if (equipmentsAndAccessUpdated) {
      return [
        {
          field: "accessRights",
          value: [
            {
              devices: [equipmentsAndAccessGetValues()["Device Type"]],
              permissions: transformToArray(
                equipmentsAndAccessGetValues(),
                "tool",
                "id",
                "tool",
                "id",
                false,
              ).map((permission) => ({
                tool: availableTools.filter(
                  (availableTool) => availableTool === permission.tool,
                )[0],
                id: permission.id,
              })),
            },
          ],
        },
      ];
    } else {
      return [];
    }
  };

  const getUpdatedFields = () => {
    const personalInfo = Object.keys(personalInfoDirtyFields).map((field) => ({
      field: labelToFieldMap[field].field,
      value: getFieldValue(field, personalInfoGetValues(field)),
    }));
    const employment = Object.keys(employmentDirtyFields)
      .map((field) => ({
        field: labelToFieldMap[field].field,
        value: getFieldValue(field, employmentGetValues(field)),
      }))
      .filter((dirtyField) => dirtyField.value !== undefined);
    const compensation = getCompensationUpdates();
    const documents = getDocumentsUpdates();
    const equipmentsAndAccess = getEquipmentsAndAccessUpdates();
    return [
      ...personalInfo,
      ...employment,
      ...compensation,
      ...documents,
      ...equipmentsAndAccess,
    ];
  };

  const saveChangesOnClick = () => {
    setOpenEditRequestModal(true);
  };

  const addPersonalInfoButtonType = personalInfoIsValid
    ? ButtonType.contained
    : ButtonType.disabled;

  const isEditPersonalInfoValid =
    personalInfoIsValid &&
    personalInfoGetValues("ID Upload") !== undefined &&
    personalInfoGetValues("Passport") !== undefined;

  const isEditPersonalInfoButtonType =
    isEditPersonalInfoValid && getUpdatedFields().length > 0
      ? ButtonType.contained
      : ButtonType.disabled;

  const personalInfoButtonGroup: ButtonGroupProps = {
    leftButton: saveAndContinueLaterButton,
    rightButton: {
      type: isEdit ? isEditPersonalInfoButtonType : addPersonalInfoButtonType,
      text: isEdit ? "Save Changes" : "Continue",
      isSubmit: true,
      onClick: (e) => {
        e.preventDefault();
        if (!tabOneInitCompletion) {
          setCurrentTab(currentTab + 1);
          setTabOneInitCompletion(true);
        } else {
          if (isEdit) {
            saveChangesOnClick();
          } else {
            setCurrentTab(currentTab + 1);
          }
        }
      },
    },
    position: "end",
  };

  const addEmploymentButtonType = employmentIsValid
    ? ButtonType.contained
    : ButtonType.disabled;

  const isEditEmploymentValid =
    employmentIsValid && employmentGetValues("Job Description") !== undefined;

  const isEditEmploymentButtonType =
    isEditEmploymentValid && getUpdatedFields().length > 0
      ? ButtonType.contained
      : ButtonType.disabled;

  const employmentButtonGroup: ButtonGroupProps = {
    leftButton: saveAndContinueLaterButton,
    rightButton: {
      type: isEdit ? isEditEmploymentButtonType : addEmploymentButtonType,
      text: isEdit ? "Save Changes" : "Continue",
      onClick: () => {
        if (!tabTwoInitCompletion) {
          setTabTwoInitCompletion(true);
          setCurrentTab(currentTab + 1);
        } else {
          if (isEdit) {
            saveChangesOnClick();
          } else {
            setCurrentTab(currentTab + 1);
          }
        }
      },
    },
    position: "end",
  };

  const addCompensationButtonType = compensationIsValid
    ? ButtonType.contained
    : ButtonType.disabled;

  const isEditCompensationButtonType =
    compensationIsValid && getUpdatedFields().length > 0
      ? ButtonType.contained
      : ButtonType.disabled;

  const compensationButtonGroup: ButtonGroupProps = {
    leftButton: saveAndContinueLaterButton,
    rightButton: {
      type: isEdit ? isEditCompensationButtonType : addCompensationButtonType,
      text: isEdit ? "Save Changes" : "Continue",
      isSubmit: true,
      onClick: (e) => {
        e.preventDefault();
        if (!tabThreeInitCompletion) {
          setTabThreeInitCompletion(true);
          setCurrentTab(currentTab + 1);
        } else {
          if (isEdit) {
            saveChangesOnClick();
          } else {
            setCurrentTab(currentTab + 1);
          }
        }
      },
    },
    position: "end",
  };

  const [allowances, setAllowances] = useState<AddedItem[]>(
    isEdit ? [] : [{ name: "", value: "" }],
  );

  const [deductions, setDeductions] = useState<AddedItem[]>(
    isEdit ? [] : [{ name: "", value: "" }],
  );

  const documentsRightButtonEditType = !Object.values(documents).includes(
    undefined,
  )
    ? Object.values(documents).filter((val) => val.length < 1).length === 0 &&
      getUpdatedFields().length > 0
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
      onClick: (e) => {
        e.preventDefault();
        if (!tabFourInitCompletion) {
          setTabFourInitCompletion(true);
          setCurrentTab(currentTab + 1);
        } else {
          if (isEdit) {
            saveChangesOnClick();
          } else {
            setCurrentTab(currentTab + 1);
          }
        }
      },
    },
    position: "end",
  };

  const addEquipmentsAndAccessButtonType = equipmentsAndAccessIsValid
    ? mutationLoading
      ? ButtonType.disabledLoading
      : ButtonType.contained
    : ButtonType.disabled;

  const isEditEquipmentsAndAccessButtonType =
    equipmentsAndAccessIsValid && getUpdatedFields().length > 0
      ? ButtonType.contained
      : ButtonType.disabled;

  const equipmentsAndAccessButtonGroup: ButtonGroupProps = {
    leftButton: saveAndContinueLaterButton,
    rightButton: {
      type: isEdit
        ? isEditEquipmentsAndAccessButtonType
        : addEquipmentsAndAccessButtonType,
      text: isEdit ? "Save Changes" : mutationLoading ? "" : "Add Employee",
      isSubmit: true,
      onClick: (e) => {
        e.preventDefault();
        if (isEdit) saveChangesOnClick();
        else addEmployeeSubmit();
      },
    },
    position: "end",
  };

  const addEmployeeSubmit = () =>
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
        workPhoneNumber: employmentGetValues()["Work Phone Number"],
        // jobDescription: "job_description_doc_url", //TODO: Get doc URL await upload(tab2["Job Description"][0]),
        jobDescription: employmentGetValues()?.["Job Description"]?.[0]?.name,
      },
      personalInfo: {
        firstName: personalInfoGetValues()["First Name"],
        lastName: personalInfoGetValues()["Last Name"],
        middleName: personalInfoGetValues()["Middle Name"],
        dateOfBirth: personalInfoGetValues()["Date of Birth"]?.toISOString(),
        gender: personalInfoGetValues()["Gender"],
        maritalStatus: personalInfoGetValues()["Marital Status"],
        phoneNumber: personalInfoGetValues()["Phone Number"],
        email: personalInfoGetValues()["Email Address"],
        country: personalInfoGetValues()["Country"],
        state: personalInfoGetValues()["State"],
        city: personalInfoGetValues()["City"],
        idUpload: personalInfoGetValues()["ID Upload"]?.[0]?.name,
        passport: personalInfoGetValues()["Passport"]?.[0]?.name,
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
        routingNo: compensationGetValues()["Routing Number"],
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
          true,
        ),
        deduction: transformToArray(
          compensationGetValues(),
          "deductionname",
          "deductionamount",
          "deductionName",
          "deductionAmount",
          true,
        ),
      },
      nextOfKin: {
        fName: personalInfoGetValues()["First Name (Next of Kin)"],
        lName: personalInfoGetValues()["Last Name (Next of Kin)"],
        gender: personalInfoGetValues()["Gender"],
        relationship: personalInfoGetValues()["Relationship"],
        nextPhoneNumber: personalInfoGetValues()["Phone Number (Next of Kin)"],
        nextemail: personalInfoGetValues()["Email Address (Next of Kin)"],
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
            false,
          ).map((permission) => ({
            tool: availableTools.filter(
              (availableTool) => availableTool === permission.tool,
            )[0],
            id: permission.id,
          })),
        },
      ],
    });

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

  const editEmployeeMutation = useMutation({
    mutationFn: (payload: EmployeeUpdateRequest) =>
      requestEmployeeUpdate(payload),
    onMutate: () => setMutationLoading(true),
    onSuccess: (res) => {
      if (
        Object.keys(res).includes("error") ||
        res.statusCode === 500 ||
        res.statusCode === 401
      ) {
        alert("An error occured");
      } else {
        setOpenEditRequestModal(false);
        setOpenSuccessModal(true);
      }
    },
    onError: () => alert("An error occureed"),
  });

  useEffect(() => {
    if (country) {
      setStates(
        countriesWithStates[country].map((state) => ({
          label: state,
          value: state,
        })),
      );
    }
  }, [country]);

  useEffect(() => {
    if (departmentsData) {
      setDepartmentOptions(
        departmentsData.data.map((department) => ({
          label: department.departmentName,
          value: department.id,
        })),
      );
    }
  }, [departmentsData]);

  useEffect(() => {
    if (devicesData) {
      setDeviceOptions(
        devicesData.devices.map((device) => ({
          label: device.deviceName,
          value: device.id,
        })),
      );
    }
  }, [devicesData]);

  useEffect(() => {
    if (employeeData && isEdit) {
      setAllowances(
        employeeData?.compensation.allowance.map((allowance) => ({
          name: allowance.allowanceName,
          value: allowance.allowanceAmount.toString(),
        })),
      );
      setDeductions(
        employeeData?.compensation.deduction.map((deduction) => ({
          name: deduction.deductionName,
          value: deduction.deductionAmount.toString(),
        })),
      );
      setAddedDocs(
        employeeData?.documents.map((document) => ({
          name: document.documentName,
          value: document.documentUrl,
        })),
      );
      setEmployeeTools(
        employeeData?.accessRights[0].permissions.map((permission) => ({
          name: permission.tool,
          value: permission.id,
        })),
      );
    }
  }, [employeeData, isEdit]);

  //Ensures that the dirtyFields feature behaves as expected in the edit variant of the component
  useEffect(() => {
    if (employeeData) {
      if (currentTab === 0) {
        if (tabOneVisits < 1) {
          personalInfoReset(personalInfoGetValues());
          setTabOneVisits(tabOneVisits + 1);
        }
      }
      if (currentTab === 1) {
        if (tabTwoVisits < 1) {
          employmentReset(employmentGetValues());
          setTabTwoVisits(tabTwoVisits + 1);
        }
      }
      if (currentTab === 2) {
        if (tabThreeVisits < 1) {
          compensationReset(compensationGetValues());
          setTabThreeVisits(tabThreeVisits + 1);
        }
      }
      if (currentTab === 3) {
        if (tabFourVisits < 1) {
          documentsReset(documentsGetValues());
          setTabFourVisits(tabFourVisits + 1);
        }
      }
      if (currentTab === 4) {
        if (tabFiveVisits < 1) {
          equipmentsAndAccessReset(equipmentsAndAccessGetValues());
          setTabFiveVisits(tabFiveVisits + 1);
        }
      }
    }
  }, [
    employeeData,
    currentTab,
    personalInfoGetValues,
    personalInfoReset,
    tabOneVisits,
    employmentGetValues,
    employmentReset,
    tabTwoVisits,
    compensationGetValues,
    compensationReset,
    tabThreeVisits,
    documentsGetValues,
    documentsReset,
    tabFourVisits,
    equipmentsAndAccessGetValues,
    equipmentsAndAccessReset,
    tabFiveVisits,
  ]); //TODO: Use more optimal implementation due to the length of the dependency array

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
                    isDragUploadEmployeeEdit: true,
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
                    isDragUploadEmployeeEdit: true,
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
                    defaultValue: employeeData?.nextOfKin[0].fName,
                  }),
                },
                {
                  label: "Last Name",
                  hookFormName: "Last Name (Next of Kin)",
                  type: "text",
                  required: true,
                  placeholder: "Enter last name",
                  ...(isEdit && {
                    defaultValue: employeeData?.nextOfKin[0].lName,
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
                    defaultValue: employeeData?.nextOfKin[0].nextemail,
                  }),
                },
                {
                  label: "Phone Number",
                  hookFormName: "Phone Number (Next of Kin)",
                  type: "text",
                  required: true,
                  placeholder: "Enter phone number",
                  ...(isEdit && {
                    defaultValue: employeeData?.nextOfKin[0].nextPhoneNumber,
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
                  options: departmentOptions,
                  ...(isEdit && {
                    defaultValue:
                      employeeData?.employmentInformation.department.id,
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
                  hookFormSetValue: employmentSetValue,
                  ...(isEdit && {
                    defaultValue:
                      employeeData?.employmentInformation.jobDescription,
                    isDragUploadEmployeeEdit: true,
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
                    defaultValue:
                      employeeData?.compensation.baseSalary.toString(),
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
                    defaultValue:
                      employeeData?.compensation.commission.toString(),
                  }),
                },
                {
                  label: "Stock Options",
                  type: "text",
                  placeholder: "Enter stock options",
                  ...(isEdit && {
                    defaultValue:
                      employeeData?.compensation.stockOptions.toString(),
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
                    defaultValue: employeeData?.compensation.routingNo,
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
                    ...(isEdit && {
                      hookFormSetValue: documentsSetValue,
                      isDragUploadEmployeeEdit: true,
                    }),

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
                  options: deviceOptions,
                  ...(isEdit && {
                    defaultValue: employeeData?.accessRights[0].devices[0]._id,
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
          centerTitle={
            isEdit
              ? "Edit Requested Successfully"
              : "Employee Created Successfully"
          }
          centerButton
          buttonOne={{
            type: ButtonType.contained,
            text: "Return to Employee Directory",
            onClick: () =>
              router.push("/hr-admin/employee-management/directory"),
          }}
        />
      )}
      {openEditRequestModal && (
        <Modal
          open={openEditRequestModal}
          onClose={() => {
            setOpenEditRequestModal(false);
            editReset();
          }}
          hasHeading={false}
          reduceVerticalGap
          centerImage="/image/padlock.svg"
          centerTitle="Editing Disabled"
          centerMessage="The fields are currently locked for editing. Request access from Admin to enable edit"
          form={{
            gridSpacing: 3,
            register: editRegister,
            errors: editErrors,
            inputFields: [
              {
                label: "Why are you requesting this edit?",
                type: "text",
                required: true,
                isMessageField: true,
              },
              {
                label: "Supporting Document",
                type: "drag-upload-hook-form",
                required: true,
                hookFormGetValues: editGetValues,
                hookFormResetField: editResetField,
                hookFormWatch: editWatch,
                hookFormSetValue: editSetValue,
              },
            ],
          }}
          buttonOne={{
            type: ButtonType.outlined,
            text: "Cancel",
            onClick: () => {
              setOpenEditRequestModal(false);
              editReset();
            },
          }}
          buttonTwo={{
            type: editIsValid
              ? mutationLoading
                ? ButtonType.disabledLoading
                : ButtonType.contained
              : ButtonType.disabled,
            text: mutationLoading ? "" : "Request Edit Access",
            onClick: () => {
              if (slug !== undefined && typeof slug === "string") {
                editEmployeeMutation.mutateAsync({
                  employeeId: slug,
                  updates: getUpdatedFields(),
                  isEmployeeRequest: false,
                  isHrRequest: true,
                  reasonForUpdate: editGetValues(
                    "Why are you requesting this edit?",
                  ),
                  supportingDocuments: [
                    editGetValues("Supporting Document")[0].name,
                  ],
                });
              }
            },
          }}
        />
      )}
    </>
  );
};

export default HrAdminEmployeeDirectoryAddEmployee;
