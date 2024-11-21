import { Box, Grid2, MenuItem, Select, Stack } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { GradientLineChart } from "./chart";




const colors = { red: '#D42620', grey: '#E6EBF9', yellow: '#FFAD33', green: '#0F973D' };
const data = [
  { value: 40, label: 'A', color: colors.green },
  { value: 40, label: 'B', color: colors.yellow },
  { value: 40, label: 'C', color: colors.grey },
  { value: 40, label: 'D', color: colors.red },
];

const size = {
  width: 250,
  height: 150,
};


const ChartsSection = () => {

  return (
    <Grid2 columnSpacing={3} rowSpacing={3} container>
      <Grid2 className='common-card' size={{ xs: 12, sm: 6, md: 8.5 }}>
        <Stack gap={2}>
          <Stack direction='row'>
            <Box className='card-title-large flex-grow'>
              Total Payroll Processed
            </Box>
            <Select
              defaultValue='Monthly'
              className="h-[30px] rounded-[4.62px] pr-[15px]"
              disabled
            >
              <MenuItem value='Monthly'>Monthly</MenuItem>
            </Select>
          </Stack>
          <Box>
            {/* <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}

              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                  area: true,
                }
              ]}
              className=""
              sx={{
                width: 'inherit',
                '& path': {
                  stroke: '#ff5722', 
                },
                '& polygon': {
                  fill: 'rgba(255, 87, 34, 0.2)',
                },
              }}
              height={300}
            /> */}

            <GradientLineChart />
          </Box>
        </Stack>
      </Grid2>

      <Grid2 className='common-card' size={{ xs: 12, sm: 6, md: 3.5 }}>
        <Stack gap={3}>
          <Box className='card-title-large'>Employee Status Distribution</Box>
          <Box
            sx={{
              display: 'flex',
              marginTop: { xs: '0px', sm: '0px', md: '-20px', lg: '0px' },
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <PieChart
              series={[{ data, innerRadius: 55, cx: 120 }]}
              slotProps={{
                legend: { hidden: true },
              }}
              {...size}
            />
          </Box>
          <Stack gap={2}>
            {[
              { color: colors.green, label: 'Active', percentage: 75 },
              { color: colors.yellow, label: 'On Leave', percentage: 10 },
              { color: colors.grey, label: 'Probation', percentage: 5 },
              { color: colors.red, label: 'Resigned', percentage: 10 },
            ].map((item, index) => (
              <Stack
                key={index}
                direction='row'
                alignItems='center'
                gap={2}
                sx={{ fontSize: '18px' }}
              >
                <Box
                  style={{
                    borderRadius: '50%',
                    width: '15px',
                    height: '15px',
                    backgroundColor: item.color,
                  }}
                />
                <Box flexGrow={1}>{item.label}</Box>
                <Box>{item.percentage}%</Box>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Grid2>
    </Grid2>
  )
}

export default ChartsSection