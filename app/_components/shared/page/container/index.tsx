import { Stack } from '@mui/material';
import React from 'react';
import { PageContainerProps } from '../types';

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <div>
      <Stack gap={4} sx={{ mx: { xs: 0, sm: 2 } }} mb={10} mt={6}>
        {children}
      </Stack>
    </div>
  );
};

export default PageContainer;
