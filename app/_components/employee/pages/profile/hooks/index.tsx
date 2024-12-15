import { FormProps } from '@/app/_components/shared/form/types';
import {
  ButtonProps,
  ButtonType,
} from '@/app/_components/shared/page/heading/types';
import { PageProps } from '@/app/_components/shared/page/types';
import { useEffect, useState } from 'react';
import { getUserDetails } from '@/utils/getUserDetails';

const useEmployeeProfilePage = () => {
  const [userDetails, setUserDetails] = useState<{
    name: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await getUserDetails();
      if (details) {
        setUserDetails(details);
      }
    };
    fetchDetails();
  }, []);

  const pageProps: PageProps = {
    title: 'Update Your Profile',
  };

  const formProps: FormProps = {
    layout: '3-columns',
    gridSpacing: 5,
    inputFields: [
      {
        name: 'First Name',
        type: 'text',
        value: userDetails?.name.split(' ')[0] ?? '',
      },
      {
        name: 'Middle Name',
        type: 'text',
        value: '',
      },
      {
        name: 'Last Name',
        type: 'text',
        value: userDetails?.name.split(' ')[1] ?? '',
      },
      {
        name: 'Email Address',
        type: 'text',
        value: userDetails?.email ?? '',
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

  return { pageProps, formProps, editButtonProps, userDetails };
};

export default useEmployeeProfilePage;
