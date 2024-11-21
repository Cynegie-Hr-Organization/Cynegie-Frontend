'use client'
import { Stack } from "@mui/material"
import OverViewSection from "./overview-section";
import { Suspense } from "react";

const OnBoardingPage = () => {
  return (
    <Suspense fallback={'Loading...'}>
      <Stack className="min-h-svh my-6" gap={3}>
        <OverViewSection />
      </Stack>
    </Suspense >
  )
}

export default OnBoardingPage;