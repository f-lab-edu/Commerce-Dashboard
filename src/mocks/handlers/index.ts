import { http, HttpResponse, delay } from 'msw';
import { mockCategories, mockKPI } from '../data';
import { orderHandlers } from './orders';
import { calendarHandlers } from './calendar';
import { productHandlers } from './products';

export const handlers = [
  http.get('/api/kpi', async () => {
    await delay(500);

    return HttpResponse.json(mockKPI);
  }),

  http.get('/api/insights/categories', async () => {
    await delay(500);

    return HttpResponse.json(mockCategories);
  }),

  ...orderHandlers,
  ...calendarHandlers,
  ...productHandlers,
];
