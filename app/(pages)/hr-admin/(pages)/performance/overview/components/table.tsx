import Pagination from "@/app/_components/hr-admin/pages/hiring/shared/pagination";
import DeleteReviewModal from "@/app/_components/hr-admin/performance/review-cycle/delete-modal";
import AppMenubar from "@/app/_components/shared/menubar";
import { getReviewCycles } from "@/app/api/services/performance/review cycle";
import { Checkbox } from "@/components/ui/checkbox";
import { ReviewCycle } from "@/types";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { LuListFilter, LuMoveVertical } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PerformanceReviewTable = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [reviews, setReviews] = useState<ReviewCycle[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [reviewIdToDelete, setReviewIdToDelete] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data, meta } = await getReviewCycles(
        currentPage,
        itemsPerPage,
        "desc",
        filter,
        search,
      );
      console.log(data);
      setReviews(data || []);
      setTotalItems(meta?.itemCount || 0);
    } catch (error) {
      console.error("Error fetching review cycles:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, filter, search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = (reviewId: string) => {
    setReviewIdToDelete(reviewId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setReviewIdToDelete(null);
    fetchData();
  };

  const columns = [
    "Cycle Name",
    "Start Date",
    "End Date",
    "Employees",
    "Status",
  ];

  return (
    <div className="common-card overflow-x-scroll">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4 md:gap-0">
        {/* Search Bar */}
        <div className="flex-grow max-w-[300px] xl:max-w-[479px] flex items-center border pl-4 border-gray-300 rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-1 focus-within:border-primary focus-within:ring-primary">
          <RiSearchLine className="text-gray-400" />
          <input
            type="text"
            placeholder="Search here..."
            className="w-full h-9 px-2 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter Button */}
        <button
          type="button"
          onClick={() =>
            setFilter(filter === "In Progress" ? "" : "In Progress")
          }
          className="text-gray-400 font-bold flex gap-2 items-center border rounded-lg px-4 py-2"
        >
          <LuListFilter /> Filter
        </button>
      </div>

      {/* Table */}
      <div className="-mx-5 mt-4">
        {loading ? (
          // Skeleton Loader
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left">
                  <Skeleton height={20} />
                </th>
                {columns.map((col, index) => (
                  <th key={index} className="px-4 py-3 text-left">
                    <Skeleton height={20} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array(4)
                .fill(0)
                .map((_, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="border-b border-[#E4E7EC] hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <Skeleton height={20} />
                    </td>
                    {columns.map((_, colIndex) => (
                      <td key={colIndex} className="px-4 py-4">
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
                <th className="px-6 py-3 text-left">
                  <Checkbox className="rounded-md border-gray-300" />
                </th>
                <th className="px-4 py-3 text-left">Cycle Name</th>
                <th className="px-4 py-3 text-left">Start Date</th>
                <th className="px-4 py-3 text-left">End Date</th>
                <th className="px-4 py-3 text-left">Employees</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr
                  key={review.id}
                  className="border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054]"
                >
                  <td className="px-6 py-4">
                    <Checkbox className="rounded-md border-gray-300" />
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">{review.cycleName}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">
                      {new Date(review.startDate).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">
                      {new Date(review.endDate).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm">
                      {review.employees?.length > 0 ? (
                        <span>
                          {review.employees[0].personalInfo?.firstName || "N/A"}{" "}
                          {review.employees[0].personalInfo?.lastName || ""}
                          {review.employees.length > 1 && (
                            <span className="text-primary text-base">
                              {" "}
                              +{review.employees.length - 1}
                            </span>
                          )}
                        </span>
                      ) : (
                        "N/A"
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <p className="text-sm font-semibold text-amber-600 bg-amber-50 rounded-full px-2 py-1 w-fit text-nowrap">
                      {review.status}
                    </p>
                  </td>
                  <td className="p-4">
                    <AppMenubar
                      menuItems={[
                        {
                          key: "edit",
                          label: "Edit",
                          onClick: () =>
                            router.push(
                              `/hr-admin/performance/review-cycle/edit/${review.id}`,
                            ),
                        },
                        {
                          key: "view-details",
                          label: "View Details",
                          onClick: () =>
                            router.push(
                              `/hr-admin/performance/review/${review.id}`,
                            ),
                        },
                        {
                          key: "delete",
                          label: "Delete",
                          onClick: () => handleDelete(review.id),
                          className: "text-red-500",
                        },
                      ]}
                    >
                      <LuMoveVertical />
                    </AppMenubar>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
      />

      {/* Delete Modal */}
      <DeleteReviewModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        reviewId={reviewIdToDelete || ""}
      />
    </div>
  );
};

export default PerformanceReviewTable;
