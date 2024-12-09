import { Grid2 } from '@mui/material';
import { DetailGroupProps } from './types';
import Detail from './detail';
import { getGridLayout } from '@/utils/grid-layout';

const DetailGroup: React.FC<DetailGroupProps> = (props) => {
  const { details, gridLayout, spaceBetweenLayout, statusMap } = props;

  return (
    <div>
      {!spaceBetweenLayout && (
        <Grid2 container spacing={3}>
          {details?.map((item, index) => (
            <Grid2 key={index} size={getGridLayout(index, gridLayout)}>
              <Detail
                name={item.name}
                value={item.value}
                type={item.type}
                statusMap={statusMap}
              />
            </Grid2>
          ))}
        </Grid2>
      )}
      {spaceBetweenLayout && (
        <div className='flex flex-col gap-5'>
          {details?.map((item, index) => (
            <Detail
              key={index}
              name={item.name}
              value={item.value}
              spaceBetweenLayout={spaceBetweenLayout}
              type={item.type}
              statusMap={statusMap}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DetailGroup;
