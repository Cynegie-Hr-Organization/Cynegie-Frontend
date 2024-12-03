'use client';
import { ChevronLeft } from '@mui/icons-material';
import { Alert, Avatar, Grid2, Stack } from '@mui/material';
import { DatePicker, Input } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { BsExclamationCircle } from 'react-icons/bs';
import CalendarIcon from '@/app/_components/icons/calendar';

const EmployeeProfile = () => {
  return (
    <Stack gap={4} mb={10}>
      <Stack gap={3}>
        <Stack
          direction='row'
          alignItems='center'
          gap={1}
          sx={{ display: { xs: 'none', sm: 'flex' }, cursor: 'pointer' }}
          // onClick={() => router.push('/hr-admin/payroll/overview')}
        >
          <ChevronLeft
            sx={{ color: '#8D8484', height: '36px', width: '36px' }}
          />
          <div style={{ color: '#667185', fontWeight: 400, fontSize: '16px' }}>
            Back to Employee Dashboard
          </div>
        </Stack>
        <div className='section-heading'>Update Your Profile</div>
      </Stack>
      <Stack className='common-card' gap={3} py={7} px={8}>
        <Alert icon={<BsExclamationCircle />} severity='warning'>
          Note that all updates you make will only reflect after approval from
          your Administrator
        </Alert>
        <Stack alignItems='center'>
          <Avatar
            src='/image/avatar.png'
            sx={{ width: '74px', height: '74px' }}
          />
          <div className='card-title-small'>Alibaba Udor</div>
        </Stack>
        <div className='card-title-small'>Bio Data</div>
        <Grid2 spacing={3} container>
          {[
            { label: 'First Name', placeholder: 'Alibaba' },
            { label: 'Middle Name', placeholder: 'Victoria' },
            { label: 'Last Name', placeholder: 'Udor' },
            { label: 'Email Address', placeholder: 'alivic@cynergie.co' },
            { label: 'Phone Number', placeholder: '09010101010' },
            { label: 'Date of Birth', placeholder: '13-Mar-1988' },
            { label: 'State', placeholder: 'Lagos' },
            { label: 'Job Title', placeholder: 'UI/UX Designer' },
            { label: 'Nationality', placeholder: 'Nigeria' },
            { label: 'Department', placeholder: 'UI/UX Department' },
          ].map((item, index) => (
            <Grid2 key={index} size={{ xs: 12, md: 4 }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 5,
                }}
              >
                <div
                  style={{
                    color: '#101928',
                    fontWeight: 600,
                    fontSize: '14px',
                  }}
                >
                  {item.label}
                </div>
                {index != 5 ? (
                  <Input
                    defaultValue={item.placeholder}
                    key={index}
                    style={{ borderRadius: '6px' }}
                  />
                ) : (
                  <DatePicker
                    key={index}
                    placeholder={item.placeholder}
                    style={{
                      borderRadius: '6px',
                    }}
                    format='dd MMM yyyy'
                    cleanable={false}
                    caretAs={CalendarIcon}
                  />
                )}
              </div>
            </Grid2>
          ))}
        </Grid2>
      </Stack>
      <Stack direction='row' justifyContent='flex-end'>
        <button
          // onClick={() => router.push('/hr-admin/payroll/review-payroll')}
          style={{
            borderRadius: '8px',
            border: '1.5px solid #98A2B3',
            color: '#FFF',
            fontSize: '16px',
            fontWeight: 600,
            padding: '10px 0px',
            width: '250px',
            backgroundColor: '#0035C3',
          }}
        >
          Edit
        </button>
      </Stack>
    </Stack>
  );
};

export default EmployeeProfile;
