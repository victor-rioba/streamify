import api from '@/api/$api';
import aspida from '@aspida/axios';

import { useSession } from '@/context';
import { Http } from '@/services/http';

export const useApi = () => {
  const httpClient = new Http({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  const { session } = useSession();

  console.log({ session });

  return api(aspida(httpClient.instance(session)));
};
