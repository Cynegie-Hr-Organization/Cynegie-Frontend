import { FC } from "react";

interface prop
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  message?: string;
}

const LoadingComponent: FC<prop> = ({ message, ...props }) => {
  return <div {...props}>{message ?? "loading..."}</div>;
};

export default LoadingComponent;
