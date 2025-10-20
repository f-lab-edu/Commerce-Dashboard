import { CalendarMonthResponse, SuccessResponse } from '@/types/api';
import { CalendarDayDTO, CalendarMemoDTO, UpsertMemoDTO } from '@/types/dto';
import { delay, http, HttpResponse } from 'msw';
import { memoStorage, mockCalendarData, mockOrders } from '../data';
import { toISOString } from '@/utils/formatDate';

export const calendarHandlers = [
  http.get('/api/calendar', async ({ request }) => {
    await delay(300);

    const url = new URL(request.url);
    const year = url.searchParams.get('year');
    const month = url.searchParams.get('month');

    if (!year || !month) {
      return HttpResponse.json(
        {
          error: 'BAD_REQUEST',
          message: 'year와 month 파라미터가 필요합니다.',
          statusCode: 400,
        },
        { status: 400 },
      );
    }

    const yearNum = Number(year);
    const monthNum = Number(month);

    if (isNaN(yearNum) || isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      return HttpResponse.json(
        {
          error: 'BAD_REQUEST',
          message: '올바른 year, month 값을 입력하세요.',
          statusCode: 400,
        },
        { status: 400 },
      );
    }

    if (yearNum === 2025 && monthNum === 10) {
      const response: CalendarMonthResponse<CalendarDayDTO> = {
        year: year,
        month: month,
        data: mockCalendarData,
      };

      return HttpResponse.json(response);
    }

    // 다른 년월은 빈 데이터
    const daysInMonth = new Date(yearNum, monthNum, 0).getDate();
    const emptyData: CalendarDayDTO[] = Array.from(
      { length: daysInMonth },
      (_, i) => {
        const day = i + 1;
        const dateStr = `${year}-${String(monthNum).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        return {
          date: dateStr,
          revenue: 0,
          orderCount: 0,
          refundCount: 0,
          memo: null,
        };
      },
    );

    const response: CalendarMonthResponse<CalendarDayDTO> = {
      year: year,
      month: month,
      data: emptyData,
    };

    return HttpResponse.json(response);
  }),

  http.get('/api/orders/daily', async ({ request }) => {
    await delay(300);

    const url = new URL(request.url);
    const date = url.searchParams.get('date');

    if (!date) {
      return HttpResponse.json(
        {
          error: 'BAD_REQUEST',
          message: 'date 파라미터가 필요합니다.',
          statusCode: 400,
        },
        { status: 400 },
      );
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return HttpResponse.json(
        {
          error: 'BAD_REQUEST',
          message: '올바른 날짜 형식(YYYY-MM-DD)을 입력하세요.',
          statusCode: 400,
        },
        { status: 400 },
      );
    }

    const orders = mockOrders.filter((order) =>
      order.orderDate.startsWith(date),
    );

    return HttpResponse.json(orders);
  }),

  http.get('/api/calendar/memo/:date', async ({ params }) => {
    await delay(300);

    const { date } = params as { date: string };

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return HttpResponse.json(
        {
          error: 'BAD_REQUEST',
          message: '올바른 날짜 형식(YYYY-MM-DD)을 입력하세요.',
          statusCode: 400,
        },
        { status: 400 },
      );
    }

    const stored = memoStorage.get(date);

    if (!stored) {
      return HttpResponse.json(
        {
          error: 'NOT_FOUND',
          message: '메모를 찾을 수 없습니다.',
          statusCode: 404,
        },
        { status: 404 },
      );
    }

    const response: CalendarMemoDTO = {
      date,
      memo: stored.memo,
      createdAt: stored.createdAt,
      updatedAt: stored.updatedAt,
    };

    return HttpResponse.json(response);
  }),

  http.post('/api/calendar/memo', async ({ request }) => {
    await delay(500);

    const body = (await request.json()) as UpsertMemoDTO;

    if (!body.date || !body.memo) {
      return HttpResponse.json(
        {
          error: 'BAD_REQUEST',
          message: 'date와 memo 필드가 필요합니다.',
          statusCode: 400,
        },
        { status: 400 },
      );
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(body.date)) {
      return HttpResponse.json(
        {
          error: 'BAD_REQUEST',
          message: '올바른 날짜 형식(YYYY-MM-DD)을 입력하세요.',
          statusCode: 400,
        },
        { status: 400 },
      );
    }

    if (memoStorage.has(body.date)) {
      return HttpResponse.json(
        {
          error: 'CONFLICT',
          message: '이미 메모가 존재합니다. PUT 요청을 사용하세요.',
          statusCode: 409,
        },
        { status: 409 },
      );
    }

    const now = toISOString(new Date());

    memoStorage.set(body.date, {
      memo: body.memo,
      createdAt: now,
      updatedAt: now,
    });

    const response: SuccessResponse<CalendarMemoDTO> = {
      success: true,
      data: {
        date: body.date,
        memo: body.memo,
        createdAt: now,
        updatedAt: now,
      },
      message: '메모가 생성되었습니다.',
    };

    return HttpResponse.json(response);
  }),

  http.put('/api/calendar/memo', async ({ request }) => {
    await delay(500);

    const body = (await request.json()) as UpsertMemoDTO;

    if (!body.date || !body.memo) {
      return HttpResponse.json(
        {
          error: 'BAD_REQUEST',
          message: 'date와 memo 필드가 필요합니다.',
          statusCode: 400,
        },
        { status: 400 },
      );
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(body.date)) {
      return HttpResponse.json(
        {
          error: 'BAD_REQUEST',
          message: '올바른 날짜 형식(YYYY-MM-DD)을 입력하세요.',
          statusCode: 400,
        },
        { status: 400 },
      );
    }

    const stored = memoStorage.get(body.date);

    if (!stored) {
      return HttpResponse.json(
        {
          error: 'NOT_FOUND',
          message: '메모를 찾을 수 없습니다. POST 요청을 사용하세요.',
          statusCode: 404,
        },
        { status: 404 },
      );
    }

    const now = toISOString(new Date());

    memoStorage.set(body.date, {
      memo: body.memo,
      createdAt: stored.createdAt,
      updatedAt: now,
    });

    const response: SuccessResponse<CalendarMemoDTO> = {
      success: true,
      data: {
        date: body.date,
        memo: body.memo,
        createdAt: stored.createdAt,
        updatedAt: now,
      },
      message: '메모가 수정되었습니다.',
    };

    return HttpResponse.json(response);
  }),
];
