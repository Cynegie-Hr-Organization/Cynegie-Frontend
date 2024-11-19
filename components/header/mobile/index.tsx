import { ImageIcon } from '@/constants';
import { ChevronLeft, Menu } from '@mui/icons-material';
import { Box, Stack } from '@mui/material';
import Image from 'next/image';

const HeaderMobile = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        padding: { xs: '20px 20px 0px 20px', md: '20px' },
        alignItems: 'center',
      }}
    >
      <div style={{ flexGrow: 1 }}>
        <ChevronLeft sx={{ height: 30, width: 30 }} />
      </div>
      <Stack direction='row' alignItems='center' gap={2}>
        <div>
          <Image {...ImageIcon.bell} width={24} height={24} />
        </div>
        <div>
          <Menu />
        </div>
      </Stack>
    </Box>
  );
};

export default HeaderMobile;
