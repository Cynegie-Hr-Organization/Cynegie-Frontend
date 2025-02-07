"use client";
import Modal from "@/app/_components/employee/modal";
import Page from "@/app/_components/shared/page";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import Table from "@/app/_components/shared/table";
import { FieldType } from "@/app/_components/shared/table/types";
import Toast from "@/app/_components/shared/toast";
import { icon } from "@/constants";
import { FetchParams } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  deleteDepartment,
  getDepartments,
} from "../../payroll-management/pages/benefits-management/api";
import {
  createDepartment,
  editDepartment,
  getMyEmployees,
} from "../../payroll-management/pages/overview/api";

type MappedDepartment = {
  id: string;
  department: string;
  departmentManager: string;
  headcount: number;
  totalDepartmentNo: number;
  employees: { label: string; value: string }[];
};

const HrAdminEmployeeDepartmental = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [createClicked, setCreateClicked] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  const [createConfirmClicked, setCreateConfirmClicked] = useState(false);

  const [openDeleteToast, setOpenDeleteToast] = useState(false);

  const [departments, setDepartments] = useState<MappedDepartment[]>();
  const [selectedDepartment, setSelectedDepartment] =
    useState<MappedDepartment>();

  const [employees, setEmployees] =
    useState<{ label: string; value: string }[]>();

  const { data: employeesData } = useQuery({
    queryKey: ["employees"],
    queryFn: () => getMyEmployees({ page: 1, limit: 20, sortOrder: "asc" }),
  });

  const [loading, setLoading] = useState(false);

  const [fetchParams, setFetchParams] = useState<FetchParams>({
    page: 1,
    limit: 10,
    sortOrder: "asc",
  });

  const queryClient = useQueryClient();

  const { data: departmentData } = useQuery({
    queryKey: ["departments", fetchParams],
    queryFn: () => getDepartments(fetchParams),
  });

  useEffect(() => {
    if (departmentData) {
      setDepartments(
        departmentData.data.map((department) => ({
          id: department.id,
          department: department.departmentName,
          departmentManager: department.departmentManager,
          headcount: department.employees.length,
          totalDepartmentNo: department.userLimit,
          employees: department.employees.map(
            (employeeId) =>
              employees?.find((employee) => employee.value === employeeId) ?? {
                label: "",
                value: "",
              }
          ),
        }))
      );
    } else {
      setDepartments(undefined);
    }
  }, [departmentData, employees]); //If you are getting an error, remove employees from the dependency array

  const createDepartmentMutation = useMutation({
    mutationFn: (payload: {
      departmentName: string;
      departmentManager: string;
      employees: string[];
      userLimit: number;
    }) =>
      createClicked
        ? createDepartment(payload)
        : editDepartment(selectedId, payload),
    onMutate: () => setLoading(true),
    onSuccess: (res) => {
      if (Object.keys(res).includes("error")) {
        setLoading(false);
        alert(res.message);
      } else {
        queryClient.resetQueries({ queryKey: ["departments"] });
        setLoading(false);
        setCreateConfirmClicked(true);
        setOpenModal(false);
        setOpenConfirmationModal(true);
        reset();
      }
    },
    onError: () => {
      setLoading(false);
      alert("An error occured");
    },
  });

  const deleteDepartmentMutation = useMutation({
    mutationFn: (id: string) => deleteDepartment(id),
    onMutate: () => setLoading(true),
    onSuccess: (res) => {
      if (Object.keys(res).includes("error")) {
        alert("An error occured");
      } else {
        queryClient.resetQueries({ queryKey: ["departments"] });
        setOpenDeleteToast(true);
        setLoading(false);
        setOpenConfirmationModal(false);
      }
    },
    onError: () => {
      setLoading(false);
      alert("An error occured");
    },
  });

  useEffect(() => {
    if (openDeleteToast) {
      setTimeout(() => setOpenDeleteToast(false), 5000);
    }
  }, [openDeleteToast]);

  useEffect(() => {
    if (employeesData) {
      setEmployees(
        employeesData.data.map((employee) => ({
          label: employee.personalInfo.firstName,
          value: employee.id ? employee.id : "",
        }))
      );
    } else {
      setEmployees(undefined);
    }
  }, [employeesData]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm();

  return (
    <Page
      title="Departmental Management"
      hasButtons
      rightButton={{
        type: ButtonType.contained,
        text: "Create New Department",
        onClick: () => {
          reset();
          setOpenModal(true);
          setCreateClicked(true);
        },
      }}
      rightButtonSm
      rightButtonIconSm={icon.plus}
      rightButtonIconOnlySm
    >
      <Table
        hasActionsColumn
        headerRowData={[
          // "S/N",
          "Department",
          "Department Manager",
          "Headcount",
          "Total Departmental No",
        ]}
        fieldTypes={Array(4).fill(FieldType.text)}
        displayedFields={[
          // "sn",
          "department",
          "departmentManager",
          "headcount",
          "totalDepartmentNo",
        ]}
        bodyRowData={departments}
        actions={[
          {
            name: "Edit",
            onClick: () => {
              setCreateClicked(false);
              setEditClicked(true);
              setOpenModal(true);
            },
            onDataReturned: (id) => {
              reset();
              const foundDepartment = departments?.find(
                (department) => department.id === id
              );
              setSelectedDepartment(foundDepartment);
              if (typeof id === "string") setSelectedId(id);
            },
          },
          {
            name: "Delete",
            onClick: () => {
              setCreateConfirmClicked(false);
              setOpenConfirmationModal(true);
            },
            onDataReturned: (id) => {
              if (typeof id === "string") setSelectedId(id);
            },
          },
        ]}
        onSearch={(value) => setFetchParams({ ...fetchParams, search: value })}
        paginationMeta={{
          page: departmentData?.meta.page,
          limit: departmentData?.meta.limit,
          itemCount: departmentData?.meta.itemCount,
          itemsOnPage: departmentData?.data.length,
          onChangeLimit: (limit) => setFetchParams({ ...fetchParams, limit }),
          onNextClick: () =>
            setFetchParams({ ...fetchParams, page: fetchParams.page + 1 }),
          onPrevClick: () =>
            setFetchParams({ ...fetchParams, page: fetchParams.page - 1 }),
          loading: departmentData ? false : true,
        }}
        // formFilter={{}} TODO: Notify backend to implement department filtering from the backend
        fieldToReturnOnActionItemClick="id"
      />
      <Modal
        open={openModal}
        onClose={() => {
          if (!loading) {
            setOpenModal(false);
          }
          reset();
        }}
        title={createClicked ? "Create New Department" : "Edit Details"}
        onFormSubmit={handleSubmit((values) => {
          createDepartmentMutation.mutateAsync({
            departmentName: values["Department Name"],
            departmentManager: values["Department Manager"],
            employees: values["Add Employees"].map(
              (employee: { label: string; value: string }) => employee.value
            ),
            userLimit: Number(values["Total Departmental No"]),
          });
        })}
        subtitle={
          createClicked
            ? "Fill in details to create new department"
            : "Edit details below"
        }
        formControl={control}
        formErrors={errors}
        formRegister={register}
        forms={[
          {
            gridSpacing: 3,
            inputFields: [
              {
                label: "Department Name",
                placeholder: "Department Name",
                type: "text",
                required: true,
                ...(!createClicked && {
                  defaultValue: selectedDepartment?.department,
                }),
                // ...(!createClicked && { value: "Product" }),
              },
              {
                label: "Department Manager",
                placeholder: "Department Manager",
                type: "text",
                required: true,
                ...(!createClicked && {
                  defaultValue: selectedDepartment?.departmentManager,
                }),
                // ...(!createClicked && { value: "Salami Abubakar" }),
              },
              {
                label: "Total Departmental No",
                placeholder: "Total Departmental No",
                type: "text",
                required: true,
                ...(!createClicked && {
                  defaultValue: selectedDepartment?.totalDepartmentNo,
                }),
                // ...(!createClicked && { value: "30" }),
              },
              {
                label: "Add Employees",
                type: "multi-select",
                hookFormField: true,
                placeholder: "Select Employees",
                options: employees,
                ...(!createClicked && {
                  defaultValue: selectedDepartment?.employees,
                }),
              },
            ],
          },
        ]}
        formButtonGroup={{
          leftButton: {
            type: ButtonType.outlined,
            text: "Cancel",
            onClick: () => {
              setOpenModal(false);
              reset();
            },
          },
          rightButton: {
            type: isValid
              ? loading
                ? ButtonType.disabledLoading
                : ButtonType.contained
              : ButtonType.disabled,
            isSubmit: true,
            text: loading ? "" : "Save",
            onClick: () => {
              // setCreateConfirmClicked(true);
              // setOpenModal(false);
              // setOpenConfirmationModal(true);
            },
          },
          position: "center",
        }}
      />
      <Modal
        open={openConfirmationModal}
        onClose={() => {
          setOpenConfirmationModal(false);
          if (editClicked) setEditClicked(false);
        }}
        hasHeading={false}
        centerImage={createConfirmClicked ? icon.successTick : icon.deleteX}
        centerTitle={
          createConfirmClicked
            ? `You have successfully ${
                editClicked ? "edited" : "created"
              } the department`
            : "Delete Department?"
        }
        centerMessage={
          createConfirmClicked
            ? "You can now proceed to dashboard to continue"
            : "If you delete this department, it will be removed from the department list and it will be inaccessible"
        }
        {...(createConfirmClicked
          ? {
              buttonOne: {
                type: ButtonType.contained,
                text: "Continue to Dashboard",
                onClick: () => {
                  setOpenConfirmationModal(false);
                  setTimeout(() => {
                    if (editClicked) setEditClicked(false);
                  }, 1000);
                },
              },
              centerButton: true,
            }
          : {
              // form: {
              //   inputFields: [
              //     {
              //       label: "Why are you deleting this department?",
              //       type: "message",
              //     },
              //   ],
              // },
              buttonOne: {
                type: ButtonType.outlined,
                text: "Cancel",
                onClick: () => setOpenConfirmationModal(false),
              },
              buttonTwo: {
                type: loading
                  ? ButtonType.disabledLoading
                  : ButtonType.deleteContained,
                text: loading ? "" : "Delete Department",
                onClick: () => {
                  deleteDepartmentMutation.mutateAsync(selectedId);
                },
              },
              reduceVerticalGap: true,
            })}
      />
      {openDeleteToast && (
        <Toast
          open={openDeleteToast}
          onClose={() => setOpenDeleteToast(false)}
          icon={icon.checkCircle}
          status="Successful"
          message="You have successfully deleted the department"
        />
      )}
    </Page>
  );
};

export default HrAdminEmployeeDepartmental;
