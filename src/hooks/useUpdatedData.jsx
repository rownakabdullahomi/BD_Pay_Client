import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'
import { useAuthContext } from '../providers/AuthProvider'

const useUpdatedData = () => {
    const axiosSecure = useAxiosSecure()
  const { user, loading } = useAuthContext();



  const { data: updatedData, isLoading, refetch } = useQuery({
    queryKey: ['updatedData', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/user-updated-data/${user?.email}`);
      return data;
    },
  })
  return [updatedData, isLoading, refetch ]
};

export default useUpdatedData;