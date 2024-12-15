import StatusPill from "@/app/_components/shared/pills/status";
import { newIndex } from "@/lib/utils";
import {
  Box,
  MenuItem,
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
import { RiSearchLine } from "react-icons/ri";

const CandidatesSection = () => {
  return (
    <Stack gap={2}>
      <Box className="section-heading">Candidates</Box>
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
          <Select
            defaultValue="Filter"
            sx={{ height: "30px", borderRadius: "4.62px", pr: "15px" }}
            disabled
          >
            <MenuItem value="Filter">Filter</MenuItem>
          </Select>
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
