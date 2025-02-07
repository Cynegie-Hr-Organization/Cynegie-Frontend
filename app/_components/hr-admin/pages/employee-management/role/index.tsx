"use client";
import Modal from "@/app/_components/employee/modal";
import Page from "@/app/_components/shared/page";
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import Table from "@/app/_components/shared/table";
import { FieldType } from "@/app/_components/shared/table/types";
import Toast from "@/app/_components/shared/toast";
import { icon, route } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getRoles } from "../../payroll-management/pages/benefits-management/api";

type MappedRole = {
  id: string;
  name: string;
  description: string;
  permissions: number;
};

const HrAdminEmployeeRole = () => {
  const router = useRouter();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDeleteToast, setOpenDeleteToast] = useState(false);

  const [roles, setRoles] = useState<MappedRole[]>();

  const { data: rolesData } = useQuery({
    queryKey: ["roles"],
    queryFn: () => getRoles(),
  });

  useEffect(() => {
    if (rolesData) {
      setRoles(
        rolesData.data.map((role) => ({
          id: role.id,
          name: role.name,
          description: role.description,
          permissions: role.permissions.length,
        }))
      );
    } else {
      setRoles(undefined);
    }
  }, [rolesData]);

  return (
    <Page
      title="Roles"
      hasButtons
      rightButton={{
        type: ButtonType.contained,
        text: "Create New Role",
        onClick: () =>
          router.push(route.hrAdmin.employeeManagement.roleManagement.create),
      }}
    >
      <Table
        hasCheckboxes
        hasActionsColumn
        headerRowData={[
          // "Role Name",
          // "Department",
          // "Employee Assigned",
          // "Permission",
          "Role Name",
          "Description",
          "Permissions",
        ]}
        fieldTypes={Array(3).fill(FieldType.text)}
        displayedFields={[
          // "name",
          // "department",
          // "employeeAssigned",
          // "permission",
          "name",
          "description",
          "permissions",
        ]}
        bodyRowData={roles}
        formFilter={{
          inputFields: [
            {
              label: "Department",
              type: "select",
              options: [
                { label: "All", value: 0 },
                { label: "Technology", value: 1 },
              ],
            },
          ],
        }}
        actions={[
          {
            name: "Edit",
            onClick: () =>
              router.push(route.hrAdmin.employeeManagement.roleManagement.edit),
          },
          { name: "Delete", onClick: () => setOpenDeleteModal(true) },
        ]}
      />
      <Modal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        hasHeading={false}
        centerImage={icon.deleteX}
        centerTitle="Delete Role?"
        centerMessage="If you delete this role, it will be removed from the role management and it will be inaccessible"
        form={{
          inputFields: [
            { label: "Why are you deleting this role?", type: "message" },
          ],
        }}
        reduceVerticalGap
        buttonGroupPosition="center"
        buttonOne={{
          type: ButtonType.outlined,
          text: "Cancel",
          onClick: () => setOpenDeleteModal(false),
        }}
        buttonTwo={{
          type: ButtonType.deleteContained,
          text: "Delete Role",
          onClick: () => {
            setOpenDeleteModal(false);
            setOpenDeleteToast(true);
          },
        }}
      />
      <Modal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        hasHeading={false}
        centerImage={icon.deleteX}
        centerTitle="Delete Role?"
        centerMessage="If you delete this role, it will be removed from the role management and it will be inaccessible"
        form={{
          inputFields: [
            { label: "Why are you deleting this role?", type: "message" },
          ],
        }}
        reduceVerticalGap
        buttonGroupPosition="center"
        buttonOne={{
          type: ButtonType.outlined,
          text: "Cancel",
          onClick: () => setOpenDeleteModal(false),
        }}
        buttonTwo={{
          type: ButtonType.deleteContained,
          text: "Delete Role",
          onClick: () => {
            setOpenDeleteModal(false);
            setOpenDeleteToast(true);
          },
        }}
      />
      <Toast
        open={openDeleteToast}
        onClose={() => setOpenDeleteToast(false)}
        status="Successful"
        message="Role has been deleted successfully"
        type="success"
        icon={icon.checkCircle}
      />
    </Page>
  );
};

export default HrAdminEmployeeRole;
