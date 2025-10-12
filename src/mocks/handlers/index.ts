import { http, HttpResponse, delay } from 'msw';
import { mockKPI } from '../data';

export const handlers = [
  http.get('/api/kpi', async () => {
    await delay(500);

    return HttpResponse.json(mockKPI);
  }),
];
