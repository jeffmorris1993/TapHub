import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useMobileMenu } from '../useMobileMenu';

describe('useMobileMenu', () => {
  it('starts with menu closed', () => {
    const { result } = renderHook(() => useMobileMenu());
    expect(result.current.isOpen).toBe(false);
  });

  it('opens menu when openMenu called', () => {
    const { result } = renderHook(() => useMobileMenu());

    act(() => {
      result.current.openMenu();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it('closes menu when closeMenu called', () => {
    const { result } = renderHook(() => useMobileMenu());

    act(() => {
      result.current.openMenu();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.closeMenu();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it('toggles menu state', () => {
    const { result } = renderHook(() => useMobileMenu());

    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.toggleMenu();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.toggleMenu();
    });

    expect(result.current.isOpen).toBe(false);
  });
});
