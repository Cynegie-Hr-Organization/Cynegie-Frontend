<<<<<<< HEAD
import { Close } from "@mui/icons-material";
=======
import { Close } from '@mui/icons-material';
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
<<<<<<< HEAD
} from "@mui/material";
=======
} from '@mui/material';
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd

const CancelInterviewModal = () => {
  return (
    <Dialog open={true}>
      <DialogTitle>
<<<<<<< HEAD
        <Stack direction="row">
          <Stack flexGrow={1} gap={1}>
            <Box>Cancel Interview?</Box>
            <Box sx={{ fontWeight: 400, fontSize: "14px", color: "#344054" }}>
=======
        <Stack direction='row'>
          <Stack flexGrow={1} gap={1}>
            <Box>Cancel Interview?</Box>
            <Box sx={{ fontWeight: 400, fontSize: '14px', color: '#344054' }}>
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd
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
<<<<<<< HEAD
        <Stack sx={{ width: { xs: "100%", md: "400px" } }}>
=======
        <Stack sx={{ width: { xs: '100%', md: '400px' } }}>
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd
          <Box>Reason for cancellation</Box>
          <TextField minRows={5} />
        </Stack>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default CancelInterviewModal;
