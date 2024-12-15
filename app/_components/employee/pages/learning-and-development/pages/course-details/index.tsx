import Page from '@/app/_components/shared/page';
import { CourseDetailsProps } from './types';
import CourseDetails from './item';
import { ButtonGroupProps } from '@/app/_components/shared/button-group/types';
import ButtonGroup from '@/app/_components/shared/button-group';

type EmployeeLearningAndDevelopmentCourseDetailsProps = {
  heading?: string;
  smallHeading?: boolean;
  backText?: string;
  onBackTextClick?: () => void;
  details?: CourseDetailsProps[];
  buttonGroup?: ButtonGroupProps;
};

const EmployeeLearningAndDevelopmentCourseDetails: React.FC<
  EmployeeLearningAndDevelopmentCourseDetailsProps
> = (props) => {
  return (
    <>
      <Page
        smallHeading={props.smallHeading}
        title={props.heading}
        backText={props.backText}
        onBackTextClick={props.onBackTextClick}
      >
        <div className='common-card flex flex-col gap-10 pt-40'>
          {props.details?.map((detail) => (
            <CourseDetails key={detail.name} {...detail} />
          ))}
        </div>
        {props.buttonGroup && <ButtonGroup {...props.buttonGroup} />}
      </Page>
    </>
  );
};

export default EmployeeLearningAndDevelopmentCourseDetails;
