'use client';


import Button from '@/app/_components/shared/button-group/button';
import DotLegend from '@/app/_components/shared/charts/legends/dot-legend';
import { ButtonType } from '@/app/_components/shared/page/heading/types';
import { color } from '@/constants';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';
import { useState } from 'react';
import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import './styles.css';

const localizer = momentLocalizer(moment);

// Event type definition
interface MyEvent {
  title: string;
  start: Date;
  end: Date;
  description: string;
  location: string;
  color: string;
}

// Sample events
const events: MyEvent[] = [
  {
    title: 'Meeting with Cynegie',
    start: new Date(2024, 11, 10, 10, 0),
    end: new Date(2024, 11, 10, 11, 0),
    description: 'Discuss project updates with Bob',
    location: 'Conference Room 1',
    color: 'blue',
  },
  {
    title: 'Lunch with Sadiq',
    start: new Date(2024, 11, 10, 12, 0),
    end: new Date(2024, 11, 10, 13, 0),
    description: 'Casual lunch to catch up',
    location: 'Cafe Central',
    color: 'green',
  },
  {
    title: 'Client Call: Cynegie',
    start: new Date(2024, 11, 11, 14, 30),
    end: new Date(2024, 11, 11, 15, 30),
    description: 'Discuss contract terms and project timelines',
    location: 'Zoom Call',
    color: 'red',
  },
  {
    title: 'Team Activities',
    start: new Date(2024, 11, 12, 9, 0),
    end: new Date(2024, 11, 12, 12, 0),
    description: 'A hands-on workshop on React development',
    location: 'Training Room B',
    color: 'purple',
  },
  {
    title: 'Product Review',
    start: new Date(2024, 11, 14, 16, 0),
    end: new Date(2024, 11, 14, 18, 0),
    description: 'Celebrating the successful launch of our new product',
    location: 'Main Hall',
    color: 'orange',
  },
];

// Event styling function
const eventStyleGetter = (event: MyEvent) => {
  const style = {
    backgroundColor: event.color,
    borderRadius: '5px',
    opacity: 0.8,
    color: 'white',
    border: 'none',
    display: 'block',
  };
  return {
    style,
  };
};

const BigCalendar = () => {
  const [calView, setCalView] = useState<View>('month');

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='bg-white p-6  md:w-[400] flex justify-center'>
        <div className='picker-indicator-container w-fit flex flex-col gap-2 sm:flex-row sm:gap-20'>
          <div>
            <div className='mb-8'>
              <Button type={ButtonType.contained} text='Calendar' fullWidth />
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                disablePast
                sx={{
                  width: 'fit-content',
                  px: 0.8,
                  pb: 3,
                  height: 'fit-content',
                  boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.1)',
                }}
              />
            </LocalizationProvider>
          </div>
          <div className='mt-8'>
            <div className='mb-4 card-title-small'>Indicators</div>
            <div className='flex flex-col gap-2'>
              {[
                { dotColor: color.success.dark, label: 'Meetings' },
                { dotColor: color.info.dark, label: 'Deadline' },
                { dotColor: color.warning.dark, label: 'Company Event' },
              ].map((series) => (
                <DotLegend
                  key={series.label}
                  type='meeting-indicator'
                  {...series}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='flex-grow overflow-auto sm:w-full md:w-full bg-white'>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor='start'
          endAccessor='end'
          className='w-[600] sm:w-full'
          style={{ height: '100vh', overflowX: 'scroll' }}
          eventPropGetter={eventStyleGetter}
          components={{
            toolbar: ({ label, onNavigate, onView }) => (
              <div
                className='flex flex-col gap-5 md:gap-0 md:flex-row md:justify-between md:items-center'
                style={{ padding: '20px' }}
              >
                {/* Display the current label */}
                <div className='flex items-center gap-3'>
                  <div className='flex items-center text-[#989FAB]'>
                    {/* Back Button with Chevron */}
                    <button
                      onClick={() => onNavigate('PREV')}
                      style={{
                        fontSize: '20px',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                      }}
                    >
                      <FaChevronLeft />
                    </button>
                    {/* Next Button with Chevron */}
                    <button
                      onClick={() => onNavigate('NEXT')}
                      style={{
                        fontSize: '20px',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                      }}
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                  <div className=' text-xl font-[500] mr-2'>{label}</div>
                </div>
                <div className='border-t-[#E9EAEC] border flex w-fit'>
                  {[
                    { label: 'Month', value: 'month' },
                    { label: 'Week', value: 'week' },
                    { label: 'Day', value: 'day' },
                  ].map((view, index) => (
                    <button
                      key={index}
                      className={`w-20 ${
                        index !== 2 && 'h-[40] border-r border-[#E9EAEC]'
                      } ${
                        view.value === calView &&
                        `bg-[${color.info.light}] text-[${color.info.dark}]`
                      }`}
                      onClick={() => {
                        onView(view.value as View);
                        setCalView(view.value as View);
                      }}
                    >
                      {view.label}
                    </button>
                  ))}
                </div>
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default BigCalendar;
