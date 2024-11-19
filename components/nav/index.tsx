import { ImageIcon } from '@/constants';
import BarchartIcon from '@/public/icons/barchart';
import ClipboardIcon from '@/public/icons/clipboard';
import ClockIcon from '@/public/icons/clock';
import DashboardIcon from '@/public/icons/dashboard';
import DevicesIcon from '@/public/icons/devices';
import GiftIcon from '@/public/icons/gift';
import GraduationCapIcon from '@/public/icons/graduation-cap';
import KeyIcon from '@/public/icons/key';
import MoneyIcon from '@/public/icons/money';
import PlaneIcon from '@/public/icons/plane';
import ProfileIcon from '@/public/icons/profile';
import { Logout } from '@mui/icons-material';
import { Avatar, Box, Stack, TextField } from '@mui/material';
import Image from 'next/image';

const Nav = () => {
  return (
    <Stack
      style={{
        padding: '10px 10px 10px 15px',
        width: '275px',
        backgroundColor: 'white',
        height: '100%',
        position: 'relative',
      }}
      gap={3}
    >
      <div style={{ marginTop: '15px' }}>
        <Image
          src={'/logo/cynegie.png'}
          alt={'Cynegie'}
          width={122}
          height={38.1}
        />
      </div>
      <div>
        <TextField
          sx={{ width: '100%' }}
          InputProps={{
            sx: {
              height: '30px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 400,
            },
            startAdornment: (
              <Image
                {...ImageIcon.search}
                width={20}
                height={20}
                style={{ marginRight: '5px' }}
              />
            ),
          }}
          placeholder='Search'
        />
      </div>
      <Stack gap={0.5}>
        {[
          { name: 'Dashboard', icon: <DashboardIcon /> },
          { name: 'Task', icon: <ClipboardIcon /> },
          { name: 'Profile', icon: <ProfileIcon /> },
          { name: 'Benefits', icon: <GiftIcon /> },
          { name: 'App Requests and Permissi...', icon: <KeyIcon /> },
          { name: 'Payroll', icon: <MoneyIcon /> },
          { name: 'Device Management', icon: <DevicesIcon /> },
          { name: 'Leave Management', icon: <PlaneIcon /> },
          { name: 'Performance Management', icon: <BarchartIcon /> },
          { name: 'Learning Development', icon: <GraduationCapIcon /> },
          { name: 'Attendance and Time Tracki...', icon: <ClockIcon /> },
        ].map((item, index) => (
          <Stack
            key={index}
            direction='row'
            alignItems='center'
            gap={1}
            sx={{
              cursor: 'pointer',
              padding: '10px',
              ...(item.name === 'Dashboard' && {
                backgroundColor: '#0035C3',
                color: 'white',
                fill: 'white',
                borderRadius: '4px',
              }),
              ...(item.name === 'App Requests and Permissi...' && {
                fill: 'black',
              }),
              '&:hover': {
                backgroundColor: '#0035C3',
                color: 'white',
                fill: 'white',
                borderRadius: '4px',
              },
            }}
          >
            <div
              style={{
                ...(item.name === 'Attendance and Time Tracki...' && {
                  width: '25px',
                  height: '25px',
                }),
              }}
            >
              {item.icon}
            </div>
            <div
              style={{
                color: 'inherit',
                fontWeight: 400,
                fontSize: '14px',
              }}
            >
              {item.name}
            </div>
          </Stack>
        ))}
      </Stack>
      <Box
        sx={{
          display: 'flex',
          backgroundColor: 'white',
          paddingBottom: '10px',
          pr: '20px',
          position: 'absolute',
          bottom: 0,
        }}
      >
        <div style={{ display: 'flex', flexGrow: 1, marginRight: '10px' }}>
          <div style={{ marginRight: '10px' }}>
            <Avatar src='/account/sadiq.jpg' />
          </div>
          <div style={{ flexGrow: 1 }}>
            <div
              style={{ fontWeight: 700, fontSize: '14px', color: '#101928' }}
            >
              Sadiq Umar
            </div>
            <div
              style={{
                fontWeight: 400,
                fontSize: '14px',
                color: '#475367',
                wordBreak: 'break-word',
              }}
            >
              umarsadiqibrahim@gmail.com
            </div>
          </div>
        </div>
        <div>
          <Logout />
        </div>
      </Box>
    </Stack>
  );
};

export default Nav;
