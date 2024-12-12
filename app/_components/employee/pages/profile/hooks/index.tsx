import { FormProps } from '@/app/_components/shared/form/types';
import {
  ButtonProps,
  ButtonType,
} from '@/app/_components/shared/page/heading/types';
import { PageProps } from '@/app/_components/shared/page/types';

const useEmployeeProfilePage = () => {
  const pageProps: PageProps = {
    text: 'Update Your Profile',
  };

  const formProps: FormProps = {
    layout: '3-columns',
    gridSpacing: 5,
    inputFields: [
      {
        name: 'First Name',
        type: 'text',
        value: 'Alibaba',
      },
      {
        name: 'Middle Name',
        type: 'text',
        value: 'Victoria',
      },
      {
        name: 'Last Name',
        type: 'text',
        value: 'Udor',
      },
      {
        name: 'Email Address',
        type: 'text',
        value: 'allivic@cynergie.co',
      },
      {
        name: 'Phone Number',
        type: 'text',
        value: '09038447892',
      },
      {
        name: 'Date of Birth',
        type: 'date',
      },
      {
        name: 'State',
        type: 'select',
        placeholder: 'Select',
      },
      {
        name: 'Job Title',
        type: 'select',
        placeholder: 'Select',
      },
      {
        name: 'Nationality',
        type: 'text',
        value: 'Nigerian',
        placeholder: 'Select',
      },
      {
        name: 'Department',
        type: 'select',
        placeholder: 'Select',
      },
    ],
  };

  const editButtonProps: ButtonProps = {
    type: ButtonType.contained,
    text: 'Edit',
  };

  return { pageProps, formProps, editButtonProps };
};

export default useEmployeeProfilePage;
