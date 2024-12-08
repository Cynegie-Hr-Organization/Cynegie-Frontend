import { Close } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";

const CancelInterviewModal = () => {
  return (
    <Dialog open={true}>
      <DialogTitle>
        <Stack direction="row">
          <Stack flexGrow={1} gap={1}>
            <Box>Cancel Interview?</Box>
            <Box sx={{ fontWeight: 400, fontSize: "14px", color: "#344054" }}>
              <Box>Are you sure you want to cancel this interview?</Box>
              <Box>This action cannot be undone</Box>
            </Box>
          </Stack>
          <Box>
            <Close />
          </Box>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack sx={{ width: { xs: "100%", md: "400px" } }}>
          <Box>Reason for cancellation</Box>
          <TextField minRows={5} />
        </Stack>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default CancelInterviewModal;
