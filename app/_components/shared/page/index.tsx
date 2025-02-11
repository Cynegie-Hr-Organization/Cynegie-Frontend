import PageHeading from "./heading";
import PageContainer from "./container";
import { PageProps } from "./types";

const Page: React.FC<PageProps> = ({ children, ...headingProps }) => {
  return (
    <PageContainer>
      <PageHeading {...headingProps} />
      {children}
    </PageContainer>
  );
};

export default Page;
