import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

export function usePrefixedParams<T extends object>(
  prefix: string,
  defaultValues: T,
): {
  params: T;
  updateParams: (updates: Partial<T>) => void;
} {
  const router = useRouter();

  const params = useMemo(() => {
    const result = { ...defaultValues } as T;

    for (const key in router.query) {
      if (key.startsWith(`${prefix}_`)) {
        const originalKey = key.replace(`${prefix}_`, '');

        if (originalKey in defaultValues) {
          const value = router.query[key];
          const stringValue = Array.isArray(value) ? value[0] : value;

          const defaultValue = defaultValues[originalKey as keyof T];

          if (typeof defaultValue === 'number') {
            const numValue = stringValue ? Number(stringValue) : defaultValue;
            Object.assign(result, { [originalKey]: numValue });
          } else if (typeof defaultValue === 'boolean') {
            const boolValue = stringValue === 'true';
            Object.assign(result, { [originalKey]: boolValue });
          } else {
            const strValue = stringValue || defaultValue;
            Object.assign(result, { [originalKey]: strValue });
          }
        }
      }
    }

    return result;
  }, [router.query, prefix, defaultValues]);

  const updateParams = useCallback(
    (updates: Partial<T>) => {
      const newQuery = { ...router.query };

      Object.entries(updates).forEach(([key, value]) => {
        const prefixedKey = `${prefix}_${key}`;
        const keyAsT = key as keyof T;

        if (
          value === undefined ||
          value === null ||
          value === '' ||
          value === defaultValues[keyAsT]
        ) {
          delete newQuery[prefixedKey];
        } else {
          newQuery[prefixedKey] = String(value);
        }
      });

      router.push(
        {
          pathname: router.pathname,
          query: newQuery,
        },
        undefined,
        { shallow: true },
      );
    },
    [router, prefix, defaultValues],
  );

  return { params, updateParams };
}
