import { EmployeeNumberingSystem, getEmployeeNumberingSystem, updateEmployeeNumberingSystem } from "@/app/_core/actions/super-admin/employee-config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../utils/queryKeys";

export const useGetEmployeeNumberingSystem = () => {

  return useQuery({
    queryKey: [queryKeys.EMPLOYEE_NUMBERING_SYSTEM],
    queryFn: () => getEmployeeNumberingSystem(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: undefined,
    retry: false
  });
};

export const useEmployeeNumberingSystemMutations = () => {
  const queryClient = useQueryClient();

  const updateEmployeeNumberingSystemMutation = useMutation({
    mutationKey: ['update-employee-numbering-system'],
    mutationFn: (body: Partial<EmployeeNumberingSystem>) => updateEmployeeNumberingSystem(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.EMPLOYEE_NUMBERING_SYSTEM] });
    }
  });

  return {
    updateEmployeeNumberingSystemMutation
  }
};

export default useGetEmployeeNumberingSystem;
