import {Stack, Switch } from '@mui/material';
import { useState } from 'react';
import {
  MultiSelect,
  Option,
} from '@/app/_components/shared/multi-select-dropdown';
import { newIndex } from '@/lib/utils';

const PayrollApprovalDropdownSettings = () => {
  const [approvalLevelsSelected, setapprovalLevelsSelected] = useState<
    Option[] | null
  >();
  const approvalLevelHandleChange = (selected: Option[]) => {
    setapprovalLevelsSelected(selected);
  };
  return (
    <Stack gap={2}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          {
            label: 'Approval Levels',
            placeholder: 'Filter by Location',
            options: [
              { value: 0, label: 'Level 1' },
              { value: 1, label: 'Level 2' },
            ],
            onChange: approvalLevelHandleChange,
            value: approvalLevelsSelected,
          },
        ].map((item, index) => (
          <div
            key={index}
            style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
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
            <div className='App'>
              <MultiSelect
                key={newIndex(index)}
                options={item.options}
                onChange={item.onChange}
                value={item.value ?? []}
                isSelectAll={true}
                menuPlacement={'bottom'}
              />
            </div>
          </div>
        ))}
      </div>
      <Stack direction='row' alignItems='center'>
        <div
          style={{
            flexGrow: 1,
            fontSize: '14px',
            fontWeight: 600,
            color: '#101928',
          }}
        >
          Notify Approvers
        </div>
        <Switch />
      </Stack>
    </Stack>
  );
};

export default PayrollApprovalDropdownSettings;
