import {
  format,
  parseISO,
  formatDistanceToNow,
  startOfMonth,
  endOfMonth,
  getDaysInMonth,
  isToday,
  isSameDay,
  isWithinInterval,
  addMonths,
  subMonths,
} from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * 날짜를 yyyy-MM-dd 형식으로 포맷
 */
export function formatDate(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

/**
 * 날짜를 yyyy년 MM월 dd일 형식으로 포맷
 */
export function formatDateKorean(date: Date): string {
  return format(date, 'yyyy년 MM월 dd일', { locale: ko });
}

/**
 * 날짜와 시간을 포맷 (yyyy-MM-dd HH:mm)
 */
export function formatDateTime(date: Date): string {
  return format(date, 'yyyy-MM-dd HH:mm');
}

/**
 * 날짜와 시간을 한글로 포맷 (yyyy년 MM월 dd일 HH:mm)
 */
export function formatDateTimeKorean(date: Date): string {
  return format(date, 'yyyy년 MM월 dd일 HH:mm', { locale: ko });
}

/**
 * 시간만 포맷 (HH:mm)
 */
export function formatTime(date: Date): string {
  return format(date, 'HH:mm');
}

/**
 * 상대 시간 (3시간 전, 어제)
 */
export function formatRelativeTime(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true, locale: ko });
}

/**
 * 주문일시 포맷 (MM/dd HH:mm)
 */
export function formatOrderDate(date: Date): string {
  return format(date, 'MM/dd HH:mm');
}

/**
 * 월 표시 (yyyy년 MM월)
 */
export function formatMonth(date: Date): string {
  return format(date, 'yyyy년 MM월', { locale: ko });
}

/**
 * 요일 포함 날짜 (MM월 dd일 (월))
 */
export function formatDateWithDay(date: Date): string {
  return format(date, 'MM월 dd일 (E)', { locale: ko });
}

/**
 * ISO 문자열을 Date로 파싱
 */
export function parseISOString(dateString: string): Date {
  return parseISO(dateString);
}

/**
 * 월 시작일/종료일 구하기
 */
export function getMonthRange(year: number, month: number) {
  const date = new Date(year, month - 1, 1);

  return {
    start: startOfMonth(date),
    end: endOfMonth(date),
    days: getDaysInMonth(date),
  };
}

/**
 * 특정 월의 모든 날짜 배열 생성
 */
export function getMonthDates(year: number, month: number): Date[] {
  const { days } = getMonthRange(year, month);

  return Array.from({ length: days }, (_, i) => {
    return new Date(year, month - 1, i + 1);
  });
}

/**
 * 날짜 범위 체크
 */
export function isDateInRange(date: Date, start: Date, end: Date): boolean {
  return isWithinInterval(date, { start, end });
}

/**
 * 오늘인지 체크
 */
export function isTodayDate(date: Date): boolean {
  return isToday(date);
}

/**
 * 같은 날짜인지 체크
 */
export function isSameDayDate(date1: Date, date2: Date): boolean {
  return isSameDay(date1, date2);
}

/**
 * 이전 달 구하기
 */
export function getPreviousMonth(date: Date): Date {
  return subMonths(date, 1);
}

/**
 * 다음 달 구하기
 */
export function getNextMonth(date: Date): Date {
  return addMonths(date, 1);
}

/**
 * 현재 연도와 월 구하기
 */
export function getCurrentYearMonth(): { year: number; month: number } {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1, // 0-based → 1-based
  };
}

/**
 * Date를 yyyy-MM-dd 문자열로 (API 전송용)
 */
export function toDateString(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

/**
 * Date를 ISO 문자열로 (API 전송용)
 */
export function toISOString(date: Date): string {
  return date.toISOString();
}

/**
 * yyyy-MM-dd 문자열을 Date로
 */
export function fromDateString(dateString: string): Date {
  return parseISO(dateString);
}
