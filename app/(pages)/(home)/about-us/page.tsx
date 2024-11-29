 import dynamic from 'next/dynamic';

export const metadata = {
  title: 'Cynegie| About Us'
};

const AboutUs = dynamic(() => import('@/app/_components/home/about-us'));

export default function PricingPage() {
  return (
    <main>
      <AboutUs/>
    </main>
  );
}
