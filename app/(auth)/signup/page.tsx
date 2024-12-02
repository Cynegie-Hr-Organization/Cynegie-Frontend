import dynamic from "next/dynamic";

export const metadata = {
  title: "Sign In",
};

const SignUpMain = dynamic(() => import("@/app/_components/signup"));

export default function Signin() {
  return (
    <main>
      <SignUpMain />
    </main>
  );
}
