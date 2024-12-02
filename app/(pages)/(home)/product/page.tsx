import dynamic from "next/dynamic";

export const metadata = {
  title: "Cynegie| Product",
};

const Product = dynamic(() => import("@/app/_components/home/product"));

export default function ProductPage() {
  return (
    <main>
      <Product />
    </main>
  );
}
