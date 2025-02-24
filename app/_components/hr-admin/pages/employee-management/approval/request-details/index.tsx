"use client";
import Modal from "@/app/_components/employee/modal";
import ButtonGroup from "@/app/_components/shared/button-group";
import DetailGroup from "@/app/_components/shared/detail-group";
import Form from "@/app/_components/shared/form";
import Page from "@/app/_components/shared/page";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import SectionCardContainer from "@/app/_components/shared/section-with-cards/container";
import { icon, route } from "@/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getLeaveRequest,
  getMyEmployees,
  post,
} from "../../../payroll-management/pages/overview/api";

const HrAdminEmployeeManagementApprovalRequestDetails = () => {
  const router = useRouter();

  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [approveClicked, setApproveClicked] = useState(false);

  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  // const { slug } = useParams();

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["leave-request", slug],
    ...(typeof slug === "string" && { queryFn: () => getLeaveRequest(slug) }),
  });

  const { data: myEmployees, refetch } = useQuery({
    queryKey: ["employees", { page: 1, limit: 50, sortOrder: "asc" }],
    queryFn: () => getMyEmployees({ page: 1, limit: 50, sortOrder: "asc" }),
  });

  const [employees, setEmployees] =
    useState<{ label: string; value: string }[]>();

  const [mutationLoading, setMutationLoading] = useState(false);

  useEffect(() => {
    if (myEmployees) {
      setEmployees(
        myEmployees.data.map((employee) => ({
          label: `${employee.personalInfo?.firstName} ${employee.personalInfo?.lastName}`,
          value: employee.id,
        }))
      );
      console.log(myEmployees.data.map((employee) => employee.id));
    } else {
    }
  }, [myEmployees]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const {
    register,
    control,
    formState: { errors },
    getValues,
  } = useForm();

  const approveRejectMutation = useMutation({
    mutationFn: (endpoint: string) =>
      post(
        endpoint,
        approveClicked
          ? getValues("Assign Backup Employee") && getValues("Add Comments")
            ? {
                backupEmployee: getValues("Assign Backup Employee"),
                remark: getValues("Add Comments"),
              }
            : getValues("Assign Backup Employee")
            ? {
                backupEmployee: getValues("Assign Backup Employee"),
              }
            : getValues("Add Comments")
            ? { remark: getValues("Add Comments") }
            : undefined
          : getValues("Add Comments")
          ? { remark: getValues("Add Comments") }
          : undefined
      ),
    onMutate: () => setMutationLoading(true),
    onSuccess: (res) => {
      if (Object.keys(res).includes("error")) {
        setMutationLoading(false);
        alert("An error occurred");
      } else {
        queryClient.resetQueries({ queryKey: ["leave-records"] });
        queryClient.resetQueries({ queryKey: ["leave-request", slug] });
        setMutationLoading(false);
        setOpenConfirmationModal(false);
        setOpenSuccessModal(true);
      }
    },
    onError: () => {
      setMutationLoading(false);
      alert("An error occured");
    },
  });

  return (
    <Page
      backText="Back to Approval Management"
      onBackTextClick={() =>
        router.push(route.hrAdmin.employeeManagement.approvalManagement.home)
      }
    >
      <SectionCardContainer isCard title="Leave Request Details">
        <DetailGroup
          gridLayout="3-columns"
          loading={data ? false : true}
          details={[
            {
              name: "Name",
              value: `${data?.employee.personalInfo?.firstName} ${data?.employee.personalInfo?.lastName}`, //Inform the backend team to return the correct value
            },
            {
              name: "Staff ID",
              value: data?.employee.employmentInformation?.staffId, //Inform the backend team to return the correct value
            },
            {
              name: "Department",
              value:
                data?.employee.employmentInformation?.department.departmentName, //Inform the backend team to return the correct value
            },
            {
              name: "Job Title",
              value: "N/A", //Inform the backend team to return the correct value
            },
            {
              name: "Status",
              value: data?.status,
              type: "status",
              statusMap: {
                approved: "success",
                pending: "warning",
                rejected: "error",
              },
            },
            {
              name: "Leave Type",
              value: data?.leaveType.name,
            },
            {
              name: "Start Date",
              value: dayjs(data?.startDate).format("MMM D, YYYY"),
            },
            {
              name: "End Date",
              value: dayjs(data?.endDate).format("MMM D, YYYY"),
            },
            {
              name: "Total Days Requested",
              value: `${
                dayjs(data?.endDate).date() - dayjs(data?.startDate).date() + 1
              }`,
            },
            {
              name: "Reason for Leave",
              value: "N/A", //Inform the backend team to return the correct value
            },
            {
              name: "Supporting Document",
              type: "document",
              value: "N/A", //Inform the backend team to return the correct value
              icon: icon.download,
            },
          ]}
        />
        {data?.status && data?.status === "pending" && (
          <>
            <div className="mt-2"></div>
            <Form
              gridSpacing={4}
              register={register}
              control={control}
              errors={errors}
              inputFields={[
                {
                  label: "Assign Backup Employee",
                  type: "select",
                  placeholder: "Select Employee",
                  hookFormField: true,
                  options: employees,
                },
                {
                  label: "Add Comments",
                  type: "text",
                  isMessageField: true,
                },
              ]}
            />
            <div className="mb-2"></div>
          </>
        )}
      </SectionCardContainer>
      {data?.status && data?.status === "pending" && (
        <ButtonGroup
          leftButton={{
            type:
              data && myEmployees ? ButtonType.outlined : ButtonType.disabled,
            text: "Reject",
            onClick: () => {
              setOpenConfirmationModal(true);
            },
          }}
          rightButton={{
            type:
              data && myEmployees ? ButtonType.contained : ButtonType.disabled,
            text: "Approve",
            onClick: () => {
              setApproveClicked(true);
              setOpenConfirmationModal(true);
            },
          }}
          position="end"
        />
      )}
      {openConfirmationModal && (
        <Modal
          {...{
            open: openConfirmationModal,
            onClose: () => {
              if (approveClicked) {
                setApproveClicked(false);
              }
              setOpenConfirmationModal(false);
            },
            hasHeading: false,
            centerTitle: approveClicked ? "Approve Request" : "Reject Request",
            centerMessage: approveClicked
              ? "Are you sure you want to approve the request"
              : "Are you sure you want to reject the request",
            buttonOne: {
              type: mutationLoading ? ButtonType.disabled : ButtonType.outlined,
              text: "Cancel",
              onClick: () => {
                if (approveClicked) {
                  setApproveClicked(false);
                }
                setOpenConfirmationModal(false);
              },
            },
            buttonTwo: {
              type: mutationLoading
                ? ButtonType.disabledLoading
                : ButtonType.contained,
              text: mutationLoading ? "" : "Confirm",
              onClick: () =>
                approveRejectMutation.mutateAsync(
                  `leave/${slug}/${approveClicked ? "approve" : "reject"}`
                ),
            },
          }}
        />
      )}
      {openSuccessModal && (
        <Modal
          open={openSuccessModal}
          onClose={() => {}}
          hasHeading={false}
          centerImage={icon.successTick}
          centerTitle="Successful!"
          centerButton
          buttonOne={{
            text: "Return",
            type: ButtonType.contained,
            onClick: () => setOpenSuccessModal(false),
          }}
        />
      )}
    </Page>
  );
};

export default HrAdminEmployeeManagementApprovalRequestDetails;
