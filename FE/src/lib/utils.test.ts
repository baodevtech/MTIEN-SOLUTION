import {describe, it, expect} from 'vitest';
import {cn} from './utils';

describe('cn (tailwind merge)', () => {
  it('merges class names with later winning on conflict', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });

  it('handles falsy values', () => {
    expect(cn('foo', false && 'bar', undefined, null, 'baz')).toBe('foo baz');
  });

  it('deduplicates basic classes', () => {
    const result = cn('text-sm', 'text-sm');
    // twMerge keeps a single instance
    expect(result.split(' ').filter((c) => c === 'text-sm').length).toBe(1);
  });
});
