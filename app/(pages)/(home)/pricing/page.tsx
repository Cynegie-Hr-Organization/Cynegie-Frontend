import dynamic from "next/dynamic";

export const metadata = {
  title: "Cynegie| Pricing",
};

const Pricing = dynamic(() => import("@/app/_components/home/pricing"));

export default function PricingPage() {
  return (
    <main>
      <Pricing />
    </main>
  );
}
