'use client';

import { Avatar, Grid, Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import './style.css';
import ClockIcon from '@/public/icons/clock';
import CalendarIcon from '@/public/icons/calendar';

const UpcomingEvent = () => {
  return (
    <Grid
      alignItems='center'
      style={{ marginTop: '-20px' }}
      rowSpacing={2}
      container
    >
      <Grid xs={12} sm={6} md={6} lg={7} item>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar showDaysOutsideCurrentMonth={false} />
        </LocalizationProvider>
      </Grid>
      <Grid
        xs={12}
        sm={6}
        md={6}
        lg={5}
        item
        sx={{ borderLeft: '1px solid #F0F2F5', paddingLeft: '20px' }}
      >
        <Stack gap={1}>
          <Stack direction='row' alignItems='center'>
            <div style={{ marginRight: '5px' }}>
              <Avatar
                src='/image/team/mattew.png'
                sx={{ width: '20px', height: '20px' }}
              />
            </div>
            <div
              style={{ fontWeight: 500, fontSize: '14px', marginRight: '5px' }}
            >
              Matthew
            </div>
            <div
              style={{ fontWeight: 400, fontSize: '12px', color: '#98A2B3' }}
            >
              2 hours ago
            </div>
          </Stack>
          <div
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#475367',
              wordBreak: 'break-word',
              paddingRight: '10px',
            }}
          >
            This is the final deadline for submitting all deliverables for the
            Figma asset. Please ensure that all tasks is completed
          </div>
          {[
            { icon: <CalendarIcon />, details: 'Aug 4, 2024' },
            { icon: <ClockIcon />, details: '5:00 PM' },
          ].map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  backgroundColor: '#E6EBF9',
                  fill: '#335DCF',
                  padding: '5px',
                  marginRight: '3px',
                }}
              >
                <div style={{ width: '12px', height: '12px' }}>{item.icon}</div>
              </div>
              <div
                style={{ fontSize: '12px', color: '#344054', fontWeight: 700 }}
              >
                {item.details}
              </div>
            </div>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default UpcomingEvent;
