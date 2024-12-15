import { StatusActionMap } from '../types';

const useTableStatusActionMaps = () => {
  const payrollTableStatusActionMap: StatusActionMap = {
    Approved: [
      {
        name: 'View Details',
        onClick: () => {},
      },
      { name: 'View Payroll Report', onClick: () => {} },
    ],
    Pending: [
      { name: 'Edit Payroll', onClick: () => {} },
      { name: 'Delete', onClick: () => {} },
    ],
    Rejected: [{ name: 'Resolve Issue', onClick: () => {} }],
  };
  return { payrollTableStatusActionMap };
};

export default useTableStatusActionMaps;
