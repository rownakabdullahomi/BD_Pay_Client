import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'
import { useAuthContext } from '../providers/AuthProvider'


const useRole = () => {
  const axiosSecure = useAxiosSecure()
  const { user, loading } = useAuthContext();
  const { data: role, isLoading } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/role/${user?.email}`)
      return data.role
    },
  })
  return [role, isLoading]
}

export default useRole