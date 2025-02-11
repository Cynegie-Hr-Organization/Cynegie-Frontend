import { AppDropdownMenu } from "@/app/_components/shared/dropdown-menu";
import StatusPill from "@/app/_components/shared/pills/status";
import { AppSelect } from "@/app/_components/shared/select";
import { newIndex } from "@/lib/utils";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { LuListFilter } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";

const CandidatesSection = () => {
  return (
    <Stack gap={2}>
      <Box className="text-base font-bold">Candidates</Box>
      <Stack gap={2} className="common-card">
        <Stack
          sx={{
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
          }}
        >
          <Box sx={{ width: "100%" }} flexGrow={1}>
            <TextField
              className="max-w-[476px]"
              sx={{
                width: { xs: "90%", sm: "70%", md: "70%" },
                mb: { xs: "15px", md: "0px" },
              }}
              InputProps={{
                sx: {
                  height: "35px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: 400,
                },
                startAdornment: <RiSearchLine className="mr-2 text-2xl" />,
              }}
              placeholder="Search"
            />
          </Box>
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
                </div>
              </div>
            }
          />
        </Stack>

        <CandidatesTable />
      </Stack>
    </Stack>
  );
};

const CandidatesTable = () => {
  return (
    <TableContainer>
      <Table>
        <TableHead sx={{ backgroundColor: "#F7F9FC" }}>
          <TableRow>
            {[
              "Candidate Name",
              "Stages",
              "Applied Role",
              "Application Date",
              "Attachments",
              "Status",
            ].map((field) => (
              <TableCell key={field}>{field}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array(4)
            .fill(undefined)
            .map((_, rowIndex) => (
              <TableRow key={newIndex(rowIndex)}>
                {[
                  "Gabby Lewis",
                  "Screening",
                  "Sr. UX Designer",
                  "12/05/24",
                  "3 files",
                  "On-going",
                ].map((field, columnIndex) =>
                  columnIndex == 0 ? (
                    <TableCell key={field}>
                      <Stack direction="row" alignItems="center" gap={2}>
                        <Box>{field}</Box>
                      </Stack>
                    </TableCell>
                  ) : columnIndex == 5 ? (
                    <TableCell key={columnIndex}>
                      <StatusPill variant="success" text={field} />
                    </TableCell>
                  ) : (
                    <TableCell key={columnIndex}>{field}</TableCell>
                  ),
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CandidatesSection;
