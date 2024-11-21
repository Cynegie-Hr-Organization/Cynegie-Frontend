import { newIndex } from "@/lib/utils";
import { Stack, Box, Grid2 } from "@mui/material";
import Image from "next/image";

const OverViewSection = () => {
  return (
    <Stack gap={2}>
      <Box className='section-heading'>Overview</Box>
      <Grid2 columnSpacing={2} rowSpacing={2} container>
        {Array(4)
          .fill(undefined)
          .map((_, index) => {

            return (
              <Grid2
                key={newIndex(index)}
                size={{ xs: 12, sm: 6, md: 3 }}
                className='border-[1.13px] border-card-border p-5 rounded-[12.56px]'
              >
                <Stack gap={3}>

                  <Stack direction='row' alignItems='center' gap={2}>
                    <Box className="p-1 rounded-full text-center bg-[#EADAFF] flex justify-center"
                    >
                      <Image
                        src='/icons/task-square-bold.svg'
                        alt=''
                        width={13.56}
                        height={13.56}
                      />
                    </Box>
                    <Box className="font-semibold text-[#1B1B1B]">
                      Total Open Positions
                    </Box>
                  </Stack>

                  <Box className="text-[33.48px] font-bold text-[#1B1B1B]">
                    15
                  </Box>
                </Stack>
              </Grid2>
            )
          })}
      </Grid2>
    </Stack>
  )
}

export default OverViewSection;