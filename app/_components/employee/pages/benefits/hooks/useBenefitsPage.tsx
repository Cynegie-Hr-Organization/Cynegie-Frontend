import { ButtonType } from '@/app/_components/shared/page/heading/types';
import { PageProps } from '@/app/_components/shared/page/types';
import { FieldType, TableProps } from '@/app/_components/shared/table/types';
import { icon, route } from '@/constants';
import { useEffect, useState } from 'react';
import { CardGroupProps } from '@/app/_components/shared/section-with-cards/types';
import SvgIcon from '@/app/_components/icons/container';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ModalProps } from '../../../modal/types';
import { getAllBenefits, getAllMyBenefitsRequest, requestbenefits } from '@/app/api/services/employee/benefits';
import Skeleton from '@mui/material/Skeleton';

const useBenefitsPage = () => {
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [benefits, setBenefits] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
    const [formData, setFormData] = useState({
    benefit: '',
    provider: '',
    coveragePlan: '',
    monthlyCost : ''
  });


  const router = useRouter();

  // Fetch apps data when the component mounts
    useEffect(() => {
      const fetchBenefits = async () => {
        const fetchedBenefits = await getAllBenefits();
        console.log(fetchedBenefits);
        setBenefits(fetchedBenefits);
        setLoading(false);
      };
  
      fetchBenefits();
    }, []);

const handleInputChange = (name: string, value: string | number) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
};
  
  const handleSubmitRequest = async () => {
    const payload = {
       ...formData,
    monthlyCost : Number(formData.monthlyCost)
    }
    console.log(payload);
      try {
        const response = await requestbenefits(payload);
        console.log(response);
        if (response?.createdAt !== "") {
          setOpenRequestModal(false);
          setOpenSuccessModal(true);
          refetch();
        } else {
          console.error('Request failed:', response?.message || 'Unknown error');
        }
      } catch (error) {
        console.error('Error while making app request:', error);
      }
  };

  const { data: benefitsRequests, refetch, isLoading } = useQuery({
    queryKey: ['benefitsRequest'],
    queryFn: async () => {
      const response = await getAllMyBenefitsRequest('desc', 1, 10);
      return response.data
    },
    refetchOnWindowFocus: false, // Prevent refetching on window focus
    staleTime: 60000, // Cache for 1 minute
  })
  


  

  const pageProps: PageProps = {
    title: "Benefits",
    subtitle: "All your benefits below",
    hasButtons: true,
    leftButton: {
      type: ButtonType.outlined,
      text: "Salary Advance",
      onClick: () => router.push(route.employee.benefits.salaryAdvance),
    },
    rightButton: {
      type: ButtonType.contained,
      text: "Request Benefits",
      onClick: () => setOpenRequestModal(true),
    },
  };

  const giftIcon = <SvgIcon path={icon.gift} width={16} height={16} />;

  const cardGroupProps: CardGroupProps = {
    gridItemSize: { xs: 12, sm: 6, md: 3 },
    cards: [
      {
        labelText: "Total Benefits Enrolled",
        value: "10",
        valueBelow: true,
        icon: giftIcon,
        iconColorVariant: "success",
      },
      {
        labelText: "Active Benefits",
        value: "4",
        valueBelow: true,
        icon: giftIcon,
        iconColorVariant: "info",
      },
      {
        labelText: "Pending Benefits",
        value: "3",
        valueBelow: true,
        icon: giftIcon,
        iconColorVariant: "warning",
      },
      {
        labelText: "Upcoming Expiration",
        value: "2",
        valueBelow: true,
        icon: giftIcon,
        iconColorVariant: "error",
      },
    ],
  };

  const tableProps: TableProps = {
    hasActionsColumn: true,
    headerRowData: [
      'Benefit Name',
      'Provider',
      'Coverage Plan',
    ],
    bodyRowData: isLoading
      ? Array(5).fill({
        name: <Skeleton />,
        type: <Skeleton />,
        provider: <Skeleton />,
        coveragePlan : <Skeleton/>,
      })
      : benefitsRequests?.map((request) => ({
        name: request.benefit?.name,
        provider: request.provider,
        coveragePlan : request.coveragePlan,
      })) || [],
    fieldTypes: Array(4).fill(FieldType.text),
    displayedFields: ['name', 'provider', 'coveragePlan'],
    actions: [
      { name: "View Details", onClick: () => setOpenDetailsModal(true) },
    ],
    filters: [
      {
        name: "Benefit Type",
        items: ["Health", "Pension", "Retirement", "Transport", "Life"],
      },
    ],
  };

  const requestModalProps: ModalProps = {
    open: openRequestModal,
    onClose: () => setOpenRequestModal(false),
    title: "Request Benefit",
    subtitle: "Request benefit below",
    form: {
      gridSpacing: 4,
      inputFields: [  
        {
          name: 'Benefit Type',
          type: 'select',
          options: benefits.map((benefit) => ({
            label: benefit.label,
            value: benefit.value,
          })),
           value: formData.benefit,
          setValue: (value: string | number) => handleInputChange('benefit', value),
          disabled: loading,
        },
        {
          name: 'Provider',
          type: 'text',
          placeholder: 'Provider',
          value: formData.provider,
          setValue: (value: string | number) => handleInputChange('provider', value),
        },
        {
          name: 'Coverage Detail',
          type: 'text',
          placeholder: 'Sample description here',
          value: formData.coveragePlan,
          setValue: (value: string | number) => handleInputChange('coveragePlan', value),
        },
        {
          name: 'Monthly Cost',
          type: 'text',
          placeholder: '',
          value: formData.monthlyCost,
          setValue: (value: string | number) => handleInputChange('monthlyCost', value),
        },
      ],
    },
    buttonOne: {
      type: ButtonType.contained,
      text: 'Request Beneift',
      onClick: handleSubmitRequest,
    },
    centerButton: true,
  };

  const detailsModalProps: ModalProps = {
    open: openDetailsModal,
    onClose: () => setOpenDetailsModal(false),
    title: "View Details",
    subtitle: "View details below",
    detailGroup: {
      spaceBetweenLayout: true,
      details: [
        {
          name: "Benefit Name",
          value: "Retirment Plans",
        },
        {
          name: "Benefit Type",
          value: "Financial",
        },
        {
          name: "Provider",
          value: "Cynegie",
        },
        {
          name: "Start Date",
          value: "January 30, 2024",
        },
        {
          name: "End Date",
          value: "December 21, 2024",
        },
        {
          name: "Employee Contribution",
          value: "N20,000",
        },
      ],
    },
    buttonOne: {
      type: ButtonType.outlinedBlue,
      text: "Contact HR",
      onClick: () => setOpenDetailsModal(false),
    },
    centerButton: true,
  };

  const successModalProps: ModalProps = {
    open: openSuccessModal,
    onClose: () => setOpenSuccessModal(false),
    hasHeading: false,
    reduceVerticalGap: true,
    centerImage: "/icons/modal-success.svg",
    centerTitle: "App Requested",
    centerMessage: "Your request has been sent successfully",
    buttonOne: {
      text: "Return to App Dashboard",
      type: ButtonType.contained,
      onClick: () => {
        setOpenSuccessModal(false);
      },
    },
    centerButton: true,
  };

  const modalsProps = [requestModalProps, detailsModalProps, successModalProps];

  return { pageProps, cardGroupProps, tableProps, modalsProps };
};

export default useBenefitsPage;
