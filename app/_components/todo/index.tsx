import { Avatar, Stack } from '@mui/material';
import { TbMessage } from 'react-icons/tb';

const Todo = () => {
  return (
    <Stack
      gap={1}
      className='flex border border-[#E4E7EC] rounded-xl p-[15px]'
    >
      <div className="flex relative h-max">
        <div className='w-1 bg-red-500 rounded-full mr-2'></div>
        <div className='flex-grow font-semibold text-xs text-[#1B1B1B]'>
          <div>App usability testing with Maze</div>
          <div className='text-[10px] text-[#909090]'>On Slack</div>
        </div>

      </div>
      <div className='space-y-2'>
        <div className="flex justify-between w-full items-end">
          <div className='flex-grow text-[10px] text-[#909090]' >
            Not started yet
          </div>
          <div>
            <div className='flex'>
              {[
                '/image/persons/person-1.png',
                '/image/persons/person-2.png',
                '/image/persons/person-1.png',
              ].map((imageSrc, index) => (
                <Avatar
                  key={index}
                  src={imageSrc}
                  sx={{ ml: '-4px', width: '24.71px', height: '24.71px' }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className='h-1 w-full bg-gray-200 rounded-full overflow-hidden'>
          <span className='bg-green-500 h-full block rounded-full' style={{ width: '40%' }}></span>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ flexGrow: 1 }}>
          <span style={{ fontWeight: 400, fontSize: '10px', color: '#909090' }}>
            Due:
          </span>{' '}
          <span style={{ fontWeight: 600, color: '#1B1B1B', fontSize: '11px' }}>
            January 21st, 2024
          </span>
        </div>
        <Stack direction='row' alignItems='center' gap={1}>

          <TbMessage className='text-gray-400' />

          <div>2</div>
        </Stack>
      </div>
    </Stack>
  );
};

export default Todo;
