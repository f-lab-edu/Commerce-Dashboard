import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

type AllowedParam = string | number | boolean;

type QueryParamConfig<T extends AllowedParam, K extends string = string> = {
  key: K;
  parser: (value: string | string[] | undefined) => T;
  defaultValue: T;
};

type QueryParamValues<
  T extends readonly QueryParamConfig<AllowedParam, string>[],
> = {
  [K in T[number]['key']]: T extends readonly (infer U)[]
    ? U extends QueryParamConfig<infer V, K>
      ? V
      : never
    : never;
};

export function useQueryParams<
  T extends readonly QueryParamConfig<AllowedParam, string>[],
>(configs: T) {
  const router = useRouter();

  const values = useMemo(() => {
    const result: Record<string, AllowedParam> = {};
    configs.forEach(({ key, parser, defaultValue }) => {
      const raw = router.query[key];

      try {
        result[key] = parser(raw) ?? defaultValue;
      } catch {
        result[key] = defaultValue;
      }
    });

    return result as QueryParamValues<T>;
  }, [router.query, configs]);

  const setParams = useCallback(
    (updates: Partial<QueryParamValues<T>>) => {
      const newQuery: Record<string, string> = { ...router.query } as Record<
        string,
        string
      >;
      Object.entries(updates).forEach(([k, v]) => {
        if (v === undefined || v === null || v === '') delete newQuery[k];
        else newQuery[k] = String(v);
      });
      router.push({ pathname: router.pathname, query: newQuery }, undefined, {
        shallow: true,
      });
    },
    [router],
  );

  return { ...values, setParams } as QueryParamValues<T> & {
    setParams: typeof setParams;
  };
}
