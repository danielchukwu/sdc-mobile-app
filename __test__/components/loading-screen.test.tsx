import { LoadingScreen } from '@/components/loading-screen';
import React from 'react';
import renderer from 'react-test-renderer';


describe('LoadingScreen ', () => {
  it('renders ActivityIndicator', () => {
    const tree = renderer.create(<LoadingScreen />).toJSON();
    console.log(tree);
    console.log(tree.children[0]);
    expect(tree.children[0].type).toBe('ActivityIndicator');
  });
});
