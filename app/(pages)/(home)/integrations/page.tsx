import dynamic from "next/dynamic";

export const metadata = {
  title: "Cynegie| Integrations",
};

const Integration = dynamic(
  () => import("@/app/_components/home/integrations"),
);

export default function PricingPage() {
  return (
    <main>
      <Integration />
    </main>
  );
}
