import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { MenuItem, Select, Skeleton, Stack } from "@mui/material";
import { TablePaginationProps } from "../types";

const TablePagination: React.FC<TablePaginationProps> = ({
  itemCount,
  // totalPages = 0,
  page,
  limit,
  itemsOnPage,
  onNextClick = () => {},
  onPrevClick = () => {},
  loading = false,
  onChangeLimit,
}) => {
  const limitOptions = [5, 10, 20, 30];
  const start = limit && page ? limit * page - (limit - 1) : undefined;
  const end =
    limit && page && itemsOnPage
      ? limit * page - (limit - itemsOnPage)
      : undefined;

  return (
    <Stack
      sx={{
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        gap: { xs: 2, sm: 0 },
      }}
    >
      <Stack direction="row" alignItems="center" gap={2} flexGrow={1}>
        <div style={{ fontWeight: 400, fontSize: "14px", color: "#525866" }}>
          Show rows per page
        </div>
        <Select
          value={limit ?? 10}
          sx={{ height: "30px", borderRadius: "4.62px", pr: "5px" }}
          disabled={loading}
          onChange={(e) => {
            if (typeof e.target.value == "number") {
              onChangeLimit?.(e.target.value);
            }
          }}
        >
          {limitOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </Stack>
      <Stack direction="row" alignItems="center" gap={2}>
        {loading ? (
          <Skeleton variant="text" width={60} height={20} />
        ) : (
          <div>
            {itemsOnPage === 0 ? 0 : start ?? 0}-{end ?? 0} of {itemCount}
          </div>
        )}
        <Stack direction="row" gap={2}>
          <span
            className="cursor-pointer"
            onClick={start != 1 ? onPrevClick : () => {}}
          >
            <ChevronLeft />
          </span>
          <span
            className="cursor-pointer"
            onClick={
              itemCount && end
                ? itemCount - end < 1
                  ? () => {}
                  : onNextClick
                : () => {}
            }
          >
            <ChevronRight />
          </span>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TablePagination;
