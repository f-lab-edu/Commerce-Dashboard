import { useMemo } from 'react';
import { usePrefixedParams } from './usePrefixedParams';

interface CalendarUrlParams {
  year: number;
  month: number;
}

function getCurrentYearMonth(): CalendarUrlParams {
  const now = new Date();

  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  };
}

const DEFAULT_CALENDAR_PARAMS: CalendarUrlParams = getCurrentYearMonth();

export function useCalendarParams() {
  const { params, updateParams } = usePrefixedParams<CalendarUrlParams>(
    'cal',
    DEFAULT_CALENDAR_PARAMS,
  );

  const getApiParams = useMemo(() => {
    return {
      year: String(params.year),
      month: String(params.month),
    };
  }, [params]);

  const goToNextMonth = () => {
    let nextYear = params.year;
    let nextMonth = params.month + 1;

    if (nextMonth > 12) {
      nextMonth = 1;
      nextYear += 1;
    }

    updateParams({ year: nextYear, month: nextMonth });
  };

  const goToPreviousMonth = () => {
    let prevYear = params.year;
    let prevMonth = params.month - 1;

    if (prevMonth < 1) {
      prevMonth = 12;
      prevYear -= 1;
    }

    updateParams({ year: prevYear, month: prevMonth });
  };

  const goToToday = () => {
    const { year, month } = getCurrentYearMonth();
    updateParams({ year, month });
  };

  return {
    calendarParams: params,
    updateCalendarParams: updateParams,
    getApiParams,
    goToNextMonth,
    goToPreviousMonth,
    goToToday,
  };
}
