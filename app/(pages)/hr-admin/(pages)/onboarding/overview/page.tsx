import OverViewSection from "./overview-section";
import { Suspense } from "react";

import TaskSection from "./task-section";
import { Spinner } from "@/app/_components/shared/buttons";

const OnBoardingPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <OverViewSection />
      <TaskSection />
    </Suspense>
  );
};

export default OnBoardingPage;
