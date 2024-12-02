import dynamic from "next/dynamic";

export const metadata = {
  title: "Sign In",
};

const SigninMain = dynamic(() => import("@/app/_components/signin"));

export default function Signin() {
  return (
    <main>
      <SigninMain />
    </main>
  );
}
