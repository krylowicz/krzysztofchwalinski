import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGetCurrentUserQuery } from 'src/generated/graphql';

export const useIsAuth = () => {
  const router = useRouter();
  const { data, loading } = useGetCurrentUserQuery();
  
  useEffect(() => {
    if (!loading && !data?.getCurrentUser) {
      router.replace('/login');
    }
  }, [data, loading, router]);
}