/**
 * ISO 8601 날짜 문자열 패턴
 */
const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;

/**
 * 값이 ISO 날짜 문자열인지 확인
 */
function isISODateString(value: unknown): value is string {
  return typeof value === 'string' && ISO_DATE_REGEX.test(value);
}

/**
 * Date 객체를 ISO 문자열로 변환 (재귀)
 * @internal API 클라이언트 내부에서만 사용
 */
export function stringifyDates(obj: unknown): unknown {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (obj instanceof Date) {
    return obj.toISOString();
  }

  if (Array.isArray(obj)) {
    return obj.map(stringifyDates);
  }

  if (typeof obj === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = stringifyDates(value);
    }
    return result;
  }

  return obj;
}

/**
 * ISO 문자열을 Date 객체로 변환 (재귀)
 * @internal API 클라이언트 내부에서만 사용
 */
export function parseDates(obj: unknown): unknown {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (isISODateString(obj)) {
    return new Date(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(parseDates);
  }

  if (typeof obj === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = parseDates(value);
    }
    return result;
  }

  return obj;
}
