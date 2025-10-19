import { useState, useEffect } from 'react';
import { useDebouncedValue } from './useDebouncedValue';

interface UseDebouncedInputOptions<T> {
  initialValue: T;
  delay: number;
  onDebouncedChange: (value: T) => void;
}

export function useDebouncedInput<T>({
  initialValue,
  delay,
  onDebouncedChange,
}: UseDebouncedInputOptions<T>) {
  const [value, setValue] = useState<T>(initialValue);
  const debouncedValue = useDebouncedValue(value, delay);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    onDebouncedChange(debouncedValue);
  }, [debouncedValue, onDebouncedChange]);

  return [value, debouncedValue, setValue] as const;
}
