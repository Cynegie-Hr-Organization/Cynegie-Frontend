import StatusPill from "@/app/_components/shared/pills/status";
import {
  ChevronLeft,
  ChevronRight,
  MoreVert,
  FilterList,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Popover,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Image from "next/image";
import { useState, ChangeEvent } from "react";
import { payrollOverviewTableData } from "./data";
import { useRouter } from "next/navigation";
import { Input, InputGroup } from "rsuite";

const PayrollTable = () => {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    rowIndex: number,
  ) => {
    setSelectedRows((prevSelectedRows) => {
      if (event.target.checked) {
        return [...prevSelectedRows, rowIndex];
      } else {
        return prevSelectedRows.filter((index) => index !== rowIndex);
      }
    });
  };
  const [filterAnchorEl, setFilterAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const [tableActionAnchorEl, setTableActionAnchorEl] =
    useState<HTMLButtonElement | null>(null);

  const [tableActionPopoverContent, setTableActionPopoverContent] = useState([
    {
      name: "",
      route: "",
    },
  ]);

  const handleFilterClick: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    const buttonElement = event.currentTarget;
    setFilterAnchorEl(buttonElement);
  };

  const handleTableActionClick: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    const buttonElement = event.currentTarget;
    setTableActionAnchorEl(buttonElement);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleTableActionClose = () => {
    setTableActionAnchorEl(null);
  };

  const openFilter = Boolean(filterAnchorEl);
  const filterId = openFilter ? "filter-popover" : undefined;

  const openTableAction = Boolean(tableActionAnchorEl);
  const tableActionId = openTableAction ? "table-action-popover" : undefined;

  return (
    <Stack gap={2} className="common-card">
      <Stack
        sx={{
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
        }}
      >
        <Box sx={{ width: "100%" }} flexGrow={1}>
          <Box
            sx={{
              width: { xs: "90%", sm: "70%", md: "70%" },
              mb: { xs: "15px", md: "0px" },
            }}
          >
            <InputGroup>
              <InputGroup.Addon style={{ backgroundColor: "transparent" }}>
                <Image
                  src="/icons/search-2.svg"
                  alt=""
                  width={18}
                  height={18}
                  style={{ margin: "-15px 0px -15px 0px" }}
                />
              </InputGroup.Addon>
              <Input
                style={{ paddingLeft: "0px", height: "30px" }}
                placeholder="Search here..."
              />
            </InputGroup>
          </Box>
        </Box>
        <Box>
          <Button
            style={{
              height: "30px",
              borderRadius: "4.62px",
              border: "1px solid #D0D5DD",
              padding: "15px 15px",
              boxShadow: "0px 0px 1px 0px #888888",
              display: "flex",
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
              textTransform: "none",
              color: "inherit",
            }}
            sx={{ "&:hover": { backgroundColor: "#F0F0F0" } }}
            onClick={handleFilterClick}
          >
            <FilterList />
            <div
              style={{
                fontWeight: 500,
                color: "#344054",
                fontSize: "14px",
              }}
            >
              Filter
            </div>
          </Button>
        </Box>
      </Stack>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#F7F9FC" }}>
            <TableRow>
              <TableCell sx={{ whiteSpace: "nowrap" }}>
                <Checkbox
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRows([0, 1, 2, 3, 4]);
                    } else {
                      setSelectedRows([]);
                    }
                  }}
                  checked={selectedRows.length === 5}
                  indeterminate={
                    selectedRows.length > 0 && selectedRows.length < 5
                  }
                />
              </TableCell>
              {[
                "Payroll Name",
                "Payroll Period",
                "Payment Date",
                "Total Employees",
                "Gross Pay",
                "Net Pay",
                "Approval Date",
                "Status",
                "Actions",
              ].map((field) => (
                <TableCell key={field} sx={{ whiteSpace: "nowrap" }}>
                  {field}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {payrollOverviewTableData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  <Checkbox
                    checked={selectedRows.includes(rowIndex)}
                    onChange={(e) => handleCheckboxChange(e, rowIndex)}
                  />
                </TableCell>
                {[
                  row.name,
                  row.period,
                  row.date,
                  row.totalEmployees,
                  row.grossPay,
                  row.netPay,
                  row.approvalDate,
                  row.status,
                ].map((field, columnIndex) =>
                  columnIndex === 7 ? (
                    <TableCell sx={{ whiteSpace: "nowrap" }} key={columnIndex}>
                      <StatusPill
                        variant={
                          row.status === "Approved"
                            ? "success"
                            : row.status === "Pending"
                              ? "warning"
                              : row.status === "Rejected"
                                ? "error"
                                : "success"
                        }
                        text={field}
                      />
                    </TableCell>
                  ) : (
                    <TableCell sx={{ whiteSpace: "nowrap" }} key={columnIndex}>
                      {field}
                    </TableCell>
                  ),
                )}
                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  <Button
                    onClick={(e) => {
                      handleTableActionClick(e);
                      if (row.status == "Approved") {
                        setTableActionPopoverContent([
                          { name: "View Details", route: "" },
                          { name: "View Payroll Report", route: "" },
                        ]);
                      }
                      if (row.status == "Pending") {
                        setTableActionPopoverContent([
                          { name: "Edit Payroll", route: "" },
                          { name: "Delete", route: "" },
                        ]);
                      }
                      if (row.status == "Rejected") {
                        setTableActionPopoverContent([
                          { name: "Resolve Issue", route: "" },
                        ]);
                      }
                    }}
                  >
                    <MoreVert
                      sx={{
                        borderWidth: "0.5px",
                        borderRadius: "4px",
                        padding: "2px",
                        fill: "#000",
                      }}
                    />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
            defaultValue="5"
            sx={{ height: "30px", borderRadius: "4.62px", pr: "5px" }}
            disabled
          >
            <MenuItem value="5">5</MenuItem>
          </Select>
        </Stack>
        <Stack direction="row" alignItems="center" gap={2}>
          <div>1-5 of 1</div>
          <Stack direction="row" gap={2}>
            <ChevronLeft />
            <ChevronRight />
          </Stack>
        </Stack>
      </Stack>
      <Popover
        id={filterId}
        open={openFilter}
        anchorEl={filterAnchorEl}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Stack padding={5} gap={5}>
          <Stack gap={3}>
            <Stack gap={1}>
              <div
                style={{ fontWeight: 400, fontSize: "12px", color: "#303030" }}
              >
                Department
              </div>
              <Select
                defaultValue="All"
                sx={{ height: "40px", borderRadius: "5px", width: "200px" }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Sales">Sales</MenuItem>
                <MenuItem value="IT">IT</MenuItem>
                <MenuItem value="Finance">Finance</MenuItem>
              </Select>
            </Stack>
            <Stack gap={1}>
              <div
                style={{ fontWeight: 400, fontSize: "12px", color: "#303030" }}
              >
                Status
              </div>
              <Select
                defaultValue="All"
                sx={{ height: "40px", borderRadius: "5px", width: "200px" }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </Select>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Button
              sx={{
                display: { xs: "none", md: "block" },
                textTransform: "none",
                fontSize: "14px",
                border: "0px",
                color: "#9CA3AF",
              }}
              variant="outlined"
            >
              Reset
            </Button>
            <Button
              sx={{
                display: { xs: "none", md: "block" },
                fontSize: "14px",
                boxShadow: "none",
              }}
              variant="contained"
              className="common-button"
            >
              Filter
            </Button>
          </Stack>
        </Stack>
      </Popover>
      <Popover
        id={tableActionId}
        open={openTableAction}
        anchorEl={tableActionAnchorEl}
        onClose={handleTableActionClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <List sx={{ color: "#475367", fontWeight: 400, fontSize: "14px" }}>
          {tableActionPopoverContent.map((item) => (
            <ListItem
              key={item.name}
              component="button"
              sx={{
                "&:hover": { color: "#0035C3" },
                color: item.name == "Delete" ? "red" : "",
              }}
              onClick={() =>
                item.name === "Delete"
                  ? setShowDeleteDialog(true)
                  : router.push(item.route)
              }
            >
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Popover>
      {showDeleteDialog && (
        <Dialog
          open={showDeleteDialog}
          sx={{
            "& .MuiDialog-paper": {
              borderRadius: "24px",
            },
          }}
        >
          <DialogContent>
            <Stack gap={3} alignItems="center" padding={3}>
              <Image
                src="/icons/delete-x.svg"
                alt=""
                height={100}
                width={100}
              />
              <div
                style={{ color: "#303030", fontWeight: 600, fontSize: "20px" }}
              >
                Delete Payroll?
              </div>
              <div style={{ textAlign: "center" }}>
                If you delete this payroll, it will be removed from the payroll
                Management and it will be inaccessible
              </div>
              <Stack direction="row" gap={5}>
                <button
                  onClick={() => setShowDeleteDialog(false)}
                  style={{
                    borderRadius: "8px",
                    border: "1.5px solid #D0D5DD",
                    color: "#667185",
                    fontSize: "16px",
                    fontWeight: 700,
                    padding: "10px 40px",
                    // width: '250px',
                    backgroundColor: "#FFF",
                    marginTop: "10px",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    router.push("/hr-admin/payroll/overview");
                  }}
                  style={{
                    borderRadius: "8px",
                    border: "1.5px solid #98A2B3",
                    color: "#FFFFFF",
                    fontSize: "16px",
                    fontWeight: 600,
                    padding: "10px 30px",
                    // width: '250px',
                    backgroundColor: "#CB1A14",
                    marginTop: "10px",
                  }}
                >
                  Delete Payroll
                </button>
              </Stack>
            </Stack>
          </DialogContent>
        </Dialog>
      )}
    </Stack>
  );
};

export default PayrollTable;
