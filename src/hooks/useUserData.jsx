import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'
import { useAuthContext } from '../providers/AuthProvider'


const useUserData = () => {
  const axiosSecure = useAxiosSecure()
  const { user, loading } = useAuthContext();
  const { data: userData, isLoading, refetch } = useQuery({
    queryKey: ['userData', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/${user?.email}`)
      return data;
    },
  })
  return [userData, isLoading, refetch]
}

export default useUserData