import { AppDropdownMenu } from "@/app/_components/shared/dropdown-menu";
import EmptyTable from "@/app/_components/shared/empty-table";
import StatusPill from "@/app/_components/shared/pills/status";
import { AppSelect } from "@/app/_components/shared/select";
import TableSkeleton from "@/app/_components/shared/skelentons/table";
import { useCandidates } from "@/app/_core/use-cases/hr-admin/useDashboard";
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
  const { data, isLoading } = useCandidates()
  const { data: candidates } = data?.data ?? {}

  // console.log('************* - candidates', data)

  return (
    <Stack gap={2}>
      <Box className="text-base font-bold">Candidates</Box>

      <Stack gap={2} className="common-card">
        {isLoading ? (
          <TableSkeleton />
        ) : ((
          <>
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
                        onChange={() => { }}
                      />
                    </div>
                  </div>
                }
              />
            </Stack>

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
                  {(candidates && (candidates?.length ?? 0) > 0) ? (
                    candidates?.map((candidate) => (
                      <TableRow key={candidate?.id}>
                        {candidates?.map((field, columnIndex) =>
                          columnIndex == 0 ? (
                            <TableCell key={field.id}>
                              <Stack direction="row" alignItems="center" gap={2}>
                                <Box>{field.firstName} {field.lastName}</Box>
                              </Stack>
                            </TableCell>
                          ) : columnIndex == 5 ? (
                            <TableCell key={columnIndex}>
                              <StatusPill variant="success" text={field.status} />
                            </TableCell>
                          ) : (
                            <TableCell key={columnIndex}>{field.status}</TableCell>
                          ),
                        )}
                      </TableRow>
                    ))
                  ) : (
                    <>
                      <EmptyTable message="No candidates found" />
                    </>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ))}
      </Stack >
    </Stack >
  );
};

export default CandidatesSection;
