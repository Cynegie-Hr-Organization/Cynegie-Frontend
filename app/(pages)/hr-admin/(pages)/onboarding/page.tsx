import { Spinner } from "@/app/_components/shared/buttons";
import TemplateTable from "./template/new-hire-list";
import { Suspense } from "react";

const OnBoarding = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <TemplateTable />
    </Suspense>
  );
};

export default OnBoarding;
