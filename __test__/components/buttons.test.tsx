import { AppButton } from '@/components/button';
import React from 'react';
import renderer from 'react-test-renderer';


describe('AppButton', () => {
  it('renders children', () => {
    const tree = renderer.create(<AppButton onPress={() => null}>Submit</AppButton>).toJSON();
    // console.log(tree);
    // console.log(tree.children[0].children[0]);
    expect(tree.children[0].children[0]).toBe('Submit');
  });
});
