import { setupWorker } from 'msw/browser';

// 일단 빈 핸들러로 시작 (다음 이슈에서 추가)
// eslint-disable-next-line
export const handlers: any[] = [];

export const worker = setupWorker(...handlers);
