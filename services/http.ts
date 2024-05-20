import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

export class Http {
  protected axios: AxiosInstance;

  public constructor(axiosConfig: {}) {
    this.axios = axios.create(axiosConfig);
  }

  public interceptors(): void {
    this.axios.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => Promise.reject(error),
    );

    this.axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log('on-http-error', error);

        throw error;
      },
    );
  }

  public setBearerToken(hash: string): void {
    this.axios.interceptors.request.use(
      (config) => {
        if (config?.headers && hash) {
          config.headers.Authorization = `Bearer ${hash}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
  }

  public instance(accessToken: null | string = null): AxiosInstance {
    this.interceptors();
    if (typeof accessToken === 'string') {
      this.setBearerToken(accessToken);
    }
    return this.axios;
  }

  public get(
    url: string,
    params?: {},
    config?: {},
  ): Promise<AxiosResponse<any>> {
    this.interceptors();

    return this.axios.request({
      method: 'get',
      url,
      params,
      ...config,
    });
  }

  public post(url: string, data: {}, config?: {}): Promise<AxiosResponse<any>> {
    this.interceptors();

    return this.axios.request({
      method: 'post',
      url,
      data,
      ...config,
    });
  }

  public put(url: string, data: {}, config?: {}): Promise<AxiosResponse<any>> {
    this.interceptors();

    return this.axios.request({
      method: 'put',
      url,
      data,
      ...config,
    });
  }

  public patch(
    url: string,
    data: {},
    config?: {},
  ): Promise<AxiosResponse<any>> {
    this.interceptors();

    return this.axios.request({
      method: 'patch',
      url,
      data,
      ...config,
    });
  }

  public delete(url: string, config?: {}): Promise<AxiosResponse<any>> {
    this.interceptors();

    return this.axios.request({
      method: 'delete',
      url,
      ...config,
    });
  }
}
