"use client";

import AppButton from "@/app/_components/shared/button";
import { Spinner } from "@/app/_components/shared/buttons";
import AppInputText from "@/app/_components/shared/input-text";
import { AppSelect } from "@/app/_components/shared/select";
import { EmployeeNumberingSystem } from "@/app/_core/actions/super-admin/employee-config";
import {
  useEmployeeNumberingSystemMutations,
  useGetEmployeeNumberingSystem,
} from "@/app/_core/use-cases/superadmin/useEmployeeConfig";
import { AppToast } from "@/app/_hooks/toast";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { TbTrash } from "react-icons/tb";

const EmployeeNumberingSystemPage = () => {
  const {
    data: employeeNumberingSystem,
    isLoading: isFetchingEmployeeNumberingSystem,
  } = useGetEmployeeNumberingSystem();
  const { updateEmployeeNumberingSystemMutation } =
    useEmployeeNumberingSystemMutations();
  const [formData, setFormData] = useState<
    Array<{ component: string; value: string }>
  >([]);
  const [originalData, setOriginalData] =
    useState<EmployeeNumberingSystem | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (employeeNumberingSystem) {
      setOriginalData(employeeNumberingSystem);

      const initialFormData = [
        {
          component: "company-abbrevation",
          value: employeeNumberingSystem.company || "",
        },
        {
          component: "branch-abbrevation",
          value: employeeNumberingSystem.branchAbbreviation || "",
        },
        {
          component: "department-abbrevation",
          value: employeeNumberingSystem.departmentAbbreviation || "",
        },
        {
          component: "year",
          value: employeeNumberingSystem.year?.toString() || "",
        },
        {
          component: "month",
          value: employeeNumberingSystem.month?.toString() || "",
        },
        {
          component: "sequential-number",
          value: employeeNumberingSystem.sequentialNumber?.toString() || "",
        },
        {
          component: "separator",
          value: employeeNumberingSystem.separator || "",
        },
      ].filter((item) => item.value !== "");

      setFormData(
        initialFormData.length > 0
          ? initialFormData
          : [{ component: "", value: "" }]
      );
    }
  }, [employeeNumberingSystem]);

  useEffect(() => {
    if (!originalData) return;

    const currentFormattedData: any = {};
    formData.forEach((item) => {
      switch (item.component) {
        case "company-abbrevation":
          currentFormattedData.company = item.value;
          break;
        case "branch-abbrevation":
          currentFormattedData.branchAbbreviation = item.value;
          break;
        case "department-abbrevation":
          currentFormattedData.departmentAbbreviation = item.value;
          break;
        case "year":
          currentFormattedData.year = item.value
            ? parseInt(item.value)
            : undefined;
          break;
        case "month":
          currentFormattedData.month = item.value
            ? parseInt(item.value)
            : undefined;
          break;
        case "sequential-number":
          currentFormattedData.sequentialNumber = item.value
            ? parseInt(item.value)
            : undefined;
          break;
        case "separator":
          currentFormattedData.separator = item.value;
          break;
      }
    });

    const hasDataChanged =
      originalData.company !== currentFormattedData.company ||
      originalData.branchAbbreviation !==
        currentFormattedData.branchAbbreviation ||
      originalData.departmentAbbreviation !==
        currentFormattedData.departmentAbbreviation ||
      originalData.year !== currentFormattedData.year ||
      originalData.month !== currentFormattedData.month ||
      originalData.sequentialNumber !== currentFormattedData.sequentialNumber ||
      originalData.separator !== currentFormattedData.separator;

    setHasChanges(hasDataChanged);
  }, [formData, originalData]);

  const idComponents = [
    { label: "Company Abbrevation", value: "company-abbrevation" },
    { label: "Branch Abbrevation", value: "branch-abbrevation" },
    { label: "Department Abbrevation", value: "department-abbrevation" },
    { label: "Year", value: "year" },
    { label: "Month", value: "month" },
    { label: "Sequential Number", value: "sequential-number" },
    { label: "Separator", value: "separator" },
  ];

  const isFormLengthValid = formData.length < idComponents.length;

  const handleAddComponent = () => {
    if (isFormLengthValid) {
      setFormData([...formData, { component: "", value: "" }]);
    }
  };

  const validateField = (
    index: number,
    field: "component" | "value",
    value: string
  ) => {
    const newErrors = { ...errors };
    const fieldKey = `${field}-${index}`;

    if (!value.trim()) {
      newErrors[fieldKey] = `${
        field === "component" ? "a component" : "a value"
      } is required`;
    } else {
      delete newErrors[fieldKey];
    }

    setErrors(newErrors);
    return !value.trim() ? false : true;
  };

  const handleComponentChange = (
    index: number,
    field: "component" | "value",
    value: string
  ) => {
    const updatedFormData = [...formData];
    updatedFormData[index][field] = value;
    setFormData(updatedFormData);

    validateField(index, field, value);
  };

  const handleDeleteComponent = (index: number) => {
    const updatedFormData = [...formData];
    updatedFormData.splice(index, 1);

    if (updatedFormData.length === 0) {
      updatedFormData.push({ component: "", value: "" });
    }

    setFormData(updatedFormData);
  };

  const getFormattedId = () => {
    return formData.map((item) => item.value).join("") || "---";
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    formData.forEach((item, index) => {
      if (!item.component) {
        newErrors[`component-${index}`] = "Component is required";
        valid = false;
      }

      if (!item.value) {
        newErrors[`value-${index}`] = "Value is required";
        valid = false;
      }
    });

    setErrors(newErrors);
    return valid;
  };

  // useEffect(() => {
  //   setIsFormValid(validateForm());
  // }, [formData]);

  const handleSave = () => {
    if (!validateForm()) return;

    const formattedData: any = {
      // company: null,
      branchAbbreviation: null,
      departmentAbbreviation: null,
      year: null,
      month: null,
      sequentialNumber: null,
      separator: null,
    };

    formData.forEach((item) => {
      switch (item.component) {
        // case 'company-abbrevation':
        //   formattedData.company = item.value;
        //   break;
        case "branch-abbrevation":
          formattedData.branchAbbreviation = item.value;
          break;
        case "department-abbrevation":
          formattedData.departmentAbbreviation = item.value;
          break;
        case "year":
          formattedData.year = parseInt(item.value);
          break;
        case "month":
          formattedData.month = parseInt(item.value);
          break;
        case "sequential-number":
          formattedData.sequentialNumber = parseInt(item.value);
          break;
        case "separator":
          formattedData.separator = item.value;
          break;
      }
    });

    updateEmployeeNumberingSystemMutation.mutate(formattedData, {
      onSuccess: () => {
        AppToast.success({
          title: "Successful",
          message: "Employee ID Configuration updated successfully",
        });
      },
      onError: (error) => {
        console.error("API Error:", error);
        AppToast.error({
          title: "Error",
          message: "Failed to update Employee ID Configuration",
        });
      },
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Employee ID Configuration</h2>
        <p className="text-sm text-neutral-500">
          Create an employee ID formats across the Organization
        </p>
      </div>

      <div className="common-card !border-none space-y-4">
        {isFetchingEmployeeNumberingSystem ? (
          <div className="flex items-center gap-2">
            <Spinner className="text-primary" />{" "}
            <p>Fetching current Employee ID Configuration</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {formData.map((item, index) => {
                const availableComponents = idComponents.filter(
                  (component) =>
                    component.value === item.component ||
                    !formData.some(
                      (formItem) => formItem.component === component.value
                    )
                );

                return (
                  <div
                    key={index}
                    className="grid gap-4 grid-cols-[1fr_1fr_auto]"
                  >
                    <div className="w-full mt-1 space-y-1">
                      <AppSelect
                        placeholder="Select ID Component"
                        listItems={availableComponents}
                        value={item.component}
                        onChange={(value) =>
                          handleComponentChange(index, "component", value)
                        }
                      />

                      <p className="text-sm text-red-500">
                        {errors[`component-${index}`]}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <AppInputText
                        id={`component-${index}`}
                        placeholder="Please enter component value"
                        value={item.value}
                        onChange={(e) =>
                          handleComponentChange(index, "value", e.target.value)
                        }
                        disabled={!item.component}
                      />

                      <p className="text-sm text-red-500">
                        {errors[`value-${index}`]}
                      </p>
                    </div>

                    {formData.length > 1 ? (
                      item.component !== "company-abbrevation" ? (
                        <button
                          onClick={() => handleDeleteComponent(index)}
                          className="h-10 w-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-full transition-all duration-300"
                        >
                          <TbTrash size={16} />
                        </button>
                      ) : (
                        <div className="h-10 w-10"></div>
                      )
                    ) : (
                      <div className="h-10 w-10"></div>
                    )}
                  </div>
                );
              })}

              <button
                onClick={handleAddComponent}
                disabled={!isFormLengthValid}
                className={`border-none outline-none flex items-center gap-x-1 text-primary font-semibold cursor-pointer active:opacity-70 ${
                  isFormLengthValid
                    ? "opacity-100"
                    : "opacity-50 disabled:cursor-not-allowed disabled:opacity-50"
                }`}
              >
                <FaPlus /> Add ID Component
              </button>
            </div>

            <div className="wfull flex items-center justify-center">
              <div className="py-2 px-3 rounded-lg border-b border-gray-200 bg-white w-max">
                <p className="text-sm text-neutral-500">{getFormattedId()}</p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="w-full flex items-center justify-end">
        <AppButton
          label="Save"
          onClick={handleSave}
          isLoading={updateEmployeeNumberingSystemMutation.isPending}
          className="btn btn-primary"
          disabled={
            !isFormValid ||
            !hasChanges ||
            updateEmployeeNumberingSystemMutation.isPending
          }
        />
      </div>
    </div>
  );
};

export default EmployeeNumberingSystemPage;
