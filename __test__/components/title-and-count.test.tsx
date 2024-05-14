import { TitleAndCount } from '@/components/title-and-count';
import React from 'react';
import renderer from 'react-test-renderer';


describe('TitleAndCount ', () => {
  it('renders title', () => {
    const tree = renderer.create(<TitleAndCount title='offenders' count={0} />).toJSON();
      // console.log(tree);
      // console.log(tree.children[0].children[0]);
      expect(tree.children[0].children[0]).toBe('offenders');
    });
    it('renders count', () => {
        const tree = renderer.create(<TitleAndCount title='offenders' count={15} />).toJSON();
        // console.log(tree);
        // console.log(tree.children[1].children[0]);
      expect(tree.children[1].children[0]).toBe("15");
    })
});
