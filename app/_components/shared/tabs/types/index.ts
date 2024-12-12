export type TabFormatProps = {
  tabs?: Tab[];
};

export type Tab = {
  name: string;
  component: React.ReactElement;
};
