import { Spinner } from "@/app/_components/shared/buttons";
import NewHireList from "./template/new-hire-list";
import { Suspense } from 'react';

const OnBoarding = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <NewHireList />
    </Suspense>
  );
};

export default OnBoarding;
