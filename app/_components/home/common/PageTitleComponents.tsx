import { DivProp, HeadingProp } from "@/utils/ElemProp";
import { FC, ReactNode } from "react";

interface prop extends DivProp {
  subheader?: ReactNode;
  subtitle?: ReactNode;
}
const PageTitleComponents: FC<prop> = ({
  subheader,
  subtitle,
  children,
  ...prop
}) => {
  return (
    <div className={`flex justify-center flex-col items-center`} {...prop}>
      {subheader}
      <h1 {...prop}>{children}</h1>
      {subtitle}
    </div>
  );
};

interface prop extends HeadingProp {
  subheader?: ReactNode;
}

export const HeadingComponents: FC<prop> = ({
  subheader,
  children,
  ...prop
}) => {
  return (
    <>
      <h3 {...prop}>{children}</h3>
      {subheader}
    </>
  );
};

export default PageTitleComponents;
