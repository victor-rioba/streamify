import type { AspidaClient } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_m6qvv2 } from './tracks';
import type { Methods as Methods_1xhiioa } from './users';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/tracks';
  const PATH1 = '/users';
  const GET = 'GET';
  const POST = 'POST';

  return {
    tracks: {
      get: (
        option?:
          | {
              query?: Methods_m6qvv2['get']['query'] | undefined;
              config?: T | undefined;
            }
          | undefined,
      ) =>
        fetch<Methods_m6qvv2['get']['resBody']>(
          prefix,
          PATH0,
          GET,
          option,
        ).json(),
      $get: (
        option?:
          | {
              query?: Methods_m6qvv2['get']['query'] | undefined;
              config?: T | undefined;
            }
          | undefined,
      ) =>
        fetch<Methods_m6qvv2['get']['resBody']>(prefix, PATH0, GET, option)
          .json()
          .then((r) => r.body),
      post: (option: {
        body: Methods_m6qvv2['post']['reqBody'];
        config?: T | undefined;
      }) =>
        fetch<Methods_m6qvv2['post']['resBody']>(
          prefix,
          PATH0,
          POST,
          option,
        ).json(),
      $post: (option: {
        body: Methods_m6qvv2['post']['reqBody'];
        config?: T | undefined;
      }) =>
        fetch<Methods_m6qvv2['post']['resBody']>(prefix, PATH0, POST, option)
          .json()
          .then((r) => r.body),
      $path: (
        option?:
          | {
              method?: 'get' | undefined;
              query: Methods_m6qvv2['get']['query'];
            }
          | undefined,
      ) =>
        `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
    },
    users: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1xhiioa['get']['resBody']>(
          prefix,
          PATH1,
          GET,
          option,
        ).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1xhiioa['get']['resBody']>(prefix, PATH1, GET, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH1}`,
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
