import dynamic from "next/dynamic";

export const metadata = {
  title: "Cynegie| Contact Us",
};

const ContactUs = dynamic(() => import("@/app/_components/home/contact-us"));

export default function PricingPage() {
  return (
    <main>
      <ContactUs />
    </main>
  );
}
