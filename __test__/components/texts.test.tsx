import { FormErrorText } from '@/components/texts';
import React from 'react';
import renderer from 'react-test-renderer';


describe('FormErrorText ', () => {
  it('renders text child', () => {
    const tree = renderer.create(<FormErrorText text='Yeshua' />).toJSON();
    // console.log(tree);
    // console.log(tree.children[0]);
    expect(tree.children[0]).toBe('Yeshua');
  });
  it('is red in color', () => {
    const tree = renderer.create(<FormErrorText text='...' />).toJSON();
    console.log(tree);
    console.log(tree.props.className);
    expect(tree.props.className).toContain('red');
  })
});
