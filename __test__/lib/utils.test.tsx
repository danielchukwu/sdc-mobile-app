import { FormErrorText } from '@/components/texts';
import { cn } from '@/lib/utils';
import React from 'react';
import renderer from 'react-test-renderer';


describe('cn function ', () => {
  it('works perfectly', () => {
    const result = cn('py-5', 'mx-2', 'py-10');
    console.log(result);
    expect(result).toBe('mx-2 py-10');
  });
});
