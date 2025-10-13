import { http, HttpResponse, delay } from 'msw';
import { mockCategories, mockKPI } from '../data';

export const handlers = [
  http.get('/api/kpi', async () => {
    await delay(500);

    return HttpResponse.json(mockKPI);
  }),

  http.get('/api/insights/categories', async () => {
    await delay(500);

    return HttpResponse.json(mockCategories);
  }),
];
