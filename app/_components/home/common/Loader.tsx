import { FC, Suspense } from "react";
import LoadingComponent from "./LoadingComponent";

interface prop
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  message?: string;
}

const Loader: FC<prop> = ({ children, message }) => {
  return (
    <Suspense
      fallback={<LoadingComponent message={message ?? "fetching data..."} />}
    >
      {children}
    </Suspense>
  );
};

export default Loader;
