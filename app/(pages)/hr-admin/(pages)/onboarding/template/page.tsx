"use client";

import Appbutton, { Spinner } from "@/app/_components/shared/buttons";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import TemplateTable from "./table";

const TemplatePage = () => {
  const route = useRouter();

  return (
    <div>
      <div className=" flex items-center justify-between mb-11">
        <div>
          <h3 className="text-lg font-semibold">Onboarding Templates</h3>
          <p className="text-sm">Create and use templates</p>
        </div>

        <Appbutton
          buttonText="Create New Template"
          className="bg-primary hidden md:block"
          onClick={() =>
            route.push("/hr-admin/onboarding/template/new-template")
          }
        />

        <Appbutton
          buttonText="New Template"
          className="bg-primary block md:hidden"
          onClick={() =>
            route.push("/hr-admin/onboarding/template/new-template")
          }
        />
      </div>

      <Suspense fallback={<Spinner />}>
        <TemplateTable />
      </Suspense>
    </div>
  );
};

export default TemplatePage;
