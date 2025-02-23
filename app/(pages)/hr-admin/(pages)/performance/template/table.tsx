/* eslint-disable @typescript-eslint/no-explicit-any */
import DeleteTemplateModal from "@/app/_components/hr-admin/pages/performance/template/delete-modal";
import AppButton from "@/app/_components/shared/button";
import { AppDropdownMenu } from "@/app/_components/shared/dropdown-menu";
import { AppSelect } from "@/app/_components/shared/select";
import { getTemplates } from "@/app/api/services/performance/template";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuListFilter, LuMoveVertical } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";

const PerformanceTemplateTable = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false); // Modal state
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null,
  ); // Selected template ID
  const router = useRouter();

  const fetchTemplates = async () => {
    setLoading(true); // Set loading to true while fetching
    try {
      const response = await getTemplates();
      console.log(response);
      if (response.status === 200) {
        setTemplates(response.data); // Assuming response.data contains the list of templates
      } else {
        toast.error("Failed to fetch templates");
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
      toast.error("An error occurred while fetching templates");
    } finally {
      setLoading(false);
    }
  };

  const previewTemplate = (templateId: string) => {
    if (!templateId) {
      toast.error("Invalid template selected for preview.");
      return;
    }
    router.push(`/hr-admin/performance/template-preview/${templateId}`);
  };

  const openDeleteModal = (id: string) => {
    setSelectedTemplateId(id);
    setModalOpen(true);
  };

  const closeDeleteModal = () => {
    setModalOpen(false);
    setSelectedTemplateId(null);
  };

  // Refresh templates after deleting
  const handleDeleteSuccess = async () => {
    await fetchTemplates();
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const columns = ["Template Name", "Questions", "Created By", "Actions"];

  return (
    <div className="common-card overflow-x-scroll">
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4 md:gap-0">
        <div className="flex-grow max-w-[300px] xl:max-w-[479px] flex items-center border pl-4 border-gray-300 rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-1 focus-within:border-primary focus-within:ring-primary">
          <RiSearchLine className="text-gray-400" />
          <input
            type="text"
            placeholder="Search here..."
            className="w-full h-9 px-2 outline-none"
          />
        </div>

        <AppDropdownMenu
          trigger={
            <button
              type="button"
              className="text-gray-400 font-bold flex gap-2 items-center border rounded-lg px-4 py-2"
            >
              <LuListFilter /> Filter
            </button>
          }
          menuItems={
            <div className="p-4 space-y-10">
              <div className="space-y-4">
                <AppSelect
                  listItems={[
                    { label: "Completed", value: "completed" },
                    { label: "In Progress", value: "in-progress" },
                    { label: "Not Started", value: "not-started" },
                  ]}
                  label="Status"
                  placeholder="Pending"
                  onChange={() => {}}
                />

                <AppSelect
                  listItems={[
                    { label: "Today", value: "today" },
                    { label: "This Week", value: "this-week" },
                    { label: "This Month", value: "this-month" },
                    { label: "This Year", value: "this-year" },
                  ]}
                  label="Date"
                  placeholder="Today"
                  onChange={() => {}}
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <AppButton label="Reset" className="btn-secondary w-[90px]" />
                <AppButton label="Filter" className="btn-primary w-[90px]" />
              </div>
            </div>
          }
        />
      </div>

      {/* Table Section */}
      <div className="mt-4">
        {loading ? (
          <table className="w-full">
            <thead>
              <tr>
                {columns.map((col, index) => (
                  <th key={index} className="py-3 px-4 text-left">
                    <Skeleton height={20} width="80%" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array(5)
                .fill(0)
                .map((_, rowIndex) => (
                  <tr key={rowIndex} className="border-b">
                    {columns.map((_, colIndex) => (
                      <td key={colIndex} className="p-4">
                        <Skeleton height={20} />
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-[#F7F9FC]">
              <tr>
                <th className="px-4 py-3 text-left">Template Name</th>
                <th className="px-4 py-3 text-left">Questions</th>
                <th className="px-4 py-3 text-left">Created By</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {templates.length > 0 ? (
                templates.map((template: any, idx: number) => (
                  <tr
                    key={idx}
                    className="border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054]"
                  >
                    <td className="px-4 py-4">
                      <p className="text-sm">
                        {template?.templateName || "Untitled Template"}
                      </p>
                    </td>
                    <td className="px-10 py-4">
                      <p className="text-sm">
                        {template?.questions?.length || 0}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm">
                        {`${template?.createdBy?.firstName} ${template?.createdBy?.lastName}` ||
                          "Unknown"}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <AppDropdownMenu
                        trigger={
                          <button
                            type="button"
                            className="text-gray-400 font-bold flex gap-2 items-center border rounded-lg p-2 outline-none"
                          >
                            <LuMoveVertical />
                          </button>
                        }
                        width="w-48"
                        menuItems={
                          <div className="flex flex-col p-2">
                            <span
                              className="hover:bg-gray-100 rounded-md p-2 cursor-pointer"
                              onClick={() => previewTemplate(template?.id)}
                            >
                              View Template
                            </span>
                            <span
                              className="hover:bg-gray-100 rounded-md p-2 cursor-pointer text-red-500"
                              onClick={() => openDeleteModal(template?.id)}
                            >
                              Delete Template
                            </span>
                          </div>
                        }
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    No templates found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Delete Modal */}
      {modalOpen && (
        <DeleteTemplateModal
          isOpen={modalOpen}
          onClose={closeDeleteModal}
          id={selectedTemplateId as string}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
};

export default PerformanceTemplateTable;
