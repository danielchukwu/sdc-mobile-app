import { Input } from '@/components/input';
import React from 'react';
import renderer from 'react-test-renderer';


describe('Input', () => {
  it('field works', () => {
    const tree = renderer.create(<Input value='Nice' />).toJSON();
    // console.log(tree);
    // console.log('value', tree.props.value);
    expect(tree.props.value).toBe('Nice');
  });
});
