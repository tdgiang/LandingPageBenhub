import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn (className utility)', () => {
  it('returns a single class unchanged', () => {
    expect(cn('foo')).toBe('foo');
  });

  it('merges multiple classes', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('deduplicates conflicting Tailwind classes — last wins', () => {
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('ignores falsy values', () => {
    expect(cn('foo', false && 'bar', undefined, null, '')).toBe('foo');
  });

  it('supports conditional objects', () => {
    expect(cn({ active: true, disabled: false })).toBe('active');
  });

  it('handles arrays', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar');
  });

  it('handles complex Tailwind merge — padding wins over margin prefix', () => {
    const result = cn('px-2', 'px-4');
    expect(result).toBe('px-4');
  });

  it('returns empty string when no valid args', () => {
    expect(cn(false, undefined, null)).toBe('');
  });
});
