import { Box } from '@mui/material';
import ChartCenterText from './center-text';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { DonutChartProps } from './types';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DoughnutChart: React.FC<DonutChartProps> = (props) => {
  const { isValuePercentage = false } = props;

  return (
    <Box sx={{ ...props.containerSx, width: '100%', position: 'relative' }}>
      <Doughnut {...props} />
      <div
        style={{
          position: 'absolute',
          top: '35%',
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <ChartCenterText
          value={props.centerText?.value}
          label={props.centerText?.label}
          isPercentage={isValuePercentage}
          denominator={props.centerText?.denominator}
        />
      </div>
    </Box>
  );
};

export default DoughnutChart;
