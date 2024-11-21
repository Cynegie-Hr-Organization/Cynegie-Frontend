import Stack from "@mui/material/Stack";
import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => (
  <Stack
    className="min-h-svh"
    gap={3}
  >
    {children}
  </Stack>
);
export default DashboardLayout;