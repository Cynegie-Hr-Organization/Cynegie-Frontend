/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CardLayout from "@/app/_components/shared/cards";
import AppCheckbox from "@/app/_components/shared/checkbox";
import EmptyTable from "@/app/_components/shared/empty-table";
import TableSkeleton from "@/app/_components/shared/skelentons/table";
import { ITemplate } from "@/app/_core/actions/hr-admin/onboarding";
import { useTemplates } from "@/app/_core/use-cases/hr-admin/useOnboarding";
import useSelection from "@/app/_hooks/useSelection";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { localTime } from "@/lib/utils";

import { useRouter } from "next/dist/client/components/navigation";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { LuListFilter } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";

const TemplateTable = () => {
  const { selectedItems, toggleSelection, selectAll, clearSelection } =
    useSelection<string>();
  const { data, isLoading } = useTemplates();
  const { data: templates } = data ?? {};
  const templateLength = templates?.length ?? 0;

  const handleSelectAll = () => {
    if (selectedItems.size === templateLength) {
      clearSelection();
    } else {
      selectAll(templates?.map((template) => template?.id) || []);
    }
  };

  return (
    <CardLayout
      className="bg-white overflow-x-scroll space-y-8"
      bg="p-4 md:p-6"
    >
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4 md:gap-0">
            <div className="flex-grow max-w-[300px] xl:max-w-[479px] flex items-center border pl-4 border-gray-300 rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-1 focus-within:border-primary focus-within:ring-primary">
              <RiSearchLine className="text-gray-400" />
              <input
                type="text"
                placeholder="Search here..."
                className="w-full h-9 px-2 outline-none"
              />
            </div>

            <button
              type="button"
              className="text-gray-400 font-bold flex gap-2 items-center border rounded-lg px-4 py-2"
            >
              <LuListFilter /> Filter
            </button>
          </div>

          <div className="-mx-4 md:-mx-6">
            <table className="w-full border-collapse">
              <thead className="bg-[#F7F9FC]">
                <tr>
                  <th className="pl-4 md:pl-6 py-3 text-left">
                    <AppCheckbox
                      id="templates-select-all"
                      name="templates-select-all"
                      checked={selectedItems.size === templateLength}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="px-4 py-3 text-left">Template Name</th>
                  <th className="px-4 py-3 text-left">Creator</th>
                  <th className="px-4 py-3 text-left">Last Modified</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {templates && (templates?.length ?? 0) > 0 ? (
                  templates.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054]"
                    >
                      <td className="pl-4 md:pl-6 py-3">
                        <AppCheckbox
                          id={`template-${item.id}`}
                          checked={selectedItems.has(item.id)}
                          onChange={() => toggleSelection(item.id)}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm">{item?.templateName ?? "NIL"}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm">
                          {item?.createdBy
                            ? `${item?.createdBy?.firstName} ${item?.createdBy?.lastName}`
                            : "NIL"}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm">
                          {item?.createdAt ? localTime(item.createdAt) : "NIL"}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <PopoverMenu template={item} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <EmptyTable message="No template found" />
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </CardLayout>
  );
};

const PopoverMenu: React.FC<{ template: ITemplate }> = ({ template }) => {
  const [modalState, setModalState] = useState({
    popOver: false,
    editModal: false,
    previewModal: false,
    deleteModal: false,
  });

  const router = useRouter();

  const menuActions = [
    {
      slug: "edit-template",
      label: "Edit Template",
      onSelect: () =>
        router.push(`/hr-admin/onboarding/template/${template.id}/edit`),
    },
    {
      slug: "preview-template",
      label: "Preview Template",
      onSelect: () =>
        router.push(`/hr-admin/onboarding/template/${template.id}`),
    },
    {
      slug: "delete-template",
      label: "Delete Template",
      onSelect: () => setModalState({ ...modalState, deleteModal: true }),
      className: "hover:!bg-red-50 text-red-700 hover:!text-red-700 rounded-lg",
    },
  ];
  return (
    <>
      <DropdownMenu
        open={modalState.popOver}
        onOpenChange={() =>
          setModalState({ ...modalState, popOver: !modalState.popOver })
        }
      >
        <DropdownMenuTrigger asChild>
          <button className="cursor-pointer outline-none p-2 border border-gray-300 rounded-lg w-max">
            <HiDotsVertical />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-40 bg-white">
          {menuActions.map((action) => (
            <DropdownMenuItem
              key={action.slug}
              className={`cursor-pointer ${action.className ?? ""}`}
              onSelect={action.onSelect}
            >
              <span>{action.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* <PreviewModal
        vendorId={vendor?.id}
        isOpen={modalState.previewModal}
        onClose={() => setModalState({ ...modalState, previewModal: false })}
      />

      <EditVendorModal
        vendorId={vendor?.id}
        isOpen={modalState.editModal}
        onClose={() => setModalState({ ...modalState, editModal: false })}
      />

      <OtherActionsModal
        vendor={vendor}
        isOpen={modalState.otherActionsModal}
        onClose={() => setModalState({ ...modalState, otherActionsModal: false })}
      /> */}
    </>
  );
};

export default TemplateTable;
