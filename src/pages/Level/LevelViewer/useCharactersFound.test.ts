import { it } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useCharactersFound from './useCharactersFound';

it('should have initial characters', () => {
  const { result } = renderHook(() => useCharactersFound(['Waldo', 'Odlaw']));

  expect(result.current[0]).toEqual({
    Waldo: false,
    Odlaw: false,
  });
  expect(result.current[1].current).toEqual({
    Waldo: false,
    Odlaw: false,
  });
});

it('should have setter function', () => {
  const { result } = renderHook(() => useCharactersFound(['Waldo', 'Odlaw']));

  expect(typeof result.current[2]).toBe('function');
});

it('should set character to have been found', () => {
  const { result } = renderHook(() => useCharactersFound(['Waldo', 'Odlaw']));

  act(() => {
    result.current[2]('Waldo');
  });

  expect(result.current[0]).toEqual({
    Waldo: true,
    Odlaw: false,
  });
  expect(result.current[1].current).toEqual({
    Waldo: true,
    Odlaw: false,
  });
});
