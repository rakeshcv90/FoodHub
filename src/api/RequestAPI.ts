import axios, {AxiosResponse, AxiosError} from 'axios';
import { RAPID_API_HOST, RAPID_API_KEY } from './urls';

const isEmpty = (obj: any) =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

const handleResponse = (
  response: AxiosResponse | undefined,
  error: AxiosError | null = null,
) => {
  if (response) {
    const {status, data} = response;
    const errors = data?.errors || {};
    return {
      status,
      data: isEmpty(data) ? {} : data,
      errors,
    };
  } else if (error) {
    // Handle error responses gracefully
    return {
      status: error?.response?.status || 500,
      data: {},
      errors: error?.response?.data?.errors || 'An error occurred',
      message: error?.message || 'Request failed',
    };
  }
  return {
    status: 500,
    data: {},
    errors: 'Unknown error occurred',
  };
};

export const RequestAPI = {
  async makeRequest(
    method: 'GET' | 'POST',
    url: string,
    data: Record<string, any> = {},
    callback: (response: {
      status: number;
      data: any;
      errors: any;
      message?: string;
    }) => void,
  ) {
    const postHeader = {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      'x-rapidapi-key': RAPID_API_KEY,
      'x-rapidapi-host': RAPID_API_HOST,
    };
    const getHeader = {
      Accept: 'application/json',
      'x-rapidapi-key': RAPID_API_KEY,
      'x-rapidapi-host': RAPID_API_HOST,
    };

    const payload = new FormData();

    if (method === 'POST') {
      Object.entries(data).forEach(([key, value]) => {
        payload.append(key, value as string);
      });
    }

    const requestOptions = {
      method,
      url,
      data: method === 'POST' ? payload : undefined,
      params: method === 'GET' ? data : undefined,
      headers: method === 'POST' ? postHeader : getHeader,
      timeout: 30000,
      withCredentials: true,
    };

    try {
      const response = await axios(requestOptions);

      // Success response handling
      callback(handleResponse(response, null));
    } catch (error: any) {
      // Error handling: AxiosError or NetworkError
      callback(handleResponse(error.response, error));
    }
  },
};
