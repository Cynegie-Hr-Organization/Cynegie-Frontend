export type CourseDetailsProps = {
  name?: string;
  text?: string;
  list?: string[];
  sections?: Section[];
  sectionType?: string;
  duration?: Duration;
};

type Section = {
  name: string;
  subSections: string[];
};

type Duration = {
  start: string;
  end: string;
};
