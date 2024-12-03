export type PageHeadingProps = {
  text: string;
  subtitle?: string;
  hasButtons?: boolean;
  outlinedButton?: OutlinedButtonProps;
  containedButton?: ContainedButtonProps;
};

export type OutlinedButtonProps = {
  text?: string;
  onClick?: () => void;
  popoverOptions?: { name: string; onClick: () => void }[];
};

export type ContainedButtonProps = {
  text?: string;
  onClick?: () => void;
};
