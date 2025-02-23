import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useSharedState = <T>(key: string, initialState?: T) => {
  const queryClient = useQueryClient();
  const { data } = useQuery<T>({
    queryKey: [key],
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    // refetchOnReconnect: false,
    // retry: false,
    initialData: initialState,
  });
  const update = (newState: T | null | undefined) => {
    queryClient.setQueryData<T | null | undefined>([key], newState);
  };

  type SetFunction<T> = (
    set: (prevState: T | null | undefined) => T | null | undefined,
  ) => void;

  const set: SetFunction<T> = (updateFn) => {
    queryClient.setQueryData<T | null | undefined>([key], (prevState) => {
      return updateFn(prevState);
    });
  };

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: [key] });
  };
  return { data, update, invalidate, set } as const;
};
