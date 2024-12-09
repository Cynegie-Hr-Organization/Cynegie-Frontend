import { Tab } from '@mui/material';
import React, { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { TabFormatProps } from './types';

const TabFormat: React.FC<TabFormatProps> = (props) => {
  const [value, setValue] = useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    event.preventDefault();
    setValue(newValue);
  };

  const tabStyle = {
    borderBottom: 1,
    borderColor: 'divider',
  };

  return (
    <div className='w-full'>
      <TabContext value={value}>
        <TabList onChange={handleChange}>
          {props.tabs?.map((tab, index) => (
            <Tab
              className='!normal-case'
              key={index}
              sx={tabStyle}
              label={tab.name}
              value={`${index + 1}`}
            />
          ))}
        </TabList>
        <div className='mx-[-25]'>
          {props.tabs?.map((tab, index) => (
            <TabPanel key={index} value={`${index + 1}`}>
              {tab.component}
            </TabPanel>
          ))}
        </div>
      </TabContext>
    </div>
  );
};

export default TabFormat;
