import { parseDates, stringifyDates } from './date-transformer';
import ky, { type KyInstance, type Options } from 'ky';

async function transformRequest(request: Request): Promise<Request> {
  if (request.body === null) {
    return request;
  }

  try {
    const bodyText = await request.text();
    const bodyJson: unknown = JSON.parse(bodyText);
    const transformedBody = stringifyDates(bodyJson);

    return new Request(request, {
      body: JSON.stringify(transformedBody),
    });
  } catch (error) {
    console.warn('[API Client] Failed to transform request:', error);
    return request;
  }
}

async function transformResponse(
  request: Request,
  options: Options,
  response: Response,
): Promise<Response> {
  if (!response.ok) {
    return response;
  }

  const contentType = response.headers.get('content-type');
  if (!contentType?.includes('application/json')) {
    return response;
  }

  try {
    const clonedResponse = response.clone();
    const data: unknown = await clonedResponse.json();
    const transformedData = parseDates(data);

    return new Response(JSON.stringify(transformedData), {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (error) {
    console.warn('[API Client] Failed to transform response:', error);
    return response;
  }
}

const defaultOptions: Options = {
  prefixUrl: '/api',
  timeout: 30000,
  retry: {
    limit: 1,
    methods: ['get'],
    statusCodes: [408, 500, 502, 503, 504],
  },
  hooks: {
    beforeRequest: [transformRequest],
    afterResponse: [transformResponse],
  },
};

export const apiClient: KyInstance = ky.create(defaultOptions);

export const api = {
  get: <TResponse>(url: string, options?: Options) =>
    apiClient.get(url, options).json<TResponse>(),

  post: <TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    options?: Options,
  ) => apiClient.post(url, { json: body, ...options }).json<TResponse>(),

  put: <TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    options?: Options,
  ) => apiClient.put(url, { json: body, ...options }).json<TResponse>(),

  patch: <TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    options?: Options,
  ) => apiClient.patch(url, { json: body, ...options }).json<TResponse>(),

  delete: <TResponse>(url: string, options?: Options) =>
    apiClient.delete(url, options).json<TResponse>(),
} as const;
