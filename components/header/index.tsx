import { ImageIcon } from '@/constants';
import { Avatar, MenuItem, Select, Stack } from '@mui/material';
import Image from 'next/image';

const Header = () => {
  return (
    <div style={{ display: 'flex', padding: '20px', backgroundColor: '#FFF' }}>
      <div style={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
        <div style={{ marginRight: '10px' }}>
          <Avatar src='/account/sadiq.jpg' />
        </div>
        <div>
          <div style={{ color: '#101928', fontWeight: 700, fontSize: '18px' }}>
            Welcome, Sadiq 👋
          </div>
          <div style={{ color: '#344054', fontWeight: 400, fontSize: '12px' }}>
            It{"'"}s Monday, 14th July 2024
          </div>
        </div>
      </div>
      <Stack direction='row' alignItems='center' gap={2}>
        <Select
          defaultValue='Employee'
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#101928',
            height: '20px',
            padding: '16px 0px',
            borderRadius: '6px',
          }}
        >
          <MenuItem
            value='Employee'
            style={{ fontSize: '14px', fontWeight: 600, color: '#101928' }}
          >
            Employee
          </MenuItem>
        </Select>
        <div>
          <Image {...ImageIcon.bell} width={24} height={24} />
        </div>
      </Stack>
    </div>
  );
};

export default Header;
