import { Spinner } from "@/app/_components/shared/buttons";
import { Suspense } from "react";
import TemplateTable from "./template/all-templates";

const OnBoarding = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <TemplateTable />
    </Suspense>
  );
};

export default OnBoarding;
